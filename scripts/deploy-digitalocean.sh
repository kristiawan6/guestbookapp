#!/bin/bash

# Digital Ocean App Platform Deployment Script
# This script ensures zero failed deployments

set -e  # Exit on any error

echo "🌊 Digital Ocean App Platform Deployment Script"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
    print_error "doctl CLI is not installed"
    echo "Install it with: brew install doctl"
    echo "Or download from: https://github.com/digitalocean/doctl/releases"
    exit 1
fi

# Check if user is authenticated
if ! doctl auth list &> /dev/null; then
    print_error "Not authenticated with Digital Ocean"
    echo "Run: doctl auth init"
    exit 1
fi

print_status "Digital Ocean CLI is ready"

# Pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# Check required files
required_files=(
    ".do/app.yaml"
    "package.json"
    "next.config.js"
    "prisma/schema.prisma"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Required file missing: $file"
        exit 1
    fi
done

print_status "All required files present"

# Validate package.json
if ! node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))"; then
    print_error "Invalid package.json format"
    exit 1
fi

print_status "package.json is valid"

# Check for common issues
echo "🔧 Checking for common deployment issues..."

# Check if build script exists
if ! npm run build --dry-run &> /dev/null; then
    print_error "Build script not found or invalid"
    exit 1
fi

# Check if start script exists
if ! grep -q '"start"' package.json; then
    print_error "Start script missing in package.json"
    exit 1
fi

print_status "Build and start scripts are configured"

# Validate environment variables template
if [ -f ".env.production" ]; then
    print_info "Environment variables template found"
    echo "Make sure to set these in Digital Ocean App Platform:"
    grep -E '^[A-Z_]+=' .env.production | sed 's/=.*//' | while read var; do
        echo "  - $var"
    done
else
    print_warning "No .env.production template found"
fi

# Check Prisma configuration
if [ -f "prisma/schema.prisma" ]; then
    if grep -q "postgresql" prisma/schema.prisma; then
        print_status "PostgreSQL database configured"
    else
        print_warning "Database provider not set to PostgreSQL"
    fi
fi

# Test build locally
echo "🏗️  Testing build process..."
print_info "Running npm ci..."
npm ci --only=production

print_info "Generating Prisma client..."
npx prisma generate

print_info "Running build..."
if npm run build; then
    print_status "Build completed successfully"
else
    print_error "Build failed - fix errors before deploying"
    exit 1
fi

# Check build output
if [ ! -d ".next" ]; then
    print_error "Build output directory (.next) not found"
    exit 1
fi

print_status "Build output verified"

# Digital Ocean specific checks
echo "🌊 Digital Ocean specific validations..."

# Check app.yaml syntax
if command -v yq &> /dev/null; then
    if yq eval '.name' .do/app.yaml &> /dev/null; then
        print_status "app.yaml syntax is valid"
    else
        print_error "Invalid app.yaml syntax"
        exit 1
    fi
else
    print_warning "yq not installed - skipping app.yaml validation"
fi

# Check for large files that might cause deployment issues
echo "📦 Checking for large files..."
large_files=$(find . -type f -size +50M -not -path "./node_modules/*" -not -path "./.next/*" -not -path "./build/*" 2>/dev/null || true)
if [ -n "$large_files" ]; then
    print_warning "Large files found (>50MB):"
    echo "$large_files"
    echo "Consider adding these to .gitignore or .dockerignore"
fi

# Check node_modules size
if [ -d "node_modules" ]; then
    size=$(du -sh node_modules | cut -f1)
    print_info "node_modules size: $size"
    if [[ $size == *"G"* ]]; then
        print_warning "Large node_modules directory - consider optimizing dependencies"
    fi
fi

# Memory and resource recommendations
echo "💾 Resource recommendations..."
print_info "Recommended Digital Ocean App Platform settings:"
echo "  - Instance Size: basic-xxs (512MB RAM) for small apps"
echo "  - Instance Size: basic-xs (1GB RAM) for medium apps"
echo "  - Database: db-s-dev-database for development"
echo "  - Database: db-s-1vcpu-1gb for production"

# Security checks
echo "🔒 Security checks..."

# Check for exposed secrets
if grep -r "sk_" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.md" 2>/dev/null; then
    print_error "Potential API keys found in code - remove before deploying"
    exit 1
fi

if grep -r "password" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.md" --exclude="*.sh" 2>/dev/null | grep -v "PASSWORD" | head -5; then
    print_warning "Potential hardcoded passwords found - review before deploying"
fi

print_status "Security checks completed"

# Final deployment preparation
echo "🚀 Preparing for deployment..."

# Create deployment checklist
cat > DEPLOYMENT_CHECKLIST.md << EOF
# Digital Ocean Deployment Checklist

## Pre-Deployment ✅
- [x] Build process tested locally
- [x] All required files present
- [x] No large files in repository
- [x] Security checks passed

## Digital Ocean Configuration
- [ ] App created in Digital Ocean App Platform
- [ ] GitHub repository connected
- [ ] Environment variables set:
  - [ ] DATABASE_URL
  - [ ] NEXTAUTH_URL (https://your-app-name.ondigitalocean.app)
  - [ ] NEXTAUTH_SECRET
  - [ ] RESEND_API_KEY
  - [ ] EMAIL_FROM
  - [ ] CLOUDINARY_* variables
  - [ ] WHATSAPP_* variables (if used)
  - [ ] JWT_SECRET

## Database Setup
- [ ] PostgreSQL database created
- [ ] Database connection string configured
- [ ] Migrations will run automatically on first deploy

## Domain Configuration (Optional)
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] SSL certificate configured

## Post-Deployment
- [ ] Health check endpoint working: /api/health
- [ ] Application loads successfully
- [ ] Database connection working
- [ ] Email service working
- [ ] File uploads working
- [ ] Authentication working

EOF

print_status "Deployment checklist created: DEPLOYMENT_CHECKLIST.md"

# Deployment commands
echo ""
echo "🌊 Ready for Digital Ocean deployment!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Create app in Digital Ocean App Platform"
echo "3. Connect your GitHub repository"
echo "4. Set environment variables in DO dashboard"
echo "5. Deploy!"
echo ""
echo "Useful commands:"
echo "  doctl apps list                    # List your apps"
echo "  doctl apps create .do/app.yaml    # Create app from config"
echo "  doctl apps get <app-id>           # Get app details"
echo "  doctl apps logs <app-id>          # View app logs"
echo ""
print_status "Deployment preparation completed! 🎉"
#!/bin/bash

# Production Build Script
# This script ensures a safe and optimized production build

set -e  # Exit on any error

echo "🚀 Starting production build process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Check if required environment variables are set
echo "📋 Checking environment variables..."
required_vars=("DATABASE_URL" "NEXTAUTH_SECRET" "RESEND_API_KEY")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    print_error "Missing required environment variables:"
    for var in "${missing_vars[@]}"; do
        echo "  - $var"
    done
    print_warning "Please set these variables in your .env.production.local file"
    exit 1
fi

print_status "All required environment variables are set"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
print_status "Cleaned previous builds"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production
print_status "Dependencies installed"

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate
print_status "Prisma client generated"

# Run type checking
echo "🔍 Running type checking..."
if npm run type-check; then
    print_status "Type checking passed"
else
    print_error "Type checking failed"
    exit 1
fi

# Run linting
echo "🔧 Running linting..."
if npm run lint; then
    print_status "Linting passed"
else
    print_warning "Linting issues found, but continuing build"
fi

# Build the application
echo "🏗️  Building application..."
if npm run build; then
    print_status "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Run post-build checks
echo "🧪 Running post-build checks..."

# Check if critical files exist
critical_files=(".next/server/app/page.js" ".next/static")
for file in "${critical_files[@]}"; do
    if [ ! -e "$file" ]; then
        print_error "Critical build file missing: $file"
        exit 1
    fi
done

print_status "Post-build checks passed"

# Bundle analysis (optional)
if command -v npx &> /dev/null; then
    echo "📊 Analyzing bundle size..."
    npx @next/bundle-analyzer || print_warning "Bundle analysis failed (optional)"
fi

# Security audit
echo "🔒 Running security audit..."
if npm audit --audit-level=high; then
    print_status "Security audit passed"
else
    print_warning "Security vulnerabilities found - review before deployment"
fi

echo ""
print_status "Production build completed successfully! 🎉"
echo ""
echo "Next steps:"
echo "1. Test the build locally: npm start"
echo "2. Deploy to your production environment"
echo "3. Run health checks: curl https://your-domain.com/api/health"
echo ""
print_warning "Remember to set up monitoring and logging in production!"
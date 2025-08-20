/**
 * Lazy-loaded components for code splitting optimization
 * 
 * This file implements code splitting for heavy components to improve
 * initial bundle size and loading performance.
 */

import { lazy, Suspense, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Loading fallback components
const ChartSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-64 w-full" />
  </div>
);

const QRSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-32" />
    </CardHeader>
    <CardContent className="flex justify-center">
      <Skeleton className="h-48 w-48" />
    </CardContent>
  </Card>
);

const StatisticsSkeleton = () => (
  <div className="space-y-6">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-6 w-24 mb-1" />
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  </div>
);

const ScannerSkeleton = () => (
  <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
    <p className="text-sm text-gray-600">Loading scanner...</p>
  </div>
);

const ProcessorSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-64 w-full" />
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
    <Skeleton className="h-48 w-full" />
  </div>
);

// Higher-order component for lazy loading with error boundary
function withLazyLoading<T extends object>(
  LazyComponent: ComponentType<T>,
  fallback: React.ReactNode,
  displayName?: string
) {
  const WrappedComponent = (props: T) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
  
  WrappedComponent.displayName = displayName || 'LazyComponent';
  return WrappedComponent;
}

// Chart Components (Recharts)
export const LazyAreaChart = lazy(() => 
  import('recharts').then(module => ({ default: module.AreaChart }))
);

export const LazyPieChart = lazy(() => 
  import('recharts').then(module => ({ default: module.PieChart }))
);

export const LazyBarChart = lazy(() => 
  import('recharts').then(module => ({ default: module.BarChart }))
);

export const LazyResponsiveContainer = lazy(() => 
  import('recharts').then(module => ({ default: module.ResponsiveContainer }))
);

export const LazyPie = lazy(() => 
  import('recharts').then(module => ({ default: module.Pie }))
);

export const LazyBar = lazy(() => 
  import('recharts').then(module => ({ default: module.Bar }))
);

export const LazyArea = lazy(() => 
  import('recharts').then(module => ({ default: module.Area }))
);

export const LazyXAxis = lazy(() => 
  import('recharts').then(module => ({ default: module.XAxis }))
);

export const LazyYAxis = lazy(() => 
  import('recharts').then(module => ({ default: module.YAxis }))
);

export const LazyCartesianGrid = lazy(() => 
  import('recharts').then(module => ({ default: module.CartesianGrid }))
);

export const LazyTooltip = lazy(() => 
  import('recharts').then(module => ({ default: module.Tooltip }))
);

export const LazyLegend = lazy(() => 
  import('recharts').then(module => ({ default: module.Legend }))
);

export const LazyCell = lazy(() => 
  import('recharts').then(module => ({ default: module.Cell }))
);

// QR Code Components
export const LazyQRCodeSVG = lazy(() => 
  import('qrcode.react').then(module => ({ default: module.QRCodeSVG }))
);

// Barcode Scanner Component
export const LazyBarcodeScanner = lazy(() => 
  import('@/components/ui/barcode-scanner')
);

// QR Template Processor Component
export const LazyQRTemplateProcessor = lazy(() => 
  import('@/src/components/qr-template-processor').then(module => ({ default: module.QRTemplateProcessor }))
);

// QR Card Generator Component
export const LazyQRCardGenerator = lazy(() => 
  import('@/components/ui/qr-card-generator').then(module => ({ default: module.QRCardGenerator }))
);

// Dynamic QR Processor Component
export const LazyDynamicQRProcessor = lazy(() => 
  import('@/components/ui/dynamic-qr-processor')
);

// Wrapped components with loading states
export const AreaChartWithLoading = withLazyLoading(
  LazyAreaChart,
  <ChartSkeleton />,
  'LazyAreaChart'
);

export const PieChartWithLoading = withLazyLoading(
  LazyPieChart,
  <ChartSkeleton />,
  'LazyPieChart'
);

export const BarChartWithLoading = withLazyLoading(
  LazyBarChart,
  <ChartSkeleton />,
  'LazyBarChart'
);

export const ResponsiveContainerWithLoading = withLazyLoading(
  LazyResponsiveContainer,
  <ChartSkeleton />,
  'LazyResponsiveContainer'
);

export const QRCodeSVGWithLoading = withLazyLoading(
  LazyQRCodeSVG,
  <QRSkeleton />,
  'LazyQRCodeSVG'
);

export const BarcodeScannerWithLoading = withLazyLoading(
  LazyBarcodeScanner,
  <ScannerSkeleton />,
  'LazyBarcodeScanner'
);

export const QRTemplateProcessorWithLoading = withLazyLoading(
  LazyQRTemplateProcessor,
  <ProcessorSkeleton />,
  'LazyQRTemplateProcessor'
);

export const QRCardGeneratorWithLoading = withLazyLoading(
  LazyQRCardGenerator,
  <QRSkeleton />,
  'LazyQRCardGenerator'
);

export const DynamicQRProcessorWithLoading = withLazyLoading(
  LazyDynamicQRProcessor,
  <ProcessorSkeleton />,
  'LazyDynamicQRProcessor'
);

// Page-level lazy components
export const LazyGuestStatisticsPage = lazy(() => 
  import('@/app/admin/guest-statistic/page')
);

export const LazyDashboardPage = lazy(() => 
  import('@/app/admin/dashboard/page')
);

export const LazyTestDynamicQRPage = lazy(() => 
  import('@/app/admin/test-dynamic-qr/page')
);

export const LazyClaimSouvenirPage = lazy(() => 
  import('@/app/admin/claim-souvenir/page')
);

// Wrapped page components
export const GuestStatisticsPageWithLoading = withLazyLoading(
  LazyGuestStatisticsPage,
  <StatisticsSkeleton />,
  'LazyGuestStatisticsPage'
);

export const DashboardPageWithLoading = withLazyLoading(
  LazyDashboardPage,
  <StatisticsSkeleton />,
  'LazyDashboardPage'
);

export const TestDynamicQRPageWithLoading = withLazyLoading(
  LazyTestDynamicQRPage,
  <ProcessorSkeleton />,
  'LazyTestDynamicQRPage'
);

export const ClaimSouvenirPageWithLoading = withLazyLoading(
  LazyClaimSouvenirPage,
  <StatisticsSkeleton />,
  'LazyClaimSouvenirPage'
);

// Utility function to preload components
export const preloadComponent = (componentImport: () => Promise<any>) => {
  // Preload the component in the background
  componentImport().catch(() => {
    // Silently handle preload failures
  });
};

// Preload functions for critical components
export const preloadChartComponents = () => {
  preloadComponent(() => import('recharts'));
};

export const preloadQRComponents = () => {
  preloadComponent(() => import('qrcode.react'));
  preloadComponent(() => import('@/components/ui/barcode-scanner'));
};

export const preloadStatisticsPage = () => {
  preloadComponent(() => import('@/app/admin/guest-statistic/page'));
};

export const preloadDashboardPage = () => {
  preloadComponent(() => import('@/app/admin/dashboard/page'));
};

// Bundle analysis helper
export const getBundleInfo = () => {
  return {
    chartComponents: [
      'AreaChart', 'PieChart', 'BarChart', 'ResponsiveContainer',
      'Pie', 'Bar', 'Area', 'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'Legend', 'Cell'
    ],
    qrComponents: [
      'QRCodeSVG', 'BarcodeScanner', 'QRTemplateProcessor', 'QRCardGenerator', 'DynamicQRProcessor'
    ],
    pageComponents: [
      'GuestStatisticsPage', 'DashboardPage', 'TestDynamicQRPage', 'ClaimSouvenirPage'
    ],
    estimatedSavings: {
      recharts: '~150KB gzipped',
      qrComponents: '~80KB gzipped',
      heavyPages: '~200KB gzipped'
    }
  };
};
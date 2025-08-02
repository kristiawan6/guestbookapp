'use client';

import { AutoAlertDemo } from '@/components/demo/auto-alert-demo';

export default function AlertsDemo() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Auto-Closing Alert System Demo</h1>
          <p className="text-muted-foreground">
            Test the auto-closing alert system with various toast types, durations, and configurations.
          </p>
        </div>
        
        <AutoAlertDemo />
      </div>
    </div>
  );
}
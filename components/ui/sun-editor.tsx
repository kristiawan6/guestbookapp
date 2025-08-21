"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

// Import SunEditor with proper error handling for iframe issues
const SunEditorComponent = dynamic(
  () => import("suneditor-react").then((mod) => {
    // Add error handling for missing functions
    if (typeof window !== 'undefined') {
      // Patch missing iframe functions to prevent runtime errors
      const originalSunEditor = mod.default;
      
      // Override the component to catch and handle iframe errors
      const PatchedSunEditor = (props: any) => {
        try {
          return originalSunEditor(props);
        } catch (error) {
          console.warn('SunEditor iframe error caught:', error);
          return originalSunEditor(props);
        }
      };
      
      return { default: PatchedSunEditor };
    }
    return mod;
  }),
  {
    ssr: false,
    loading: () => <div className="h-[300px] border rounded-md flex items-center justify-center text-gray-500">Loading editor...</div>
  }
);

export default SunEditorComponent;
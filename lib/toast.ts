import { toast } from "sonner";

/**
 * Toast utility service with auto-dismiss functionality
 * Provides different toast types with appropriate durations
 */
export const toastService = {
  /**
   * Success toast - auto-dismisses after 3 seconds
   */
  success: (message: string, options?: { duration?: number; description?: string }) => {
    return toast.success(message, {
      duration: options?.duration ?? 3000,
      description: options?.description,
    });
  },

  /**
   * Error toast - auto-dismisses after 6 seconds (longer for important errors)
   */
  error: (message: string, options?: { duration?: number; description?: string }) => {
    return toast.error(message, {
      duration: options?.duration ?? 6000,
      description: options?.description,
    });
  },

  /**
   * Warning toast - auto-dismisses after 5 seconds
   */
  warning: (message: string, options?: { duration?: number; description?: string }) => {
    return toast(message, {
      duration: options?.duration ?? 5000,
      description: options?.description,
      icon: "⚠️",
    });
  },

  /**
   * Info toast - auto-dismisses after 4 seconds
   */
  info: (message: string, options?: { duration?: number; description?: string }) => {
    return toast(message, {
      duration: options?.duration ?? 4000,
      description: options?.description,
      icon: "ℹ️",
    });
  },

  /**
   * Loading toast - persists until manually dismissed or updated
   */
  loading: (message: string) => {
    return toast.loading(message);
  },

  /**
   * Promise toast - handles async operations with loading, success, and error states
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: (data) => {
        const successMessage = typeof messages.success === "function" 
          ? messages.success(data) 
          : messages.success;
        return successMessage;
      },
      error: (error) => {
        const errorMessage = typeof messages.error === "function" 
          ? messages.error(error) 
          : messages.error;
        return errorMessage;
      },
    });
  },

  /**
   * Custom toast with manual duration control
   */
  custom: (
    message: string, 
    options?: { 
      duration?: number; 
      description?: string; 
      icon?: React.ReactNode;
      action?: {
        label: string;
        onClick: () => void;
      };
    }
  ) => {
    return toast(message, {
      duration: options?.duration ?? 4000,
      description: options?.description,
      icon: options?.icon,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  },

  /**
   * Persistent toast - stays until manually dismissed
   */
  persistent: (
    message: string, 
    options?: { 
      description?: string; 
      icon?: React.ReactNode;
      action?: {
        label: string;
        onClick: () => void;
      };
    }
  ) => {
    return toast(message, {
      duration: Infinity,
      description: options?.description,
      icon: options?.icon,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  },

  /**
   * Dismiss a specific toast by ID
   */
  dismiss: (toastId?: string | number) => {
    return toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    return toast.dismiss();
  },
};

/**
 * Legacy compatibility - direct toast function export
 */
export { toast };

/**
 * Type definitions for toast options
 */
export type ToastOptions = {
  duration?: number;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'custom' | 'persistent';
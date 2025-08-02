import { useCallback } from "react";
import { toastService, ToastOptions, ToastType } from "@/lib/toast";

/**
 * Hook for managing auto-closing alerts with different types and durations
 * Provides a comprehensive alert system with toast notifications
 */
export const useAutoAlert = () => {
  /**
   * Show an auto-dismissing alert
   */
  const showAlert = useCallback(
    (
      type: ToastType,
      message: string,
      options?: ToastOptions & {
        onDismiss?: () => void;
        onAutoClose?: () => void;
      }
    ) => {
      const toastOptions = {
        ...options,
        onDismiss: options?.onDismiss,
        onAutoClose: options?.onAutoClose,
      };

      switch (type) {
        case "success":
          return toastService.success(message, toastOptions);
        case "error":
          return toastService.error(message, toastOptions);
        case "warning":
          return toastService.warning(message, toastOptions);
        case "info":
          return toastService.info(message, toastOptions);
        case "loading":
          return toastService.loading(message);
        case "persistent":
          return toastService.persistent(message, toastOptions);
        case "custom":
        default:
          return toastService.custom(message, toastOptions);
      }
    },
    []
  );

  /**
   * Show a success alert (3 seconds auto-dismiss)
   */
  const showSuccess = useCallback(
    (message: string, options?: ToastOptions) => {
      return toastService.success(message, options);
    },
    []
  );

  /**
   * Show an error alert (6 seconds auto-dismiss)
   */
  const showError = useCallback(
    (message: string, options?: ToastOptions) => {
      return toastService.error(message, options);
    },
    []
  );

  /**
   * Show a warning alert (5 seconds auto-dismiss)
   */
  const showWarning = useCallback(
    (message: string, options?: ToastOptions) => {
      return toastService.warning(message, options);
    },
    []
  );

  /**
   * Show an info alert (4 seconds auto-dismiss)
   */
  const showInfo = useCallback(
    (message: string, options?: ToastOptions) => {
      return toastService.info(message, options);
    },
    []
  );

  /**
   * Show a loading alert (persists until dismissed)
   */
  const showLoading = useCallback(
    (message: string) => {
      return toastService.loading(message);
    },
    []
  );

  /**
   * Handle promise-based operations with loading, success, and error states
   */
  const handlePromise = useCallback(
    <T>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
      },
      options?: { duration?: number }
    ) => {
      return toastService.promise(promise, messages, options);
    },
    []
  );

  /**
   * Show a persistent alert (stays until manually dismissed)
   */
  const showPersistent = useCallback(
    (message: string, options?: ToastOptions) => {
      return toastService.persistent(message, options);
    },
    []
  );

  /**
   * Dismiss a specific alert by ID
   */
  const dismissAlert = useCallback(
    (toastId?: string | number) => {
      return toastService.dismiss(toastId);
    },
    []
  );

  /**
   * Dismiss all alerts
   */
  const dismissAll = useCallback(() => {
    return toastService.dismissAll();
  }, []);

  /**
   * Show form validation errors
   */
  const showValidationError = useCallback(
    (errors: string[] | string) => {
      const errorMessage = Array.isArray(errors) 
        ? errors.join(", ") 
        : errors;
      return showError("Validation Error", {
        description: errorMessage,
        duration: 6000,
      });
    },
    [showError]
  );

  /**
   * Show API operation feedback
   */
  const showApiSuccess = useCallback(
    (operation: string, entity?: string) => {
      const message = entity 
        ? `${entity} ${operation} successfully`
        : `${operation} completed successfully`;
      return showSuccess(message, { duration: 3000 });
    },
    [showSuccess]
  );

  /**
   * Show API error feedback
   */
  const showApiError = useCallback(
    (operation: string, error?: string) => {
      const message = `Failed to ${operation.toLowerCase()}`;
      return showError(message, {
        description: error || "Please try again later",
        duration: 6000,
      });
    },
    [showError]
  );

  return {
    // Core alert functions
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    showPersistent,
    
    // Utility functions
    handlePromise,
    dismissAlert,
    dismissAll,
    
    // Specialized functions
    showValidationError,
    showApiSuccess,
    showApiError,
  };
};

/**
 * Type definitions
 */
export type AlertType = ToastType;
export type AlertOptions = ToastOptions;
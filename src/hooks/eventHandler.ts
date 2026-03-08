/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

interface AsyncOperationOptions<T> {
  loadingMessage: string;
  successMessage?: string | ((result: T) => string);
  errorMessage?: string | ((error: any) => string);
  onSuccess?: (result: T) => void;
  onError?: (error: any) => void;
  navigateTo?: () => void;
  showSuccess?: boolean;
  showError?: boolean;
  rethrowError?: boolean;
}

export const withAsyncHandler = <TArgs extends any[], TReturn>(
  operation: (...args: TArgs) => Promise<TReturn>,
  options: AsyncOperationOptions<TReturn>
) => {
  return async (...args: TArgs): Promise<TReturn | undefined> => {
    const {
      loadingMessage,
      successMessage = "Operation completed successfully",
      errorMessage,
      onSuccess,
      onError,
      navigateTo,
      showSuccess = true,
      showError = true,
      rethrowError = false,
    } = options;

    const toastId = toast.loading(loadingMessage);

    try {
      const result = await operation(...args);
      console.log(result);

      // Check if the operation indicates success (handle both success flag and error scenarios)
      const isSuccess =
        (result as any)?.data?.success === true ||
        (result as any)?.success === true ||
        !(result as any)?.error;

      if (isSuccess) {
        // Handle success
        if (showSuccess) {
          const message =
            typeof successMessage === "function"
              ? successMessage(result)
              : successMessage;
          toast.success(message, { id: toastId });
        } else {
          toast.dismiss(toastId);
        }

        if (onSuccess) {
          onSuccess(result);
        }

        if (navigateTo) {
          navigateTo();
        }

        return result;
      } else {
        // Handle API-level errors (success: false responses)
        const errorData =
          (result as any)?.error || (result as any)?.data?.error || result;

        // Extract error message from various common patterns in the response
        const extractedErrorMessage =
          errorData?.message ||
          errorData?.data?.message ||
          (result as any)?.data?.message ||
          "Operation failed";

        let finalErrorMessage: string;

        if (errorMessage) {
          finalErrorMessage =
            typeof errorMessage === "function"
              ? errorMessage(errorData)
              : errorMessage;
        } else {
          finalErrorMessage = extractedErrorMessage;
        }

        if (showError) {
          toast.error(finalErrorMessage, { id: toastId });
        } else {
          toast.dismiss(toastId);
        }

        if (onError) {
          onError(errorData);
        }

        // Re-throw the error for further handling if needed
        if (rethrowError) {
          throw errorData;
        }
      }

      // return result;
    } catch (error: any) {
      console.log(error);
      // Extract error message from various common patterns
      const extractedErrorMessage =
        error?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Operation failed";

      // Use custom error message if provided, otherwise use extracted error message
      let finalErrorMessage: string;

      if (errorMessage) {
        finalErrorMessage =
          typeof errorMessage === "function"
            ? errorMessage(error)
            : errorMessage;
      } else {
        finalErrorMessage = extractedErrorMessage;
      }

      if (showError) {
        toast.error(finalErrorMessage, { id: toastId });
      } else {
        toast.dismiss(toastId);
      }

      if (onError) {
        onError(error);
      }

      // Re-throw the error for further handling if needed
      if (rethrowError) {
        throw error; // Only throw if explicitly requested
      }
    }
  };
};

// Usage examples:

// 1. Without custom error message - will use error from catch block
// const loginHandler = withAsyncHandler(
//   (data: LoginFormData) => login(data).unwrap(),
//   {
//     loadingMessage: "Logging in...",
//     successMessage: "Login successful!",
//     navigateTo: "/dashboard",
// No errorMessage provided - will use error from API/operation
//   }
// );

// 2. With custom error message
// const loginHandlerWithCustomError = withAsyncHandler(
//   (data: LoginFormData) => login(data).unwrap(),
//   {
//     loadingMessage: "Logging in...",
//     successMessage: "Login successful!",
//     errorMessage: "Login failed. Please check your credentials.",
//     navigateTo: "/dashboard",
//   }
// );

// 3. With dynamic error message based on error
// const loginHandlerWithDynamicError = withAsyncHandler(
//   (data: LoginFormData) => login(data).unwrap(),
//   {
//     loadingMessage: "Logging in...",
//     successMessage: "Login successful!",
//     errorMessage: (error) => {
//       if (error?.status === 401) {
//         return "Invalid credentials. Please try again.";
//       }
//       if (error?.status === 429) {
//         return "Too many attempts. Please wait before trying again.";
//       }
//       return error?.data?.message || "Login failed";
//     },
//     navigateTo: "/dashboard"
//   }
// );

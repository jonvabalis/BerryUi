import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
};

export const useToast = () => {
  return {
    success: (message: string, options?: ToastOptions) =>
      toast.success(message, { ...defaultOptions, ...options }),
    error: (message: string, options?: ToastOptions) =>
      toast.error(message, { ...defaultOptions, ...options }),
    warning: (message: string, options?: ToastOptions) =>
      toast.warning(message, { ...defaultOptions, ...options }),
    info: (message: string, options?: ToastOptions) =>
      toast.info(message, { ...defaultOptions, ...options }),
  };
};

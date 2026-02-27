import { showToast, ToastOptions } from "nextjs-toast-notify"

const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  transition: "bounceInDown",
}

const withDefaultOptions = (options?: ToastOptions): ToastOptions => ({
  ...DEFAULT_TOAST_OPTIONS,
  ...options,
})

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    showToast.success(message, withDefaultOptions(options)),
  error: (message: string, options?: ToastOptions) =>
    showToast.error(message, withDefaultOptions(options)),
  warning: (message: string, options?: ToastOptions) =>
    showToast.warning(message, withDefaultOptions(options)),
  info: (message: string, options?: ToastOptions) =>
    showToast.info(message, withDefaultOptions(options)),
}

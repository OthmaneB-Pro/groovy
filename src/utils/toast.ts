import { toast, ToastOptions, TypeOptions } from "react-toastify";

type ToastType = Exclude<TypeOptions, "default">;

const ToastOptionsByDefault: ToastOptions = {
  // icon: <FaUserSecret size={30} />,
  theme: "dark",
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const displayToastNotification = (
  toastMessage: string,
  toastType: ToastType,
  toastOptions = ToastOptionsByDefault
) => {
  toast[toastType](toastMessage, toastOptions);
};

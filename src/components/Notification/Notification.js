import { toast } from "sonner";

export const successToast = (message) => {
  toast.success(message);
};

export const errorToast = (message) => {
  toast.error(message, {
    style: {
      background: "#ff3333",
      color: "white",
    },
  });
};

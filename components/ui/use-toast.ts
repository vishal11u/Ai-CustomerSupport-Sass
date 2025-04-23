import { toast } from "sonner";

export function useToast() {
  return {
    toast: (options: { title: string; description: string; variant?: "destructive" }) => {
      if (options.variant === "destructive") {
        toast.error(options.description);
      } else {
        toast.success(options.description);
      }
    },
  };
} 
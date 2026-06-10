import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/authApi";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      toast.success("User Updated");
    },
  });
}

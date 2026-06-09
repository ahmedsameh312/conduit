import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/authApi";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../services/commentApi";

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, commentId }: { slug: string; commentId: number }) =>
      deleteComment(slug, commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.slug],
      });
    },
  });
}

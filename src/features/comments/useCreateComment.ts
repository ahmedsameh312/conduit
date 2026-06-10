import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../services/commentApi";
import toast from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, body }: { slug: string; body: string }) =>
      createComment(slug, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.slug],
      });
      toast.success("Comment posted");
    },
    onError: () => {
      toast.error("Failed to post comment");
    },
  });
}

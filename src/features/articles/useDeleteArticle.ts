import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticle } from "../../services/articleApi";
import toast from "react-hot-toast";

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => deleteArticle(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["article"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
      toast.error("Article Deleted");
    },
  });
}

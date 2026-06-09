import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../services/articleApi";

export function useDeleteArticle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => deleteArticle(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      navigate("/");
    },
  });
}

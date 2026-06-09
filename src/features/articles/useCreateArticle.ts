import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../services/articleApi";
import type { CreateArticleData } from "../../types/article";

export function useCreateArticle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateArticleData) => createArticle(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      navigate(`/article/${data.article.slug}`);
    },
  });
}

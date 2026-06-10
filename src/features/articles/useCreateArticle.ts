import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../services/articleApi";
import type { CreateArticleData } from "../../types/article";
import toast from "react-hot-toast";

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
      toast.success("Article created");
    },
    onError: () => {
      toast.error("Failed to create article");
    },
  });
}

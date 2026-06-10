import { useNavigate } from "react-router-dom";
import type { UpdateArticleParams } from "../../types/article";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticle } from "../../services/articleApi";
import toast from "react-hot-toast";

export function useUpdateArticle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, articleData }: UpdateArticleParams) =>
      updateArticle(slug, articleData),
    onSuccess: (data) => {
      queryClient.setQueryData(["article", data.article.slug], data);
      navigate(`/article/${data.article.slug}`);
      toast.success("Article Updated");
    },
  });
}

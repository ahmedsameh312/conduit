import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../../services/articleApi";

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticle(slug),
    enabled: !!slug,
  });
}

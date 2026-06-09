import { useQuery } from "@tanstack/react-query";
import { getArticlesByAuthor } from "../../services/articleApi";

export function useArticlesByAuthor(username: string) {
  return useQuery({
    queryKey: ["articles", "author", username],
    queryFn: () => getArticlesByAuthor(username),
    enabled: !!username,
  });
}

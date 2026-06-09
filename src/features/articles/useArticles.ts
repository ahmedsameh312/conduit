import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../services/articleApi";

export function useArticles(tag?: string, page = 1) {
  return useQuery({
    queryKey: ["articles", tag, page],
    queryFn: () => getArticles(tag, page),
    // placeholderData: (prev) => prev,
  });
}

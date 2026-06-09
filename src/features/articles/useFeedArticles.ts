import { useQuery } from "@tanstack/react-query";
import { getFeedArticles } from "../../services/articleApi";

export function useFeedArticles(enabled = true) {
  return useQuery({
    queryKey: ["feedArticles"],
    queryFn: getFeedArticles,
    enabled,
  });
}

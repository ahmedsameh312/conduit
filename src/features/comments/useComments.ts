import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/commentApi";

export function useComments(slug: string) {
  return useQuery({
    queryKey: ["comments", slug],
    queryFn: () => getComments(slug),
    enabled: !!slug,
  });
}

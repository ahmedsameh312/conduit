import { useQuery } from "@tanstack/react-query";
import { getTags } from "../../services/tagApi";

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
}

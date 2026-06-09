import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/authApi";
import { useAuth } from "../../hooks/useAuth";

export function useCurrentUser() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["currentUser", token],
    queryFn: getCurrentUser,
    enabled: !!token,
  });
}

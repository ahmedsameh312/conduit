import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { setToken } = useAuth();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      setToken(data.user.token);
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      navigate("/");
    },
  });
}

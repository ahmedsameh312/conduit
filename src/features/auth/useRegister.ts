import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function useRegister() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      setToken(data.user.token);
      navigate("/");
    },
  });
}

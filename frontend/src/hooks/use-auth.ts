import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type User } from "@/types/packets";
import { apiRequest } from "@/lib/query-client";

const AUTH_KEY = 'user';

async function fetchUser() {
  try {
    const response = await apiRequest("GET", "/auth/user", {
      useToken: true
    });
    if (response.status === 200) {
      return await response.json();
    }
  }
  catch {
    return null;
  }
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: [AUTH_KEY],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

  const logout = () => {
    localStorage.removeItem('jwtToken');
    queryClient.setQueryData([AUTH_KEY], null);
    window.location.href = "/";
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    error,
    logout,
  };
}
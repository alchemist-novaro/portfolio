import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/query-client";
import type { UserProfile } from "@/types/packets";

const PROFILE_KEY = 'profile';

async function fetchProfile() {
    try {
        const response = await apiRequest("GET", "/profile", {
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

export const useProfile = () => {
    const { data: profile, isLoading, error } = useQuery<UserProfile>({
        queryKey: [PROFILE_KEY],
        queryFn: fetchProfile,
        retry: false,
        staleTime: Infinity
    });

    return {
        profile,
        isLoading,
        error
    };
}
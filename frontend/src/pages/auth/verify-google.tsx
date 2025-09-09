import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/query-client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export function VerifyGoogle() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const searchString = window.location.search;

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const initCheckMutation = useMutation({
        mutationFn: async () => {
            const response = await apiRequest("GET", `/auth/google?${searchString.substring(1)}`);
            return await response.json();
        },
        onSuccess: (data) => {
            localStorage.setItem('jwtToken', data.token);
            window.location.href="/";
        },
        onError: (_) => {
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
            navigate("/");
        }
    });

    useEffect(() => {
        initCheckMutation.mutate();
    }, []);

    return (
        <>
        </>
    );
}

export default VerifyGoogle;
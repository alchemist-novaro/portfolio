import { useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/query-client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function Verify() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [expired, setExpired] = useState(false);

    const formData = location.state;

    const token = searchParams.get("token");
    const target = searchParams.get("target");

    const processTokenMutation = useMutation({
        mutationFn: async () => {
            localStorage.setItem("jwtToken", token!);
            const response = await apiRequest("POST", "/auth/verify", {
                useToken: true,
            });
            return response.json();
        },
        onSuccess: (data) => {
            switch (target) {
                case "register":
                    localStorage.setItem("jwtToken", data.token);
                    navigate("/profile");
                    break;
                case "repwd":
                    navigate("/repwd");
                    break;
            }
        },
        onError: () => {
            setExpired(true);
        },
    });

    useEffect(() => {
        if (!target) navigate("/404");
        if (target === "register" && !token && (!formData?.email || !formData?.first_name || !formData?.last_name || !formData?.password)) navigate("/register");
        if (target === "repwd" && !token && !formData?.email) navigate("/repwd");
        if (token) processTokenMutation.mutate();
    }, [token, target]);

    const getContent = () => {
        switch (target) {
            case "register":
                return {
                    title: "Check your email",
                    description: "We've sent a verification link to your email address",
                    instruction:
                        "Click the link in the email to complete your registration and start using your account.",
                    successMessage: "Registration verification email sent",
                };
            case "repwd":
                return {
                    title: "Reset your password",
                    description: "We've sent a password reset link to your email address",
                    instruction:
                        "Click the link in the email to reset your password and regain access to your account.",
                    successMessage: "Password reset email sent",
                };
        }
    };

    const content = getContent();

    const handleBack = () => {
        switch (target) {
            case "register":
                navigate("/register");
                break;
            case "repwd":
                navigate("/repwd");
                break;
        }
    };

    const resendMutation = useMutation({
        mutationFn: async () => {
            switch (target) {
                case "register":
                    await apiRequest("POST", "/auth/register", {
                        data: {
                            email: formData?.email,
                            first_name: formData?.first_name,
                            last_name: formData?.last_name,
                            password: formData?.password,
                        },
                    });
                    break;
                case "repwd":
                    await apiRequest("POST", "/auth/repwd/email", {
                        data: { email: formData?.email },
                    });
                    break;
            }
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: content?.successMessage,
                variant: "default",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to resend the email. Please try again.",
                variant: "destructive",
            });
        },
    });

    const handleResendEmail = async () => {
        resendMutation.mutate();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background animate-fade-in">
            <div className="w-full max-w-md space-y-6">
                {/* Back button */}
                <div className="flex justify-start">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>

                {/* Main card */}
                <Card className="bg-card text-card-foreground border border-border shadow-lg rounded-lg animate-slide-up">
                    <CardHeader className="text-center space-y-4 pb-4">
                        {/* Icon */}
                        <div
                            className="mx-auto w-16 h-16 rounded-full flex items-center justify-center shadow-md animate-scale-in"
                            style={{
                                backgroundColor: expired
                                    ? "hsl(var(--destructive) / 0.1)"
                                    : "hsl(var(--primary) / 0.9)",
                            }}
                        >
                            {expired ? (
                                <AlertCircle className="h-8 w-8 text-destructive" />
                            ) : (
                                <Mail className="h-8 w-8 text-primary-foreground" />
                            )}
                        </div>

                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold text-foreground">
                                {expired ? "Link expired" : content?.title}
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground">
                                {expired
                                    ? "Your verification link has expired. Please resend the email."
                                    : content?.description}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Email display */}
                        {!expired && (
                            <div className="text-center p-4 bg-muted rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground mb-1">
                                    Email sent to:
                                </p>
                                <p className="font-medium text-foreground">{formData?.email}</p>
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="text-center space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {expired
                                    ? "Click below to resend a new verification email."
                                    : content?.instruction}
                            </p>

                            {!expired && (
                                <p className="text-xs text-muted-foreground">
                                    Don't see the email? Check your spam folder or try resending.
                                </p>
                            )}
                        </div>

                        {/* Resend button */}
                        <div className="space-y-4">
                            <Button
                                onClick={handleResendEmail}
                                disabled={resendMutation.isPending}
                                variant={expired ? "destructive" : "outline"}
                                size="lg"
                                className="w-full gap-2 transition-all hover:shadow-md"
                            >
                                {resendMutation.isPending ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : expired ? (
                                    <AlertCircle className="h-4 w-4" />
                                ) : (
                                    <Mail className="h-4 w-4" />
                                )}
                                {resendMutation.isPending
                                    ? "Sending..."
                                    : expired
                                        ? "Resend verification email"
                                        : "Resend email"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaApple } from "react-icons/fa";

import { apiRequest } from "@/lib/query-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from "@/types/schemas";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import type { SocialType, LoginFormValues } from "@/types/constants";

export function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const res = await apiRequest("POST", "/auth/login", {
        data: {
          email: data.email,
          password: data.password,
        },
      });
      return await res.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('jwtToken', data.token);
      window.location.href = "/";
    },
    onError: (err) => {
      const error = err.message.split(':')[0];
      if (error === "401") {
        toast({
          title: "Error",
          description: "Password is incorrect. Please try again",
          variant: "destructive"
        });
      }
      else if (error === "402") {
        toast({
          title: "Error",
          description: "Your email is blocked. Please contact me.",
          variant: "destructive"
        });
      }
      else if (error === "403") {
        toast({
          title: "Error",
          description: "Your email is not verified. Please verify email.",
          variant: "destructive"
        });
      }
      else if (error === "404") {
        toast({
          title: "Error",
          description: "Email not found. Please register.",
          variant: "destructive"
        });
        navigate("/register");
      }
      else {
        toast({
          title: "Error",
          description: "Failed to login. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const handleLogin = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const handleSocialLogin = (type: SocialType) => {
    if (type === "google") {
      const domain = window.location.host.split(":")[0];
      window.location.href = `https://api.${domain}/auth/google/redirect`;
    }
    console.log("Social login:", type);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Log in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("google")}
                className="w-full"
                data-testid="google-login-button"
              >
                <FaGoogle className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                disabled={true}
                onClick={() => handleSocialLogin("apple")}
                className="w-full"
                data-testid="apple-login-button"
              >
                <FaApple className="w-4 h-4 mr-2" />
                Apple
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-black px-2 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Login Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <Button
                    variant="link"
                    asChild
                    className="px-0 text-bright-primary"
                    data-testid="forgot-password-link"
                  >
                    <Link to="/re-pwd">Forgot password?</Link>
                  </Button>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Logging in..." : "Log In"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 w-full">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-bright-primary hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;

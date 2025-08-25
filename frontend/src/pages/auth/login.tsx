import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaApple } from "react-icons/fa";

export function Login() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      navigate("/");
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`${provider} login clicked`);
    
    // For now, redirect to the existing Replit auth
    if (provider === "replit") {
      window.location.href = "/api/login";
    }
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
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
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
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="email-input"
                  className="bg-white dark:bg-black border-gray-300 dark:border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    data-testid="password-input"
                    className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="toggle-password-visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="link"
                  asChild
                  className="px-0 text-bright-primary"
                  data-testid="forgot-password-link"
                >
                  <Link href="/re-pwd">Forgot password?</Link>
                </Button>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  data-testid="login-submit-button"
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 w-full">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-bright-primary hover:underline"
                data-testid="register-link"
              >
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
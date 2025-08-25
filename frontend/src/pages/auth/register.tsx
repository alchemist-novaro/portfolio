import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaApple } from "react-icons/fa";

export function Register() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      navigate("/profile");
    } catch (error) {
      alert('Register failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    // TODO: Implement social register
    console.log(`${provider} register clicked`);
    
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
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Join us and start your AI journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Social Register Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialRegister("google")}
                className="w-full"
                data-testid="google-register-button"
              >
                <FaGoogle className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialRegister("github")}
                className="w-full"
                data-testid="github-register-button"
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

            {/* Email Register Form */}
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    data-testid="first-name-input"
                    className="bg-white dark:bg-black border-gray-300 dark:border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    data-testid="last-name-input"
                    className="bg-white dark:bg-black border-gray-300 dark:border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    data-testid="confirm-password-input"
                    className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    data-testid="toggle-confirm-password-visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  data-testid="terms-checkbox"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-600 dark:text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms-of-service"
                    className="text-bright-primary hover:underline"
                    data-testid="terms-link"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-bright-primary hover:underline"
                    data-testid="privacy-link"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  data-testid="register-submit-button"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 w-full">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-bright-primary hover:underline"
                data-testid="login-link"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default Register;
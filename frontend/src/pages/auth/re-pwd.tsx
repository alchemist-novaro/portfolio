import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";

export function RePwd() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      setIsEmailSent(true);
    } catch (error) {
      alert('Failed to send reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                We've sent password reset instructions to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                <p>Didn't receive the email? Check your spam folder or</p>
                <Button
                  variant="link"
                  onClick={() => setIsEmailSent(false)}
                  className="px-0 h-auto text-bright-primary"
                  data-testid="resend-email-button"
                >
                  try again
                </Button>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                variant="outline"
                asChild
                className="w-full"
                data-testid="back-to-login-button"
              >
                <Link href="/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

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
              Reset Password
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="email-input"
                  className="bg-white dark:bg-black border-gray-300 dark:border-gray-700"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  data-testid="reset-password-submit-button"
                >
                  {isLoading ? "Sending instructions..." : "Send Reset Instructions"}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Button
              variant="outline"
              asChild
              className="w-full"
              data-testid="back-to-login-link"
            >
              <Link href="/login">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </Button>
            
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
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

export default RePwd;
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4 bg-white dark:bg-gray-800 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              404 Page Not Found
            </h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Can't find target page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotFound;
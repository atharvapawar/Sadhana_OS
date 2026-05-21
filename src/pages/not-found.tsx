import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md safe-card min-w-0">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 min-w-0">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 safe-title">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 safe-copy">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

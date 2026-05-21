import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl sm:text-8xl font-extrabold text-green-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6">
              <Home size={18} className="mr-2" />
              Back Home
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="rounded-xl px-6"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
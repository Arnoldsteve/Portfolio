import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServerCrash, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="relative p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
          <ServerCrash className="w-16 h-16 text-cyan-500" />
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-slate-700 mb-4">
        System Malfunction: Page Not Found
      </h2>
      
      <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
        The route you are trying to access does not exist in the architecture. 
        It may have been moved, deleted, or never deployed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800 gap-2">
            <Home className="w-4 h-4" /> Return Home
          </Button>
        </Link>
        <Link href="/#contact">
          <Button size="lg" variant="outline" className="border-slate-300 gap-2">
            <ArrowLeft className="w-4 h-4" /> Report Issue
          </Button>
        </Link>
      </div>
    </div>
  );
}
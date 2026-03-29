import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="p-4 bg-slate-900 text-white flex justify-between items-center shadow-md shrink-0">
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse" />
      </div>
      <div>
        <h3 className="text-[13px] font-bold leading-none">Steve.Architect (AI)</h3>
        <p className="text-[10px] text-slate-400 mt-1">Technical Twin • Online</p>
      </div>
    </div>
    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800" onClick={onClose}>
      <X className="h-4 w-4" />
    </Button>
  </div>
);
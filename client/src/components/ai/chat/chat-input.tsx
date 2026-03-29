import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export const ChatInput = ({ value, onChange, onSend, disabled }: ChatInputProps) => (
  <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-2 items-center shrink-0">
    <Input
      placeholder="Ask technical question..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSend()}
      className="bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-1 focus-visible:ring-cyan-500 text-sm h-10"
    />
    <Button 
      size="icon" 
      onClick={onSend} 
      disabled={disabled}
      className="rounded-full bg-slate-900 hover:bg-slate-800 text-white h-10 w-10 shrink-0 shadow-lg"
    >
      <Send className="h-4 w-4" />
    </Button>
  </div>
);
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showText?: boolean;
}

export function CopyButton({
  text,
  variant = "ghost",
  size = "sm",
  className = "",
  showText = true,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={`gap-2 ${copied ? "text-green-600 dark:text-green-500" : ""} ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {showText && "Copied!"}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {showText && "Copy"}
        </>
      )}
    </Button>
  );
}

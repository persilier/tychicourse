"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  title = "Example Code",
}: CodeBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">{title}</h4>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={copyToClipboard}
          >
            <Icon
              icon={isCopied ? "heroicons:check" : "heroicons:clipboard"}
              className="h-4 w-4"
            />
            {isCopied ? "Copied!" : "Copy"}
          </Button>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Icon
                icon={
                  isOpen ? "heroicons:chevron-up" : "heroicons:chevron-down"
                }
                className="h-4 w-4"
              />
              {isOpen ? "Hide code" : "View code"}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="rounded-md border">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </CollapsibleContent>
    </Collapsible>
  );
}

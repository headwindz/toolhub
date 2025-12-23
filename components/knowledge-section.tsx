"use client";

import { CommonCollapsible } from "@/components/common-collapsible";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface KnowledgeSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function KnowledgeSection({
  title,
  description,
  children,
}: KnowledgeSectionProps) {
  return (
    <Card className="border-2 overflow-hidden">
      <CommonCollapsible title={title} description={description}>
        <div className="space-y-4 text-sm leading-relaxed p-6">{children}</div>
      </CommonCollapsible>
    </Card>
  );
}

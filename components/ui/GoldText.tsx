import { cn } from "@/lib/cn";

export function GoldText({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return <Tag className={cn("gold-text", className)}>{children}</Tag>;
}

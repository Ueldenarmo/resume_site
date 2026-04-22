import { cn } from "@/lib/cn";

type DividerBarProps = {
  className?: string;
  variant?: "purple" | "green" | "violet" | "gradient";
};

const variantClassMap: Record<NonNullable<DividerBarProps["variant"]>, string> = {
  purple: "bg-accent-purple",
  green: "bg-accent-green",
  violet: "bg-accent-violet",
  gradient: "bg-gradient-to-r from-[#2A7A68] to-[#6A4DC5]"
};

export function DividerBar({ className, variant = "purple" }: DividerBarProps) {
  return (
    <div
      className={cn(
        "h-2 w-full rounded-pill",
        variantClassMap[variant],
        className
      )}
      aria-hidden
    />
  );
}

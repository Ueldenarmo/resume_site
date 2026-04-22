import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

type SectionContainerProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export function SectionContainer({ id, className, children }: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full rounded-[22px] border border-border-base/90 p-5 md:p-11",
        className
      )}
    >
      {children}
    </section>
  );
}

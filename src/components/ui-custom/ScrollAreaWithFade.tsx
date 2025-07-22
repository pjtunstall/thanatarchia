import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollAreaWithFadeProps {
  children: ReactNode;
  height: string;
  className?: string;
  fadeHeight?: string;
  contentPadding?: string;
  scrollbarPadding?: string;
}

export function ScrollAreaWithFade({
  children,
  height,
  className = "",
  fadeHeight = "h-6",
  contentPadding = "py-6",
  scrollbarPadding = "pr-4",
}: ScrollAreaWithFadeProps) {
  return (
    <div
      className={cn(
        `relative ${height} [background-color:hsl(var(--card))]`,
        className
      )}
    >
      <ScrollArea className={`h-full ${scrollbarPadding}`}>
        <div className={contentPadding}>{children}</div>
      </ScrollArea>

      {/* Top fade */}
      <div
        className={`pointer-events-none absolute top-0 left-0 right-0 ${fadeHeight} z-10`}
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--card)), transparent)",
        }}
      />

      {/* Bottom fade */}
      <div
        className={`pointer-events-none absolute bottom-0 left-0 right-0 ${fadeHeight} z-10`}
        style={{
          background: "linear-gradient(to top, hsl(var(--card)), transparent)",
        }}
      />
    </div>
  );
}

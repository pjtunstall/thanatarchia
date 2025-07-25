import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollAreaWithFadeProps = {
  children: ReactNode;
  height: string;
  className?: string;
};

export function ScrollAreaWithFade({
  children,
  height,
  className = "",
}: ScrollAreaWithFadeProps) {
  const fadeOffset = "16px";
  const fadeHeight = "h-6";
  const contentPadding = "py-6";

  return (
    <div className={cn(`relative ${height}`, className)}>
      <div
        className="px-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
        style={{
          height: `calc(100% - ${fadeOffset})`,
          overscrollBehavior: "auto", // Enable scroll chaining
        }}
      >
        <div className={contentPadding}>{children}</div>
      </div>

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
        className={`pointer-events-none absolute left-0 right-0 ${fadeHeight} z-10`}
        style={{
          bottom: fadeOffset,
          background: "linear-gradient(to top, hsl(var(--card)), transparent)",
        }}
      />
    </div>
  );
}

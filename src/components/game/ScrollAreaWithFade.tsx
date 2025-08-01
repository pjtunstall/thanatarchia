import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollAreaWithFadeProps = {
  children: ReactNode;
  height?: string;
  className?: string;
  fadeOffset?: string;
  startScrolledToBottom?: boolean;
};

export function ScrollAreaWithFade({
  children,
  height,
  className = "",
  fadeOffset = "16px",
  startScrolledToBottom = false,
}: ScrollAreaWithFadeProps) {
  const fadeHeight = "h-6";
  const contentPadding = "py-6";
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (startScrolledToBottom) {
      el.scrollTop = el.scrollHeight;
    } else {
      el.scrollTop = 0; // Scroll to top by default.
    }
  }, [startScrolledToBottom, children]);

  return (
    <div className={cn(`relative ${height}`, className)}>
      <div
        ref={scrollRef}
        className="px-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
        style={{
          height: `calc(100% - ${fadeOffset})`,
          overscrollBehavior: "auto",
        }}
      >
        <div className={contentPadding}>{children}</div>
      </div>

      <div
        className={`pointer-events-none absolute top-0 left-0 right-0 ${fadeHeight} z-10`}
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--card)), transparent)",
        }}
      />

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

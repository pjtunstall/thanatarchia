import { ReactNode, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollAreaWithFadeProps = {
  children: ReactNode;
  height?: string;
  className?: string;
  fadeOffset?: string;
  scrollToTop?: boolean;
  scrollToBottom?: boolean;
  isHelpTopic?: boolean;
  scrollKey?: string | number;
};

export function ScrollAreaWithFade({
  children,
  height,
  className = "",
  fadeOffset = "16px",
  scrollToTop = false,
  scrollToBottom = false,
  isHelpTopic = false,
  scrollKey = 0,
}: ScrollAreaWithFadeProps) {
  const fadeHeight = "h-6";
  const contentPadding = "py-6";
  const scrollRef = useRef<HTMLDivElement>(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (scrollToBottom) {
      el.scrollTop = el.scrollHeight;
    } else if (scrollToTop) {
      el.scrollTop = 0;

      if (isHelpTopic) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            const target = document.querySelector(".actions-panel");
            if (target && isMobile) {
              const top =
                target.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({ top, behavior: "smooth" });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          });
        }, 300);
      }
    }
  });

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

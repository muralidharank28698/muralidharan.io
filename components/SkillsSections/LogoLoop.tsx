import {
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  ReactNode,
  CSSProperties,
} from "react";
import { motion } from "framer-motion";

/* ================= RESPONSIVE HOOK ================= */

// Breakpoints mirror Tailwind defaults: sm=640, md=768, lg=1024
type ScreenSize = "xs" | "sm" | "md" | "lg";

function getScreenSize(w: number): ScreenSize {
  if (w < 640) return "xs";
  if (w < 768) return "sm";
  if (w < 1024) return "md";
  return "lg";
}

function useScreenSize(): ScreenSize {
  const [size, setSize] = useState<ScreenSize>(() =>
    typeof window !== "undefined" ? getScreenSize(window.innerWidth) : "lg"
  );
  useEffect(() => {
    const handler = () => setSize(getScreenSize(window.innerWidth));
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
}

// Responsive token maps — one source of truth for all sizing.
// xs: <640px (mobile), sm: 640–767px (large mobile),
// md: 768–1023px (tablet), lg: 1024px+ (desktop)
const CHIP = {
  iconSize: { xs: 16, sm: 18, md: 20, lg: 24 }, // icon img max-width/height (px)
  fontSize: { xs: 11, sm: 12, md: 13, lg: 15 }, // label text (px)
  px:       { xs: 12, sm: 14, md: 16, lg: 20 }, // horizontal chip padding (px)
  py:       { xs: 5,  sm: 6,  md: 6,  lg: 8  }, // vertical chip padding (px)
  innerGap: { xs: 6,  sm: 6,  md: 8,  lg: 10 }, // gap between icon and label (px)
} as const;

const ROW = {
  gap:   { xs: 7,  sm: 8,  md: 10, lg: 12 }, // gap between chips (px)
  fadeW: { xs: 28, sm: 36, md: 48, lg: 64 }, // edge fade mask width (px)
} as const;

/* ================= TYPES ================= */

export interface LogoNodeItem {
  node: ReactNode;
  title?: string;
  href?: string;
}

export interface LogoImageItem {
  src: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  href?: string;
}

export type LogoItem = LogoNodeItem | LogoImageItem;

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  width?: number | string;
  gap?: number;
  pauseOnHover?: boolean;
  className?: string;
  style?: CSSProperties;
  label?: string;
  rows?: 1 | 2;
}

/* ================= SINGLE CHIP ================= */

interface LogoChipProps {
  item: LogoItem;
  screen: ScreenSize;
}

const LogoChip = memo(({ item, screen }: LogoChipProps) => {
  const [hovered, setHovered] = useState(false);
  const isNode = "node" in item;

  const iconSize = CHIP.iconSize[screen];
  const fontSize = CHIP.fontSize[screen];
  const px       = CHIP.px[screen];
  const py       = CHIP.py[screen];
  const innerGap = CHIP.innerGap[screen];

  const imgOrNode = isNode ? (
    (item as LogoNodeItem).node
  ) : (
    <img
      src={(item as LogoImageItem).src}
      alt={(item as LogoImageItem).alt ?? ""}
      draggable={false}
      className="block object-contain select-none"
      style={{ width: iconSize, height: iconSize, maxWidth: iconSize, maxHeight: iconSize }}
    />
  );

  return (
    <li
      className="list-none flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={[
          "flex items-center rounded-full cursor-default",
          "transition-colors transition-shadow duration-200",
          // Light mode surface
          "bg-black/[0.04] border border-black/[0.08]",
          // Dark mode surface — no harsh white glow
          "dark:bg-white/[0.06] dark:border-white/[0.10]",
          hovered
            ? [
                "!bg-sky-500/10 !border-sky-400/30",
                "shadow-[0_3px_10px_rgba(14,165,233,0.14)]",
                "dark:!bg-sky-400/10 dark:!border-sky-400/20",
                "dark:shadow-[0_3px_10px_rgba(56,189,248,0.09)]",
              ].join(" ")
            : "shadow-none",
        ].join(" ")}
        // Inline style for padding/gap so responsive values apply without
        // relying on Tailwind JIT to generate arbitrary-value classes at runtime
        style={{
          padding: `${py}px ${px}px`,
          gap: innerGap,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center transition-opacity duration-200 flex-shrink-0"
          style={{ opacity: hovered ? 1 : 0.65 }}
        >
          {imgOrNode}
        </div>

        {/* Label */}
        {item.title && (
          <span
            className={[
              "font-medium whitespace-nowrap transition-colors duration-200 tracking-tight",
              hovered
                ? "text-sky-500 dark:text-sky-400"
                : "text-slate-500 dark:text-slate-400",
            ].join(" ")}
            style={{ fontSize }}
          >
            {item.title}
          </span>
        )}
      </div>
    </li>
  );
});
LogoChip.displayName = "LogoChip";

/* ================= MARQUEE ROW ================= */

const MarqueeRow = memo(
  ({
    logos,
    speed,
    direction,
    gap,
    pauseOnHover,
    screen,
  }: {
    logos: LogoItem[];
    speed: number;
    direction: "left" | "right";
    gap: number;
    pauseOnHover: boolean;
    screen: ScreenSize;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef     = useRef<HTMLDivElement>(null);
    const seqRef       = useRef<HTMLUListElement>(null);
    const posRef       = useRef(0);
    const rafRef       = useRef<number | null>(null);
    const easeRef      = useRef(1);
    const [seqWidth, setSeqWidth]   = useState(0);
    const [copyCount, setCopyCount] = useState(4);
    const [isHovered, setIsHovered] = useState(false);

    // Remeasure on gap or screen size change — chips may have resized
    useEffect(() => {
      if (!seqRef.current || !containerRef.current) return;
      // The <ul> has paddingRight: gap, so offsetWidth already includes one trailing
      // gap. Stride = offsetWidth exactly — no manual +gap correction needed.
      const sw = seqRef.current.offsetWidth;
      const cw = containerRef.current.offsetWidth;
      setSeqWidth(sw);
      setCopyCount(Math.max(4, Math.ceil(cw / sw) + 3));
    }, [logos, gap, screen]);

    useEffect(() => {
      if (!trackRef.current || seqWidth === 0) return;
      const vel = direction === "left" ? -speed : speed;
      if (direction === "right" && posRef.current === 0) {
        posRef.current = -seqWidth;
      }
      const loop = () => {
        if (!trackRef.current) return;
        const target = pauseOnHover && isHovered ? 0 : 1;
        easeRef.current += (target - easeRef.current) * 0.06;
        posRef.current += vel * easeRef.current * 0.016;
        if (direction === "left") {
          if (posRef.current <= -seqWidth) posRef.current += seqWidth;
        } else {
          if (posRef.current >= 0) posRef.current -= seqWidth;
        }
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
      return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [seqWidth, speed, direction, pauseOnHover, isHovered]);

    const lists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, ci) => (
          <ul
            key={ci}
            ref={ci === 0 ? seqRef : undefined}
            className="flex items-center flex-shrink-0"
            // paddingRight: gap makes trailing space equal to inter-chip gap,
            // so the seam between copies is visually identical to gaps within a copy.
            style={{ gap, margin: 0, listStyle: "none", padding: 0, paddingRight: gap }}
          >
            {logos.map((item, idx) => (
              <LogoChip key={`${ci}-${idx}`} item={item} screen={screen} />
            ))}
          </ul>
        )),
      [copyCount, logos, gap, screen]
    );

    return (
      <div
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={trackRef} className="flex" style={{ willChange: "transform" }}>
          {lists}
        </div>
      </div>
    );
  }
);
MarqueeRow.displayName = "MarqueeRow";

/* ================= MAIN ================= */

const LogoLoopComponent = ({
  logos,
  speed = 28,
  direction = "left",
  width = "100%",
  gap,             // caller can override; if omitted, responsive default is used
  pauseOnHover = true,
  className,
  style,
  label,
  rows = 1,
}: LogoLoopProps) => {
  const screen = useScreenSize();

  // Responsive defaults — fall back to caller value if supplied
  const resolvedGap   = gap ?? ROW.gap[screen];
  // Slightly slower on small screens so labels stay readable
  const resolvedSpeed =
    screen === "xs" ? speed * 0.75 :
    screen === "sm" ? speed * 0.85 :
    speed;

  const mid  = Math.ceil(logos.length / 2);
  const row1 = rows === 2 ? logos.slice(0, mid) : logos;
  const row2 = rows === 2 ? logos.slice(mid) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className ?? ""}`}
      style={{ width, ...style }}
    >
      {/* Optional label */}
      {label && (
        <p className="text-center text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-4">
          {label}
        </p>
      )}

      {/* Scroll area — fades are handled by the parent LoopRow in Skills */}
      <div className="relative">
        <div className={rows === 2 ? "space-y-2 py-1" : "py-2"}>
          <MarqueeRow
            logos={row1}
            speed={resolvedSpeed}
            direction={direction}
            gap={resolvedGap}
            pauseOnHover={pauseOnHover}
            screen={screen}
          />
          {rows === 2 && row2.length > 0 && (
            <MarqueeRow
              logos={row2}
              speed={resolvedSpeed * 0.8}
              direction={direction === "left" ? "right" : "left"}
              gap={resolvedGap}
              pauseOnHover={pauseOnHover}
              screen={screen}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const LogoLoop = memo(LogoLoopComponent);
LogoLoop.displayName = "LogoLoop";
export default LogoLoop;

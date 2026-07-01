import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ElementType } from "react";

export interface HoverItem {
  title: string;
  description: string;
  link?: string;
  icon?: ElementType;
  metric?: string;
  metricLabel?: string;
  color?: string;
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: HoverItem[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link || "#"}
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-primary/10 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              {item.icon && (
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors border border-primary/10">
                  <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                </div>
              )}
              {item.metric && (
                <div className="text-end ms-auto">
                  <div className={`text-base sm:text-lg font-bold font-mono ${item.color || 'text-primary'}`}>{item.metric}</div>
                  {item.metricLabel && (
                    <div className="text-[7px] sm:text-[8px] text-muted-foreground/40 tracking-widest">{item.metricLabel}</div>
                  )}
                </div>
              )}
            </div>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-card border border-border/40 dark:border-border/10 hover:border-primary/20 relative z-20 transition-colors",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-foreground/90 font-bold tracking-wide mt-4 text-sm sm:text-base", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-3 text-muted-foreground/70 tracking-wide leading-relaxed text-xs sm:text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

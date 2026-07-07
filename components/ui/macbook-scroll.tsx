"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MotionValue, motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconCommand } from "@tabler/icons-react";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { IconCaretDownFilled } from "@tabler/icons-react";


export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.1, isMobile ? 1 : 1.3],
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.2],
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.15, 0.35], [-24, -24, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.25], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div
      ref={ref}
      className="flex min-h-[120vh] flex-col items-center justify-start py-0 md:py-40 [perspective:800px]"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="mb-8 md:mb-16 text-center text-xl md:text-3xl font-bold text-foreground px-4"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>
      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      {/* Base area */}
      <div className="relative -z-10 h-[11rem] w-[28rem] overflow-hidden rounded-b-2xl bg-[#1a1a1e] dark:bg-[#1a1a1e] border-x border-b border-border/20">
        {/* above keyboard bar */}
        <div className="relative h-6 w-full">
          <div className="absolute inset-x-0 mx-auto h-3 w-[75%] bg-[#0a0a0c]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
          <div className="mx-auto h-full w-[80%]">
            <Keypad />
          </div>
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-16 rounded-tl-2xl rounded-tr-2xl bg-gradient-to-t from-[#1a1a1e] to-[#0a0a0c]" />
        {showGradient && (
          <div className="absolute inset-x-0 bottom-0 z-50 h-32 w-full bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-[10rem] w-[28rem] rounded-t-2xl bg-[#0a0a0c] p-[3px]"
      >
        {/* Screen bezel content — the "closed" back */}
        <div
          style={{
            boxShadow: "0px 2px 0px 2px #0a0a0c inset",
          }}
          className="absolute inset-0 flex items-center justify-center rounded-[13px] bg-[#0a0a0c]"
        >
          <span className="text-white/10 text-[8px] font-mono tracking-widest uppercase">
            Arvand Terminal
          </span>
        </div>
      </div>

      {/* The opening screen */}
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-[14rem] w-[28rem] rounded-t-2xl bg-[#0a0a0c] p-[3px] will-change-transform"
      >
        <div className="absolute inset-[3px] rounded-[13px] bg-[#111113] overflow-hidden">
          {/* Screen notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-24 h-[3px] bg-[#0a0a0c] rounded-b-md" />
          <img
            src={src as string}
            alt="Arvand Smart Control Dashboard"
            className="absolute inset-0 h-full w-full rounded-[13px] object-cover object-left-top"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-1 h-24 w-[38%] rounded-lg"
      style={{
        boxShadow: "0px 0px 1px 1px #ffffff08 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#0a0a0c] p-[1px] [will-change:transform]">
      {/* First Row */}
      <div className="mb-[1px] flex w-full shrink-0 gap-[1px]">
        <KBtn
          className="w-[2.2rem] items-end justify-start pb-[1px] pl-[3px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F1</span>
        </KBtn>
        <KBtn>
          <IconBrightnessUp className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[5px] w-[5px]" />
          <span className="mt-[1px] inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-3 w-3 rounded-full bg-gradient-to-b from-neutral-800 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      {/* Second row */}
      <div className="mb-[1px] flex w-full shrink-0 gap-[1px]">
        <KBtn>
          <span className="block">~</span>
          <span className="mt-[1px] block">`</span>
        </KBtn>
        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-[2.2rem] items-end justify-end pr-[3px] pb-[1px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </div>

      {/* Third row */}
      <div className="mb-[1px] flex w-full shrink-0 gap-[1px]">
        <KBtn
          className="w-[2.2rem] items-end justify-start pb-[1px] pl-[3px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn><span className="block">Q</span></KBtn>
        <KBtn><span className="block">W</span></KBtn>
        <KBtn><span className="block">E</span></KBtn>
        <KBtn><span className="block">R</span></KBtn>
        <KBtn><span className="block">T</span></KBtn>
        <KBtn><span className="block">Y</span></KBtn>
        <KBtn><span className="block">U</span></KBtn>
        <KBtn><span className="block">I</span></KBtn>
        <KBtn><span className="block">O</span></KBtn>
        <KBtn><span className="block">P</span></KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </div>

      {/* Fourth Row */}
      <div className="mb-[1px] flex w-full shrink-0 gap-[1px]">
        <KBtn
          className="w-[2.2rem] items-end justify-start pb-[1px] pl-[3px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn><span className="block">A</span></KBtn>
        <KBtn><span className="block">S</span></KBtn>
        <KBtn><span className="block">D</span></KBtn>
        <KBtn><span className="block">F</span></KBtn>
        <KBtn><span className="block">G</span></KBtn>
        <KBtn><span className="block">H</span></KBtn>
        <KBtn><span className="block">J</span></KBtn>
        <KBtn><span className="block">K</span></KBtn>
        <KBtn><span className="block">L</span></KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn
          className="w-[2.2rem] items-end justify-end pr-[3px] pb-[1px]"
          childrenClassName="items-end"
        >
          return
        </KBtn>
      </div>

      {/* Fifth Row */}
      <div className="mb-[1px] flex w-full shrink-0 gap-[1px]">
        <KBtn
          className="w-[2.8rem] items-end justify-start pb-[1px] pl-[3px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn><span className="block">Z</span></KBtn>
        <KBtn><span className="block">X</span></KBtn>
        <KBtn><span className="block">C</span></KBtn>
        <KBtn><span className="block">V</span></KBtn>
        <KBtn><span className="block">B</span></KBtn>
        <KBtn><span className="block">N</span></KBtn>
        <KBtn><span className="block">M</span></KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn
          className="w-[2.8rem] items-end justify-end pr-[3px] pb-[1px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </div>

      {/* sixth Row */}
      <div className="mb-[1px] flex w-full shrink-0 gap-[1px]">
        <KBtn className="" childrenClassName="h-full justify-between py-[2px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[5px] w-[5px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[2px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[5px] w-[5px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[2px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[5px] w-[5px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-7"
          childrenClassName="h-full justify-between py-[2px]"
        >
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[5px] w-[5px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[7rem]"></KBtn>
        <KBtn
          className="w-7"
          childrenClassName="h-full justify-between py-[2px]"
        >
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[5px] w-[5px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[2px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[5px] w-[5px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[1px] flex h-5 w-[4.2rem] flex-col items-center justify-end rounded-[3px] p-[0.5px]">
          <KBtn className="h-2.5 w-5">
            <IconCaretUpFilled className="h-[5px] w-[5px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-2.5 w-5">
              <IconCaretLeftFilled className="h-[5px] w-[5px]" />
            </KBtn>
            <KBtn className="h-2.5 w-5">
              <IconCaretDownFilled className="h-[5px] w-[5px]" />
            </KBtn>
            <KBtn className="h-2.5 w-5">
              <IconCaretRightFilled className="h-[5px] w-[5px]" />
            </KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className={cn(
        "[transform:translateZ(0)] rounded-[3px] p-[0.5px] [will-change:transform]",
        backlit && "bg-white/[0.08] shadow-sm shadow-white/5",
      )}
    >
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-[2.5px] bg-[#0a090d]",
          className,
        )}
        style={{
          boxShadow:
            "0px -0.5px 1px 0 #0D0D0F inset, -0.5px 0px 1px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[4px] text-neutral-400",
            childrenClassName,
            backlit && "text-white",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 flex h-32 gap-[1px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

export const OptionKey = ({ className }: { className: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
};

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};

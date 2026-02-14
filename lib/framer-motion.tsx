'use client';

import {
  ElementType,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
  MouseEvent,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type MotionLikeProps = HTMLAttributes<HTMLElement> & {
  initial?: { opacity?: number; y?: number };
  animate?: { opacity?: number; y?: number };
  exit?: { opacity?: number; y?: number };
  whileHover?: { y?: number };
  transition?: Record<string, number | string | number[] | undefined>;
  layoutId?: string;
  children?: ReactNode;
};

function createMotionTag(Tag: ElementType) {
  return forwardRef(function MotionTag(
    { initial, animate, whileHover, transition, layoutId, style, onMouseEnter, onMouseLeave, ...props }: MotionLikeProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    void layoutId;

    const localRef = useRef<HTMLElement | null>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      if (!localRef.current) return;
      const duration = Number(transition?.duration ?? 0.35);
      localRef.current.animate(
        [
          {
            opacity: initial?.opacity ?? 1,
            transform: `translateY(${initial?.y ?? 0}px)`,
          },
          {
            opacity: animate?.opacity ?? 1,
            transform: `translateY(${animate?.y ?? 0}px)`,
          },
        ],
        { duration: duration * 1000, easing: 'cubic-bezier(0.2, 0.65, 0.2, 1)', fill: 'forwards' },
      );
    }, [initial?.opacity, initial?.y, animate?.opacity, animate?.y, transition?.duration]);

    const mergedStyle = useMemo(
      () => ({
        transition: 'transform 0.28s cubic-bezier(0.2, 0.65, 0.2, 1)',
        transform: hovered && whileHover?.y ? `translateY(${whileHover.y}px)` : undefined,
        ...style,
      }),
      [hovered, whileHover?.y, style],
    );

    return (
      <Tag
        ref={(node: HTMLElement) => {
          localRef.current = node;
          if (typeof ref === 'function') ref(node);
        }}
        style={mergedStyle}
        onMouseEnter={(e: MouseEvent<HTMLElement>) => {
          setHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e: MouseEvent<HTMLElement>) => {
          setHovered(false);
          onMouseLeave?.(e);
        }}
        {...props}
      />
    );
  });
}

export const motion = {
  div: createMotionTag('div'),
  article: createMotionTag('article'),
  span: createMotionTag('span'),
};

export function AnimatePresence({ children }: { children: ReactNode; mode?: 'wait'; initial?: boolean }) {
  return <>{children}</>;
}

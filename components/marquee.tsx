"use client";
import { useRef, Fragment } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";

interface MarqueeProps {
	titile1: string;
	titile2: string;
	className?: string;
	speed?: "slow" | "medium" | "fast";
}

export default function Marquee({
	titile1,
	titile2,
	className = "",
	speed = "medium",
}: MarqueeProps) {
	const container = useRef<HTMLDivElement>(null);
	const shouldReduceMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});

	const speedMultipliers = {
		slow: 0.3,
		medium: 0.5,
		fast: 0.8,
	};

	const multiplier = speedMultipliers[speed];

	// FIXED: Reduced the translation range to prevent running out of content
	const x = useTransform(
		scrollYProgress,
		[0, 1],
		[100 * multiplier, -400 * multiplier] // Much smaller range
	);

	const rotate = useTransform(scrollYProgress, [0, 1], [0, 180 * multiplier]);

	const animationProps = shouldReduceMotion ? { x: 0 } : { x };
	const rotateProps = shouldReduceMotion ? { rotate: 0 } : { rotate };

	// FIXED: More repetitions to ensure continuous content
	const REPEAT_COUNT = 12; // Increased from 5

	return (
		<section
			className="w-full overflow-hidden py-4 sm:py-8 md:py-10"
			ref={container}
			aria-label="Scrolling marquee text"
		>
			<motion.div
				style={animationProps}
				className="flex whitespace-nowrap items-center gap-6 sm:gap-8 md:gap-10"
			>
				{Array.from({ length: REPEAT_COUNT }).map((_, idx) => (
					<Fragment key={idx}>
						<h2
							className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${className} font-bold leading-none tracking-tight flex-shrink-0`}
						>
							{titile1}
						</h2>
						<motion.img
							style={rotateProps}
							src="/companiesImg.svg"
							alt="Separator icon"
							className="w-22 h-22 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 flex-shrink-0"
							loading="lazy"
						/>
						<h2
							className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${className} font-bold leading-none tracking-tight flex-shrink-0`}
						>
							{titile2}
						</h2>
					</Fragment>
				))}
			</motion.div>
		</section>
	);
}
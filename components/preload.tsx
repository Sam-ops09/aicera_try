"use client";
import { motion } from "framer-motion";
import { opacity, slideUp } from "@/motion";
import { useEffect, useState, useMemo, useCallback } from "react";

// Constants for better maintainability
const ANIMATION_CONFIG = {
	CURVE_OFFSET: 300,
	DURATION: 0.7,
	DELAY: 0.3,
	EASE: [0.76, 0, 0.24, 1] as const,
	TEXT_ANIMATION: {
		DURATION: 1.5,
		DELAY: 0.5,
		OFFSET: 200,
	},
	IMAGE_ROTATION: {
		DURATION: 1,
		ANGLE: 90,
	},
} as const;

const COLORS = {
	BACKGROUND: "#E1E2E1",
	TEXT: "#0D1B2A",
} as const;

interface Dimensions {
	width: number;
	height: number;
}

// Custom hook for window dimensions with proper cleanup
function useWindowDimensions() {
	const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

	const updateDimensions = useCallback(() => {
		if (typeof window !== "undefined") {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
	}, []);

	useEffect(() => {
		// Initial setup
		updateDimensions();

		// Add resize listener for responsive behavior
		window.addEventListener("resize", updateDimensions);

		// Cleanup
		return () => {
			window.removeEventListener("resize", updateDimensions);
		};
	}, [updateDimensions]);

	return dimensions;
}

// Utility function to generate SVG path
function createSVGPath(width: number, height: number, curveOffset: number = 0): string {
	const controlPointX = width / 2;
	const controlPointY = height + curveOffset;
	
	return `M0 0 L${width} 0 L${width} ${height} Q${controlPointX} ${controlPointY} 0 ${height} L0 0`;
}

// Memoized text animation component
const AnimatedText = motion.p;

interface TextProps {
	children: React.ReactNode;
	direction: "up" | "down";
	className?: string;
	style?: React.CSSProperties;
}

function PreloadText({ children, direction, className, style }: TextProps) {
	const initialY = direction === "up" ? -ANIMATION_CONFIG.TEXT_ANIMATION.OFFSET : ANIMATION_CONFIG.TEXT_ANIMATION.OFFSET;
	
	return (
		<AnimatedText
			initial={{ y: initialY }}
			animate={{ y: 0 }}
			transition={{
				duration: ANIMATION_CONFIG.TEXT_ANIMATION.DURATION,
				delay: ANIMATION_CONFIG.TEXT_ANIMATION.DELAY,
				ease: ANIMATION_CONFIG.EASE,
			}}
			className={className}
			style={style}>
			{children}
		</AnimatedText>
	);
}

export default function Preload() {
	const dimensions = useWindowDimensions();

	// Memoize SVG paths to prevent unnecessary recalculations
	const svgPaths = useMemo(() => {
		if (dimensions.width === 0 || dimensions.height === 0) {
			return { initial: "", target: "" };
		}

		return {
			initial: createSVGPath(dimensions.width, dimensions.height, ANIMATION_CONFIG.CURVE_OFFSET),
			target: createSVGPath(dimensions.width, dimensions.height, 0),
		};
	}, [dimensions.width, dimensions.height]);

	// Memoize curve animation variants
	const curveVariants = useMemo(() => ({
		initial: {
			d: svgPaths.initial,
			transition: { 
				duration: ANIMATION_CONFIG.DURATION, 
				ease: ANIMATION_CONFIG.EASE 
			},
		},
		exit: {
			d: svgPaths.target,
			transition: { 
				duration: ANIMATION_CONFIG.DURATION, 
				ease: ANIMATION_CONFIG.EASE, 
				delay: ANIMATION_CONFIG.DELAY 
			},
		},
	}), [svgPaths.initial, svgPaths.target]);

	// Don't render until we have dimensions (prevents hydration mismatch)
	if (dimensions.width === 0) {
		return (
			<motion.div
				variants={slideUp}
				initial="initial"
				exit="exit"
				className={`h-screen w-screen flex items-center justify-center fixed z-20`}
				style={{ backgroundColor: COLORS.BACKGROUND }}
			/>
		);
	}

	return (
		<motion.div
			variants={slideUp}
			initial="initial"
			exit="exit"
			className="h-screen w-screen flex items-center justify-center fixed z-20"
			style={{ backgroundColor: COLORS.BACKGROUND }}>
			<motion.div
				className="flex gap-10 items-center absolute z-10 overflow-hidden sm:gap-3 xm:gap-3"
				variants={opacity}
				initial="initial"
				animate="enter">
				<PreloadText 
					direction="up"
					className={`text-[40px] xm:text-[20px] sm:text-[20px] leading-tight tracking-tighter font-medium`}
					style={{ color: COLORS.TEXT }}>
					Smarter Tech
				</PreloadText>
				
				<motion.img
					initial={{ rotate: 0 }}
					animate={{ rotate: ANIMATION_CONFIG.IMAGE_ROTATION.ANGLE }}
					transition={{
						duration: ANIMATION_CONFIG.IMAGE_ROTATION.DURATION,
						ease: ANIMATION_CONFIG.EASE,
					}}
					src="/loadingImg.svg"
					alt="Loading animation"
					className="w-[250px] h-[250px] xm:w-20 sm:w-20 xm:h-20 sm:h-20"
				/>
				
				<PreloadText 
					direction="down"
					className={`text-[40px] xm:text-[20px] sm:text-[20px] leading-tight tracking-tighter font-medium`}
					style={{ color: COLORS.TEXT }}>
					Sharper Minds
				</PreloadText>
			</motion.div>
			
			<svg className="absolute top-0 w-full h-full pointer-events-none">
				<motion.path
					className={`fill-current`}
					style={{ fill: COLORS.BACKGROUND }}
					variants={curveVariants}
					initial="initial"
					exit="exit"
				/>
			</svg>
		</motion.div>
	);
}

"use client";
import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TParagraphProps {
	paragraph: string;
}

interface TWordProps {
	children: React.ReactNode;
	progress: MotionValue<number>;
	range: [number, number];
}

export default function Paragraph({ paragraph }: TParagraphProps) {
	const container = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start 0.8", "start 0.15"],
	});

	// Memoize words splitting to avoid recalculation on every render
	const words = useMemo(() => {
		return paragraph.trim().split(/\s+/).filter(word => word.length > 0);
	}, [paragraph]);

	// Memoize word ranges to avoid recalculation
	const wordRanges = useMemo(() => {
		return words.map((_, i) => {
			const start = i / words.length;
			const end = start + 1 / words.length;
			return [start, end] as [number, number];
		});
	}, [words]);

	if (words.length === 0) {
		return null;
	}

	return (
		<p
			ref={container}
			className="text-3xl lg:text-4xl md:text-3xl sm:text-2xl text-gray-200 font-bold leading-none tracking-tight text-justify flex flex-wrap"
			role="text"
			aria-label={paragraph}>
			{words.map((word, i) => (
				<Word
					key={`${word}-${i}`} // Better key that includes word content
					progress={scrollYProgress}
					range={wordRanges[i]}>
					{word}
				</Word>
			))}
		</p>
	);
}

// Memoized Word component to prevent unnecessary re-renders
const Word = React.memo(({ children, progress, range }: TWordProps) => {
	const opacity = useTransform(progress, range, [0, 1]);
	
	return (
		<span className="relative mr-3 mt-3">
			<span className="absolute opacity-0" aria-hidden="true">
				{children}
			</span>
			<motion.span style={{ opacity }}>
				{children}
			</motion.span>
		</span>
	);
});

Word.displayName = 'Word';
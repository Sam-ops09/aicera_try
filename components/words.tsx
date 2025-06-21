"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TParagraphProps {
	paragraph: string;
}

interface TWordProps {
	children: React.ReactNode;
	progress: any; // Replace `any` with the correct type if known
	range: [number, number];
}

export default function Paragraph({ paragraph }: TParagraphProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start 0.8", "start 0.15"],
	});

	const words = paragraph.split(" ");
	return (
		<>
			<p
				ref={container}
				className="text-3xl lg:text-4xl md:text-3xl sm:text-2xl text-gray-200 font-bold leading-none tracking-tight text-justify flex flex-wrap">
				{words.map((word, i) => {
					const start = i / words.length;
					const end = start + 1 / words.length;
					return (
						<Words
							key={i}
							progress={scrollYProgress}
							range={[start, end]}>
							{word}
						</Words>
					);
				})}
			</p>
		</>
	);
}

const Words = ({ children, progress, range }: TWordProps) => {
	const opacity = useTransform(progress, range, [0, 1]);
	return (
		<span className="relative mr-[12px] mt-[12px]">
      <span className="absolute opacity-0" aria-hidden="true">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
	);
};
"use client";
import { useRef, Fragment } from "react";
import { TmarqueeProps } from "@/types";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Marquee({
	titile1,
	titile2,
	className,
}: TmarqueeProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});
	const x = useTransform(scrollYProgress, [0, 1], [200, -1000]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, 300]);

	const REPEAT_COUNT = 5;

	return (
		<div
			className="w-full overflow-hidden py-10 xm:hidden sm:hidden"
			ref={container}
		>
			<motion.div
				style={{ x }}
				className="flex whitespace-nowrap items-center gap-10"
			>
				{Array.from({ length: REPEAT_COUNT }).map((_, idx) => (
					<Fragment key={idx}>
						<h1
							className={`text-[80px] ${className} font-bold leading-none tracking-tight`}
						>
							{titile1}
						</h1>
						<motion.img
							style={{ rotate }}
							src="/companiesImg.svg"
							alt="companiesImg"
						/>
						<h1
							className={`text-[80px] ${className} font-bold leading-none tracking-tight`}
						>
							{titile2}
						</h1>
					</Fragment>
				))}
			</motion.div>
		</div>
	);
}

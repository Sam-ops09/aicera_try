"use client";
import { useRef } from "react";
import { Words } from "@/components";
import { useTranslations } from "next-intl";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export default function Journey() {
	const t = useTranslations("journeyContent");
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container.current ? container : undefined,
		offset: ["start end", "center center"],
	});
	const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 0.98]);
	const scaleSmooth = useSpring(scale);

	return (
		<motion.div
			id="our-ambition"
			aria-label={t("journeyTitle") || "Our Ambition"}
			className="w-full h-[70%] xm:h-fit sm:h-fit flex items-center justify-center rounded-[30px] py-10 bg-[#FFD7EF] transition-all duration-300 ease-linear mb-20"
			style={{ scale: scaleSmooth }}
			ref={container}>
			<div className="w-[90%] h-full flex items-center justify-center sm:w-full xm:w-full md:w-full px-5 sm:pb-20 xm:pb-20">
				<Words paragraph={t("journeyContent")} />
			</div>
			<div className="w-full h-full absolute">
				<div className="absolute right-24 -bottom-10">
					<motion.img
						animate={{ rotate: [-360, 360] }}
						transition={{
							repeat: Infinity,
							repeatType: "loop",
							duration: 20,
							ease: "linear",
						}}
						src="/circle2.svg"
						alt="Rotating decorative circle 2"
						width={130}
						height={130}
					/>
				</div>
				<div className="absolute right-60 -bottom-12">
					<motion.img
						animate={{ rotate: [-360, 360] }}
						transition={{
							repeat: Infinity,
							repeatType: "loop",
							duration: 20,
							ease: "linear",
						}}
						src="/circle1.svg"
						alt="Rotating decorative circle 1"
						width={100}
						height={100}
					/>
				</div>
			</div>
		</motion.div>
	);
}
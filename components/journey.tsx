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
			className="w-full h-[70%] xs:h-fit xm:h-fit sm:h-fit flex items-center justify-center rounded-[30px] xs:rounded-[20px] xm:rounded-[25px] py-10 xs:py-6 xm:py-8 sm:py-9 bg-[#1B386F] transition-all duration-300 ease-linear mb-20 xs:mb-10 xm:mb-12 sm:mb-16"
			style={{ scale: scaleSmooth }}
			ref={container}>
			<div className="w-[90%] xs:w-full xm:w-full sm:w-full md:w-full h-full flex items-center justify-center px-5 xs:px-4 xm:px-4 sm:px-5 xs:pb-6 xm:pb-8 sm:pb-20">
				<Words paragraph={t("journeyContent")} />
			</div>
		</motion.div>
	);
}
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Marquee, Card } from "@/components";
import { whatwedoCircleImg } from "@/public";

export default function Whatwedo() {
	const t = useTranslations("whatwedoContent");
	return (
		<div
			id="what-we-do"
			className="w-full bg-[#E1E2E1] relative">
			{/* Header Section */}
			<div className="py-8 xm:py-4 sm:py-6">
				<Marquee
					className="text-[#0D1B2A]"
					title1="What we do"
					title2="What we do"
				/>
				<div className="w-full flex items-center justify-center pt-8 xm:pt-4 sm:pt-6">
					<div className="w-[80%] xm:w-full sm:w-full xm:px-4 sm:px-6">
						<p
							className="text-2xl xm:text-lg sm:text-xl text-[#0D1B2A] leading-tight tracking-tight text-center"
							dangerouslySetInnerHTML={{ __html: t("whatwedoHeading") }}
						/>
					</div>
				</div>
			</div>

			{/* Cards Section - Full Screen */}
			<div className="w-full">
				<Card />
			</div>
		</div>
	);
}

"use client";
import "swiper/css";
import Image from "next/image";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useScroll, useTransform, motion } from "framer-motion";
import {
	arrowLeft,
	arrowRight,
	hartman1,
	hartmanBlack,
	saion1,
	saionBlack,
} from "@/public";
import { useTranslations } from "next-intl";
import { collaborationItems } from "@/constants";

export default function Collaboration() {
	const container = useRef(null);
	const t = useTranslations("ourImpactContent");
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});
	const sc = useTransform(scrollYProgress, [0, 1], [100, -1500]);

	const swiperRef = useRef<any | null>(null);

	const handlePrev = () => {
		if (swiperRef.current) swiperRef.current.slidePrev();
	};
	const handleNext = () => {
		if (swiperRef.current) swiperRef.current.slideNext();
	};

	return (
		<div
			id="our-impact"
			className="w-full bg-[#1B386F] py-10 xs:py-6 xm:py-8 sm:py-9 padding-x">
			<div className="w-full flex justify-start items-center xs:pb-6 xm:pb-8 sm:pb-10">
				<div className="w-[72%] xs:w-full xm:w-full sm:w-full flex flex-col gap-4 xs:gap-2 xm:gap-3 sm:gap-4">
					<h4 className="text-[24px] xs:text-[16px] xm:text-[18px] sm:text-[20px] md:text-[22px] text-[#DBE2EF] leading-tight tracking-tighter">
						{t("ourImpactHeading1")}
					</h4>

					<h1 className="text-[80px] xs:text-[28px] xm:text-[32px] sm:text-[36px] md:text-[50px] lg:text-[70px] xl:text-[80px] xs:leading-[30px] xm:leading-[34px] sm:leading-[38px] md:leading-[52px] lg:leading-[72px] xl:leading-[80px] text-[#DBE2EF] font-bold tracking-tighter">
						{t("ourImpactHeading2")}
					</h1>
				</div>
			</div>
			<div
				className="w-full py-20 xm:hidden sm:hidden"
				ref={container}>
				<motion.div
					style={{ x: sc }}
					className="w-full flex whitespace-nowrap gap-3">
					{collaborationItems.map((item) => (
						<div
							className="min-w-[500px] flex items-center justify-center py-5 px-5 border-[1.5px] border-[#DBE2EF] rounded-[20px]"
							key={item.id}>
							<Image
								src={item.src}
								alt="companiesImg"
								className="w-[600px] h-[100px] object-contain"
							/>
						</div>
					))}
				</motion.div>
			</div>
			<div className="pb-6 bg-[#E1E2E1] rounded-[20px]">
				<div className="p-3 overflow-hidden">
					<Swiper
						modules={[Navigation]}
						loop
						spaceBetween={20}
						slidesPerView={1}
						onSwiper={(swiper) => (swiperRef.current = swiper)}>
						<SwiperSlide>
							<motion.div className="p-8 xm:p-0 sm:p-0 flex justify-between rounded-[20px] gap-12 xm:gap-6 sm:gap-6 xm:flex-col sm:flex-col">
								<div className="w-1/2 xm:w-full sm:w-full flex flex-col gap-8 pt-6 xm:gap-4 sm:gap-4">
									<Image
										src={hartmanBlack}
										alt="whatwedoImg"
										className="w-[80px] object-cover text-black"
									/>
									<div className="flex flex-col gap-3">
										<h4 className="text-[32px] xm:text-[24px] sm:text-[24px] leading-tight tracking-tight">
											{t("title1")}
										</h4>
										<div className="flex flex-col">
											<h2 className="text-[20px] xm:text-[18px] sm:text-[18px] leading-tight tracking-tighter">
												{t("heading1")}
											</h2>
											<h4 className="text-[20px] xm:text-[18px] sm:text-[18px] leading-tight tracking-tighter">
												{t("para1")}
											</h4>
										</div>
									</div>
								</div>
								<motion.div className="w-1/2 xm:w-full sm:w-full flex items-center justify-center relative">
									<Image
										src={hartman1}
										alt="img"
										className="w-full object-cover"
									/>
								</motion.div>
							</motion.div>
						</SwiperSlide>
						<SwiperSlide>
							<motion.div className="w-full p-8 flex justify-between rounded-[20px] gap-12 xm:gap-6 sm:gap-4 xm:flex-col sm:flex-col xm:p-0 sm:p-0">
								<div className="w-1/2 xm:w-full sm:w-full flex flex-col gap-8 pt-6 xm:gap-4 sm:gap-4">
									<Image
										src={saionBlack}
										alt="whatwedoImg"
										className="w-[80px] object-cover text-[#1B386F]"
									/>
									<div className="flex flex-col gap-3">
										<h4 className="text-[32px] xm:text-[24px] sm:text-[24px] leading-tight tracking-tight">
											{t("title2")}
										</h4>
										<div className="flex flex-col">
											<h2 className="text-[20px] xm:text-[18px] sm:text-[18px] leading-tight tracking-tighter">
												{t("heading2")}
											</h2>
											<h4 className="text-[20px] xm:text-[18px] sm:text-[18px] leading-tight tracking-tighter">
												{t("para2")}
											</h4>
										</div>
									</div>
								</div>
								<motion.div className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center relative">
									<Image
										src={saion1}
										alt="img"
										className="w-full object-cover"
									/>
								</motion.div>
							</motion.div>
						</SwiperSlide>
					</Swiper>
					<div className="flex w-fit gap-2 pl-6 xm:p-0 sm:p-0 xm:pt-3 sm:pt-3">
						<div
							onClick={handlePrev}
							className="bg-[#0D1B2A] hover:bg-[#1B386F] transition-all duration-200 ease-linear cursor-pointer px-2 py-1 rounded-[20px]">
							<Image
								src={arrowLeft}
								alt="arrowLeft"
								className="!w-[55px]"
								width={55}
								height={55}
							/>
						</div>
						<div
							onClick={handleNext}
							className="bg-[#0D1B2A] hover:bg-[#1B386F] transition-all duration-200 ease-linear cursor-pointer px-2 py-1 rounded-[20px]">
							<Image
								src={arrowRight}
								alt="arrowRight"
								width={55}
								height={55}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

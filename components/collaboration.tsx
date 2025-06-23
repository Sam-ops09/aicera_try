"use client";
import "swiper/css";
import Image from "next/image";
import { useRef, useCallback, useMemo } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
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

// Constants for better maintainability
const SCROLL_TRANSFORM_RANGE = [100, -1500];
const SCROLL_OFFSET = ["start end", "end start"] as ["start end", "end start"];
const SWIPER_CONFIG = {
	spaceBetween: 20,
	slidesPerView: 1,
	loop: true,
} as const;

// Extracted style classes for better readability
const styles = {
	container: "w-full bg-[#1B386F] py-10 xs:py-6 xm:py-8 sm:py-9 padding-x",
	headerContainer: "w-full flex justify-start items-center xs:pb-6 xm:pb-8 sm:pb-10",
	headerContent: "w-[72%] xs:w-full xm:w-full sm:w-full flex flex-col gap-4 xs:gap-2 xm:gap-3 sm:gap-4",
	subHeading: "text-[24px] xs:text-[16px] xm:text-[18px] sm:text-[20px] md:text-[22px] text-[#DBE2EF] leading-tight tracking-tighter",
	mainHeading: "text-[80px] xs:text-[28px] xm:text-[32px] sm:text-[36px] md:text-[50px] lg:text-[70px] xl:text-[80px] xs:leading-[30px] xm:leading-[34px] sm:leading-[38px] md:leading-[52px] lg:leading-[72px] xl:leading-[80px] text-[#DBE2EF] font-bold tracking-tighter",
	scrollSection: "w-full py-20 xm:hidden sm:hidden",
	scrollContainer: "w-full flex whitespace-nowrap gap-3",
	collaborationCard: "min-w-[500px] flex items-center justify-center py-5 px-5 border-[1.5px] border-[#DBE2EF] rounded-[20px]",
	collaborationImage: "w-[600px] h-[100px] object-contain",
	swiperContainer: "pb-6 bg-[#E1E2E1] rounded-[20px]",
	swiperWrapper: "p-3 overflow-hidden",
	slideContent: "p-8 xm:p-0 sm:p-0 flex justify-between rounded-[20px] gap-12 xm:gap-6 sm:gap-6 xm:flex-col sm:flex-col",
	slideContentAlt: "w-full p-8 flex justify-between rounded-[20px] gap-12 xm:gap-6 sm:gap-4 xm:flex-col sm:flex-col xm:p-0 sm:p-0",
	textSection: "w-1/2 xm:w-full sm:w-full flex flex-col gap-8 pt-6 xm:gap-4 sm:gap-4",
	imageSection: "w-1/2 xm:w-full sm:w-full flex items-center justify-center relative",
	imageSectionAlt: "w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center relative",
	logoImage: "w-[80px] object-cover",
	slideTitle: "text-[30px] xm:text-[20px] sm:text-[20px] leading-tight tracking-tight",
	slideHeading: "text-[20px] xm:text-[18px] sm:text-[18px] leading-tight tracking-tighter",
	slideParagraph: "text-[20px] xm:text-[18px] sm:text-[18px] leading-tight tracking-tighter",
	navigationContainer: "flex w-fit gap-2 pl-6 xm:p-0 sm:p-0 xm:pt-3 sm:pt-3",
	navigationButton: "bg-[#0D1B2A] hover:bg-[#1B386F] transition-all duration-200 ease-linear cursor-pointer px-2 py-1 rounded-[20px]",
	arrowImage: "!w-[55px]",
} as const;

export default function Collaboration() {
	const container = useRef<HTMLDivElement>(null);
	const swiperRef = useRef<SwiperType | null>(null);
	const t = useTranslations("ourImpactContent");

	// Memoize scroll configuration
	const scrollConfig = useMemo(() => ({
		target: container,
		offset: SCROLL_OFFSET,
	}), []);

	const { scrollYProgress } = useScroll(scrollConfig);
	const sc = useTransform(scrollYProgress, [0, 1], SCROLL_TRANSFORM_RANGE);

	// Memoized event handlers for better performance
	const handlePrev = useCallback(() => {
		swiperRef.current?.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		swiperRef.current?.slideNext();
	}, []);

	const handleSwiperInit = useCallback((swiper: SwiperType) => {
		swiperRef.current = swiper;
	}, []);

	// Memoize collaboration items rendering
	const collaborationItemsElements = useMemo(() => 
		collaborationItems.map((item) => (
			<div
				className={styles.collaborationCard}
				key={item.id}
			>
				<Image
					src={item.src}
					alt={`Company logo ${item.id}`}
					className={styles.collaborationImage}
					loading="lazy"
				/>
			</div>
		)), []);

	return (
		<div
			id="our-impact"
			className={styles.container}
		>
			<div className={styles.headerContainer}>
				<div className={styles.headerContent}>
					<h4 className={styles.subHeading}>
						{t("ourImpactHeading1")}
					</h4>

					<h1 className={styles.mainHeading}>
						{t("ourImpactHeading2")}
					</h1>
				</div>
			</div>

			{/* Desktop scroll animation section */}
			<div
				className={styles.scrollSection}
				ref={container}
			>
				<motion.div
					style={{ x: sc }}
					className={styles.scrollContainer}
				>
					{collaborationItemsElements}
				</motion.div>
			</div>
			{/* Swiper section */}
			<div className={styles.swiperContainer}>
				<div className={styles.swiperWrapper}>
					<Swiper
						modules={[Navigation]}
						{...SWIPER_CONFIG}
						onSwiper={handleSwiperInit}
					>
						<SwiperSlide>
							<motion.div className={styles.slideContent}>
								<div className={styles.textSection}>
									<Image
										src={hartmanBlack}
										alt="Hartman logo"
										className={`${styles.logoImage} text-black`}
										loading="lazy"
									/>
									<div className="flex flex-col gap-3">
										<h4 className={styles.slideTitle}>
											{t("title1")}
										</h4>
										<div className="flex flex-col">
											<h2 className={styles.slideHeading}>
												{t("heading1")}
											</h2>
											<h4 className={styles.slideParagraph}>
												{t("para1")}
											</h4>
										</div>
									</div>
								</div>
								<motion.div className={styles.imageSection}>
									<Image
										src={hartman1}
										alt="Hartman showcase"
										className="w-full object-cover"
										loading="lazy"
									/>
								</motion.div>
							</motion.div>
						</SwiperSlide>
						<SwiperSlide>
							<motion.div className={styles.slideContentAlt}>
								<div className={styles.textSection}>
									<Image
										src={saionBlack}
										alt="Saion logo"
										className={`${styles.logoImage} text-[#1B386F]`}
										loading="lazy"
									/>
									<div className="flex flex-col gap-3">
										<h4 className={styles.slideTitle}>
											{t("title2")}
										</h4>
										<div className="flex flex-col">
											<h2 className={styles.slideHeading}>
												{t("heading2")}
											</h2>
											<h4 className={styles.slideParagraph}>
												{t("para2")}
											</h4>
										</div>
									</div>
								</div>
								<motion.div className={styles.imageSectionAlt}>
									<Image
										src={saion1}
										alt="Saion showcase"
										className="w-full object-cover"
										loading="lazy"
									/>
								</motion.div>
							</motion.div>
						</SwiperSlide>
					</Swiper>
					{/* Navigation buttons */}
					<div className={styles.navigationContainer}>
						<button
							onClick={handlePrev}
							className={styles.navigationButton}
							aria-label="Previous slide"
							type="button"
						>
							<Image
								src={arrowLeft}
								alt=""
								className={styles.arrowImage}
								width={55}
								height={55}
							/>
						</button>
						<button
							onClick={handleNext}
							className={styles.navigationButton}
							aria-label="Next slide"
							type="button"
						>
							<Image
								src={arrowRight}
								alt=""
								width={55}
								height={55}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

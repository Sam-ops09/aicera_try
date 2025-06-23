"use client";
import "swiper/css";
import { useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Navigation } from "swiper/modules";
import { arrowLeft, arrowRight } from "@/public";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { SlideData } from "@/types";

export default function Slider() {
	const t = useTranslations("sliderContent");
	const swiperRef = useRef<SwiperType | null>(null);

	// Memoized slide data to avoid recreation on every render
	const slideData: SlideData[] = useMemo(() => [
		{ titleKey: "title1", headingKey: "heading1", paraKey: "para1" },
		{ titleKey: "title2", headingKey: "heading2", paraKey: "para2" },
		{ titleKey: "title3", headingKey: "heading3", paraKey: "para3" },
		{ titleKey: "title4", headingKey: "heading4", paraKey: "para4" },
		{ titleKey: "title5", headingKey: "heading5", paraKey: "para5" },
	], []);

	// Memoized CSS classes to avoid string concatenation on every render
	const cssClasses = useMemo(() => ({
		container: "w-full flex flex-col gap-10 pb-10 bg-[#E1E2E1]",
		headerSection: "w-full flex justify-start items-center padding-x",
		headerContent: "w-[72%] flex flex-col gap-7 xm:w-full sm:w-full pt-6",
		heading4: "text-[24px] text-[#0D1B2A] leading-tight tracking-tighter",
		heading1: "text-[60px] xm:text-[35px] sm:text-[40px] xm:leading-[40px] sm:leading-[50px] text-[#0D1B2A] font-bold leading-[80px] tracking-tighter",
		heading4Alt: "text-[24px] xm:text-[20px] sm:text-[20px] text-[#0D1B2A] leading-normal tracking-tighter",
		slideContainer: "bg-[#0D1B2A] p-7 rounded-[30px] swiper-slide min-h-[450px] xm:min-h-[500px] sm:min-h-[500px] cursor-grab",
		slideContent: "flex flex-col gap-3",
		slideTitle: "text-[70px] xm:text-[50px] sm:text-[50px] font-bold leading-tight text-[#E1E2E1]",
		slideHeading: "text-[40px] xm:text-[20px] sm:text-[20px] font-medium leading-tight text-[#E1E2E1]",
		slideParagraph: "text-[20px] xm:text-[16px] sm:text-[16px] font-normal leading-normal text-[#E1E2E1] tracking-tight text-justify",
		buttonContainer: "flex mt-6 w-full gap-4 justify-center",
		button: "bg-[#0D1B2A] hover:bg-[#1B386F] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A] transition-all duration-200 ease-linear cursor-pointer px-4 py-3 rounded-full shadow-md flex items-center justify-center",
	}), []);

	// Memoized swiper configuration
	const swiperConfig = useMemo(() => ({
		modules: [Navigation],
		loop: true,
		spaceBetween: 30,
		breakpoints: {
			0: { slidesPerView: 1, spaceBetween: 20 },
			400: { slidesPerView: 1, spaceBetween: 20 },
			768: { slidesPerView: 1, spaceBetween: 20 },
			1024: { slidesPerView: 2, spaceBetween: 20 },
			1490: { slidesPerView: 2, spaceBetween: 20 },
		},
	}), []);

	// Memoized and optimized event handlers
	const handlePrev = useCallback(() => {
		try {
			swiperRef.current?.slidePrev();
		} catch (error) {
			console.warn("Error navigating to previous slide:", error);
		}
	}, []);

	const handleNext = useCallback(() => {
		try {
			swiperRef.current?.slideNext();
		} catch (error) {
			console.warn("Error navigating to next slide:", error);
		}
	}, []);

	const handleSwiperInit = useCallback((swiper: SwiperType) => {
		swiperRef.current = swiper;
	}, []);

	// Render slide component to avoid repetition
	const renderSlide = useCallback((slide: SlideData, index: number) => (
		<SwiperSlide key={`slide-${index}`}>
			<div className={cssClasses.slideContainer}>
				<div className={cssClasses.slideContent}>
					<h2 className={cssClasses.slideTitle}>
						{t(slide.titleKey)}
					</h2>
					<h2 className={cssClasses.slideHeading}>
						{t(slide.headingKey)}
					</h2>
					<p className={cssClasses.slideParagraph}>
						{t(slide.paraKey)}
					</p>
				</div>
			</div>
		</SwiperSlide>
	), [t, cssClasses]);

	return (
		<div id="transformation" className={cssClasses.container}>
			{/* Header Section */}
			<div className={cssClasses.headerSection}>
				<div className={cssClasses.headerContent}>
					<h4 className={cssClasses.heading4}>
						{t("sliderHeading1")}
					</h4>
					<h1 className={cssClasses.heading1}>
						{t("sliderHeading2")}
					</h1>
					<h4 className={cssClasses.heading4Alt}>
						{t("sliderHeading3")}
					</h4>
				</div>
			</div>

			{/* Slider Section */}
			<div className="w-full">
				<div className="p-5 overflow-hidden">
					<Swiper
						{...swiperConfig}
						onSwiper={handleSwiperInit}
						aria-label="Transformation slides"
					>
						{slideData.map(renderSlide)}
					</Swiper>

					{/* Navigation Buttons */}
					<div className={cssClasses.buttonContainer}>
						<button
							onClick={handlePrev}
							aria-label="Previous Slide"
							className={cssClasses.button}
							type="button"
						>
							<Image
								src={arrowLeft}
								alt=""
								width={32}
								height={32}
								className="w-8 h-8"
								priority
							/>
						</button>
						<button
							onClick={handleNext}
							aria-label="Next Slide"
							className={cssClasses.button}
							type="button"
						>
							<Image
								src={arrowRight}
								alt=""
								width={32}
								height={32}
								className="w-8 h-8"
								priority
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

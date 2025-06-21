"use client";
import "swiper/css";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Navigation } from "swiper/modules";
import { arrowLeft, arrowRight } from "@/public";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Slider() {
	const t = useTranslations("sliderContent");
	const swiperRef = useRef<any | null>(null);

	const handlePrev = () => {
		if (swiperRef.current) swiperRef.current.slidePrev();
	};
	const handleNext = () => {
		if (swiperRef.current) swiperRef.current.slideNext();
	};

	return (
		<div
			id="transformation"
			className="w-full flex flex-col gap-10 pb-10 bg-[#E1E2E1]">
			<div className="w-full flex justify-start items-center padding-x">
				<div className="w-[72%] flex flex-col gap-7 xm:w-full sm:w-full pt-6">
					<h4 className="text-[24px] text-[#0D1B2A] leading-tight tracking-tighter">
						{t("sliderHeading1")}
					</h4>

					<h1 className="text-[80px] xm:text-[35px] sm:text-[40px] xm:leading-[40px] sm:leading-[50px] text-[#0D1B2A] font-bold leading-[80px] tracking-tighter">
						{t("sliderHeading2")}
					</h1>
					<h4 className="text-[24px] xm:text-[20px] sm:text-[20px] text-[#0D1B2A] leading-normal tracking-tighter">
						{t("sliderHeading3")}
					</h4>
				</div>
			</div>
			<div className="w-full">
				<div className="p-5 overflow-hidden">
					<Swiper
						modules={[Navigation]}
						loop
						spaceBetween={30}
						breakpoints={{
							0: {
								slidesPerView: 1,
								spaceBetween: 20,
							},
							400: {
								slidesPerView: 1,
								spaceBetween: 20,
							},
							768: {
								slidesPerView: 1,
								spaceBetween: 20,
							},
							1024: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							1490: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
						}}
						onSwiper={(swiper) => (swiperRef.current = swiper)}>
						<SwiperSlide>
							<div className="bg-[#0D1B2A] p-7 rounded-[30px] swiper-slide min-h-[450px] xm:min-h-[500px] sm:min-h-[500px] cursor-grab">
								<div className="flex flex-col gap-3">
									<h2 className="text-[70px] xm:text-[50px] sm:text-[50px] font-bold leading-tight text-[#E1E2E1]">
										{t("title1")}
									</h2>
									<h2 className="text-[40px] xm:text-[20px] sm:text-[20px] font-medium leading-tight text-[#E1E2E1]">
										{t("heading1")}
									</h2>
									<p className="text-[20px] xm:text-[16px] sm:text-[16px] font-normal leading-normal text-[#E1E2E1] tracking-tight">
										{t("para1")}
									</p>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="bg-[#0D1B2A] p-7 rounded-[30px] swiper-slide min-h-[450px] xm:min-h-[500px] sm:min-h-[500px] cursor-grab">
								<div className="flex flex-col gap-3">
									<h2 className="text-[70px] xm:text-[50px] sm:text-[50px] font-bold leading-tight text-[#E1E2E1]">
										{t("title2")}
									</h2>
									<h2 className="text-[40px] xm:text-[20px] sm:text-[20px] font-medium leading-tight text-[#E1E2E1]">
										{t("heading2")}
									</h2>
									<p className="text-[20px] xm:text-[16px] sm:text-[16px] font-normal leading-normal text-[#E1E2E1] tracking-tight">
										{t("para2")}
									</p>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="bg-[#0D1B2A] p-7 rounded-[30px] swiper-slide min-h-[450px] xm:min-h-[500px] sm:min-h-[500px] cursor-grab">
								<div className="flex flex-col gap-3">
									<h2 className="text-[70px] xm:text-[50px] sm:text-[50px] font-bold leading-tight text-[#E1E2E1]">
										{t("title3")}
									</h2>
									<h2 className="text-[40px] xm:text-[20px] sm:text-[20px] font-medium leading-tight text-[#E1E2E1]">
										{t("heading3")}
									</h2>
									<p className="text-[20px] xm:text-[16px] sm:text-[16px] font-normal leading-normal text-[#E1E2E1] tracking-tight">
										{t("para3")}
									</p>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="bg-[#0D1B2A] p-7 rounded-[30px] swiper-slide min-h-[450px] xm:min-h-[500px] sm:min-h-[500px] cursor-grab">
								<div className="flex flex-col gap-3">
									<h2 className="text-[70px] xm:text-[50px] sm:text-[50px] font-bold leading-tight text-[#E1E2E1]">
										{t("title4")}
									</h2>
									<h2 className="text-[40px] xm:text-[20px] sm:text-[20px] font-medium leading-tight text-[#E1E2E1]">
										{t("heading4")}
									</h2>
									<p className="text-[20px] xm:text-[16px] sm:text-[16px] font-normal leading-normal text-[#E1E2E1] tracking-tight">
										{t("para4")}
									</p>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="bg-[#0D1B2A] p-7 rounded-[30px] swiper-slide min-h-[450px] xm:min-h-[500px] sm:min-h-[500px] cursor-grab">
								<div className="flex flex-col gap-3">
									<h2 className="text-[70px] xm:text-[50px] sm:text-[50px] font-bold leading-tight text-[#E1E2E1]">
										{t("title5")}
									</h2>
									<h2 className="text-[40px] xm:text-[20px] sm:text-[20px] font-medium leading-tight text-[#E1E2E1]">
										{t("heading5")}
									</h2>
									<p className="text-[20px] xm:text-[16px] sm:text-[16px] font-normal leading-normal text-[#E1E2E1] tracking-tight">
										{t("para5")}
									</p>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
					{/*buttons*/}
					<div className="flex mt-6 w-full gap-4 justify-center">
						<button
							onClick={handlePrev}
							aria-label="Previous Slide"
							className="bg-[#0D1B2A] hover:bg-[#1B386F] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A] transition-all duration-200 ease-linear cursor-pointer px-4 py-3 rounded-full shadow-md flex items-center justify-center"
							type="button"
						>
							<Image
								src={arrowLeft}
								alt="Previous"
								width={32}
								height={32}
								className="w-8 h-8"
							/>
						</button>
						<button
							onClick={handleNext}
							aria-label="Next Slide"
							className="bg-[#0D1B2A] hover:bg-[#1B386F] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A] transition-all duration-200 ease-linear cursor-pointer px-4 py-3 rounded-full shadow-md flex items-center justify-center"
							type="button"
						>
							<Image
								src={arrowRight}
								alt="Next"
								width={32}
								height={32}
								className="w-8 h-8"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

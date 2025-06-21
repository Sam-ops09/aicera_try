"use client";
import gsap from "gsap";
import Link from "next/link";
import Navbar from "./navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { arrowDown, heroCircle } from "@/public";

export default function Hero() {
	const t = useTranslations("heroContent");
	const textRef = useRef<HTMLSpanElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);

	useEffect(() => {
		resizeText();

		window.addEventListener("resize", resizeText);

		return () => {
			window.removeEventListener("resize", resizeText);
		};
	}, []);

	// Preload the video with priority when in viewport
	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		};

		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && videoRef.current) {
					// Only load the video when it's in viewport
					videoRef.current.src = './heroVideo.mp4';
					videoRef.current.load();
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersection, options);

		if (videoRef.current) {
			observer.observe(videoRef.current);
		}

		return () => {
			if (videoRef.current) {
				observer.unobserve(videoRef.current);
			}
			observer.disconnect();
		};
	}, []);

	const handleVideoLoaded = () => {
		setIsVideoLoaded(true);
	};

	const resizeText = () => {
		const container = containerRef.current;
		const text = textRef.current;

		if (!container || !text) {
			return;
		}

		const containerWidth = container.offsetWidth;
		let min = 1;
		let max = 2500;

		while (min <= max) {
			const mid = Math.floor((min + max) / 2);
			text.style.fontSize = mid + "px";

			if (text.offsetWidth <= containerWidth) {
				min = mid + 1;
			} else {
				max = mid - 1;
			}
		}

		text.style.fontSize = max + "px";
	};

	const plane1 = useRef(null);
	let requestAnimationFrameId: any = null;
	let xForce = 0;
	let yForce = 0;
	const easing = 0.08;
	const speed = 0.01;

	const manageMouseMove = (e: any) => {
		const { movementX, movementY } = e;
		xForce += movementX * speed;
		yForce += movementY * speed;

		if (requestAnimationFrameId == null) {
			requestAnimationFrameId = requestAnimationFrame(animate);
		}
	};

	const lerp = (start: number, target: number, amount: number) =>
		start * (0.8 - amount) + target * amount;

	const animate = () => {
		xForce = lerp(xForce, 0, easing);
		yForce = lerp(yForce, 0, easing);
		gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
		if (Math.abs(xForce) < 0.01) xForce = 0;
		if (Math.abs(yForce) < 0.01) yForce = 0;

		if (xForce != 0 || yForce != 0) {
			requestAnimationFrame(animate);
		} else {
			cancelAnimationFrame(requestAnimationFrameId);
			requestAnimationFrameId = null;
		}
	};

	const resetVideoPosition = () => {
		gsap.to(plane1.current, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
		xForce = 0;
		yForce = 0;
	};

	return (
		<div className="w-full min-h-[100dvh] flex flex-col items-center justify-start pt-20 sm:pt-24 xm:pt-24 padding-x gap-14 mb-10">
			<Navbar />
			<div
				className="flex flex-col justify-start w-full mt-10 sm:mt-0 xm:mt-0"
				ref={containerRef}>
				<h1 className="text-[24px] xm:text-[18px] sm:text-[18px] text-[#0D1B2A] font-normal leading-tight tracking-tight">
					{t("welcome-to")}
				</h1>
				<span
					className="flex text-[250px] text-[#0D1B2A] font-bold leading-[200px] sm:leading-[60px] xm:leading-[60px] sm:text-[100px] xm:text-[100px] tracking-tighter mx-auto whitespace-nowrap text-center mt-20 xm:mt-5 sm:mt-5"
					ref={textRef}>
					{"AICERA".split("").map((item: string, i: number) => (
						<motion.p
							initial={{ y: "100%" }}
							whileInView={{ y: 0 }}
							transition={{
								delay: i * 0.08,
								duration: 1,
								ease: [0.4, 0, 0.2, 1],
							}}
							viewport={{ once: true }}
							key={i}>
							{item}
						</motion.p>
					))}
				</span>
			</div>
			<div
				className="w-full flex flex-col gap-10 relative"
				onMouseMove={manageMouseMove}
				onMouseLeave={resetVideoPosition}>
				<div className="w-[600px] h-[400px] sm:w-full xm:w-full sm:h-[300px] xm:h-[300px] xm:left-0 sm:left-0 xm:static sm:static absolute left-64 rounded-lg">
					{/* Video loading spinner/placeholder */}
					{!isVideoLoaded && (
						<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-[30px]">
							<div className="w-12 h-12 border-4 border-[#0D1B2A] border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}

					<motion.video
						ref={(el: HTMLVideoElement | null) => {
							videoRef.current = el;
							plane1.current = el as unknown as null;
						}}
						initial={{ y: 20, opacity: 0, scale: 0.5 }}
						animate={{
							opacity: isVideoLoaded ? 1 : 0,
							y: isVideoLoaded ? 0 : 20,
							scale: isVideoLoaded ? 1 : 0.5
						}}
						transition={{
							duration: 1,
							ease: "easeInOut",
						}}
						onLoadedData={handleVideoLoaded}
						// src removed to be set by intersection observer
						playsInline
						autoPlay
						loop
						muted
						preload="metadata"
						className="rounded-[30px] w-full h-full object-cover"
					>
						{/* Add multiple sources for different devices */}
						<source src="./heroVideo.webm" type="video/webm" />
						<source src="./heroVideo.mp4" type="video/mp4" />
					</motion.video>

					{/*<motion.div*/}
					{/*	animate={{ rotate: [-360, 360] }}*/}
					{/*	transition={{*/}
					{/*		repeat: Infinity,*/}
					{/*		repeatType: "loop",*/}
					{/*		duration: 20,*/}
					{/*		ease: "linear",*/}
					{/*	}}*/}
					{/*	className="flex items-center absolute top-36 -left-16 xm:hidden sm:hidden">*/}
					{/*	<Image*/}
					{/*		src={heroCircle}*/}
					{/*		alt="heroCircleImg"*/}
					{/*		width={120}*/}
					{/*		height={120}*/}
					{/*	/>*/}
					{/*</motion.div>*/}
				</div>
				<motion.div
					initial={{ borderTopWidth: 0, width: "0%" }}
					viewport={{ once: true }}
					whileInView={{
						borderTopWidth: 1,
						width: "100%",
						borderColor: "#0D1B2A",
						origin: "left",
					}}
					transition={{
						duration: 0.8,
						delay: 0.5,
						ease: "easeInOut",
					}}
					className="w-full mt-20 sm:mt-0 xm:mt-0"
				/>
				<div className="w-full flex justify-between relative">
					<div className="flex flex-col gap-5 relative xm:hidden sm:hidden">
						<Image
							src={arrowDown}
							alt="arrowDownImg"
							width={20}
							height={20}
							className="h-fit"
						/>
						<h1 className="whitespace-nowrap text-[20px] uppercase text-[#0D1B2A] font-normal leading-tight tracking-tight rotate-90 absolute -bottom-5 -left-[73px]">
							{t("start")}
						</h1>
					</div>
					<div className="flex flex-col gap-5">
						<h1
							className="text-[24px] xm:text-lg sm:text-lg text-[#0D1B2A] font-normal leading-tight tracking-tight"
							dangerouslySetInnerHTML={{ __html: t("where-the-journey") }}
						/>
						<div className="w-fit flex flex-col gap-2">
							<Link
								className="text-[18px] text-[#0D1B2A] font-normal leading-tight tracking-tight"
								href="/#our-ambition">
								{t("lets-build")}
							</Link>
							<div className="w-full h-[1px] rounded-lg bg-[#0D1B2A]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

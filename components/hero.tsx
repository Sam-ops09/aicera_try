"use client";
import gsap from "gsap";
import Link from "next/link";
import Navbar from "./navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { arrowDown } from "@/public";

// Constants
const ANIMATION_CONFIG = {
	EASING: 0.08,
	SPEED: 0.01,
	MIN_FONT_SIZE: 1,
	MAX_FONT_SIZE: 2500,
	THRESHOLD_PRECISION: 0.01,
	DEBOUNCE_DELAY: 100,
} as const;

const INTERSECTION_CONFIG = {
	root: null,
	rootMargin: '0px',
	threshold: 0.1,
} as const;

// Types
interface MouseMoveEvent {
	movementX: number;
	movementY: number;
}

interface AnimationState {
	xForce: number;
	yForce: number;
	requestId: number | null;
}

export default function Hero() {
	const t = useTranslations("heroContent");
	const textRef = useRef<HTMLSpanElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const animationElementRef = useRef<HTMLVideoElement | null>(null);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);

	// Animation state using useRef to persist across renders without causing re-renders
	const animationState = useRef<AnimationState>({
		xForce: 0,
		yForce: 0,
		requestId: null,
	});

	// Debounced resize function to improve performance
	const debounce = useCallback((func: () => void, delay: number) => {
		let timeoutId: NodeJS.Timeout;
		return () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(func, delay);
		};
	}, []);

	const resizeText = useCallback(() => {
		const container = containerRef.current;
		const text = textRef.current;

		if (!container || !text) {
			return;
		}

		const containerWidth = container.offsetWidth;
		let min = ANIMATION_CONFIG.MIN_FONT_SIZE;
		let max = ANIMATION_CONFIG.MAX_FONT_SIZE;

		while (min <= max) {
			const mid = Math.floor((min + max) / 2);
			text.style.fontSize = `${mid}px`;

			if (text.offsetWidth <= containerWidth) {
				min = mid + 1;
			} else {
				max = mid - 1;
			}
		}

		text.style.fontSize = `${max}px`;
	}, []);

	const debouncedResizeText = useMemo(
		() => debounce(resizeText, ANIMATION_CONFIG.DEBOUNCE_DELAY),
		[debounce, resizeText]
	);

	useEffect(() => {
		resizeText();
		window.addEventListener("resize", debouncedResizeText);

		return () => {
			window.removeEventListener("resize", debouncedResizeText);
		};
	}, [resizeText, debouncedResizeText]);

	// Preload the video with priority when in viewport
	useEffect(() => {
		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && videoRef.current) {
					// Only load the video when it's in viewport
					videoRef.current.src = './heroVideo.mp4';
					videoRef.current.load();
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersection, INTERSECTION_CONFIG);
		const currentVideoRef = videoRef.current;

		if (currentVideoRef) {
			observer.observe(currentVideoRef);
		}

		return () => {
			if (currentVideoRef) {
				observer.unobserve(currentVideoRef);
			}
			observer.disconnect();
		};
	}, []);

	const handleVideoLoaded = useCallback(() => {
		setIsVideoLoaded(true);
	}, []);

	// Linear interpolation function
	const lerp = useCallback((start: number, target: number, amount: number) =>
		start * (1 - amount) + target * amount, []);

	// Animation function
	const animate = useCallback(() => {
		const state = animationState.current;
		state.xForce = lerp(state.xForce, 0, ANIMATION_CONFIG.EASING);
		state.yForce = lerp(state.yForce, 0, ANIMATION_CONFIG.EASING);

		if (animationElementRef.current) {
			gsap.set(animationElementRef.current, {
				x: `+=${state.xForce}`,
				y: `+=${state.yForce}`
			});
		}

		if (Math.abs(state.xForce) < ANIMATION_CONFIG.THRESHOLD_PRECISION) state.xForce = 0;
		if (Math.abs(state.yForce) < ANIMATION_CONFIG.THRESHOLD_PRECISION) state.yForce = 0;

		if (state.xForce !== 0 || state.yForce !== 0) {
			state.requestId = requestAnimationFrame(animate);
		} else {
			if (state.requestId) {
				cancelAnimationFrame(state.requestId);
				state.requestId = null;
			}
		}
	}, [lerp]);

	const manageMouseMove = useCallback((e: MouseMoveEvent) => {
		const { movementX, movementY } = e;
		const state = animationState.current;

		state.xForce += movementX * ANIMATION_CONFIG.SPEED;
		state.yForce += movementY * ANIMATION_CONFIG.SPEED;

		if (state.requestId === null) {
			state.requestId = requestAnimationFrame(animate);
		}
	}, [animate]);

	const resetVideoPosition = useCallback(() => {
		if (animationElementRef.current) {
			gsap.to(animationElementRef.current, {
				x: 0,
				y: 0,
				duration: 0.5,
				ease: "power3.out"
			});
		}
		const state = animationState.current;
		state.xForce = 0;
		state.yForce = 0;
		if (state.requestId) {
			cancelAnimationFrame(state.requestId);
			state.requestId = null;
		}
	}, []);

	// Cleanup animation on unmount
	useEffect(() => {
		return () => {
			const state = animationState.current;
			if (state.requestId) {
				cancelAnimationFrame(state.requestId);
			}
		};
	}, []);

	// Memoized letter animation components
	const letterAnimations = useMemo(() =>
		"AICERA".split("").map((letter: string, index: number) => (
			<motion.p
				initial={{ y: "100%" }}
				whileInView={{ y: 0 }}
				transition={{
					delay: index * 0.08,
					duration: 1,
					ease: [0.4, 0, 0.2, 1],
				}}
				viewport={{ once: true }}
				key={index}>
				{letter}
			</motion.p>
		)), []);

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
					{letterAnimations}
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
							animationElementRef.current = el;
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
						<source src="/heroVideo.webm" type="video/webm" />
						<source src="/heroVideo.mp4" type="video/mp4" />
					</motion.video>
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

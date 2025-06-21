"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	whatwedoImg1,
	whatwedoImg2,
	whatwedoImg3,
	whatwedoImg4,
} from "@/public";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface CardData {
	id: number;
	title: string;
	heading1: string;
	heading2: string;
	para: string;
	href: string;
	bgColor: string;
	textColor: string;
	linkColor: string;
	image: any;
}

export default function Card() {
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);
	const contentRefs = useRef<HTMLDivElement[]>([]);
	const imageRefs = useRef<HTMLDivElement[]>([]);
	const parallaxRefs = useRef<HTMLDivElement[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const snapTimeoutRef = useRef<NodeJS.Timeout>();
	const isScrollingRef = useRef(false);
	const lastScrollY = useRef(0);
	const scrollDirection = useRef<'up' | 'down'>('down');
	const t = useTranslations("whatwedoContent");

	const cardData: CardData[] = [
		{
			id: 1,
			title: t("title1"),
			heading1: t("heading1"),
			heading2: t("heading2"),
			para: t("para1"),
			href: t("href1"),
			bgColor: t("bgColor1"),
			textColor: t("textColor1"),
			linkColor: t("linkColor1"),
			image: whatwedoImg1,
		},
		{
			id: 2,
			title: t("title2"),
			heading1: t("heading3"),
			heading2: t("heading4"),
			para: t("para2"),
			href: t("href2"),
			bgColor: t("bgColor2"),
			textColor: t("textColor2"),
			linkColor: t("linkColor2"),
			image: whatwedoImg2,
		},
		{
			id: 3,
			title: t("title3"),
			heading1: t("heading5"),
			heading2: t("heading6"),
			para: t("para3"),
			href: t("href3"),
			bgColor: t("bgColor3"),
			textColor: t("textColor3"),
			linkColor: t("linkColor3"),
			image: whatwedoImg3,
		},
		{
			id: 4,
			title: t("title4"),
			heading1: t("heading7"),
			heading2: t("heading8"),
			para: t("para4"),
			href: t("href4"),
			bgColor: t("bgColor4"),
			textColor: t("textColor4"),
			linkColor: t("linkColor4"),
			image: whatwedoImg4,
		},
	];

	// Helper function to snap to nearest card
	const snapToCard = useCallback((targetIndex: number) => {
		if (!containerRef.current || isScrollingRef.current) return;

		const { width: viewportWidth } = viewportSize;
		const { isMobile, isTablet, isLargeDesktop, isUltrawide } = getDeviceInfo(viewportWidth);

		// Calculate scroll distance (same logic as in useEffect)
		let scrollMultiplier: number;
		if (isMobile) {
			scrollMultiplier = 2.5;
		} else if (isTablet) {
			scrollMultiplier = 3;
		} else if (isUltrawide) {
			scrollMultiplier = 4;
		} else if (isLargeDesktop) {
			scrollMultiplier = 3.5;
		} else {
			scrollMultiplier = 3;
		}

		const totalWidth = cardData.length * viewportWidth;
		const baseScrollDistance = totalWidth - viewportWidth;
		const scrollDistance = baseScrollDistance * scrollMultiplier;

		// Calculate target scroll position
		const progress = targetIndex / (cardData.length - 1);
		const targetScrollY = containerRef.current.offsetTop + (scrollDistance * progress);

		// Set scrolling flag to prevent conflicts
		isScrollingRef.current = true;

		// Use native scrollTo for better browser compatibility
		window.scrollTo({
			top: targetScrollY,
			behavior: 'smooth'
		});

		setCurrentCardIndex(targetIndex);

		// Reset scrolling flag after animation
		setTimeout(() => {
			isScrollingRef.current = false;
		}, 1000);
	}, [viewportSize, cardData.length]);

	// Helper function to get device breakpoints
	const getDeviceInfo = (width: number) => {
		return {
			isMobile: width <= 768,
			isTablet: width > 768 && width <= 1024,
			isDesktop: width > 1024,
			isLargeDesktop: width > 1440,
			isUltrawide: width > 1920,
		};
	};

	// Update viewport size
	useEffect(() => {
		const updateViewportSize = () => {
			setViewportSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		updateViewportSize();
		window.addEventListener('resize', updateViewportSize);

		return () => window.removeEventListener('resize', updateViewportSize);
	}, []);

	useEffect(() => {
		if (!containerRef.current || !scrollContainerRef.current || viewportSize.width === 0) return;

		const container = containerRef.current;
		const scrollContainer = scrollContainerRef.current;

		const setupAnimation = () => {
			const { width: viewportWidth, height: viewportHeight } = viewportSize;
			const { isMobile, isTablet, isDesktop, isLargeDesktop, isUltrawide } = getDeviceInfo(viewportWidth);

			// Calculate scroll distance based on device type
			let scrollMultiplier: number;
			let minScrollDistance: number;

			if (isMobile) {
				scrollMultiplier = 2.5; // Reduced for mobile
				minScrollDistance = viewportWidth * 1.5;
			} else if (isTablet) {
				scrollMultiplier = 3;
				minScrollDistance = viewportWidth * 2;
			} else if (isUltrawide) {
				scrollMultiplier = 4; // More scroll for ultrawide
				minScrollDistance = viewportWidth * 3;
			} else if (isLargeDesktop) {
				scrollMultiplier = 3.5;
				minScrollDistance = viewportWidth * 2.5;
			} else {
				scrollMultiplier = 3;
				minScrollDistance = viewportWidth * 2;
			}

			// Calculate total width and scroll distance
			const totalWidth = cardData.length * viewportWidth;
			const baseScrollDistance = totalWidth - viewportWidth;
			const scrollDistance = Math.max(baseScrollDistance * scrollMultiplier, minScrollDistance);

			// Set container height based on device
			const containerHeight = isMobile ? '100svh' : '100vh';

			// Set up horizontal scroll container
			gsap.set(scrollContainer, {
				width: totalWidth,
				height: containerHeight,
			});

			// Clean up existing ScrollTriggers
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			
			// Clear any pending timeouts
			if (snapTimeoutRef.current) {
				clearTimeout(snapTimeoutRef.current);
			}

			// Create horizontal scroll timeline
			const horizontalTl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: "top top",
					end: () => `+=${scrollDistance}`,
					scrub: 1.2,
					pin: true,
					anticipatePin: 1,
					invalidateOnRefresh: true,
					refreshPriority: -1,
					onUpdate: (self) => {
						// Only update current card index, no snapping during scroll
						if (!isScrollingRef.current) {
							const progress = self.progress;
							const cardIndex = Math.round(progress * (cardData.length - 1));
							if (cardIndex !== currentCardIndex) {
								setCurrentCardIndex(cardIndex);
							}
						}
					},
				},
			});

			// Animate horizontal movement with easing
			horizontalTl.to(scrollContainer, {
				x: -baseScrollDistance,
				ease: "none",
			});

			return horizontalTl;
		};

		const horizontalTl = setupAnimation();

		// Set up individual card animations
		cardsRef.current.forEach((card, index) => {
			if (!card) return;

			const content = contentRefs.current[index];
			const image = imageRefs.current[index];
			const parallaxElement = parallaxRefs.current[index];

			// Initial setup - hide elements
			gsap.set([content, image], {
				opacity: 0,
				y: 50,
			});

			if (content) {
				const textElements = content.querySelectorAll('h4, h2, p, a, div');
				gsap.set(textElements, {
					opacity: 0,
					y: 30,
					x: -20,
				});
			}

			if (image) {
				gsap.set(image, {
					opacity: 0,
					scale: 0.9,
					rotation: 0,
				});
			}

			// Create reveal animation for each card with snap detection
			const cardTl = gsap.timeline({
				scrollTrigger: {
					trigger: card,
					start: "left 75%",
					end: "left 25%",
					scrub: 1.5,
					horizontal: true,
					containerAnimation: horizontalTl,
					onEnter: () => {
						// Card is entering viewport - update current index
						if (!isScrollingRef.current) {
							setCurrentCardIndex(index);
						}
					},
					onLeave: () => {
						// Card is leaving viewport
					},
					onEnterBack: () => {
						// Card is re-entering from the right
						if (!isScrollingRef.current) {
							setCurrentCardIndex(index);
						}
					},
					onLeaveBack: () => {
						// Card is leaving back to the left
					},
				}
			});

			// Animate content reveal
			if (content) {
				const textElements = content.querySelectorAll('h4, h2, p, a, div');
				cardTl
					.to(content, {
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power2.out",
					}, 0)
					.to(textElements, {
						opacity: 1,
						y: 0,
						x: 0,
						duration: 0.6,
						stagger: 0.08,
						ease: "power2.out",
					}, 0.2);
			}

			// Animate image reveal
			if (image) {
				cardTl.to(image, {
					opacity: 1,
					scale: 1,
					rotation: 0,
					duration: 1.2,
					ease: "back.out(1.2)",
				}, 0.4);
			}

			// Subtle parallax effect for background elements
			if (parallaxElement) {
				gsap.to(parallaxElement, {
					x: -30,
					scrollTrigger: {
						trigger: card,
						start: "left right",
						end: "right left",
						scrub: 2.5,
						horizontal: true,
						containerAnimation: horizontalTl,
					}
				});
			}

			// Image parallax effect
			if (image) {
				gsap.to(image, {
					x: 15,
					scrollTrigger: {
						trigger: card,
						start: "left right",
						end: "right left",
						scrub: 3.5,
						horizontal: true,
						containerAnimation: horizontalTl,
					}
				});
			}
		});

		// Set loaded state
		const loadTimeout = setTimeout(() => setIsLoaded(true), 150);

		return () => {
			clearTimeout(loadTimeout);
			if (snapTimeoutRef.current) {
				clearTimeout(snapTimeoutRef.current);
			}
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	}, [cardData.length, viewportSize]);


	return (
		<div
			className="w-full min-h-screen relative overflow-hidden"
			ref={containerRef}>

			{/* Horizontal Scroll Container */}
			<div
				ref={scrollContainerRef}
				className="flex h-full">

				{cardData.map((card, index) => (
					<div
						key={card.id}
						ref={(el) => {
							if (el) cardsRef.current[index] = el;
						}}
						className="w-screen h-full flex-shrink-0 relative flex items-center justify-center"
						style={{ backgroundColor: card.bgColor }}
					>

						{/* Parallax Background Element */}
						<div
							ref={(el) => {
								if (el) parallaxRefs.current[index] = el;
							}}
							className="absolute inset-0 opacity-10"
							style={{
								background: `radial-gradient(circle at 30% 70%, ${card.linkColor}40 0%, transparent 50%)`
							}}
						/>

						{/* Card Content */}
						<div className="w-full max-w-7xl h-full flex items-center justify-between gap-8 px-6
							xm:flex-col xm:justify-center xm:gap-6 xm:px-4 xm:py-8
							sm:flex-col sm:justify-center sm:gap-8 sm:px-6 sm:py-8
							md:gap-12 md:px-8
							lg:gap-16 lg:px-12
							xl:gap-20 xl:px-16
							2xl:gap-24 2xl:px-20
							relative z-10">

							{/* Content Section */}
							<div
								ref={(el) => {
									if (el) contentRefs.current[index] = el;
								}}
								className="w-1/2 flex flex-col justify-center gap-8
									xm:w-full xm:gap-4 xm:text-center xm:px-2
									sm:w-full sm:gap-6 sm:text-center sm:px-4
									md:gap-8 md:px-6
									lg:gap-10 lg:px-8
									xl:gap-12">

								<div className="flex flex-col gap-4 xm:gap-3 sm:gap-4 md:gap-5 lg:gap-6">
									<h4
										className="text-2xl leading-tight tracking-tighter opacity-80
											xm:text-lg xm:leading-snug
											sm:text-xl sm:leading-tight
											md:text-2xl
											lg:text-3xl
											xl:text-4xl"
										style={{ color: card.textColor }}
									>
										{card.title}
									</h4>

									<h2
										className="font-bold leading-tight tracking-tighter
											text-4xl xm:text-3xl
											sm:text-4xl
											md:text-5xl
											lg:text-6xl
											xl:text-7xl
											2xl:text-8xl"
										style={{ color: card.textColor }}>
										{card.heading1}
										<br />
										{card.heading2}
									</h2>

									<p
										className="leading-relaxed tracking-tight max-w-lg
											text-base xm:text-sm xm:max-w-none xm:leading-relaxed
											sm:text-base sm:max-w-none sm:leading-relaxed
											md:text-lg md:max-w-xl
											lg:text-xl lg:max-w-2xl
											xl:text-2xl"
										style={{ color: card.textColor }}>
										{card.para}
									</p>
								</div>

								<div className="w-fit flex flex-col gap-2
									xm:w-full xm:items-center
									sm:w-full sm:items-center
									md:w-fit">
									<Link
										key={card.id}
										style={{ color: card.linkColor }}
										className="font-medium leading-tight tracking-tight hover:opacity-80 transition-opacity duration-300 relative group
											text-base xm:text-sm
											sm:text-base
											md:text-lg
											lg:text-xl"
										href={card.href}>
										{card.href}
										<span
											className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"
											style={{ backgroundColor: card.linkColor }}
										>
										</span>
									</Link>
								</div>
							</div>

							{/* Image Section */}
							<div
								ref={(el) => {
									if (el) imageRefs.current[index] = el;
								}}
								className="w-1/2 flex items-center justify-center p-8
									xm:w-full xm:p-4
									sm:w-full sm:p-6
									md:p-8
									lg:p-10
									xl:p-12">

								<div className="relative w-full max-w-md
									xm:max-w-xs
									sm:max-w-sm
									md:max-w-md
									lg:max-w-lg
									xl:max-w-xl
									2xl:max-w-2xl">

									<Image
										src={card.image}
										alt={card.title}
										className="relative w-full h-auto object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
										priority={index === 0}
										sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Card Indicators */}
			<div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3
				xm:right-4 xm:gap-2 sm:right-6 sm:gap-2">
				{cardData.map((_, index) => (
					<button
						key={index}
						onClick={() => snapToCard(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white/30
							xm:w-2 xm:h-2 sm:w-2.5 sm:h-2.5
							${currentCardIndex === index
							? 'bg-white/80 border-white/80 scale-125'
							: 'bg-white/20 hover:bg-white/40 hover:border-white/50'
						}`}
						aria-label={`Go to card ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
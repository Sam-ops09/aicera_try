"use client";
import Slider from "@/components/slider";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import {
	Hero,
	Preload,
} from "@/components";

// Lazy load heavy components for better performance
const Journey = lazy(() => import("@/components/journey"));
const AboutUs = lazy(() => import("@/components/about"));
const Companies = lazy(() => import("@/components/companies"));
const Whatwedo = lazy(() => import("@/components/whatwedo"));
const Collaboration = lazy(() => import("@/components/collaboration"));
const Footer = lazy(() => import("@/components/footer"));

// Configuration constants
const LOADING_DURATION = 2000;
const LOADING_FALLBACK_HEIGHT = "100px"; // Prevent layout shift

export default function HomePage() {
	const [isLoading, setIsLoading] = useState(true);
	const lenisRef = useRef<Lenis | null>(null);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		// Initialize Lenis smooth scrolling
		lenisRef.current = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		function raf(time: number) {
			lenisRef.current?.raf(time);
			rafRef.current = requestAnimationFrame(raf);
		}

		rafRef.current = requestAnimationFrame(raf);

		// Set loading timeout
		const timeout = setTimeout(() => {
			setIsLoading(false);
			// Reset cursor style more safely
			if (typeof document !== 'undefined') {
				document.body.style.cursor = "default";
			}
		}, LOADING_DURATION);

		// Cleanup function
		return () => {
			clearTimeout(timeout);
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
			lenisRef.current?.destroy();
		};
	}, []);

	return (
		<>
			<AnimatePresence mode="wait">
				{isLoading && <Preload />}
			</AnimatePresence>
			
			{!isLoading && (
				<>
					{/* Critical above-the-fold content - load immediately */}
					<Hero />
					
					{/* Lazy load remaining components with fallbacks */}
					<Suspense fallback={<div style={{ height: LOADING_FALLBACK_HEIGHT }} />}>
						<Journey />
					</Suspense>
					
					<Suspense fallback={<div style={{ height: LOADING_FALLBACK_HEIGHT }} />}>
						<AboutUs />
					</Suspense>
					
					<Suspense fallback={<div style={{ height: LOADING_FALLBACK_HEIGHT }} />}>
						<Companies />
					</Suspense>
					
					<Suspense fallback={<div style={{ height: LOADING_FALLBACK_HEIGHT }} />}>
						<Whatwedo />
					</Suspense>
					
					<Suspense fallback={<div style={{ height: LOADING_FALLBACK_HEIGHT }} />}>
						<Slider />
					</Suspense>
					
					<Suspense fallback={<div style={{ height: LOADING_FALLBACK_HEIGHT }} />}>
						<Collaboration />
					</Suspense>
					
					<Suspense fallback={<div style={{ height: LOADING_FALLBACK_HEIGHT }} />}>
						<Footer />
					</Suspense>
				</>
			)}
		</>
	);
}

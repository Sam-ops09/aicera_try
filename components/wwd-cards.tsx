"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useRef, useMemo, memo } from "react";
import { useTranslations } from "next-intl";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import {
	whatwedoImg1,
	whatwedoImg2,
	whatwedoImg3,
	whatwedoImg4,
} from "@/public";

// Types for better type safety
interface CardData {
	id: number;
	image: StaticImageData;
	titleKey: string;
	heading1Key: string;
	heading2Key: string;
	paraKey: string;
	hrefKey: string;
	bgColorKey: string;
	textColorKey: string;
	linkColorKey: string;
}

interface CardItemProps {
	data: CardData;
	index: number;
	t: (key: string) => string;
}

// Constants for better maintainability
const SCROLL_OFFSET: [string, string] = ["start end", "start start"];
const SCALE_RANGE: [number, number] = [0.7, 1];
const CARD_HEIGHT = 800;
const CARD_SPACING = 25;
const TOP_OFFSET = -5; // vh

// Memoized individual card component for better performance
const CardItem = memo<CardItemProps>(({ data, index, t }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const SCROLL_OFFSET: ["start end", "start start"] = ["start end", "start start"];

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: SCROLL_OFFSET,
	});

	const imageScale = useTransform(scrollYProgress, [0, 1], SCALE_RANGE);

	// Memoize style calculations
	const cardStyle = useMemo(() => ({
		backgroundColor: t(data.bgColorKey),
		top: `calc(${TOP_OFFSET}vh + ${(index + 1) * CARD_SPACING}px)`,
	}), [t, data.bgColorKey, index]);

	const textColor = useMemo(() => ({ color: t(data.textColorKey) }), [t, data.textColorKey]);
	const linkColor = useMemo(() => ({ color: t(data.linkColorKey) }), [t, data.linkColorKey]);
	const linkBgColor = useMemo(() => ({ backgroundColor: t(data.linkColorKey) }), [t, data.linkColorKey]);

	return (
		<div
			ref={containerRef}
			className="h-auto flex items-center justify-center sticky top-40 w-full xm:top-[10%] sm:top-[10%]"
			role="article"
			aria-labelledby={`card-heading-${data.id}`}
		>
			<motion.div
				style={cardStyle}
				className="w-full p-20 xm:p-7 sm:p-7 flex justify-between rounded-[30px] gap-10 relative -top-[45%] h-[800px] transform origin-top xm:flex-col sm:flex-col"
			>
				<div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10 xm:pt-5 sm:pt-5 xm:gap-5 sm:gap-5">
					<header className="flex flex-col gap-2">
						<h4
							className="text-[24px] xm:text-lg sm:text-lg leading-tight tracking-tighter"
							style={textColor}
						>
							{t(data.titleKey)}
						</h4>
						<h2
							id={`card-heading-${data.id}`}
							className="text-[80px] xm:text-[40px] sm:text-[40px] xm:leading-none sm:leading-none font-bold leading-[80px] tracking-tighter"
							style={textColor}
						>
							{t(data.heading1Key)}
							<br />
							{t(data.heading2Key)}
						</h2>
						<p
							className="text-[20px] sm:text-lg xm:text-lg leading-normal tracking-tighter text-justify"
							style={textColor}
						>
							{t(data.paraKey)}
						</p>
					</header>
					<nav className="w-fit flex flex-col gap-2">
						<Link
							style={linkColor}
							className="text-[18px] font-normal leading-tight tracking-tight hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
							href="/"
							aria-label={`${t(data.hrefKey)} - ${t(data.titleKey)}`}
						>
							{t(data.hrefKey)}
						</Link>
						<div
							className="w-full h-[1px] rounded-lg"
							style={linkBgColor}
							aria-hidden="true"
						/>
					</nav>
				</div>
				<motion.div
					className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
					style={{ scale: imageScale }}
				>
					<Image
						src={data.image}
						alt={`${t(data.titleKey)} - ${t(data.heading1Key)} ${t(data.heading2Key)}`}
						className="w-[80%] object-cover"
						priority={index < 2} // Prioritize first two images
						sizes="(max-width: 768px) 100vw, 50vw"
					/>
				</motion.div>
			</motion.div>
		</div>
	);
});

CardItem.displayName = 'CardItem';

export default function WwdCards() {
	const t = useTranslations("whatwedoContent");

	// Memoize card data to prevent unnecessary re-renders
	const cardData: CardData[] = useMemo(() => [
		{
			id: 1,
			image: whatwedoImg1,
			titleKey: "title1",
			heading1Key: "heading1",
			heading2Key: "heading2",
			paraKey: "para1",
			hrefKey: "href1",
			bgColorKey: "bgColor1",
			textColorKey: "textColor1",
			linkColorKey: "linkColor1",
		},
		{
			id: 2,
			image: whatwedoImg2,
			titleKey: "title2",
			heading1Key: "heading3",
			heading2Key: "heading4",
			paraKey: "para2",
			hrefKey: "href2",
			bgColorKey: "bgColor2",
			textColorKey: "textColor2",
			linkColorKey: "linkColor2",
		},
		{
			id: 3,
			image: whatwedoImg3,
			titleKey: "title3",
			heading1Key: "heading5",
			heading2Key: "heading6",
			paraKey: "para3",
			hrefKey: "href3",
			bgColorKey: "bgColor3",
			textColorKey: "textColor3",
			linkColorKey: "linkColor3",
		},
		{
			id: 4,
			image: whatwedoImg4,
			titleKey: "title4",
			heading1Key: "heading7",
			heading2Key: "heading8",
			paraKey: "para4",
			hrefKey: "href4",
			bgColorKey: "bgColor4",
			textColorKey: "textColor4",
			linkColorKey: "linkColor4",
		},
	], []);

	return (
		<section aria-label="What we do cards" role="region">
			{cardData.map((data, index) => (
				<CardItem
					key={data.id}
					data={data}
					index={index}
					t={t}
				/>
			))}
		</section>
	);
}
"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";

import {
    whatwedoImg1,
    whatwedoImg2,
    whatwedoImg3,
    whatwedoImg4,
} from "@/public";

// Register GSAP plugins safely on client-side only
if (typeof window !== "undefined") {
    gsap.registerPlugin();
}

// Define breakpoint constants
const BREAKPOINTS = {
    MOBILE: 640,
    SMALL_TABLET: 768,
    TABLET: 1024,
    DESKTOP: 1280
};

// Define animation constants
const ANIMATION_CONFIG = {
    CAROUSEL_DURATION: 40,
    DEBOUNCE_DELAY: 200
};

// TypeScript interfaces for better type safety
interface CardDimensions {
    cardWidth: number;
    cardHeight: number;
    gap: number;
}

interface CardData {
    bg: string;
    text: string;
    link: string;
    heading: string[];
    para: string;
    img: {
        src?: string;
    };
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    
    return function(...args: Parameters<T>) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Get card data from translations
const getCards = (t: (key: string) => string): CardData[] => [
    {
        bg: t("bgColor1"),
        text: t("textColor1"),
        link: t("linkColor1"),
        heading: [t("heading1"), t("heading2")],
        para: t("para1"),
        img: whatwedoImg1,
    },
    {
        bg: t("bgColor2"),
        text: t("textColor2"),
        link: t("linkColor2"),
        heading: [t("heading3"), t("heading4")],
        para: t("para2"),
        img: whatwedoImg2,
    },
    {
        bg: t("bgColor3"),
        text: t("textColor3"),
        link: t("linkColor3"),
        heading: [t("heading5"), t("heading6")],
        para: t("para3"),
        img: whatwedoImg3,
    },
    {
        bg: t("bgColor4"),
        text: t("textColor4"),
        link: t("linkColor4"),
        heading: [t("heading7"), t("heading8")],
        para: t("para4"),
        img: whatwedoImg4,
    },
];

// Responsive dimensions based on breakpoints
const getResponsiveDimensions = (): CardDimensions => {
    if (typeof window === "undefined") {
        return { cardWidth: 280, cardHeight: 360, gap: 16 };
    }

    const width = window.innerWidth;

    if (width < BREAKPOINTS.MOBILE) { // mobile
        return {
            cardWidth: Math.min(280, width - 48),
            cardHeight: 360,
            gap: 16,
        };
    } else if (width < BREAKPOINTS.SMALL_TABLET) { // small tablet
        return {
            cardWidth: 280,
            cardHeight: 360,
            gap: 20,
        };
    } else if (width < BREAKPOINTS.TABLET) { // tablet
        return {
            cardWidth: 300,
            cardHeight: 380,
            gap: 24,
        };
    } else if (width < BREAKPOINTS.DESKTOP) { // desktop
        return {
            cardWidth: 320,
            cardHeight: 400,
            gap: 28,
        };
    } else { // large desktop
        return {
            cardWidth: 340,
            cardHeight: 420,
            gap: 32,
        };
    }
};

// Individual Card component
const Card = ({ 
    card, 
    dimensions, 
    index 
}: { 
    card: CardData; 
    dimensions: CardDimensions; 
    index: number 
}) => {
    const { cardWidth, cardHeight, gap } = dimensions;
    
    return (
        <div 
            className="card-item p-4 sm:p-6"
            style={{
                backgroundColor: card.bg,
                color: card.text,
                width: cardWidth,
                height: cardHeight,
                marginRight: gap,
                flexShrink: 0,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
                position: "relative"
            }}
            aria-label={`Card ${index + 1}`}
        >
            <div className="relative flex-shrink-0 h-32 sm:h-40 lg:h-44 rounded-xl overflow-hidden mb-3 sm:mb-4">
                <Image 
                    src={card.img.src || ""}
                    alt={`Card ${index + 1} image`}
                    className="object-cover rounded-xl"
                    fill
                    sizes={`(max-width: ${BREAKPOINTS.MOBILE}px) 100vw, (max-width: ${BREAKPOINTS.TABLET}px) 50vw, 33vw`}
                    priority={index < 2} // Prioritize loading first two images
                />
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 leading-snug tracking-tight">
                {card.heading.map((h, i) => (
                    <span key={i} className="block">{h}</span>
                ))}
            </h2>
            <p className="text-sm sm:text-base flex-grow">{card.para}</p>
            <div 
                className="mt-3 sm:mt-4 h-1 rounded-full" 
                style={{ backgroundColor: card.link }}
                aria-hidden="true"
            />
        </div>
    );
};

export default function InfiniteCardCarousel() {
    const t = useTranslations("aboutUsContent");
    const cards = getCards(t);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<CardDimensions>(getResponsiveDimensions());
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    
    // Create a duplicate set of cards for the infinite effect
    const allCards = [...cards, ...cards];

    // Debounced resize handler
    const handleResize = useCallback(
        debounce(() => {
            const newDimensions = getResponsiveDimensions();
            setDimensions(newDimensions);
        }, ANIMATION_CONFIG.DEBOUNCE_DELAY),
        []
    );

    // Handle window resize with debouncing
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial dimensions
        
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    // Setup GSAP animation
    useEffect(() => {
        if (!containerRef.current) return;

        try {
            // Kill existing animations
            if (animationRef.current) {
                animationRef.current.kill();
            }

            const container = containerRef.current;
            const cardsCount = cards.length;
            const { cardWidth, gap } = dimensions;

            // Setup horizontal layout
            gsap.set(container, {
                display: "flex",
                flexWrap: "nowrap",
                overflow: "visible",
                width: "max-content",
            });

            // Calculate scroll distance for animation
            const scrollDistance = (cardWidth + gap) * cardsCount;
            
            // Create infinite scroll timeline
            const infiniteScroll = gsap.timeline({
                repeat: -1,
                defaults: { ease: "linear" }
            });

            infiniteScroll.to(container, {
                x: `-=${scrollDistance}px`,
                duration: ANIMATION_CONFIG.CAROUSEL_DURATION,
                modifiers: {
                    x: (x) => {
                        const mod = parseFloat(x) % scrollDistance;
                        return `${mod}px`;
                    },
                },
            });

            animationRef.current = infiniteScroll;
        } catch (error) {
            console.error("Error setting up carousel animation:", error);
        }

        // Cleanup
        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [dimensions, cards]);

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!animationRef.current) return;
            
            // Pause animation on focus
            if (e.key === 'Tab' && containerRef.current?.contains(document.activeElement)) {
                animationRef.current.pause();
            }
            
            // Resume animation when focus leaves
            if (e.key === 'Tab' && !containerRef.current?.contains(document.activeElement)) {
                animationRef.current.play();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div 
            className="relative w-full flex justify-center py-4 sm:py-6 overflow-hidden"
            role="region"
            aria-label="Card carousel"
        >
            <div
                ref={containerRef}
                className="select-none cursor-grab"
                style={{
                    userSelect: "none",
                    touchAction: "pan-y",
                    position: "relative",
                    width: "max-content",
                    willChange: "transform",
                    maxWidth: "100vw",
                }}
                tabIndex={0}
                aria-roledescription="carousel"
            >
                {allCards.map((card, index) => (
                    <Card 
                        key={`card-${index}`} 
                        card={card} 
                        dimensions={dimensions} 
                        index={index % cards.length}
                    />
                ))}
            </div>
        </div>
    );
}
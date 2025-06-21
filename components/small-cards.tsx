"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";

import {
    whatwedoImg1,
    whatwedoImg2,
    whatwedoImg3,
    whatwedoImg4,
} from "@/public";

if (typeof window !== "undefined") {
    gsap.registerPlugin();
}

const getCards = (t: (key: string) => string) => [
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

// Responsive breakpoints and dimensions
const getResponsiveDimensions = () => {
    if (typeof window === "undefined") {
        return { cardWidth: 280, cardHeight: 360, gap: 16 };
    }

    const width = window.innerWidth;

    if (width < 640) { // mobile
        return {
            cardWidth: Math.min(280, width - 48),
            cardHeight: 360,
            gap: 16,
        };
    } else if (width < 768) { // small tablet
        return {
            cardWidth: 280,
            cardHeight: 360,
            gap: 20,
        };
    } else if (width < 1024) { // tablet
        return {
            cardWidth: 300,
            cardHeight: 380,
            gap: 24,
        };
    } else if (width < 1280) { // desktop
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

export default function CardV2() {
    const t = useTranslations("aboutUsContent");
    const cards = getCards(t);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState(getResponsiveDimensions());
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    // Animation config
    const carouselDuration = 40;

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const newDimensions = getResponsiveDimensions();
            setDimensions(newDimensions);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial dimensions

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        // Kill existing animations
        if (animationRef.current) {
            animationRef.current.kill();
        }

        const container = containerRef.current;
        const cardsCount = cards.length;
        const { cardWidth, cardHeight, gap } = dimensions;

        // Clear container and rebuild
        container.innerHTML = '';
        cards.forEach((card, idx) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card-item text-[#0D1B2A] p-4 sm:p-6';
            cardElement.innerHTML = `
                <div class="relative flex-shrink-0 h-32 sm:h-40 lg:h-44 rounded-xl overflow-hidden mb-3 sm:mb-4">
                    <img 
                        src="${card.img.src || card.img}" 
                        alt="card image" 
                        class="w-full h-full object-cover rounded-xl"
                        loading="lazy"
                    />
                </div>
                <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-2 leading-snug tracking-tight">
                    ${card.heading.map(h => `<span class="block">${h}</span>`).join('')}
                </h2>
                <p class="text-sm sm:text-base flex-grow">${card.para}</p>
                <div class="mt-3 sm:mt-4 h-1 rounded-full" style="background-color: ${card.link}"></div>
            `;
            cardElement.style.backgroundColor = card.bg;
            cardElement.style.color = card.text;
            container.appendChild(cardElement);
        });

        // Duplicate cards for infinite loop
        const originalHTML = container.innerHTML;
        container.innerHTML += originalHTML;

        const allCards = container.querySelectorAll(".card-item");

        // Setup horizontal layout (carousel only)
        gsap.set(container, {
            display: "flex",
            flexWrap: "nowrap",
            overflow: "visible",
            width: "max-content",
        });

        allCards.forEach((card, i) => {
            gsap.set(card, {
                position: "relative",
                width: cardWidth,
                height: cardHeight,
                marginRight: gap,
                flexShrink: 0,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
            });
        });

        // Simple infinite scroll timeline
        const scrollDistance = (cardWidth + gap) * cardsCount;
        const infiniteScroll = gsap.timeline({
            repeat: -1,
            defaults: { ease: "linear" }
        });

        infiniteScroll.to(container, {
            x: `-=${scrollDistance}px`,
            duration: carouselDuration,
            modifiers: {
                x: (x) => {
                    const mod = parseFloat(x) % scrollDistance;
                    return `${mod}px`;
                },
            },
        });

        animationRef.current = infiniteScroll;

        // Cleanup
        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [cards, dimensions]);

    return (
        <div className="relative w-full flex justify-center py-4 sm:py-6 overflow-hidden">
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
            />
        </div>
    );
}
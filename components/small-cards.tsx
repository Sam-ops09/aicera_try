"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
    whatwedoImg1,
    whatwedoImg2,
    whatwedoImg3,
    whatwedoImg4,
} from "@/public";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
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

export default function CardV2() {
    const t = useTranslations("aboutUsContent");
    const cards = getCards(t);
    const containerRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        containerRefs.current.forEach((container, idx) => {
            if (!container) return;
            const image = container.querySelector(".card-image");
            const text = container.querySelector(".card-text");

            gsap.fromTo(
                image,
                { x: 150, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse",
                    },
                    duration: 1,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                text,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse",
                    },
                    duration: 1,
                    ease: "power2.out",
                }
            );
        });
    }, []);

    return (
        <>
            {cards.map((card, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        containerRefs.current[index] = el;
                    }}
                    className="h-auto flex items-center justify-center sticky top-40 w-full xm:top-[10%] sm:top-[10%]"
                >
                    <div
                        className="w-full p-14 xm:p-6 sm:p-6 flex justify-between rounded-3xl gap-8 relative -top-[45%] h-[500px] transform origin-top xm:flex-col sm:flex-col overflow-hidden"
                        style={{ backgroundColor: card.bg }}
                    >
                        <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-10 pt-8 xm:pt-4 sm:pt-4 xm:gap-4 sm:gap-4 card-text">
                            <div className="flex flex-col gap-2">
                                <h2
                                    className="text-[60px] xm:text-[32px] sm:text-[32px] xm:leading-none sm:leading-none font-bold leading-[65px] tracking-tighter"
                                    style={{ color: card.text }}
                                >
                                    {card.heading.map((h, idx) => (
                                        <span key={idx} className="block">
                      {h}
                    </span>
                                    ))}
                                </h2>
                                <p
                                    className="text-[18px] sm:text-base xm:text-base leading-normal tracking-tighter"
                                    style={{ color: card.text }}
                                >
                                    {card.para}
                                </p>
                            </div>
                            <div className="w-fit flex flex-col gap-2">
                                <div
                                    className="w-full h-[1px] rounded-lg"
                                    style={{ backgroundColor: card.link }}
                                />
                            </div>
                        </div>
                        <div className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center card-image">
                            <Image
                                src={card.img}
                                alt="whatwedoImg"
                                className="w-[75%] object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
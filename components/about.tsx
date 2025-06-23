"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {whatwedoCircleImg} from "@/public";
import {CardV2, Marquee} from "@/components/index";

export default function AboutUs() {
    const t = useTranslations("aboutUsContent");
    return (
        <div
            id="About-Us"
            className="w-full pb-6 bg-[#E1E2E1] relative"
        >
            {/*<motion.div*/}
            {/*    animate={{ rotate: [-360, 360] }}*/}
            {/*    transition={{*/}
            {/*        repeat: Infinity,*/}
            {/*        repeatType: "loop",*/}
            {/*        duration: 20,*/}
            {/*        ease: "linear",*/}
            {/*    }}*/}
            {/*    className="flex items-center absolute -top-14 right-40">*/}
            {/*    <Image*/}
            {/*        src={whatwedoCircleImg}*/}
            {/*        alt="heroCircleImg"*/}
            {/*        width={120}*/}
            {/*        height={120}*/}
            {/*    />*/}
            {/*</motion.div>*/}
            <Marquee
                className="text-[#0D1B2A]"
                title1="About Us"
                title2="About Us"
            />

            <div className="w-full flex items-center justify-center pt-10 pb-10">
                <div className="w-[80%] xm:w-full sm:w-full xm:padding-x sm:padding-x">
                    <p
                        className="text-[22px] text-[#0D1B2A] leading-tight tracking-tight"
                        dangerouslySetInnerHTML={{ __html: t("aboutUsHeading") }}
                    />
                </div>
            </div>

            <div className="w-full relative">
                <div className="w-full padding-x">
                    <CardV2 />
                </div>
            </div>

            {/*<div className="h-[20vh]" />*/}
        </div>
    );
}


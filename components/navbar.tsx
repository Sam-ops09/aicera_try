"use client";

import Link from "next/link";
import Image from "next/image";
import { links } from "@/constants";
import TextHover from "./text-hover";
import { navVariants } from "@/motion";
import { useRouter } from "next/navigation";
import { blackCircle, logo } from "@/public";
import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
    const t = useTranslations("navbarContent");
    const [active, setActive] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const currentLocale = useLocale();

    const onSelectChange = () => {
        const nextLocale = currentLocale === "en" ? "nl" : "en";
        startTransition(() => {
            router.replace(`/${nextLocale}`);
        });
    };

    return (
        <>
            <motion.nav
                className="w-full py-3 padding-x fixed top-0 left-0 z-50 flex items-center justify-between"
                initial="hidden"
                whileInView="visible"
                variants={navVariants}
            >
                {/* ------------------------------------------------------------------ */}
                {/*  Logo wrapped in a translucent “glass” badge                       */}
                {/* ------------------------------------------------------------------ */}
                <div className="w-[50%] xs:w-[60%] xm:w-[55%]">
                    <Link href="/" className="block">
                        <div className="relative inline-flex items-center isolate">
                            {/* glass badge */}
                            <span className="absolute inset-0 rounded-xl bg-[#E1E2E1] backdrop-blur-sm" />
                            {/* single original asset */}
                            <Image
                                src={logo}
                                alt="AICERA logo"
                                width={150}
                                height={100}
                                className="relative z-10 xs:w-[70px] xs:h-[45px] xm:w-[80px] xm:h-[50px] sm:w-[90px] sm:h-[60px] md:w-[120px] md:h-[80px] lg:w-[150px] lg:h-[100px] transition-opacity duration-300 hover:opacity-80 drop-shadow-[0_0_3px_rgba(0,0,0,0.25)] object-contain"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* ------------------------------------------------------------------ */}
                {/*  Right-hand side                                                   */}
                {/* ------------------------------------------------------------------ */}
                <div className="flex gap-x-4">
                    {/*<button*/}
                    {/*  className="text-[17px] font-semibold uppercase text-[#260A2F] bg-secondary rounded-full leading-tight tracking-tight px-6 py-3 xm:py-2 sm:py-2 xm:px-4 sm:px-4"*/}
                    {/*  onClick={onSelectChange}*/}
                    {/*  disabled={isPending}>*/}
                    {/*  {currentLocale === "nl" ? "en" : "nl"}*/}
                    {/*</button>*/}

                    <div className="relative">
                        <button
                            className="flex gap-2 items-center text-[17px] xs:text-[14px] xm:text-[15px] sm:text-[16px] font-semibold capitalize text-[#E1E2E1] bg-[#0D1B2A] rounded-2xl leading-tight tracking-tight px-4 py-3 xs:px-3 xs:py-2 xm:py-2 sm:py-2 xm:px-3 sm:px-4 group"
                            onClick={() => setActive(!active)}
                        >
                            <Image
                                src={blackCircle}
                                alt="blackCircle"
                                width={20}
                                height={20}
                                className="group-hover:rotate-[90deg] transition-all duration-300 ease-linear xs:hidden xm:hidden sm:hidden md:block xs:w-[16px] xs:h-[16px] xm:w-[18px] xm:h-[18px]"
                            />
                            <span className="xs:text-[12px] xm:text-[14px] sm:text-[15px]">
                                <TextHover titile1="Menu" titile2="Menu" />
                            </span>
                        </button>

                        {/* dropdown animation */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={active ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="origin-top"
                        >
                            <AnimatePresence mode="wait">
                                {active && (
                                    <motion.div
                                        className="absolute flex flex-col gap-2 bg-secondary pl-5 pr-16 xs:pl-3 xs:pr-8 xm:pl-4 xm:pr-12 sm:pl-4 sm:pr-14 py-8 xs:py-4 xm:py-6 sm:py-7 rounded-[20px] xs:rounded-[15px] xm:rounded-[18px] right-0 mt-8 xs:mt-4 xm:mt-6 sm:mt-7 min-w-[120px] xs:min-w-[100px] shadow-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {links.map((link) => (
                                            <Link
                                                key={link.id}
                                                href={`#${link.href}`}
                                                className="text-[16px] xs:text-[13px] xm:text-[14px] sm:text-[15px] font-semibold capitalize text-[#0D1B2A] bg-secondary leading-tight tracking-tight hover:opacity-70 transition-opacity duration-200 py-1"
                                                onClick={() => setActive(!active)}
                                            >
                                                {t(link.href)}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </motion.nav>
        </>
    );
}
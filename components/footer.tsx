import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { blackCircle } from "@/public";
import { useTranslations } from "next-intl";
import { TextHover, Marquee } from "@/components";

export default function Footer() {
	const t = useTranslations("footerContent");
	return (
		<>
			<div
				id="get-in-touch"
				className="w-full min-h-screen xs:min-h-[80vh] xm:min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center padding-x justify-between pt-5 xs:pt-3 xm:pt-4 sm:pt-4">
				<Marquee
					titile1="Get in touch"
					titile2="Get in touch"
					className="text-[#0D1B2A]"
				/>
				<div className="w-[80%] xs:w-full xm:w-full sm:w-full flex flex-col gap-10 xs:gap-6 xm:gap-8 sm:gap-9">
					<div>
						<h1 className="text-[60px] xs:text-[28px] xm:text-[32px] sm:text-[36px] md:text-[48px] lg:text-[60px] xs:leading-[30px] xm:leading-[34px] sm:leading-[38px] md:leading-[50px] lg:leading-[62px] text-[#0D1B2A] font-bold tracking-tight text-center xs:text-left xm:text-left sm:text-left">
							{t("footerHeading1")}
						</h1>
					</div>
					<div>
						<p className="text-[25px] xs:text-[16px] xm:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] text-[#0D1B2A] leading-normal tracking-tight text-center xs:text-left xm:text-left sm:text-left">
							{t("footerHeading2")}
						</p>
					</div>
					<div className="flex items-center justify-center xs:justify-start xm:justify-start sm:justify-start">
						<button className="group flex gap-2 items-center text-[17px] xs:text-[14px] xm:text-[15px] sm:text-[16px] font-semibold capitalize text-[#E1E2E1] bg-[#0D1B2A] rounded-full leading-tight tracking-tight px-4 py-3 xs:px-3 xs:py-2 xm:px-3 xm:py-2 sm:px-4 sm:py-3 hover:bg-opacity-90 transition-all duration-200">
							<Image
								src={blackCircle}
								alt="blackCircle"
								width={30}
								height={30}
								className="group-hover:rotate-[90deg] transition-all duration-300 ease-linear xs:w-[20px] xs:h-[20px] xm:w-[24px] xm:h-[24px] sm:w-[26px] sm:h-[26px]"
							/>
							<TextHover
								titile1={t("footerBtn")}
								titile2={t("footerBtn")}
							/>
						</button>
					</div>
				</div>
				<div className="w-full flex justify-between gap-5 xs:gap-4 xm:gap-4 sm:gap-5 py-10 xs:py-6 xm:py-8 sm:py-9 xs:flex-col xm:flex-col sm:flex-col">
					<div className="w-1/2 xs:w-full xm:w-full sm:w-full flex gap-5 xs:gap-4 xm:gap-4 sm:gap-5 justify-between xs:flex-col xm:flex-col sm:flex-col">
						<div className="flex flex-col gap-5 xs:gap-3 xm:gap-4 sm:gap-4">
							<div className="flex flex-col">
								<p className="text-[16px] xs:text-[12px] xm:text-[13px] sm:text-[14px] text-[#0D1B2A] leading-tight tracking-tight">
									Phone
								</p>
								<Link
									className="text-[30px] xs:text-[18px] xm:text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-semibold text-[#0D1B2A] leading-tight tracking-tight hover:opacity-70 transition-opacity duration-200"
									href="tell:+91 53 234 0188">
									+31 53 234 0188
								</Link>
							</div>
							<div className="flex flex-col">
								<p className="text-[16px] xs:text-[12px] xm:text-[13px] sm:text-[14px] text-[#0D1B2A] leading-tight tracking-tight">
									linkedin
								</p>
								<Link
									className="text-[30px] xs:text-[18px] xm:text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-semibold text-[#0D1B2A] leading-tight tracking-tight hover:opacity-70 transition-opacity duration-200"
									href="https://www.linkedin.com/company/aicera/">
									@AICERA
								</Link>
							</div>
						</div>
						<div className="flex flex-col gap-5 xs:gap-3 xm:gap-4 sm:gap-4">
							<div className="flex flex-col">
								<p className="text-[16px] xs:text-[12px] xm:text-[13px] sm:text-[14px] text-[#0D1B2A] leading-tight tracking-tight">
									E-mail
								</p>
								<Link
									className="text-[30px] xs:text-[18px] xm:text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-semibold text-[#0D1B2A] leading-tight tracking-tight hover:opacity-70 transition-opacity duration-200 break-all xs:break-words"
									href="mailto:support@aicera.co.in">
									support@AICERA
								</Link>
							</div>
						</div>
					</div>
					<div className="w-[30%] xs:w-full xm:w-full sm:w-full">
						<div className="flex flex-col gap-10 xs:gap-6 xm:gap-8 sm:gap-9">
							<div className="flex flex-col">
								<p className="text-[16px] xs:text-[12px] xm:text-[13px] sm:text-[14px] text-[#0D1B2A] leading-tight tracking-tight">
									Bangalore
								</p>
								<Link
									className="text-[30px] xs:text-[18px] xm:text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-semibold text-[#0D1B2A] leading-tight tracking-tight hover:opacity-70 transition-opacity duration-200"
									href="/">
									Langestraat 45a, <br /> 7511 HB
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-col">
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
							duration: 1,
							ease: "easeInOut",
						}}
					/>
					<div className="w-full flex items-center justify-between py-4">
						<motion.h2
							initial={{ y: "100%" }}
							viewport={{ once: true }}
							whileInView={{
								y: 0,
							}}
							transition={{
								duration: 1,
								ease: "easeInOut",
							}}
							className="text-[#0D1B2A] text-sm overflow-hidden">
							AICERA 2025
						</motion.h2>
						<motion.h2
							initial={{ y: "100%" }}
							viewport={{ once: true }}
							whileInView={{
								y: 0,
							}}
							transition={{
								duration: 1,
								ease: "easeInOut",
							}}
							className="text-[#0D1B2A] text-sm overflow-hidden">
							Privacy Statement
						</motion.h2>
					</div>
				</div>
			</div>
		</>
	);
}

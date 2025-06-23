import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { blackCircle } from "@/public";
import { useTranslations } from "next-intl";
import { TextHover, Marquee } from "@/components";

// Constants for better maintainability
const COLORS = {
	primary: "#0D1B2A",
	light: "#E1E2E1",
} as const;

const CONTACT_INFO = {
	phone: {
		display: "+31 53 234 0188",
		href: "tel:+31532340188",
	},
	email: {
		display: "support@aicera.co.in",
		href: "mailto:support@aicera.co.in",
	},
	linkedin: {
		display: "@AICERA",
		href: "https://www.linkedin.com/company/aicera/",
	},
	address: {
		display: "Langestraat 45a,\n7511 HB",
		href: "https://maps.google.com/?q=Langestraat+45a,+7511+HB",
		location: "Enschede, Netherlands",
	},
} as const;

// Reusable style classes
const STYLES = {
	primaryText: `text-[${COLORS.primary}] leading-tight tracking-tight`,
	responsiveHeading: "text-[60px] xs:text-[28px] xm:text-[32px] sm:text-[36px] md:text-[48px] lg:text-[60px] xs:leading-[30px] xm:leading-[34px] sm:leading-[38px] md:leading-[50px] lg:leading-[62px]",
	responsiveSubheading: "text-[25px] xs:text-[16px] xm:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px]",
	responsiveContactLink: "text-[30px] xs:text-[18px] xm:text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-semibold",
	responsiveLabel: "text-[16px] xs:text-[12px] xm:text-[13px] sm:text-[14px]",
	responsiveButton: "text-[17px] xs:text-[14px] xm:text-[15px] sm:text-[16px]",
	responsiveGap: "gap-10 xs:gap-6 xm:gap-8 sm:gap-9",
	responsiveGapSmall: "gap-5 xs:gap-3 xm:gap-4 sm:gap-4",
	responsiveWidth: "xs:w-full xm:w-full sm:w-full",
	responsiveJustify: "xs:justify-start xm:justify-start sm:justify-start",
	responsiveAlign: "xs:text-left xm:text-left sm:text-left",
	responsiveFlex: "xs:flex-col xm:flex-col sm:flex-col",
} as const;

// Animation configurations
const ANIMATIONS = {
	fadeInUp: {
		initial: { y: "100%" },
		whileInView: { y: 0 },
		transition: { duration: 1, ease: "easeInOut" },
		viewport: { once: true },
	},
	expandBorder: {
		initial: { borderTopWidth: 0, width: "0%" },
		whileInView: {
			borderTopWidth: 1,
			width: "100%",
			borderColor: COLORS.primary,
		},
		transition: { duration: 1, ease: "easeInOut" },
		viewport: { once: true },
	},
} as const;

// Sub-components for better organization
const ContactItem = ({ 
	label, 
	href, 
	children, 
	className = "" 
}: { 
	label: string; 
	href: string; 
	children: React.ReactNode; 
	className?: string;
}) => (
	<div className="flex flex-col">
		<p className={`${STYLES.responsiveLabel} ${STYLES.primaryText}`}>
			{label}
		</p>
		<Link
			className={`${STYLES.responsiveContactLink} ${STYLES.primaryText} hover:opacity-70 transition-opacity duration-200 ${className}`}
			href={href}
		>
			{children}
		</Link>
	</div>
);

const AnimatedText = ({ 
	children, 
	className = "" 
}: { 
	children: React.ReactNode; 
	className?: string;
}) => (
	<motion.h2
		{...ANIMATIONS.fadeInUp}
		className={`${STYLES.primaryText} text-sm overflow-hidden ${className}`}
	>
		{children}
	</motion.h2>
);

export default function Footer() {
	const t = useTranslations("footerContent");
	
	return (
		<div
			id="get-in-touch"
			className="w-full min-h-screen xs:min-h-[80vh] xm:min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center padding-x justify-between pt-5 xs:pt-3 xm:pt-4 sm:pt-4"
		>
			<Marquee
				title1="Get in touch"
				title2="Get in touch"
				className={`text-[${COLORS.primary}]`}
			/>
			
			<div className={`w-[80%] ${STYLES.responsiveWidth} flex flex-col ${STYLES.responsiveGap}`}>
				<div>
					<h1 className={`${STYLES.responsiveHeading} ${STYLES.primaryText} font-bold text-center ${STYLES.responsiveAlign}`}>
						{t("footerHeading1")}
					</h1>
				</div>
				
				<div>
					<p className={`${STYLES.responsiveSubheading} ${STYLES.primaryText} leading-normal text-center ${STYLES.responsiveAlign}`}>
						{t("footerHeading2")}
					</p>
				</div>
				
				<div className={`flex items-center justify-center ${STYLES.responsiveJustify}`}>
					<button className={`group flex gap-2 items-center ${STYLES.responsiveButton} font-semibold capitalize text-[${COLORS.light}] bg-[${COLORS.primary}] rounded-full leading-tight tracking-tight px-4 py-3 xs:px-3 xs:py-2 xm:px-3 xm:py-2 sm:px-4 sm:py-3 hover:bg-opacity-90 transition-all duration-200`}>
						<Image
							src={blackCircle}
							alt="Contact button icon"
							width={30}
							height={30}
							className="group-hover:rotate-[90deg] transition-all duration-300 ease-linear xs:w-[20px] xs:h-[20px] xm:w-[24px] xm:h-[24px] sm:w-[26px] sm:h-[26px]"
						/>
						<TextHover
							title1={t("footerBtn")}
							title2={t("footerBtn")}
						/>
					</button>
				</div>
			</div>
			
			<div className={`w-full flex justify-between gap-5 xs:gap-4 xm:gap-4 sm:gap-5 py-10 xs:py-6 xm:py-8 sm:py-9 ${STYLES.responsiveFlex}`}>
				<div className={`w-1/2 ${STYLES.responsiveWidth} flex gap-5 xs:gap-4 xm:gap-4 sm:gap-5 justify-between ${STYLES.responsiveFlex}`}>
					<div className={`flex flex-col ${STYLES.responsiveGapSmall}`}>
						<ContactItem
							label="Phone"
							href={CONTACT_INFO.phone.href}
						>
							{CONTACT_INFO.phone.display}
						</ContactItem>
						
						<ContactItem
							label="LinkedIn"
							href={CONTACT_INFO.linkedin.href}
						>
							{CONTACT_INFO.linkedin.display}
						</ContactItem>
					</div>
					
					<div className={`flex flex-col ${STYLES.responsiveGapSmall}`}>
						<ContactItem
							label="E-mail"
							href={CONTACT_INFO.email.href}
							className="break-all xs:break-words"
						>
							{CONTACT_INFO.email.display}
						</ContactItem>
					</div>
				</div>
				
				<div className={`w-[30%] ${STYLES.responsiveWidth}`}>
					<div className={`flex flex-col ${STYLES.responsiveGap}`}>
						<ContactItem
							label={CONTACT_INFO.address.location}
							href={CONTACT_INFO.address.href}
						>
							{CONTACT_INFO.address.display.split('\n').map((line, index) => (
								<span key={index}>
									{line}
									{index === 0 && <br />}
								</span>
							))}
						</ContactItem>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-col">
				<motion.div {...ANIMATIONS.expandBorder} />
				<div className="w-full flex items-center justify-between py-4">
					<AnimatedText>AICERA 2025</AnimatedText>
					<AnimatedText>Privacy Statement</AnimatedText>
				</div>
			</div>
		</div>
	);
}

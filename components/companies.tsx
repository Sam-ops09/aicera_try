import { Marquee } from "@/components";
import { useTranslations } from "next-intl";

export default function Companies() {
	const t = useTranslations("companiesContent");
	return (
		<>
			<Marquee
				className="text-[#0D1B2A]"
				title1="Let's Migrate"
				title2=" to the future"
			/>
			<div className="w-full py-5 flex justify-center items-center padding-x">
				<div className="w-[80%] xm:w-full sm:w-full flex flex-col gap-10">
					<div>
						<h1 className="text-[38px] xm:text-[35px] sm:text-[30px] xm:leading-none sm:leading-none text-[#0D1B2A] font-bold leading-[60px] tracking-tight">
							{t("companiesHeading")}
						</h1>
					</div>
					<div>
						<p className="text-[23px] text-[#0D1B2A] leading-normal tracking-tight text-justify">
							{t("companiesPara")}
						</p>
					</div>
					<div>
						<p className="text-[20px] text-[#0D1B2A] leading-normal tracking-tight text-justify">
							{t("companiesPara1")}
						</p>
					</div>
					<div>
						<p className="text-[20px] text-[#0D1B2A] leading-normal tracking-tight text-justify">
							{t("companiesPara2")}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

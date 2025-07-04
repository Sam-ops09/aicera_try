import { TtextHoverProps } from "@/types";

export default function TextHover({ title1, title2 }: TtextHoverProps) {
	return (
		<div className="group overflow-hidden cursor-pointer transition-all ease-in-out duration-200">
			<div className="relative transition-all ease-in-out duration-500">
				<div>
					<span className="translate-y-[0%] group-hover:translate-y-[-100%] absolute left-0 transition-all ease-in-out duration-500">
						<div className="translate-y-[0%] group-hover:translate-y-[-100%] transition-all ease-in-out duration-500">
							{title1}
						</div>
					</span>
					<span className="relative transition-all ease-in-out duration-500">
						<div className="translate-y-[100%] group-hover:translate-y-[0%] transition-all ease-in-out duration-500">
							{title2}
						</div>
					</span>
				</div>
			</div>
		</div>
	);
}

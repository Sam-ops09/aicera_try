import { MotionValue } from "framer-motion";
import { StaticImageData } from "next/image";

export type TtextHoverProps = {
   title1: string;
   title2: string;
};

export type TmarqueeProps = {
   title1: string;
   title2: string;
   className: string;
};

export type Tcardsprops = {
   i: number,
   title: string,
   para: string,
   heading1: string,
   heading2: string,
   src: StaticImageData,
   href: string,
   bgColor: string,
   textColor: string,
   linkColor: string,
   progress: MotionValue<number>,
   range?: any,
};

export type TParagraphProps = {
   paragraph: string;
};

export type TWordProps = {
   children: string;
   progress: MotionValue<number>;
   range: number[];
};

export type TRoundedProps = {
   children: React.ReactNode;
   className?: string;
   backgroundColor: string;
};

export interface SlideData {
   titleKey: string;
   headingKey: string;
   paraKey: string;
}

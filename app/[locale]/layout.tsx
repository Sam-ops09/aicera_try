import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#ffffff"
};

export const metadata: Metadata = {
	title: "AICERA - Smarter Tech. Sharper Minds",
	description: "AICERA website by Samanyu B Rao",
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "AICERA - Smarter Tech. Sharper Minds",
		description: "AICERA website by Samanyu B Rao",
		type: "website",
	},
};

export async function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'nl' }];
}

type Props = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
	const resolvedParams = await params;
	const locale = resolvedParams.locale;



	unstable_setRequestLocale(locale);
	const messages = await getMessages({ locale });

	return (
		<html lang={locale}>
		<body suppressHydrationWarning>
		<NextIntlClientProvider messages={messages} locale={locale}>
			{children}
		</NextIntlClientProvider>
		</body>
		</html>
	);
}
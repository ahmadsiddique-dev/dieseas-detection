"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import Link from 'next/link'

export const navLinks = [
	// {
	// 	label: "Features",
	// 	href: "#",
	// },
	{
		label: "Contact",
		href: "/contact",
	},
	{
		label: "FAQs",
		href: "/faqs",
	},
];

export function Header() {
	const scrolled = useScroll(10);

	return (
		<header
			className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
				"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
					scrolled,
			})}
		>
			<nav className="mx-auto bg-background flex h-14 w-full max-w-full items-center justify-between px-4">
				<Link
					className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
					href="/"
				>
					<Logo className="text-sm" />
				</Link>
				<div className="hidden items-center gap-2 md:flex">
					{navLinks.map((link) => (
						<Button asChild key={link.label} size="sm" variant="ghost">
							<Link href={link.href}>{link.label}</Link>
						</Button>
					))}
					<Link href="/signin"><Button variant="outline" size="sm">Sign In</Button></Link>
					<Link href="/signup"><Button size="sm">Try Detection</Button></Link>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}

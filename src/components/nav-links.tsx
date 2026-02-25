import type { LinkItemType } from "@/components/sheard";
import { LeafIcon, LayoutDashboardIcon, FileTextIcon, BarChart3Icon, DatabaseIcon, BrainCircuitIcon, UsersIcon, StarIcon, HandshakeIcon, ShieldIcon, RotateCcwIcon, BookOpenIcon, HelpCircleIcon } from "lucide-react";

export const productLinks: LinkItemType[] = [
	{
		label: "Disease Detection",
		href: "#",
		description: "Upload a rice leaf image for instant AI analysis",
		icon: (
			<BrainCircuitIcon
			/>
		),
	},
	{
		label: "User Dashboard",
		href: "#",
		description: "View results, history, and manage your account",
		icon: (
			<LayoutDashboardIcon
			/>
		),
	},
	{
		label: "Detection Reports",
		href: "#",
		description: "Download detailed disease analysis reports",
		icon: (
			<FileTextIcon
			/>
		),
	},
	{
		label: "Detection History",
		href: "#",
		description: "Access all your past detection records",
		icon: (
			<DatabaseIcon
			/>
		),
	},
	{
		label: "Disease Library",
		href: "#",
		description: "Browse supported rice leaf diseases and treatments",
		icon: (
			<LeafIcon
			/>
		),
	},
	{
		label: "Analytics",
		href: "#",
		description: "Track detection trends and crop health insights",
		icon: (
			<BarChart3Icon
			/>
		),
	},
];

export const companyLinks: LinkItemType[] = [
	{
		label: "About Us",
		href: "#",
		description: "Learn about our mission to support farmers",
		icon: (
			<UsersIcon
			/>
		),
	},
	{
		label: "Success Stories",
		href: "#",
		description: "See how farmers benefit from early disease detection",
		icon: (
			<StarIcon
			/>
		),
	},
	{
		label: "Research Partners",
		href: "#",
		icon: (
			<HandshakeIcon
			/>
		),
		description: "Our collaborations with agricultural institutions",
	},
];

export const companyLinks2: LinkItemType[] = [
	{
		label: "Terms of Service",
		href: "#",
		icon: (
			<FileTextIcon
			/>
		),
	},
	{
		label: "Privacy Policy",
		href: "#",
		icon: (
			<ShieldIcon
			/>
		),
	},
	{
		label: "Data Policy",
		href: "#",
		icon: (
			<RotateCcwIcon
			/>
		),
	},
	{
		label: "Agricultural Blog",
		href: "#",
		icon: (
			<BookOpenIcon
			/>
		),
	},
	{
		label: "Help Center",
		href: "#",
		icon: (
			<HelpCircleIcon
			/>
		),
	},
];

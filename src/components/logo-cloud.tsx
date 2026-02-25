import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function LogoCloud() {
	return (
		<div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-4">
			<InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
				{logos.map((logo) => (
					<img
						alt={logo.alt}
						className="pointer-events-none h-6 select-none md:h-8 dark:brightness-0 dark:invert"
						height="auto"
						key={`logo-${logo.alt}`}
						loading="lazy"
						src={logo.src}
						width="auto"
					/>
				))}
			</InfiniteSlider>
		</div>
	);
}

const logos = [
	{
		src: "/logos/fao.svg",
		alt: "FAO Logo",
	},
	{
		src: "/logos/irri.svg",
		alt: "IRRI Logo",
	},
	{
		src: "/logos/usda.svg",
		alt: "USDA Logo",
	},
	{
		src: "/logos/who.svg",
		alt: "WHO Logo",
	},
	{
		src: "/logos/cgiar.svg",
		alt: "CGIAR Logo",
	},
	{
		src: "/logos/worldbank.svg",
		alt: "World Bank Logo",
	},
	{
		src: "/logos/unesco.svg",
		alt: "UNESCO Logo",
	},
	{
		src: "/logos/giz.svg",
		alt: "GIZ Logo",
	},
];

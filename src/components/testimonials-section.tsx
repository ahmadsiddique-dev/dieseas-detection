// import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { QuoteIcon } from "lucide-react";

type Testimonial = {
	quote: string;
	name: string;
	role: string;
	company?: string;
};

const testimonials: Testimonial[] = [
	{
		quote:
			"This system helped me identify Bacterial Leaf Blight in my rice field before it could spread further. The early detection saved a significant portion of my harvest this season.",
		name: "Muhammad Aslam",
		role: "Rice Farmer",
		company: "Punjab, Pakistan",
	},
	{
		quote:
			"As an agricultural extension officer, I recommend this tool to all the farmers in my region. The AI-powered analysis is quick, accurate, and the downloadable reports make record-keeping effortless.",
		name: "Dr. Fatima Noor",
		role: "Agricultural Extension Officer",
		company: "Department of Agriculture",
	},

	{
		quote:
			"I was losing crops every season without knowing why. This disease detection system identified Brown Spot disease on my rice leaves and gave me clear preventive steps to follow.",
		name: "Rajesh Kumar",
		role: "Smallholder Farmer",
		company: "Bihar, India",
	},
];

export function TestimonialsSection() {
	return (
		<section className="relative mx-auto min-h-screen w-full max-w-4xl place-content-center border-x">
			{/* <FullWidthDivider /> */}
			{/* <div className="border"></div> */}
			<div className="grid md:grid-cols-[2fr_1px_1fr]">
				<div className="divide-y">
					{testimonials.slice(0, 2).map((testimonial) => (
						<TestimonialCard key={testimonial.name} testimonial={testimonial} />
					))}
				</div>
				<div className="h-px bg-border md:h-auto" />
				<div className="flex items-center">
					<TestimonialCard testimonial={testimonials[2] as Testimonial} />
				</div>
			</div>
			{/* <FullWidthDivider /> */}
		</section>
	);
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
	const { quote, name, role, company } = testimonial;

	return (
		<figure className="p-6 md:p-8">
			<QuoteIcon aria-hidden="true" className="mb-4 size-12 stroke-1 text-muted-foreground" />

			<blockquote className="mb-6 font-normal text-base text-foreground md:text-lg">
				&quot;{quote}&quot;
			</blockquote>

			<figcaption className="flex flex-col gap-0.5">
				<cite className="font-medium text-foreground text-lg not-italic">
					{name}
				</cite>
				<p className="text-muted-foreground text-sm">
					{role}
					{company && `, ${company}`}
				</p>
			</figcaption>
		</figure>
	);
}

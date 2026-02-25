import { DecorIcon } from "@/components/ui/decor-icon";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export function FaqsSection() {
	return (
		<section className="mx-auto grid min-h-screen w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:border-x">
			<div className="px-4 pt-12 pb-6">
				<div className="space-y-5">
					<h2 className="text-balance font-bold text-4xl md:text-6xl lg:font-black">
						Frequently Asked Questions
					</h2>
					<p className="text-muted-foreground">
						Quick answers to common questions about our AI-Based Rice Leaf Disease Detection System. Open any question to
						learn more.
					</p>
					<p className="text-muted-foreground">
						{"Can't find what you're looking for? "}
						<Link className="text-primary hover:underline" href="/contact">
							Contact Us
						</Link>
					</p>
				</div>
			</div>
			<div className="relative place-content-center">
				{/* vertical guide line */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-y-0 left-3 h-full w-px bg-border"
				/>

				<Accordion collapsible type="single">
					{faqs.map((item) => (
						<AccordionItem
							className="group relative border-b pl-5 first:border-t last:border-b"
							key={item.id}
							value={item.id}
						>
							{/*  plus */}
							<DecorIcon className="pointer-events-none absolute -bottom-[5.5px] left-[12.5px] size-2.5 -translate-x-1/2 text-muted-foreground group-last:hidden" />

							<AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
								{item.title}
							</AccordionTrigger>

							<AccordionContent className="px-4 pb-4 text-muted-foreground">
								{item.content}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

const faqs = [
	{
		id: "item-1",
		title: "What is the AI-Based Rice Leaf Disease Detection System?",
		content:
			"It is an intelligent web-based system that allows farmers and users to upload images of rice plant leaves. The system uses a trained AI model to analyze the image, detect possible diseases, and provide useful recommendations for preventive action.",
	},
	{
		id: "item-2",
		title: "How does the AI detect diseases from a leaf image?",
		content:
			"Once you upload a valid rice leaf image, the system preprocesses it and passes it through a trained deep learning model. The model classifies the leaf into one of the supported disease categories and returns the disease name along with a confidence score.",
	},
	{
		id: "item-3",
		title: "What image formats and sizes are supported?",
		content:
			"The system accepts standard image formats such as JPG and PNG. There is also a file size limit to ensure efficient processing. If the uploaded image does not meet the format or size requirements, an appropriate error message will be displayed.",
	},
	{
		id: "item-4",
		title: "What information is included in the disease analysis report?",
		content:
			"The report includes the uploaded leaf image, detected disease name, confidence score, a detailed disease description, recommended preventive measures, and the report generation date and time. You can download this report for your records.",
	},
	{
		id: "item-5",
		title: "Is my data and detection history stored securely?",
		content:
			"Yes. Every prediction is automatically stored in the database with the uploaded image, disease name, confidence score, prediction date and time, your user ID, and the model version used. All data is protected with secure user authentication.",
	},
	{
		id: "item-6",
		title: "Can I view my past detection records?",
		content:
			"Absolutely. All your previous disease detection records are stored and can be accessed from your user dashboard at any time. Administrators can also view detection history for management purposes.",
	},
	{
		id: "item-7",
		title: "How do I get started with the system?",
		content:
			"Simply register an account, log in, and upload a rice leaf image from your dashboard. The AI model will analyze the image and display the results within seconds. You can then download the report or view your detection history.",
	},
];

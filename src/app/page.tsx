import { CallToAction } from "@/components/cta";
import { Header } from "@/components/elements/Hero";
import { Footer } from "@/components/footer";
import { LogoCloud } from "@/components/logo-cloud";
import AboutUs1 from "@/components/mvpblocks/about-us-1";
import Features from "@/components/shadcn-studio/blocks/features-section-01/features-section-01";
import { TestimonialsSection } from "@/components/testimonials-section";
import { motion } from 'framer-motion';
import {
  UploadIcon,
  BrainCircuitIcon,
  FileTextIcon,
  DatabaseIcon,
  FileDownIcon,
  LockKeyholeIcon,
} from "lucide-react";

const page = () => {
  const featuresList = [
    {
      icon: UploadIcon,
      title: "Image Upload & Validation",
      description:
        "Upload rice leaf images easily for instant disease analysis. The system validates image format (JPG, PNG) and file size automatically before processing.",
      cardBorderColor: "border-primary/40 hover:border-primary",
      avatarTextColor: "text-primary",
      avatarBgColor: "bg-primary/10",
    },
    {
      icon: BrainCircuitIcon,
      title: "AI-Based Disease Detection",
      description:
        "A trained AI model analyzes uploaded leaf images, classifies diseases accurately, and provides a confidence score to help you make informed decisions.",
      cardBorderColor:
        "border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400",
      avatarTextColor: "text-green-600 dark:text-green-400",
      avatarBgColor: "bg-green-600/10 dark:bg-green-400/10",
    },
    {
      icon: FileTextIcon,
      title: "Result Display & Reporting",
      description:
        "View detailed results including disease name, confidence score, description, and recommended preventive measures — all displayed clearly on your dashboard.",
      cardBorderColor:
        "border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400",
      avatarTextColor: "text-amber-600 dark:text-amber-400",
      avatarBgColor: "bg-amber-600/10 dark:bg-amber-400/10",
    },
    {
      icon: DatabaseIcon,
      title: "Record Storage",
      description:
        "Every prediction is automatically stored in the database — including the uploaded image, disease name, confidence score, timestamp, and model version used.",
      cardBorderColor: "border-destructive/40 hover:border-destructive",
      avatarTextColor: "text-destructive",
      avatarBgColor: "bg-destructive/10",
    },
    {
      icon: FileDownIcon,
      title: "Report Generation",
      description:
        "Download comprehensive disease analysis reports including the leaf image, disease details, confidence score, and preventive measures for your records.",
      cardBorderColor:
        "border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400",
      avatarTextColor: "text-sky-600 dark:text-sky-400",
      avatarBgColor: "bg-sky-600/10 dark:bg-sky-400/10",
    },
    {
      icon: LockKeyholeIcon,
      title: "Secure Authentication",
      description:
        "Protect your account with secure registration, login, password reset, and profile management. Your data and detection history remain safe and private.",
      cardBorderColor: "border-primary/40 hover:border-primary",
      avatarTextColor: "text-primary",
      avatarBgColor: "bg-primary/10",
    },
  ];
  return (
    <div>
      <Header />
      <div className="mask-b-from-30% relative min-h-[50vh]  sm:min-h-[70vh] flex items-end" id="header">
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/30 z-10" />
        {/* Hero content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-20 pt-40">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
            Detect Rice Leaf
            <br />
            <span className="text-amber-400">Diseases Instantly</span>
            <br />
            with AI
          </h1>
          <p className="mt-6 max-w-xl text-base text-gray-200 sm:text-lg md:text-xl leading-relaxed drop-shadow">
            Upload a photo of your rice leaf and let our AI-powered system
            identify diseases in seconds. Get detailed reports, preventive
            measures, and protect your harvest.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-8 py-3.5 text-base font-semibold text-black shadow-lg transition-all hover:bg-amber-400 hover:shadow-amber-500/25 hover:scale-105"
            >
              Start Detection
            </a>
          </div>
        </div>
      </div>
      <div className="my-20 mt-40 w-full place-content-center">
        <section className="relative mx-auto max-w-3xl">
          <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
            <span className="text-muted-foreground">Trusted by agricultural experts.</span>
            <br />
            <span className="font-semibold">Empowering farmers worldwide.</span>
          </h2>
          <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mx-auto my-5 h-px max-w-sm bg-border" />
          <LogoCloud />
          <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mt-5 h-px bg-border" />
        </section>
      </div>
      <div>
        <AboutUs1 />
      </div>
      <div>
        <Features featuresList={featuresList} />
      </div>
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              Hear from farmers who trust our AI-powered disease detection.
            </h2>
            <p className="text-muted-foreground text-xl">
              Discover how our system is helping farmers identify rice leaf
              diseases early, protect their crops, and improve agricultural
              productivity.
            </p>
          </div>
        </div>
      <div className="border-t border-border"></div>
        <TestimonialsSection />
      <div className="border-t border-border"></div>
      </div>
      <div className="py-20">
        <div className="relative w-full overflow-hidden">
          <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="from-foreground/80 via-foreground to-foreground/80 bg-linear-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Ready to Protect Your Harvest?
          </h2>
          <p className="text-muted-foreground mt-6 text-xl">
            Start using our AI-powered rice leaf disease detection system today and safeguard your crops.
          </p>
        </div>
          </div>
        </div>
        <CallToAction />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default page;

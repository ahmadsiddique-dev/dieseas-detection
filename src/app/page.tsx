import { Header } from "@/components/elements/Hero";
import { Footer } from "@/components/footer";
import { LogoCloud } from "@/components/logo-cloud";
import Features from "@/components/shadcn-studio/blocks/features-section-01/features-section-01";
import { TestimonialsSection } from "@/components/testimonials-section";
import {
  LockKeyholeIcon,
  SearchIcon,
  ShieldBanIcon,
  SmartphoneIcon,
  StarIcon,
  SwatchBookIcon,
} from "lucide-react";

const page = () => {
  const featuresList = [
    {
      icon: SwatchBookIcon,
      title: "User-Friendly Interface",
      description:
        "Navigate effortlessly with our intuitive design, optimised for all devices. Enjoy a seamless experience whether you're on a computer or mobile.",
      cardBorderColor: "border-primary/40 hover:border-primary",
      avatarTextColor: "text-primary",
      avatarBgColor: "bg-primary/10",
    },
    {
      icon: ShieldBanIcon,
      title: "Secure Checkout",
      description:
        "Enjoy a safe shopping experience with multiple payment options and SSL encryption. Your personal and financial information is always protected.",
      cardBorderColor:
        "border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400",
      avatarTextColor: "text-green-600 dark:text-green-400",
      avatarBgColor: "bg-green-600/10 dark:bg-green-400/10",
    },
    {
      icon: SearchIcon,
      title: "Advanced Search",
      description:
        "Find products quickly with advanced filters, sorting options, and suggestion. Save time and effortlessly locate exactly what you need with ease.",
      cardBorderColor:
        "border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400",
      avatarTextColor: "text-amber-600 dark:text-amber-400",
      avatarBgColor: "bg-amber-600/10 dark:bg-amber-400/10",
    },
    {
      icon: StarIcon,
      title: "Customer Reviews and Ratings",
      description:
        "Make informed decisions with detailed product reviews and ratings from other buyers. Trust the experiences of fellow shoppers to guide choices.",
      cardBorderColor: "border-destructive/40 hover:border-destructive",
      avatarTextColor: "text-destructive",
      avatarBgColor: "bg-destructive/10",
    },
    {
      icon: SmartphoneIcon,
      title: "Mobile App Integration",
      description:
        "Enhance your shopping experience with our mobile app and push notifications. Stay updated on arrivals and exclusive offers directly on phone.",
      cardBorderColor:
        "border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400",
      avatarTextColor: "text-sky-600 dark:text-sky-400",
      avatarBgColor: "bg-sky-600/10 dark:bg-sky-400/10",
    },
    {
      icon: LockKeyholeIcon,
      title: "Security Features",
      description:
        "Protect your data with fraud detection and two-factor authentication. Ensure a secure environment for all transactions and account activities.",
      cardBorderColor: "border-primary/40 hover:border-primary",
      avatarTextColor: "text-primary",
      avatarBgColor: "bg-primary/10",
    },
  ];
  return (
    <div>
      <Header />
      <div className="mask-b-from-30%" id="header">
        new one
      </div>
      <div className="my-20 mt-40 w-full place-content-center">
        <section className="relative mx-auto max-w-3xl">
          <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
            <span className="text-muted-foreground">Trusted by experts.</span>
            <br />
            <span className="font-semibold">Used by the leaders.</span>
          </h2>
          <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mx-auto my-5 h-px max-w-sm bg-border" />
          <LogoCloud />
          <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mt-5 h-px bg-border" />
        </section>
      </div>
      <div>
        <Features featuresList={featuresList} />
      </div>
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 sm:mb-16 lg:mb-24">
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Listen to what our customers have to say about us.
          </h2>
          <p className="text-muted-foreground text-xl">
            Explore key features designed to enhance your shopping experience
            with intuitive navigation, robust security, and seamless
            functionality.
          </p>
        </div>
        </div>

        <TestimonialsSection />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default page;

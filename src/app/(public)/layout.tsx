import { Header } from "@/components/elements/Hero";
import { Footer } from "@/components/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}
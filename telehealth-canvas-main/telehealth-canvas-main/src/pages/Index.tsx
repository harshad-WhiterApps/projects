import Header from "@/components/ui/header";
import HeroSection from "@/components/telemedicine/hero-section";
import FeaturesSection from "@/components/telemedicine/features-section";
import SolutionsSection from "@/components/telemedicine/solutions-section";
import PricingSection from "@/components/telemedicine/pricing-section";
import ContactSection from "@/components/telemedicine/contact-section";
import Footer from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SolutionsSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
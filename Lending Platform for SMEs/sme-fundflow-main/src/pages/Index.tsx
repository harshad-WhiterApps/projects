import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeatureSection />
      </main>
      
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 LendFlow. All rights reserved. | Built for SME growth.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

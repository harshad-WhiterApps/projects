import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Shield, 
  TrendingUp, 
  FileText, 
  Smartphone, 
  CreditCard,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export const FeatureSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Get loan approvals in 24 hours with our automated credit assessment system.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Bank-grade security with full compliance to RBI guidelines and KYC/AML norms.",
      color: "text-success"
    },
    {
      icon: TrendingUp,
      title: "Competitive Rates",
      description: "Best-in-market interest rates starting from 8.5% based on your credit profile.",
      color: "text-info"
    },
    {
      icon: FileText,
      title: "Minimal Documentation",
      description: "Simple paperwork with digital document upload and automated verification.",
      color: "text-warning"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Complete loan application process available on mobile with offline support.",
      color: "text-primary"
    },
    {
      icon: CreditCard,
      title: "Flexible Repayment",
      description: "Choose from multiple repayment options including NACH, UPI, and net banking.",
      color: "text-success"
    }
  ];

  const benefits = [
    "No hidden charges or processing fees",
    "Instant loan eligibility check",
    "Dedicated relationship manager",
    "24/7 customer support",
    "Early repayment without penalties",
    "Digital loan agreement and disbursement"
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-primary">LendFlow</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built specifically for SMEs, our platform combines cutting-edge technology 
            with financial expertise to deliver the best lending experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 shadow-soft">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color.split('-')[1]}/10 to-${feature.color.split('-')[1]}/20 flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-8">
              Everything You Need for 
              <span className="text-primary"> Business Growth</span>
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button size="lg" variant="hero" className="text-lg">
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-gradient-primary text-white">
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold mb-2">Ready to Apply?</h4>
                  <p className="text-white/90">
                    Join thousands of SMEs who have grown their business with LendFlow.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">10,000+</div>
                    <div className="text-white/80 text-sm">Loans Disbursed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">₹500Cr+</div>
                    <div className="text-white/80 text-sm">Total Funding</div>
                  </div>
                </div>

                <Button variant="outline" size="lg" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Calculate EMI
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
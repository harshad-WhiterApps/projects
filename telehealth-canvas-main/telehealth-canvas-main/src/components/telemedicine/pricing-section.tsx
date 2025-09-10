import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for individual doctors or small practices",
    features: [
      "Up to 2 doctors",
      "100 consultations/month",
      "Basic video consultations",
      "Digital prescriptions",
      "Patient management",
      "Email support"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Professional",
    price: "$299",
    period: "/month",
    description: "Ideal for growing clinics and medical centers",
    features: [
      "Up to 10 doctors",
      "Unlimited consultations",
      "HD video consultations",
      "Advanced scheduling",
      "Custom branding",
      "Analytics dashboard",
      "Priority support",
      "Mobile apps"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large healthcare organizations",
    features: [
      "Unlimited doctors",
      "Unlimited consultations",
      "White-label platform",
      "Custom integrations",
      "Advanced compliance",
      "Dedicated support",
      "Multi-location support",
      "Custom training"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
            💰 Simple Pricing
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Choose Your 
            <span className="bg-gradient-secondary bg-clip-text text-transparent"> Perfect Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent pricing that scales with your practice. Start with a 14-day free trial on any plan.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative group transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary shadow-glow scale-105 lg:scale-110' 
                  : 'border-border/50 hover:border-primary/20 hover:shadow-medium'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1 font-semibold">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8 space-y-6">
                {/* Plan Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>
                
                {/* Price */}
                <div className="text-center space-y-1">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  {plan.period && (
                    <p className="text-sm text-muted-foreground">per clinic</p>
                  )}
                </div>
                
                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-glow' 
                      : 'bg-gradient-secondary hover:shadow-soft'
                  } transition-all duration-300`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            All plans include HIPAA compliance, SSL encryption, and 99.9% uptime guarantee
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-success" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-success" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-success" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
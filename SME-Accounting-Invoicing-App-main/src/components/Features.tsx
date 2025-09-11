import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Calculator, 
  PieChart, 
  Receipt, 
  CreditCard, 
  Bell,
  Smartphone,
  Shield,
  Zap
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Invoicing",
    description: "Create professional GST-compliant invoices with automated calculations, recurring billing, and payment reminders.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    description: "Scan receipts with OCR, categorize expenses automatically, and track vendor payments with ease.",
    gradient: "bg-gradient-secondary"
  },
  {
    icon: Calculator,
    title: "GST Compliance",
    description: "Automated CGST, SGST, IGST calculations with GSTR-1 and GSTR-3B return preparation.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: PieChart,
    title: "Financial Reports",
    description: "Generate P&L statements, Balance Sheets, Cash Flow reports, and business analytics dashboards.",
    gradient: "bg-gradient-secondary"
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    description: "Accept payments via UPI, cards, and bank transfers with Razorpay and Stripe integration.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Automated payment reminders via email, SMS, and WhatsApp with customizable templates.",
    gradient: "bg-gradient-secondary"
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Scan receipts, generate invoices on-the-go, and manage finances from anywhere with offline sync.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Enterprise-level security with data encryption, regular backups, and GDPR compliance.",
    gradient: "bg-gradient-secondary"
  },
  {
    icon: Zap,
    title: "Quick Setup",
    description: "Get started in 5 minutes with automated data import from Excel, Tally, and QuickBooks.",
    gradient: "bg-gradient-primary"
  }
];

const Features = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-secondary text-secondary-foreground text-sm font-medium shadow-md mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Everything You Need
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Complete Accounting Solution
            </span>
            <br />
            for Growing Businesses
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            From invoicing to compliance, we handle every aspect of your financial workflow 
            so you can focus on growing your business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-gradient-card border border-border/50 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="business" size="lg" className="group">
            Start Your Free Trial
            <Zap className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock,
  Shield,
  Award
} from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            📞 Get in Touch
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Ready to Transform Your 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Healthcare Practice?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of healthcare providers already using our platform. 
            Get started with a personalized demo or contact our healthcare specialists.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-border/50 shadow-medium">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-foreground">
                    Schedule Your Demo
                  </h3>
                  <p className="text-muted-foreground">
                    See how MedConnect can streamline your practice in just 15 minutes
                  </p>
                </div>
                
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="First Name" 
                      className="bg-background border-border focus:border-primary transition-colors"
                    />
                    <Input 
                      placeholder="Last Name"
                      className="bg-background border-border focus:border-primary transition-colors"
                    />
                  </div>
                  <Input 
                    type="email" 
                    placeholder="Work Email"
                    className="bg-background border-border focus:border-primary transition-colors"
                  />
                  <Input 
                    placeholder="Clinic/Organization Name"
                    className="bg-background border-border focus:border-primary transition-colors"
                  />
                  <Input 
                    placeholder="Phone Number"
                    className="bg-background border-border focus:border-primary transition-colors"
                  />
                  <Textarea 
                    placeholder="Tell us about your practice and specific needs..."
                    rows={4}
                    className="bg-background border-border focus:border-primary transition-colors resize-none"
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    Schedule Free Demo
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info & Support */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Other Ways to Reach Us
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-card border border-border/50">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">Email Support</div>
                    <div className="text-muted-foreground text-sm">support@medconnect.com</div>
                    <div className="text-muted-foreground text-xs">Response within 2 hours</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-card border border-border/50">
                  <Phone className="h-6 w-6 text-secondary mt-1" />
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">Phone Support</div>
                    <div className="text-muted-foreground text-sm">+1 (555) 123-4567</div>
                    <div className="text-muted-foreground text-xs">Mon-Fri, 8 AM - 8 PM EST</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-card border border-border/50">
                  <MessageSquare className="h-6 w-6 text-primary mt-1" />
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">Live Chat</div>
                    <div className="text-muted-foreground text-sm">Available on our website</div>
                    <div className="text-muted-foreground text-xs">Instant responses during business hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-foreground">
                Why Healthcare Providers Trust Us
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-muted-foreground text-sm">
                    HIPAA compliant with enterprise-grade security
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground text-sm">
                    99.9% uptime with 24/7 technical monitoring
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-secondary" />
                  <span className="text-muted-foreground text-sm">
                    Trusted by 500+ healthcare practices worldwide
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            <Card className="bg-gradient-primary/5 border-primary/20">
              <CardContent className="p-6 space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  Need Immediate Support?
                </h4>
                <p className="text-muted-foreground text-sm">
                  For urgent technical issues affecting patient care, call our emergency support line
                </p>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Emergency Support: +1 (555) 911-HELP
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
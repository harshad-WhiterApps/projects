import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 rounded-lg bg-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">LearnPro</h3>
                <p className="text-sm text-background/70">Corporate Training</p>
              </div>
            </div>
            <p className="text-background/70 mb-6">
              Empowering organizations with cutting-edge mobile learning solutions that drive employee growth and business success.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-smooth cursor-pointer">
                <Mail className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-smooth cursor-pointer">
                <Phone className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-smooth cursor-pointer">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Features</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Mobile App</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Analytics</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Integrations</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Security</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Solutions</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Enterprise</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Small Business</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Remote Teams</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Compliance Training</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Skills Development</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Help Center</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Documentation</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">API Reference</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Community</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-smooth">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2025 LearnPro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-background/60 hover:text-background text-sm transition-smooth">Privacy Policy</a>
            <a href="#" className="text-background/60 hover:text-background text-sm transition-smooth">Terms of Service</a>
            <a href="#" className="text-background/60 hover:text-background text-sm transition-smooth">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
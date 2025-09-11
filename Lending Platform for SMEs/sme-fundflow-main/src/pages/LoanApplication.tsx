import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  User, 
  FileText, 
  CreditCard, 
  Upload,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export default function LoanApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: "Business Info", icon: Building2 },
    { id: 2, title: "Personal Details", icon: User },
    { id: 3, title: "Loan Details", icon: CreditCard },
    { id: 4, title: "Documents", icon: FileText }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input id="businessName" placeholder="Enter your business name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private-limited">Private Limited</SelectItem>
                    <SelectItem value="llp">LLP</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="proprietorship">Proprietorship</SelectItem>
                    <SelectItem value="public-limited">Public Limited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address *</Label>
              <Textarea 
                id="businessAddress" 
                placeholder="Enter complete business address"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="annualTurnover">Annual Turnover *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select turnover" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5L-25L">₹5L - ₹25L</SelectItem>
                    <SelectItem value="25L-1Cr">₹25L - ₹1Cr</SelectItem>
                    <SelectItem value="1Cr-5Cr">₹1Cr - ₹5Cr</SelectItem>
                    <SelectItem value="5Cr+">₹5Cr+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input id="gstNumber" placeholder="Enter GST number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number *</Label>
                <Input id="panNumber" placeholder="Enter PAN number" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="personalPan">Personal PAN *</Label>
                <Input id="personalPan" placeholder="Enter your PAN number" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                <Input id="aadhaar" placeholder="Enter Aadhaar number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="proprietor">Proprietor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="residentialAddress">Residential Address *</Label>
              <Textarea 
                id="residentialAddress" 
                placeholder="Enter complete residential address"
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount Required *</Label>
                <Input id="loanAmount" placeholder="Enter amount (₹)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanType">Loan Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="working-capital">Working Capital</SelectItem>
                    <SelectItem value="term-loan">Term Loan</SelectItem>
                    <SelectItem value="invoice-financing">Invoice Financing</SelectItem>
                    <SelectItem value="equipment-financing">Equipment Financing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tenure">Preferred Tenure *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="12-months">12 Months</SelectItem>
                    <SelectItem value="24-months">24 Months</SelectItem>
                    <SelectItem value="36-months">36 Months</SelectItem>
                    <SelectItem value="60-months">60 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="repaymentMode">Repayment Mode *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select repayment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly EMI</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="bullet">Bullet Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanPurpose">Loan Purpose *</Label>
              <Textarea 
                id="loanPurpose" 
                placeholder="Describe how you plan to use the loan amount"
                className="min-h-[100px]"
              />
            </div>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Estimated EMI Calculator</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">₹8,500</div>
                      <div className="text-sm text-muted-foreground">Monthly EMI</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">9.5%</div>
                      <div className="text-sm text-muted-foreground">Interest Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-info">₹3.06L</div>
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <h4 className="font-semibold">Business Registration</h4>
                    <p className="text-sm text-muted-foreground">Upload certificate of incorporation</p>
                  </div>
                  <Button variant="outline" size="sm">Choose File</Button>
                </CardContent>
              </Card>

              <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <h4 className="font-semibold">GST Returns</h4>
                    <p className="text-sm text-muted-foreground">Last 12 months GST filings</p>
                  </div>
                  <Button variant="outline" size="sm">Choose File</Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <h4 className="font-semibold">Bank Statements</h4>
                    <p className="text-sm text-muted-foreground">Last 12 months current account</p>
                  </div>
                  <Button variant="outline" size="sm">Choose File</Button>
                </CardContent>
              </Card>

              <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <h4 className="font-semibold">Financial Statements</h4>
                    <p className="text-sm text-muted-foreground">Audited financials for last 2 years</p>
                  </div>
                  <Button variant="outline" size="sm">Choose File</Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Additional Documents (Optional)</h4>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="p-4 text-center space-y-2">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                    <div className="text-sm font-medium">ITR Returns</div>
                    <Button variant="ghost" size="sm">Upload</Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="p-4 text-center space-y-2">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                    <div className="text-sm font-medium">Property Papers</div>
                    <Button variant="ghost" size="sm">Upload</Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="p-4 text-center space-y-2">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                    <div className="text-sm font-medium">Other Documents</div>
                    <Button variant="ghost" size="sm">Upload</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Apply for <span className="text-primary">Business Loan</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete your loan application in simple steps
            </p>
          </div>

          {/* Progress Steps */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = step.id === currentStep;
                  const isCompleted = step.id < currentStep;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`
                        flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all
                        ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                          isCompleted ? 'border-success bg-success text-success-foreground' : 
                          'border-muted-foreground/30 bg-muted text-muted-foreground'}
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>
                      <div className="ml-3 hidden sm:block">
                        <div className={`font-semibold text-sm ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                          {step.title}
                        </div>
                        {isActive && (
                          <Badge variant="outline" className="mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            Current
                          </Badge>
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-12 lg:w-20 h-0.5 ml-4 ${isCompleted ? 'bg-success' : 'bg-muted'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Form Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Step {currentStep}: {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStep()}

              <Separator />

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep === totalSteps ? (
                  <Button variant="success" size="lg">
                    Submit Application
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="hero" onClick={nextStep}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
import { Message } from '../types';
import { mockUser, mockTransactions, mockCreditCards, mockLoans, mockBills } from '../utils/mockData';

export class ChatService {
  private static instance: ChatService;
  private isTyping = false;

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async processMessage(message: string): Promise<Message> {
    // Simulate AI processing delay
    await this.simulateTyping();
    
    const response = this.generateResponse(message.toLowerCase());
    const sentiment = this.analyzeSentiment(message);
    
    return {
      id: Date.now().toString(),
      content: response.content,
      sender: 'bot',
      timestamp: new Date(),
      type: response.type,
      sentiment: sentiment.sentiment,
      confidence: sentiment.confidence,
    };
  }

  private async simulateTyping(delay = 1500): Promise<void> {
    this.isTyping = true;
    await new Promise(resolve => setTimeout(resolve, delay));
    this.isTyping = false;
  }

  private analyzeSentiment(message: string): { sentiment: 'positive' | 'negative' | 'neutral'; confidence: number } {
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'satisfied', 'thank', 'thanks', 'perfect', 'amazing'];
    const negativeWords = ['bad', 'terrible', 'awful', 'frustrated', 'angry', 'disappointed', 'problem', 'issue', 'error', 'wrong'];
    
    const words = message.toLowerCase().split(' ');
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) {
      return { sentiment: 'positive', confidence: Math.min(0.9, 0.6 + (positiveCount * 0.1)) };
    } else if (negativeCount > positiveCount) {
      return { sentiment: 'negative', confidence: Math.min(0.9, 0.6 + (negativeCount * 0.1)) };
    }
    
    return { sentiment: 'neutral', confidence: 0.7 };
  }

  private generateResponse(message: string): { content: string; type: 'text' | 'balance' | 'transaction' | 'menu' | 'kyc' | 'loan' | 'alert' } {
    // Balance inquiry
    if (message.includes('balance') || (message.includes('account') && message.includes('check'))) {
      return {
        content: `Your current account balance is ₹${mockUser.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })} as of ${new Date().toLocaleString('en-IN')}.\n\nAccount Details:\n• Account Number: ${mockUser.accountNumber}\n• Account Status: Active\n• Last Updated: ${new Date().toLocaleString('en-IN')}\n\nWould you like to see recent transactions or perform any other banking operation?`,
        type: 'balance'
      };
    }

    // Transaction history
    if (message.includes('transaction') || message.includes('history') || message.includes('statement')) {
      const recentTransactions = mockTransactions.slice(0, 5);
      let transactionText = "Here are your recent transactions:\n\n";
      
      recentTransactions.forEach(tx => {
        const sign = tx.type === 'credit' ? '+' : '-';
        const statusIcon = tx.status === 'completed' ? '✅' : tx.status === 'pending' ? '⏳' : '❌';
        transactionText += `${statusIcon} ${sign}₹${tx.amount.toLocaleString('en-IN')}\n${tx.description}\n${tx.date.toLocaleDateString('en-IN')} • Ref: ${tx.reference}\n\n`;
      });
      
      return {
        content: transactionText + "Would you like to see more transactions, download a statement, or perform any other operation?",
        type: 'transaction'
      };
    }

    // Credit card inquiries
    if (message.includes('credit card') || message.includes('card') || message.includes('due')) {
      const card = mockCreditCards[0];
      return {
        content: `Credit Card Information:\n\n💳 Card: ${card.cardType.toUpperCase()} ${card.cardNumber}\n💰 Available Limit: ₹${card.availableLimit.toLocaleString('en-IN')}\n📊 Total Limit: ₹${card.creditLimit.toLocaleString('en-IN')}\n📅 Due Date: ${card.dueDate.toLocaleDateString('en-IN')}\n💸 Minimum Due: ₹${card.minimumDue.toLocaleString('en-IN')}\n💳 Total Due: ₹${card.totalDue.toLocaleString('en-IN')}\n\nWould you like to pay your credit card bill or check reward points?`,
        type: 'text'
      };
    }

    // Loan inquiries
    if (message.includes('loan') || message.includes('emi')) {
      const loans = mockLoans;
      let loanText = "Your Active Loans:\n\n";
      
      loans.forEach(loan => {
        loanText += `🏦 ${loan.type.charAt(0).toUpperCase() + loan.type.slice(1)} Loan\n`;
        loanText += `💰 Remaining: ₹${loan.remainingAmount.toLocaleString('en-IN')}\n`;
        loanText += `📅 Next EMI: ₹${loan.emiAmount.toLocaleString('en-IN')} on ${loan.nextEmiDate.toLocaleDateString('en-IN')}\n`;
        loanText += `📊 Interest Rate: ${loan.interestRate}%\n\n`;
      });
      
      return {
        content: loanText + "Would you like to check loan eligibility, calculate EMI, or make a prepayment?",
        type: 'loan'
      };
    }

    // Bill payments
    if (message.includes('bill') || message.includes('recharge') || message.includes('utility') || message.includes('pay')) {
      const bills = mockBills;
      let billText = "Pending Bills & Payments:\n\n";
      
      bills.forEach(bill => {
        const icon = bill.type === 'electricity' ? '⚡' : bill.type === 'mobile' ? '📱' : bill.type === 'internet' ? '🌐' : '💡';
        billText += `${icon} ${bill.provider}\n`;
        billText += `💰 Amount: ₹${bill.amount.toLocaleString('en-IN')}\n`;
        billText += `📅 Due: ${bill.dueDate.toLocaleDateString('en-IN')}\n`;
        billText += `📋 Account: ${bill.accountNumber}\n\n`;
      });
      
      return {
        content: billText + "I can help you pay any of these bills instantly. Which bill would you like to pay?",
        type: 'text'
      };
    }

    // Fund transfer
    if (message.includes('transfer') || message.includes('send money') || message.includes('payment')) {
      return {
        content: "💸 Fund Transfer Options:\n\n🔸 UPI Transfer - Instant (24/7)\n🔸 IMPS - Instant (24/7)\n🔸 NEFT - Same day (9 AM - 7 PM)\n🔸 RTGS - Real-time (9 AM - 4:30 PM)\n\n📱 You can transfer money using:\n• Mobile number (UPI)\n• Account number & IFSC\n• UPI ID\n• QR Code scan\n\nFor security, please use our secure transfer portal. What type of transfer would you like to make?",
        type: 'text'
      };
    }

    // KYC related
    if (message.includes('kyc') || message.includes('document') || message.includes('verification')) {
      return {
        content: "📋 KYC Status: ✅ Verified\n\nYour documents are up to date:\n✅ Aadhaar Card - Verified\n✅ PAN Card - Verified\n\n📄 Accepted Documents:\n• Aadhaar Card\n• PAN Card\n• Passport\n• Driving License\n• Voter ID\n\nAll documents are encrypted and stored securely. Need to update any document?",
        type: 'kyc'
      };
    }

    // Investment and advisory
    if (message.includes('invest') || message.includes('mutual fund') || message.includes('sip') || message.includes('advisory')) {
      return {
        content: "💼 Investment Services:\n\n📈 Available Options:\n• Mutual Funds (SIP/Lumpsum)\n• Fixed Deposits\n• Recurring Deposits\n• Government Bonds\n• Equity Trading\n\n🎯 Personalized Recommendations:\nBased on your profile, consider:\n• Diversified Equity Funds (SIP ₹5,000/month)\n• Tax Saving ELSS Funds\n• Liquid Funds for emergency corpus\n\n⚠️ Mutual fund investments are subject to market risks. Would you like to explore investment options?",
        type: 'text'
      };
    }

    // Branch and ATM locations
    if (message.includes('branch') || message.includes('atm') || message.includes('location') || message.includes('near')) {
      return {
        content: "🏦 Branch & ATM Locator:\n\n📍 Nearest Locations:\n\n🏢 Main Branch - 2.1 km\n📍 123 Business District, City Center\n⏰ Mon-Fri: 10 AM - 4 PM, Sat: 10 AM - 2 PM\n📞 +91-11-12345678\n\n🏧 ATM - 0.8 km\n📍 Shopping Mall, Ground Floor\n⏰ 24/7 Available\n💳 Cash Withdrawal, Balance Inquiry, Mini Statement\n\n🏧 ATM - 1.2 km\n📍 Metro Station, Exit Gate 2\n⏰ 24/7 Available\n\nWould you like directions to any of these locations?",
        type: 'text'
      };
    }

    // Insurance
    if (message.includes('insurance') || message.includes('policy') || message.includes('claim')) {
      return {
        content: "🛡️ Insurance Services:\n\n📋 Your Policies:\n• Life Insurance - Premium ₹12,000/year\n• Health Insurance - Family Floater ₹25,000\n• Car Insurance - Comprehensive Coverage\n\n🆕 Available Policies:\n• Term Life Insurance\n• Health Insurance\n• Travel Insurance\n• Home Insurance\n• Two-Wheeler Insurance\n\n📞 Claim Support: 24/7 helpline\n📱 Online claim filing available\n\nNeed help with policy renewal or claim filing?",
        type: 'text'
      };
    }

    // Complaints and issues
    if (message.includes('complaint') || message.includes('problem') || message.includes('issue') || message.includes('error') || message.includes('wrong')) {
      return {
        content: "🎧 Customer Support:\n\nI understand you're facing an issue. I'm here to help resolve it quickly.\n\n📝 Common Issues:\n• Transaction disputes\n• Card blocking/unblocking\n• Account access problems\n• Incorrect charges\n• Service complaints\n\n🚀 Quick Resolution:\n• Ticket ID will be generated\n• 24-48 hours resolution time\n• SMS/Email updates\n• Priority escalation available\n\nPlease describe your specific issue, and I'll create a support ticket for immediate attention.",
        type: 'alert'
      };
    }

    // Offers and rewards
    if (message.includes('offer') || message.includes('reward') || message.includes('cashback') || message.includes('points')) {
      return {
        content: "🎁 Exclusive Offers & Rewards:\n\n⭐ Current Offers:\n• 0% interest on balance transfer (6 months)\n• 10% cashback on online shopping (up to ₹1,000)\n• Free movie tickets on weekend spends\n• 5X reward points on dining\n\n💎 Your Reward Points: 15,420 points\n💰 Cashback Earned: ₹2,340 this month\n\n🎯 Personalized Offers:\n• Upgrade to Premium Credit Card\n• Special FD rates for you: 7.5% p.a.\n• Pre-approved personal loan at 10.5%\n\nWhich offer interests you the most?",
        type: 'text'
      };
    }

    // Language support
    if (message.includes('language') || message.includes('hindi') || message.includes('regional')) {
      return {
        content: "🌐 Language Support:\n\nI can assist you in multiple languages:\n• English\n• हिंदी (Hindi)\n• বাংলা (Bengali)\n• తెలుగు (Telugu)\n• मराठी (Marathi)\n• தமிழ் (Tamil)\n• ગુજરાતી (Gujarati)\n• ಕನ್ನಡ (Kannada)\n\nTo switch language, just say 'Switch to Hindi' or your preferred language. All banking services are available in your chosen language.\n\nWhich language would you prefer for our conversation?",
        type: 'text'
      };
    }

    // Security and fraud
    if (message.includes('security') || message.includes('fraud') || message.includes('suspicious') || message.includes('unauthorized')) {
      return {
        content: "🔒 Security Alert:\n\nYour account security is our top priority.\n\n🛡️ Security Features:\n• Real-time fraud monitoring\n• SMS alerts for all transactions\n• Biometric authentication\n• End-to-end encryption\n\n⚠️ If you notice suspicious activity:\n1. Block your card immediately\n2. Change your passwords\n3. Report to fraud helpline: 1800-XXX-XXXX\n4. File a complaint online\n\n🔐 Security Tips:\n• Never share OTP/PIN with anyone\n• Use secure networks for banking\n• Regular password updates\n• Enable transaction alerts\n\nIs there a specific security concern I can help you with?",
        type: 'alert'
      };
    }

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('good morning') || message.includes('good evening') || message.includes('namaste')) {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      
      return {
        content: `${greeting} ${mockUser.name}! 🙏\n\nWelcome to SecureBank AI Assistant. I'm here to help you with all your banking needs 24/7.\n\n🔹 Quick Services:\n• Check account balance\n• View recent transactions\n• Pay bills & recharge\n• Transfer money\n• Credit card information\n• Loan details\n• Investment options\n• Customer support\n\nHow can I assist you today? You can ask me anything about your banking needs!`,
        type: 'menu'
      };
    }

    // Default intelligent response
    return {
      content: "I'm your AI banking assistant and I'm here to help! 🤖\n\nI can assist you with:\n\n💰 Account Services:\n• Balance inquiry\n• Transaction history\n• Account statements\n\n💳 Cards & Payments:\n• Credit card details\n• Bill payments\n• Fund transfers\n\n🏦 Banking Products:\n• Loans & EMI details\n• Investment options\n• Insurance policies\n\n🎧 Support Services:\n• Branch locations\n• Customer complaints\n• Security assistance\n\nPlease tell me what you'd like to help with, or try asking something like:\n• 'Check my balance'\n• 'Show recent transactions'\n• 'Pay electricity bill'\n• 'Transfer money'\n\nI'm here to make banking easy for you! 😊",
      type: 'menu'
    };
  }

  getIsTyping(): boolean {
    return this.isTyping;
  }
}
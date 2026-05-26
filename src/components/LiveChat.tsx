import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'agent'; timestamp: Date }>>([
    {
      text: "Hi! Welcome to PreciseHR. I'm here to help answer questions about our Canadian HR solutions. What can I help you with today?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);

  const getSmartResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // Greeting responses
    if (msg.match(/^(hi|hello|hey|good morning|good afternoon|good evening)$/)) {
      return "Hello! Thanks for reaching out to PreciseHR. I'm here to answer questions about our HR solutions. Are you looking for help with compliance, payroll, hiring, or something else?";
    }

    // Pricing questions
    if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing') || msg.includes('how much') || msg.includes('expensive') || msg.includes('afford')) {
      return "Our pricing is customized based on your company size and the services you need. Most services are priced per employee per month with no hidden fees. I'd be happy to connect you with our team for a personalized quote. Would you like to schedule a free consultation?";
    }

    // Services questions
    if (msg.includes('service') || msg.includes('what do you') || msg.includes('what can you') || msg.includes('offer')) {
      return "We offer comprehensive Canadian HR solutions including: Federal & Provincial Compliance, Talent Acquisition, Performance Management, HR Consulting, Workplace Investigations, Employee Terminations, Training & Development, Employee Onboarding, Culture Surveys, Policy Development, and Fractional HR & Executive Leadership Support. Which area are you most interested in?";
    }

    // Compliance questions
    if (msg.includes('compliance') || msg.includes('regulation') || msg.includes('legal') || msg.includes('law') || msg.includes('audit')) {
      return "Our compliance team monitors federal, provincial, and territorial employment laws including Canada Labour Code, ESA, OHSA, and WSIB requirements. We provide proactive updates, policy reviews, and expert guidance. We've helped 500+ Canadian businesses avoid costly penalties. Want to learn more about our compliance services?";
    }

    // Payroll questions
    if (msg.includes('payroll') || msg.includes('benefits') || msg.includes('pay') || msg.includes('compensation')) {
      return "We offer full-service CRA-compliant payroll processing with 99.9% accuracy, CPP/EI remittances, T4/ROE filing, direct deposit, and comprehensive benefits administration including Group RRSPs. Our system integrates with most Canadian accounting software. How many employees do you have?";
    }

    // Hiring/recruiting questions
    if (msg.includes('hire') || msg.includes('hiring') || msg.includes('recruit') || msg.includes('talent') || msg.includes('candidate') || msg.includes('interview')) {
      return "Our talent acquisition service reduces time-to-hire by 40% on average. We handle everything from job posting to candidate screening, interviews, and onboarding. We've helped clients fill hundreds of positions. Are you currently hiring?";
    }

    // Performance management questions
    if (msg.includes('performance') || msg.includes('review') || msg.includes('evaluation') || msg.includes('goal') || msg.includes('engagement')) {
      return "Our performance management solutions help build high-performing teams. We design review systems, goal-setting frameworks, and engagement programs that increase productivity by 30% on average. Interested in learning how we can improve your team's performance?";
    }

    // Time tracking questions
    if (msg.includes('time') || msg.includes('attendance') || msg.includes('schedule') || msg.includes('clock') || msg.includes('timesheet')) {
      return "We provide modern time and attendance solutions with mobile apps, digital time clocks, and automated scheduling. Our clients eliminate time theft and reduce payroll errors significantly. Would you like to see how it works?";
    }

    // Remote work questions
    if (msg.includes('remote') || msg.includes('hybrid') || msg.includes('work from home') || msg.includes('distributed')) {
      return "We have extensive experience managing HR for remote and hybrid teams across Canada. Our solutions include virtual onboarding, digital time tracking, and multi-provincial compliance support. We help you navigate the unique challenges of distributed Canadian workforces. How many remote employees do you have?";
    }

    // Getting started questions
    if (msg.includes('start') || msg.includes('begin') || msg.includes('onboard') || msg.includes('setup') || msg.includes('implement')) {
      return "We can typically onboard new clients within 2-3 weeks. The process includes a consultation to understand your needs, customized solution design, and smooth transition with minimal disruption. Ready to get started? I can connect you with our team.";
    }

    // Company size questions
    if (msg.includes('size') || msg.includes('employees') || msg.includes('small') || msg.includes('large') || msg.includes('startup') || msg.includes('growing')) {
      return "We specialize in businesses with 10-500 employees. Our solutions are scalable and customized to fit your specific needs, whether you're a growing startup or established company. How many employees do you have?";
    }

    // Support questions
    if (msg.includes('support') || msg.includes('help') || msg.includes('contact') || msg.includes('reach') || msg.includes('available')) {
      return "You'll have a dedicated account manager backed by our full team of HR specialists. We offer phone, email, and video support during business hours, with 24/7 emergency support for critical issues. Most inquiries are answered within 2 hours. Call us at (437) 887-2263 or fill out our contact form.";
    }

    // Contract/commitment questions
    if (msg.includes('contract') || msg.includes('commitment') || msg.includes('cancel') || msg.includes('flexible') || msg.includes('lock')) {
      return "We offer flexible contracts with no long-term commitments for most services. You can adjust your service level or cancel with 30 days' notice. Our goal is to earn your business every month through exceptional service, not lock you into rigid contracts.";
    }

    // Integration questions
    if (msg.includes('integrate') || msg.includes('software') || msg.includes('system') || msg.includes('quickbooks') || msg.includes('accounting')) {
      return "Our HR technology integrates with most popular Canadian accounting, payroll, and business management systems including QuickBooks Canada, Sage, and more. We'll work with you during onboarding to ensure seamless data flow. What systems are you currently using?";
    }

    // Industry-specific questions
    if (msg.includes('industry') || msg.includes('construction') || msg.includes('retail') || msg.includes('healthcare') || msg.includes('manufacturing') || msg.includes('technology')) {
      return "We serve Canadian businesses across diverse industries including technology, retail, construction, healthcare, manufacturing, and more. Our 20+ years of experience means we understand industry-specific challenges and Canadian regulations. What industry is your business in?";
    }

    // Testimonial/proof questions
    if (msg.includes('testimonial') || msg.includes('review') || msg.includes('client') || msg.includes('success') || msg.includes('result') || msg.includes('case study')) {
      return "We maintain a 98% client satisfaction rate and have helped 500+ Canadian businesses transform their HR operations. Our clients report significant improvements in federal and provincial compliance, efficiency, and employee satisfaction. Check out our case studies and testimonials on the homepage!";
    }

    // Difference/comparison questions
    if (msg.includes('different') || msg.includes('why choose') || msg.includes('better') || msg.includes('compare') || msg.includes('versus')) {
      return "Unlike large PEOs, you get a dedicated account manager who knows your business. Unlike software-only solutions, you get human experts for complex situations. We're the perfect balance of technology and personal touch, with 20+ years of expertise. What matters most to you in an HR partner?";
    }

    // Consultation/demo questions
    if (msg.includes('consultation') || msg.includes('demo') || msg.includes('meeting') || msg.includes('call') || msg.includes('schedule')) {
      return "I'd be happy to set up a free consultation! Our team will discuss your specific needs and show you how our solutions can help. You can fill out our contact form or call us directly at (437) 887-2263. What time works best for you?";
    }

    // Thank you responses
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're very welcome! Is there anything else I can help you with today? Feel free to reach out anytime at (437) 887-2263 or through our contact form.";
    }

    // Workplace investigation questions
    if (msg.includes('investigation') || msg.includes('harassment') || msg.includes('violence') || msg.includes('complaint') || msg.includes('third party') || msg.includes('third-party')) {
      return "We provide fully compliant, non-biased third-party workplace investigations for violence, harassment, discrimination, and employee complaints. Our investigators are experienced with Bill C-65 and provincial requirements. We deliver comprehensive written reports with findings and recommendations. Need an independent investigation?";
    }

    // Termination questions
    if (msg.includes('termination') || msg.includes('terminate') || msg.includes('firing') || msg.includes('fire') || msg.includes('let go') || msg.includes('severance') || msg.includes('dismissal')) {
      return "We facilitate all aspects of employee terminations end-to-end, including termination planning, facilitated termination meetings, severance calculations, ROE preparation, and all documentation. We ensure compliance with ESA and common law while minimizing legal risk. Need support with a termination?";
    }

    // Training and development questions
    if (msg.includes('training') || msg.includes('development') || msg.includes('leadership') || msg.includes('coaching')) {
      return "We offer comprehensive training programs for all levels: executive leadership development, management training, and employee skills workshops. Our customized programs include DEI training, communication skills, change management, and more. What type of training are you looking for?";
    }

    // Onboarding questions
    if (msg.includes('onboarding') || msg.includes('new hire') || msg.includes('orientation')) {
      return "Our onboarding programs set new hires up for success from day one. We handle welcome packages, documentation, government-mandated training (WHMIS, workplace safety), and 30-60-90 day check-ins. This reduces turnover by 50% and accelerates productivity. How many new hires do you typically onboard?";
    }

    // Culture and survey questions
    if (msg.includes('culture') || msg.includes('survey') || msg.includes('engagement') || msg.includes('pulse')) {
      return "We conduct employee engagement surveys, culture pulse checks, and exit interviews to help you monitor organizational health. You'll get actionable insights, benchmarking data, and support with action planning. Want to understand what your employees are really thinking?";
    }

    // Policy questions
    if (msg.includes('policy') || msg.includes('handbook') || msg.includes('policies')) {
      return "We create customized employee handbooks and HR policies tailored to your business and Canadian regulations. This includes code of conduct, remote work policies, harassment policies, and more. Available in English and French. Need to update your policies?";
    }

    // Fractional HR and Executive Leadership questions
    if (msg.includes('fractional') || msg.includes('part-time') || msg.includes('part time') || msg.includes('hr director') || msg.includes('chro') || msg.includes('executive') || msg.includes('ceo') || msg.includes('coo')) {
      return "Our fractional HR and executive leadership services give you access to senior HR expertise (Director, VP, CHRO) and C-suite leadership (CEO, COO) without the full-time cost. We offer onsite support weekly, bi-weekly, or monthly, plus strategic planning, executive coaching, and advisory services. Perfect for growing businesses. What level of support are you looking for?";
    }

    // Default response
    return "Thanks for reaching out! I'd love to help you find the right Canadian HR solution. Our team specializes in helping Canadian businesses like yours with compliance, hiring, training, workplace investigations, fractional HR support, and more. Would you like to schedule a free consultation, or do you have a specific question I can help with?";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      text: message,
      sender: 'user' as const,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');

    // Simulate typing delay and smart response
    setTimeout(() => {
      const agentMessage = {
        text: getSmartResponse(currentMessage),
        sender: 'agent' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[500px] bg-background border rounded-lg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">PreciseHR Support</h3>
                  <p className="text-xs opacity-90">We typically reply in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/10 rounded p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button type="submit" size="sm" className="px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Or call us at (437) 887-2263
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

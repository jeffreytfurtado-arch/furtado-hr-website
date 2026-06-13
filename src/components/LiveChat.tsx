import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

type ChatMessage = { role: 'user' | 'assistant'; content: string; ts: Date };

const CALENDLY = 'https://calendly.com/precisehr-info/precisehr-consult';

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    "Hi! I'm the PreciseHR Assistant. Ask me anything about Canadian HR — compliance, hiring, terminations, policies — or about how we can help your business.",
  ts: new Date(),
};

const SUGGESTIONS = [
  'How much notice to terminate in Ontario?',
  'What is an ROE?',
  'Do you handle payroll?',
];

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, isOpen]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: ChatMessage[] = [...messages, { role: 'user', content, ts: new Date() }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error(data.error || 'No reply');
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply, ts: new Date() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry — I had trouble responding just now. Please try again, or reach our team directly at (437) 887-2263 or info@precisehr.ca.",
          ts: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      {/* Launcher */}
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
              aria-label="Open the PreciseHR Assistant"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-[400px] h-[560px] max-h-[80vh] bg-background border rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold leading-tight flex items-center gap-2">
                    PreciseHR Assistant
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-primary-foreground/20 px-1.5 py-0.5 rounded">AI</span>
                  </h3>
                  <p className="text-xs opacity-90">Ask me anything about HR</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/10 rounded p-1 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                      msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-foreground/40"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested prompts (only before the first user turn) */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs text-left px-3 py-1.5 rounded-full border bg-background hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary/5 transition-colors"
                  >
                    <Calendar className="w-3 h-3" /> Book a free consult
                  </a>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message…"
                  disabled={loading}
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm disabled:opacity-50"
                />
                <Button type="submit" size="sm" className="px-3.5 shrink-0" disabled={loading || !input.trim()} aria-label="Send">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">
                AI assistant — for advice specific to your situation, <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">book a consult</a> or call (437) 887-2263.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

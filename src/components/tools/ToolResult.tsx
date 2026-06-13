import { useState } from 'react';
import { Copy, Check, Loader2, FileText } from 'lucide-react';

export default function ToolResult({
  loading, shown, raw, error, loadingLabel = 'Working…', emptyLabel,
}: {
  loading: boolean;
  shown: string;
  raw: string;
  error: string;
  loadingLabel?: string;
  emptyLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const revealing = !!shown && !!raw && shown !== raw;

  async function copy() {
    try {
      await navigator.clipboard.writeText(raw || shown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="rounded-xl border bg-background overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/40">
        <span className="text-xs font-medium text-muted-foreground">Result</span>
        {shown && !loading && (
          <button onClick={copy} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
      <div className="p-5 min-h-[240px] text-sm leading-relaxed">
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{loadingLabel}</span>
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {shown && (
          <p className="whitespace-pre-wrap text-foreground/90">
            {shown}
            {revealing && <span className="inline-block w-1.5 h-4 -mb-0.5 ml-0.5 bg-primary animate-pulse" />}
          </p>
        )}
        {!loading && !shown && !error && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>{emptyLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

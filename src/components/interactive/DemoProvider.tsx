"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { BookDemoDialog } from "./BookDemoDialog";
import { BrochurePrintDialog } from "./BrochurePrintDialog";
import { QuoteDialog, type EstimateSummary } from "./QuoteDialog";
import { SampleDashboardDialog } from "./SampleDashboardDialog";
import { VideoDialog, type VideoInfo } from "./VideoDialog";

export type DemoAction =
  | { kind: "demo"; topic?: "demo" | "planning" }
  | { kind: "quote"; estimate?: EstimateSummary }
  | { kind: "brochure" }
  | { kind: "dashboard" }
  | { kind: "video"; video: VideoInfo };

const DemoContext = createContext<((action: DemoAction) => void) | null>(null);

export function useDemo() {
  const open = useContext(DemoContext);
  if (!open) throw new Error("useDemo must be used inside <DemoProvider>");
  return open;
}

/** Holds the site's simulated interactions so any page can open them. Local state only. */
export function DemoProvider({ children }: { children: ReactNode }) {
  const [action, setAction] = useState<DemoAction | null>(null);
  // A new key per opening resets each dialog, so nothing typed survives a close.
  const [session, setSession] = useState(0);

  const open = useCallback((next: DemoAction) => {
    setSession((s) => s + 1);
    setAction(next);
  }, []);
  const close = useCallback(() => setAction(null), []);
  const value = useMemo(() => open, [open]);

  return (
    <DemoContext.Provider value={value}>
      {children}
      <BookDemoDialog
        key={`demo-${session}`}
        open={action?.kind === "demo"}
        topic={action?.kind === "demo" ? (action.topic ?? "demo") : "demo"}
        onClose={close}
      />
      <QuoteDialog
        key={`quote-${session}`}
        open={action?.kind === "quote"}
        estimate={action?.kind === "quote" ? action.estimate : undefined}
        onClose={close}
      />
      <BrochurePrintDialog open={action?.kind === "brochure"} onClose={close} />
      <SampleDashboardDialog open={action?.kind === "dashboard"} onClose={close} />
      <VideoDialog open={action?.kind === "video"} video={action?.kind === "video" ? action.video : null} onClose={close} />
    </DemoContext.Provider>
  );
}

/** A button that opens one of the simulated interactions. Usable from server components. */
export function ActionButton({
  action,
  className = "btn btn-primary",
  children,
  ...rest
}: {
  action: DemoAction;
  className?: string;
  children: ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "className" | "children" | "type">) {
  const open = useDemo();
  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={() => open(action)} {...rest}>
      {children}
    </button>
  );
}

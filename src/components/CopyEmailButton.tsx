"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";

/** Copies the contact email, for computers without an email app. */
export function CopyEmailButton() {
  const [status, setStatus] = useState<"" | "copied" | "failed">("");
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(site.contactEmail);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = window.setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={copy} className="btn btn-outline min-h-11 px-4 text-sm">
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <rect x="6.5" y="6.5" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M13.5 4.5v-.5a1.5 1.5 0 00-1.5-1.5H5A1.5 1.5 0 003.5 4v7A1.5 1.5 0 005 12.5h.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
        {status === "copied" ? "Copied" : "Copy email address"}
      </button>
      <span role="status" className="text-sm font-semibold text-deep">
        {status === "copied" && "Email address copied to your clipboard."}
        {status === "failed" && `Copy failed. The address is ${site.contactEmail}.`}
      </span>
    </div>
  );
}

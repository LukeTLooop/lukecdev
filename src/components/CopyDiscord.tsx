"use client";

import { useEffect, useState } from "react";

/** Discord has no username-based profile link, so copying the handle is the fastest path. */
export default function CopyDiscord({ handle }: { handle: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(handle);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full bg-brand-strong px-6 font-semibold text-white transition-colors hover:bg-brand-hover"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current stroke-[1.75]">
          {state === "copied" ? (
            <path d="m4 10.5 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <>
              <rect x="7" y="7" width="10" height="10" rx="2" />
              <path d="M13 4.5A1.5 1.5 0 0 0 11.5 3h-7A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13" />
            </>
          )}
        </svg>
        Copy Discord username
      </button>
      <span role="status" aria-live="polite" className="text-sm text-dust">
        {state === "copied" && <>Copied <span className="text-star">{handle}</span>. Add me on Discord.</>}
        {state === "failed" && <>Couldn&apos;t copy. My username is <span className="text-star">{handle}</span>.</>}
      </span>
    </div>
  );
}

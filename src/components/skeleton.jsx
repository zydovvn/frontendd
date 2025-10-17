import React from "react";
import { cn } from "../lib/utils";

export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200/70", className)} />;
}

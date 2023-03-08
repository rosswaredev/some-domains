import {
  AlertTriangle,
  LucideAlertTriangle,
  LucideFileWarning,
} from "lucide-react";
import { PropsWithChildren } from "react";

export const Alert = {
  Error: ({ children }: PropsWithChildren<unknown>) => (
    <div
      className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <span className="flex">
        <AlertTriangle />
        <p className="ml-3">{children}</p>
      </span>
    </div>
  ),
  Warning: ({ children }: PropsWithChildren<unknown>) => (
    <div
      className="relative rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700"
      role="alert"
    >
      <span className="flex">
        <AlertTriangle />
        <p className="ml-3">{children}</p>
      </span>
    </div>
  ),
};

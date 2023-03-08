import { PropsWithChildren } from "react";

export const List = ({ children }: PropsWithChildren<unknown>) => (
  <div className="animate-fade-in rounded-md border border-slate-200">
    {children}
  </div>
);

export const ListItem = ({
  children,
  href,
}: PropsWithChildren<{ href: string }>) => (
  <div className="cursor-pointer">
    <a target="_blank" rel="noopener noreferrer" href={href}>
      <div className="flex justify-between p-3 hover:bg-slate-100">
        {children}
      </div>
    </a>
  </div>
);

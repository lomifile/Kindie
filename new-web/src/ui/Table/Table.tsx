import * as React from "react";

interface TableProps extends React.HTMLAttributes<HTMLElement> {}

export const Table = ({ children }: TableProps) => {
  return <table className="min-w-full">{children}</table>;
};

import React from 'react';
import { dashedBorder } from './dashed-border';

interface HeaderProps {
  title: string;
  author: string;
}

export default function Header({ title, author }: HeaderProps) {
  return (
    <div className="relative w-full mt-[120px]">
      <div className="flex p-6 justify-between items-center border-b border-dashed" style={dashedBorder("y", "#CBCBCB", 1)}>
        <h1 className="text-sm text-primary font-medium">
          {title}
        </h1>
        <span className="text-sm text-secondary font-medium">{author}</span>
      </div>

      {/* Corner squares */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent" />
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-accent" />
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 bg-accent" />
    </div>
  );
}
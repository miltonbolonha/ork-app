import React from "react";

interface AvatarProps {
  children?: React.ReactNode;
  className?: string;
}

export function Avatar({ children, className = "" }: AvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt = "" }: { src: string; alt?: string }) {
  return <img className="w-full h-full object-cover" src={src} alt={alt} />;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-400">
      <span className="text-sm font-medium text-white">{children}</span>
    </div>
  );
}

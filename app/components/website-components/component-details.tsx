import React from 'react';

interface ComponentDetailsProps {
  title: string;
  description: string;
  className?: string;
}

export default function ComponentDetails({ 
  title, 
  description,
  className = '' 
}: ComponentDetailsProps) {
  return (
    <div className={`flex flex-col gap-1 items-start ${className}`}>
      <h2 className="text-base text-primary font-medium">
        {title}
      </h2>
      <p className="text-sm text-secondary font-medium">
        {description}
      </p>
    </div>
  );
}
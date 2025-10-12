import React from 'react';

interface CanvasAreaProps {
  children?: React.ReactNode;
  height?: number;
}

export default function CanvasArea({ 
  children, 
  height = 420 
}: CanvasAreaProps) {
  return (
    <div className="flex w-full p-1.5 bg-[#FAFAFA] border border-[#ECECEC] rounded-[20px]" style={{ height: `${height}px` }}>
      <div 
        className="flex w-full p-6 items-center justify-center bg-white border border-[#ECECEC] rounded-[14px]">
        {children || <span className="text-gray-800">this is canvas area</span>}
      </div>
    </div>
  );
}
import React from 'react';
import { Toaster } from 'sonner'

interface CanvasAreaProps {
  children?: React.ReactNode;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  showToaster?: boolean;
}

export default function CanvasArea({ 
  children, 
  overflow = 'hidden',
  showToaster = false
}: CanvasAreaProps) {
  return (
    <div className="relative flex w-full aspect-[12/7] p-1.5 bg-[#FAFAFA] border border-[#ECECEC] rounded-[20px]">
      <div 
        className="canvas-container relative flex w-full p-4 items-center justify-center bg-white border border-[#ECECEC] rounded-[14px]" style={{ overflow}}>
        {children || <span className="text-gray-800">this is canvas area</span>}
        {showToaster && (
         <>
          <Toaster position="bottom-right"/>
          <style>{`
           .canvas-container [data-sonner-toaster] {
             position: absolute !important;
             left: auto !important;
             right: 16px !important;
             bottom: 24px !important;
             top: auto !important;}`}
         </style>
        </>)} 
      </div>
    </div>
  );
}
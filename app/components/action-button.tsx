'use client'
import React from 'react';

export default function ActionButton() {
  return (
    <div className="relative flex items-center justify-center p-8 m-8 gap-12 border border-[#e4e4e4]">
      <div className="relative max-w-[420px] flex w-full flex-col justify-center p-2 gap-2 rounded-3xl overflow-visible border border-[#E4E4E4] bg-[#FAFAFA]">
        <div className="relative flex justify-end items-center gap-3 p-2 rounded-2xl">
          <button className="h-[36px] cursor-pointer flex items-center px-3 text-[14px] text-[#7A7A82] font-medium leading-[100%] bg-white rounded-lg border border-[#ECECEC]
            hover:bg-[#FBF4F2] hover:border-[#FFBABE] hover:text-[#CF4149] transition-colors duration-300 ease-in-out">
            Cancel ticket
          </button>
          <button className="h-[36px] group relative cursor-pointer flex items-center px-3 text-[14px] text-[#ffffff] font-medium leading-[100%] bg-[#A41AA7] rounded-lg border-[0.5px] border-white/30
            shadow-[-2px_4px_4px_0_rgba(255,255,255,0.25)_inset,_0_0_0_1px_#A41AA7] overflow-hidden 
            before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(170deg,rgba(255,255,255,0.2)_30%,transparent_30%)] before:content-[''] before:opacity-100 before:transition-opacity before:duration-300
            hover:before:opacity-0">
            <span className="relative z-10 text-shadow-lg transition-shadow duration-300 group-hover:text-shadow-none">
              Start deployment
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

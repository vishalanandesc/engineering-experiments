'use client'
import { X } from 'lucide-react';
import { useState } from "react";
import { motion} from 'framer-motion';

interface TabNavProps {
  width?: string;
  className?: string;
}

export default function TabNav({ width = '100%', className = '' }: TabNavProps) {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
      { id: "details", label: "Ticket Details" },
      { id: "plan", label: "Execution Plan" },
      { id: "code", label: "Code Changes" }
  ];

  return (
    <div 
      className={`relative bg-white flex flex-col rounded-md border border-[#E4E4E4] overflow-hidden ${className}`}
      style={{ width }}>
      <div className="flex justify-between items-center px-4 py-3 bg-[#FAFAFA] border-b border-[#E4E4E4]">
        <p className="text-base text-[#323238] font-medium tracking-normal">TCK-847193</p>
        <div className="cursor-pointer">
          <X size={18} color="#7A7A82" />
        </div>
      </div>

      <div className="flex items-center gap-4 px-4 mt-2 overflow-visible "> 
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        className={`relative flex py-2 px-1 cursor-pointer h-[34px] text-[14px] font-medium transition-colors duration-200 ${
                            activeTab === tab.id ? "text-[#1D4ED8]" : "text-[#7A7A82] hover:text-[#323238]"
                        }`}
                        onClick={() => setActiveTab(tab.id)}>
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                className="absolute flex bottom-[-0.5px] left-0 right-0 h-[3px] bg-[#1D4ED8]"
                                layoutId="ActiveTab"
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 45
                                }}
                            />
                        )}
                    </motion.button>
                ))}
        </div>
    </div>
  )
}
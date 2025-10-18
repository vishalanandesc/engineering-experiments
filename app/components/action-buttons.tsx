'use client';

import { Check, Loader, SquareArrowOutUpRight, RefreshCcw } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export default function ActionButtons() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Query Analyzed',
      description: 'The query was analyzed by the agent.',
      timestamp: '8/14/2025 15:30:06',
      completed: true,
    },
    {
      id: 2,
      title: 'Plan Created',
      description: 'An execution plan has been generated.',
      timestamp: '8/14/2025 15:34:12',
      completed: true,
    },
    {
      id: 3,
      title: 'Plan Executed',
      description: 'All actions in the plan have been executed.',
      timestamp: '8/14/2025 15:36:26',
      completed: true,
    },
    {
      id: 4,
      title: 'Deployment Approval',
      description: 'Waiting for approval to start deploying.',
      timestamp: '',
      completed: false,
    },
  ];

  return (
    <>
     <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 p-2 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
        <RefreshCcw className="w-4 h-4" />
      </button>

      <AnimatePresence mode="popLayout">
      <motion.div
          layout
          initial={{ opacity: 0, scale: 0.8, borderRadius: '0.5rem' }}
          animate={{ opacity: 1, scale: 1, borderRadius: '1.25rem' }}
          exit={{ opacity: 0, scale: 0.8, borderRadius: '0.5rem' }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="absolute right-36 bottom-54 flex max-w-[480px] flex-col items-center justify-center rounded-[20px] border border-[#ECECEC] bg-[#FAFAFA] p-1.5 shadow-[0_6px_18px_0_rgba(0,0,0,0.06)]"
        >
          {!isOpen ? (
            // Collapsed Button State
            <motion.button
              key="collapsed"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                layout: { duration: 0.5, type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3, delay: 0.2 }
              }}
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-[52px] px-6 cursor-pointer rounded-xl bg-gradient-to-r from-[#A41AA7] to-[#8B158C] text-white font-medium text-base shadow-lg hover:shadow-xl transition-shadow"
            >
              Action Buttons
            </motion.button>
          ) : (
            // Expanded Timeline State
            <motion.div
              key="expanded"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { duration: 0.5, type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3, delay: 0.2 },
              }}
              style={{ originX: 0.5, originY: 0.5 }}
              className="w-full flex max-w-[480px] flex-col items-center justify-center
                        rounded-[20px] border border-[#ECECEC] bg-[#FAFAFA] p-1.5
                        shadow-[0_6px_18px_0_rgba(0,0,0,0.06)]">
      
        <div className="relative flex w-full flex-col gap-6 rounded-2xl border border-[#ECECEC] bg-white p-6">
        <p className="text-sm font-medium tracking-normal text-secondary">
          EXECUTION HISTORY
        </p>

        <div className="flex w-full">
          <div className="relative w-full flex-start">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex items-start pb-8 last:pb-0">
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-4.5 h-full w-0.5"
                    style={{
                      top: 0,
                      bottom: '56px',
                      borderLeft: '1px dashed #D1D5DB',
                    }}
                  />
                )}

                <div className="relative flex-shrink-0">
                  <div
                    className={`flex items-center justify-center rounded-full p-2 border ${
                      step.completed
                        ? 'border-[#007C4C] bg-[#EBFEF3]'
                        : 'border-[#E4E4E4] bg-white'
                    }`}
                  >
                    {step.completed ? (
                      <Check size={16} color="#007C4C" />
                    ) : (
                      <span
                        className="inline-block animate-spin"
                        style={{ animationDuration: '3s', transformOrigin: 'center' }}
                      >
                        <Loader size={16} color="#323238" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-4 flex w-full items-start justify-between gap-4">
                  <div className="flex w-full flex-col">
                    <h3 className="mb-1 text-base font-medium text-primary">
                      {step.title}
                    </h3>
                    <p className="mb-2 text-sm font-medium text-secondary">
                      {step.description}
                    </p>
                    {step.timestamp && (
                      <span className="text-sm font-medium text-secondary">
                        {step.timestamp}
                      </span>
                    )}
                  </div>
                  <div className="group relative mt-1 inline-flex cursor-pointer items-center">
                    <SquareArrowOutUpRight
                      size={20}
                      className="text-secondary group-hover:text-[#2D63E9] transition-colors duration-300 ease-in-out"
                    />
                    <span
                      className="
                        absolute bottom-full left-4 mb-1 -translate-x-1/2 rounded bg-black
                        px-2 py-1 text-[12px] font-medium text-white opacity-0
                        transition-opacity duration-300 group-hover:opacity-100
                        whitespace-nowrap
                      "
                    >
                      View details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Action buttons === */}
      <div
        className="
          relative flex w-full flex-col justify-center gap-2 rounded-2xl bg-[#FAFAFA]
          p-2 overflow-visible
        "
      >
        <div className="relative flex items-center justify-end gap-3 rounded-2xl p-2">
          <motion.button
            whileTap={{ scale: 0.98,
              transition: { duration: .15, ease: "easeOut" }
             }}
            onClick={() => toast('Ticket has been cancelled')}
            className="
              flex h-[36px] cursor-pointer items-center rounded-lg border border-[#ECECEC]
              bg-white px-4 text-sm font-medium leading-[100%] text-secondary
              transition-colors duration-150 ease-out
              hover:border-[#FFBABE] hover:bg-[#FBF4F2] hover:text-[#CF4149]
            "
          >
            Cancel ticket
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98,
              transition: { duration: .15, ease: "easeOut" }
             }}
            onClick={() => toast.success('Deployment has been started')}
            className="
              group relative flex h-[36px] cursor-pointer items-center rounded-lg border-[0.5px]
              border-white/30 bg-[#A41AA7] px-4 text-sm font-medium leading-[100%] text-white
              shadow-[-2px_4px_4px_0_rgba(255,255,255,0.25)_inset,_0_0_0_1px_#A41AA7]
              overflow-hidden transition-all duration-150 ease-out
              before:absolute before:inset-0 before:rounded-[inherit]
              before:bg-[linear-gradient(170deg,rgba(255,255,255,0.2)_30%,transparent_30%)]
              before:content-[''] before:opacity-100 before:transition-opacity before:duration-300
              hover:before:opacity-0
            "
          >
            <span className="relative z-10 transition-shadow duration-300">
              Start deployment
            </span>
          </motion.button>
       </div>
            </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
    

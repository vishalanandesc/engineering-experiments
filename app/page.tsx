"use client"

import { cn } from "./lib/utils"
import { dashedBorder } from "./components/dashed-border" 


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen max-w-[720px] mx-auto" style={dashedBorder("x", "#CBCBCB", 1)}>
      <div className="flex w-full h-[120px]" style={dashedBorder("b", "#CBCBCB", 1)}> </div>
      <div className="relative w-full"> 
       <div className="flex p-6 justify-between items-center" style={dashedBorder("b", "#CBCBCB", 1)}>
         <p className="text-base text-secondary font-medium">ENGINEERING EXPERIMENTS</p>
         <p className="text-sm text-secondary font-medium">VISHAL ANAND</p>
       </div>

       {/* absolute positioned divs */}

       <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent" />
       <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-accent" />
       <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent" />
       <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 bg-accent" />
     </div> 

     <div className="w-full px-6 py-8 flex flex-col gap-6" style={dashedBorder("b", "#CBCBCB", 1)}> 
        <div className="flex w-full p-1.5 border border-[#ECECEC] bg-[#FAFAFA] h-[420px] rounded-[20px]">
            <div className="flex w-full items-center justify-center bg-white border border-[#ECECEC] rounded-[14px]">
                this is canvas area
            </div>

        </div>
      <div className="flex flex-col gap-1 items-start">
          <p className="text-base text-[#323238] font-medium"> Custom Dropdown </p>
          <p className="text-sm text-[#7A7A82] font-medium">
          A dropdown menu that animates the trigger based on the position of the dropdown.
          </p>
      </div>
     </div>  

     

    </main>
  );
}

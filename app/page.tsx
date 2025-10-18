"use client"
import React from 'react';

import { dashedBorder } from './components/website-components/dashed-border';
import Header from './components/website-components/header';
import ComponentDetails from './components/website-components/component-details';
import CanvasArea from './components/website-components/canvas-area';
import Dropdown from './components/dropdown';
import ActionButtons from './components/action-buttons';


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center max-w-[720px] mx-auto" style={dashedBorder("x", "#CBCBCB", 1)}>
       <Header 
          title="ENGINEERING EXPERIMENTS" 
          author="VISHAL ANAND" 
        />

     <div className="w-full px-6 py-8 flex flex-col gap-6" style={dashedBorder("b", "#CBCBCB", 1)}> 
       <CanvasArea overflow="visible">
         <Dropdown width="400px"/>
       </CanvasArea>

       <ComponentDetails 
        title="Custom Dropdown" 
        description="A dropdown menu with dynamic file-type icons, beautified with tailwind & react motion."
        />
     </div>  

     <div className="w-full px-6 py-8 flex flex-col gap-6" style={dashedBorder("b", "#CBCBCB", 1)}> 
       <CanvasArea>
         <ActionButtons/>
       </CanvasArea>

       <ComponentDetails 
        title="Action Buttons" 
        description="A dropdown menu with dynamic file-type icons, beautified with tailwind & react motion."
        />
     </div> 

  
     

    </main>
  );
}

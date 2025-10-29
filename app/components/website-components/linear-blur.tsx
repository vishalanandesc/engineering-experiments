import React from "react";

export default function Blur(){
    return(
        <div className="fixed top-0 left-0 right-0 h-20 z-50 pointer-events-none">
        <div 
          className="w-full h-full backdrop-blur-xl"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
          }}
        />
      </div>
);
}
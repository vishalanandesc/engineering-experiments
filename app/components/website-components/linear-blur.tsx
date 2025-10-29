import React from "react";

export default function Blur(){
    return(
    <div>
    <div className="fixed top-0 w-full h-16 backdrop-blur-sm z-10
      mask-image:linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
      -webkit-mask-image:linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)">
    </div>
    
    <div className="fixed top-0 w-full h-16 backdrop-blur-sm z-20
      mask-image:linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
      -webkit-mask-image:linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)">
    </div>

    <div className="fixed top-0 w-full h-16 backdrop-blur-sm z-30
      mask-image:linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
      -webkit-mask-image:linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)">
    </div>

    </div>
);
}
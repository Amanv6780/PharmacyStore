import { useState } from "react";

export function ComponentWrapper({children}){


    const [hovered,setHovered]=useState(false)

    function handleMouseLeave(){
        setHovered(false)
    }


    function handleMouseEnter() {
      setHovered(true);
    }

    return <div style={{transition:'all ease-in-out 0.2s'}}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={` container ${hovered?'shadow-lg':'shadow-sm'}  my-5 border rounded p-5 bg-light`}>
{children}
    </div>;
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { CardWrapper } from "../CardWrapper";

export function CardComponent({ title, description, buttonText, path }) {
  const navigate = useNavigate();

  const [hover,setHover] = useState(false)
  

  function handleLeave(){
    setHover(false)
  }
  function handleEnter(){
    setHover(true)
  }



  return (
    <div
    onMouseEnter={handleEnter}
  onMouseLeave={handleLeave}

      className={`col  d-flex flex-column justify-content-between align-items-start m-3 bg-light p-4 border rounded ${hover?'shadow-lg':'shadow-sm'} `}
      style={{ minHeight: "30vh", minWidth: "30vh",transition:"all ease-in-out 0.3s" }}
    >

      
      <h3>{title}</h3>
      <p className="w-50">{description}</p>
      <button className="btn btn-primary w-100" onClick={() => navigate(path)}>
        {buttonText}
      </button>
    </div>
  );
}




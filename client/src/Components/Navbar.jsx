import { useContext, useEffect, useState } from "react";
import { LoggedinContext } from "../GlobalContexts/Contexts";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const { loggedin, setLoggedin,downloading  } = useContext(LoggedinContext);

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const navigate = useNavigate();
const {cart} = useContext(LoggedinContext)

  const [role, setRole] = useState();

  

  // Function to check if the user is logged in by checking the localStorage
  function checkLoggedin() {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      console.log("ran once");
      setLoggedin(true);
      setToken(storedToken); // Set token in state if it exists
    } else {
      setLoggedin(false);
      setToken(null); // Reset token if no token found
    }
  }

  // Run checkLoggedin only once when the component mounts
  useEffect(() => {
    console.log("nav ran");
    setRole(localStorage.getItem('role'))
    checkLoggedin();
  });

  // Handle the sign-out process
  function handleLoggedout() {
    setLoggedin(false);
    localStorage.clear();
    setToken(null); // Reset token in state on logout
    navigate("/");
  }

  function handleHeroNav(){
    if(role === 'storeAdmin'){

      navigate('/storeadmindash')

    }else if(role === 'user'){
       navigate("/home");
    }
    else if(role === 'mainAdmin') {
      navigate('/mainadmindashboard')
    }
  }


  return (
    <div
      className={`sticky-top bg-primary p-2 px-3 shadow-lg ${
        downloading ? "d-none" : "d-flex"
      } justify-content-between `}
    >
      <div
        className="h3 text-white my-auto "
        style={{ cursor: "pointer" }}
        onClick={handleHeroNav}
      >
        PharmaOne
      </div>
      <div>
        {loggedin && role === "user" && (
          <button
            className="btn btn-outline-light btn-sm mr-2 position-relative"
            onClick={() => navigate("/cart")}
          >
            {cart.length!==0 && (<div
              className="bg-danger text-white d-flex justify-content-center align-items-center"
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                fontSize: "10px",
              }}
            >
              {cart.length}
            </div>)}
            Cart
          </button>
        )}
        {loggedin ? (
          <button
            className="btn btn-outline-light btn-sm "
            onClick={handleLoggedout}
          >
            Sign Out
          </button>
        ) : null}
      </div>
    </div>
  );
}

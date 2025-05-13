import { useEffect, useState } from "react";
import { LoggedinContext } from "./Contexts";

export function LoginProvider({ children }) {
  const [loggedin, setLoggedin] = useState(false);
  const currentAccessToken = localStorage.getItem("access_token")
  const [total,setTotal] = useState(0)
  const [downloading,setDownloading] = useState(false)
  const [cart, setCart] = useState(() => {
    const currCart = JSON.parse(localStorage.getItem(`${currentAccessToken}`));

    if (currCart && Array.isArray(currCart)) {
      return currCart;
    } else {
      return [];
    }
  });


  

// calculating the total amount 
  const calculateTotal = (cart) => {
    return cart.reduce((acc, item) => acc + (item.Amount || 0), 0);
  };

  useEffect(() => {
    const cartString = JSON.stringify(cart);
    localStorage.setItem(`${currentAccessToken}`, cartString);
    const newTotal = calculateTotal(cart);
    setTotal(newTotal);

  }, [cart]);

  return (
    <LoggedinContext.Provider value={{ loggedin, setLoggedin, cart, setCart,total,setTotal,downloading,setDownloading }}>
      {children}
    </LoggedinContext.Provider>
  );
}

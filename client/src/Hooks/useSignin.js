import { useState } from "react";
import { Base_Url } from "../Configs/Constants";
import axios from "axios";

export function UseSignin() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({});

  async function CallSigninRoute(userDetails) {
    try {
      setLoading(true);
      const response = await axios.post(`${Base_Url}/auth/signin`, {
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
        
      });
      if (response.data) {
        setLoading(false);
        return response.data;
      } else {
        console.log("didnt get any response");

     
      }
    } catch (e) {
      setErr(e);
      alert('Error occured')
      setLoading(false)
    }
  }

  return { loading, err, CallSigninRoute };
}

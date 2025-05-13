import { useState } from "react";
import { Base_Url } from "../Configs/Constants";
import axios from "axios";

export function UseRegister() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({});

  async function CallRegisterRoute(userDetails) {
    try {
      setLoading(true);

      const response = await axios.post(`${Base_Url}/auth/register`, {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
        role: userDetails.role,
        securityQuestion: userDetails.securityQuestion,
        securityAnswer: userDetails.securityAnswer
      });

      if (response) {
        setLoading(false);
        console.log("response data  " + response.data.resp + response.data.token);
        return response.data;
      } else {
        console.log("didn't get any response");
      }
    } catch (e) {
      setLoading(false);
      setErr(e);
      alert('Invalid Inputs Cant Register You')
    }
  }

  return { loading, err, CallRegisterRoute };
}
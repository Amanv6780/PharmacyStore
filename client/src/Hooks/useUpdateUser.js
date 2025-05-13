import axios from "axios";
import { useState } from "react";
import { Base_Url } from "../Configs/Constants";

export function UseUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function callUpdateRoute(userDetails) {
    setLoading(true)
    try {
      const response = await axios.put(`${Base_Url}/updateuser/updateinfo`,userDetails,{
        headers:{
            authorization: localStorage.getItem('access_token')
        }
      });

      if(!response.data){
        console.log('no response');
      }
      else {
        console.log(response.data);
        alert('User Updated Successfully')
      }
    } catch (e) {
      setError(e.message);
      console.log(error);
      alert("warning , error occured , user not updated");
    } finally {
      setLoading(false);
    }
  }

  return {callUpdateRoute, loading}


}

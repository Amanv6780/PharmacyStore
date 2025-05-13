// src/hooks/useStoreAdmin.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Base_Url } from "../Configs/Constants";

const useViewUser = (usertype) => {
  const [viewUser, setviewUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${Base_Url}/getusers/allusers`,{
          headers:{
            authorization: localStorage.getItem('access_token')
          }
        });
        const filtered = response.data.users.filter(
          (user) => user.role === usertype
        );
        setviewUser(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users: viewUser, loading, error };
};

export default useViewUser;



export function useGetUserDetails() {
  const [loading2, setLoading] = useState(false);
  const [user1, setUser] = useState({});
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/getusers/user`, {
        headers: {
          authorization: localStorage.getItem("access_token"),
        },
      });
      setUser(response.data); 
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Error fetching user details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return { user1 , loading2, error, fetchUserDetails };
}
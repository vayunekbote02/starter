import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const UserPage = () => {
  const { username } = useParams();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/user/${username}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`, // Include the token in the request headers
            },
          }
        );
        const data = await res.data;
        if (data.status === 200) {
          setUser(data.user[0].name);
        } else if (data.status === 403) {
          navigate("/login");
        } else if (data.status === "error") {
          console.log(data.error);
        }
      } catch (err) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [username, navigate, cookies.token]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Hello {user}</h1>
    </div>
  );
};

export default UserPage;

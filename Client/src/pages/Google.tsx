import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Google: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL as string;

  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
      axios
        .get(`${BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data.fullName);
          localStorage.setItem("email", res.data.data.email);
          localStorage.setItem("fullName", res.data.data.fullName);
          localStorage.setItem("userName", res.data.data.fullName);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          window.location.href = "/";
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
};

export default Google;

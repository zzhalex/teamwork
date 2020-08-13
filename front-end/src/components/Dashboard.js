import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [task, setTask] = useState({});
  useEffect(() => {
    let access_token = localStorage.getItem("token");
    axios
      .get("/task", {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div className="Dashboard">Dashboard</div>;
}

import { useState, useEffect } from "react";
import axios from "axios";

export default function useUsername() {
  let [username, setUsername] = useState("");
  useEffect(() => {
    axios.get("/username.json").then((r) => {
      setUsername(r.data);
    });
  }, []);
  return username;
}
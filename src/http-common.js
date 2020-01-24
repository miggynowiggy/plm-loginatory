import axios from "axios";

export default axios.create({
  baseURL: "https://plm-loginatory-api.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  }
});

import axios from "../axios";

const getAllCities = () => {
  return axios.get("/api/get-all-cities");
};

const saveHomelisting = (data) => {
  return axios.post("/api/save-homelisting", data);
};

export { getAllCities, saveHomelisting };

import axios from "../axios";

const getAllCities = () => {
  return axios.get("/api/get-all-cities");
};

export { getAllCities };

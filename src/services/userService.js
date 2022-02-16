import axios from "../axios";

const getAllCities = () => {
  return axios.get("/api/get-all-cities");
};

const saveHomelisting = (data) => {
  return axios.post("/api/save-homelisting", data);
};

const getAllHomelistings = (inputId) => {
  return axios.get(`/api/get-all-homelistings?id=${inputId}`);
};

const deleteHomelisting = (homelistingId) => {
  return axios.delete("/api/delete-homelisting", {
    data: { id: homelistingId },
  });
};

export { getAllCities, saveHomelisting, getAllHomelistings, deleteHomelisting };

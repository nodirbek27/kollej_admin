import axiosInstance from "./index";

const ep = "home/carusel/";

const get = () => axiosInstance.get(ep);

const getbyId = (id) => {
  return axiosInstance.get(`${ep}${id}/`);
};
const post = (item) => {
  return axiosInstance.post(`${ep}`, item);
};
const put = (id, item) => {
  return axiosInstance.put(`${ep}${id}/`, item);
};
const patch = (id, item) => {
  return axiosInstance.patch(`${ep}${id}/`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${ep}${id}/`);
};

const APICarousel = { get, getbyId, post, put, patch, del };

export default APICarousel;

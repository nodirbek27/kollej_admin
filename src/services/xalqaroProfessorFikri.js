import axiosInstance from "./index";

const ep = "faoliyat/xalqaro_profesor_fikri/";

const get = () => axiosInstance.get(ep);
const getById = (id) => axiosInstance.get(`${ep}${id}/`);

const post = (item) => {
  return axiosInstance.post(`${ep}`, item);
};
const put = (id, item) => {
  return axiosInstance.put(`${ep}${id}/`, item);
};
const del = (id) => {
  return axiosInstance.delete(`${ep}${id}/`);
};


const APIProfessorlarFikri = { get, getById, post, put, del };

export default APIProfessorlarFikri;
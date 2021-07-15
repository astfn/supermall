import axios from "axios";

function instance(preset) {
  let instance = axios.create({
    baseURL: "http://123.207.32.32:8000/api/h8",
    timeout: 5500
  });
  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => console.log(error)
  );
  instance.interceptors.response.use(
    result => {
      return result.data;
    },
    error => console.log(error)
  );
  return instance(preset);
}

export { instance };

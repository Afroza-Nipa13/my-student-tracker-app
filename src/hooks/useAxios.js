import axios from "axios";
// http://localhost:5000
//
const axiosInstance = axios.create({
    baseURL: `http://localhost:5000`,
    withCredentials:true
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
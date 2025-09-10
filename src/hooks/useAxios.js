import axios from "axios";
// http://localhost:5000
//
const axiosInstance = axios.create({
    baseURL: `https://my-student-tracker-app-server.vercel.app`,
    withCredentials:true
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
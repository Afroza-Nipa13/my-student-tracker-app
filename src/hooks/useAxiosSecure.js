import axios from 'axios';
// http://localhost:5000 
// https://my-student-tracker-app-server.vercel.app
const axiosSecure = axios.create({
  baseURL: 'https://my-student-tracker-app-server.vercel.app',
  withCredentials:true
  
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;

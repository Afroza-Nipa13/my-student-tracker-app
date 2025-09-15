import axios from 'axios';
// http://localhost:5000 
// https://my-student-tracker-app-server.vercel.app
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials:true
  
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;

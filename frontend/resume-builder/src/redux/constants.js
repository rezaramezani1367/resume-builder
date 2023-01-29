import axios from "axios";

const userLoading = "userLoading";
const userSuccess = "userSuccess";
const userError = "userError";
const baseUrl = "http://localhost:8000/";
const client = axios.create({
    baseURL: baseUrl,
  });
  
export { userLoading, userSuccess, userError,baseUrl,client };

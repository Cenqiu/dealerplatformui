import axios from "./AxiosHelper"
export const loginRequest = async (data: any) => {
   var res = await axios.post("login", data);
   return res.data;
}
import axios from "axios";

//const base_url = "https://cnweb.onrender.com/api/";
const base_url = "https://localhost:7006/api/";
axios.defaults.withCredentials = true;
class AllApi {
    register(newUser){
        return axios.post(base_url + 'User', newUser);
    }
    login(user){
        return axios.post(base_url + 'User/Login', user)
    }
    getAdmin(){
        return axios.get(base_url + 'Admin') 
    }
}
export default new AllApi()
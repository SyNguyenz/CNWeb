import axios from "axios";

const base_url = "https://localhost:7006/api/";
class AllApi {
    register(newUser){
        return axios.post('https://localhost:7006/api/User', newUser);
    }
}
export default new AllApi()
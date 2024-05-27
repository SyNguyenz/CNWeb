import axios from "axios";

export const base_url = "https://cnweb.onrender.com/api/";
//export const base_url = "https://localhost:7006/api/";
axios.defaults.withCredentials = true;
class AllApi {
    register(newUser){
        return axios.post(base_url + 'User', newUser);
    }
    login(user){
        return axios.post(base_url + 'User/Login', user);
    }
    getAdmin(){
        return axios.get(base_url + 'Admin') ;
    }
    getAllProduct(){
        return axios.get(base_url + 'Product');
    }
    checkout(amount, info, orderInfo){
        return axios.get(base_url + 'VNpayAPI/' + amount + '&' + info + '&' + orderInfo);
    }
    getUserInfo(){
        return axios.get(base_url + 'User/CurrentUser');
    }
    getAllOrder(){
        return axios.get(base_url + 'Order')
    }
    updateOrderStatus(id){
        return axios.put(base_url + 'Order/UpdateOrderState' + id)
    }
    addOrder(ids, numbers){
        return axios.post(base_url + 'Order',{
            ids: ids,
            numbers: numbers
        });
    }
    addProduct(product){
        return axios.post(base_url + 'Product', product)
    }
    updateProduct(id, product){
        return axios.put(base_url + 'Product/UpdateProduct' + id, product)
    }
    deleteProduct(id){
        return axios.delete(base_url + 'Product/' + id);
    }
    getUser(id){
        return axios.get(base_url + 'User', id);
    }
    updateUser(id, password, model){
        return axios.put(base_url + 'User' + id, password, model)
    }
    deleteUser(id){
        return axios.delete(base_url + 'User/' + id);
    }
    getComments(id){
        return axios.get(base_url + 'Product/Comments' + id);
    }
    addComments(comment){
        return axios.post(base_url + 'User/Comments', comment);
    }
    changePassword(id, currentPassword, model) {
        return axios.put(base_url + 'User/', + id, currentPassword, model);
    }
    getOrder(id) {
        return axios.get(base_url + 'Order/UserId' + id);
    }
 
}
const apiInstance = new AllApi();
export default apiInstance;
export { AllApi };
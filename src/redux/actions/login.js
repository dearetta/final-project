import axios from 'axios'
import { createBrowserHistory } from 'history';
import { message } from "antd"

const history = createBrowserHistory()

export const userLogin = data => dispatch => {
        axios.post(`${process.env.REACT_APP_API_URL}/users/login`, data)
        .then(res => {
            // window.localStorage.token = res.data.token
            console.log(res);        
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    token: res.data.data.token,
                    // email: res.data.user.email,
                    // password: res.data.user.password
                }
            })
            if(res.status === 200){
                localStorage.setItem("token", res.data.data.token)
                localStorage.setItem("isAuthenticated", true)
                message.success(`Login as ${`user`}`, 1)
                history.push('/')
            }
            
        })
        .catch(err => {
            console.log(err);
            message.error("Login failed", 1);
          });
    
    
}

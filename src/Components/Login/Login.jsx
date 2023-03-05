import { useReducer } from "react";
import { reducer } from "../Reducers/LoginReducer";
import { useNavigate } from "react-router-dom";
import "./Login.css"
export const Login = () => {
    const [loginData, dispatch] = useReducer(reducer, { emailId: '', password: '', emailError: '', passError: '', isLogin: false })
    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch({type:"login",payload:[loginData.emailId,loginData.password]});
        ((loginData.emailError === "" || loginData.passError === "")&&(loginData.emailId!=="" && loginData.password!=="" && loginData.password.length===6)) ? navigate("/main/todo") : navigate("/");
       
    }
    return (
        <div class="form-box">
        
            <form >
            <h3 className="title">Task Manager</h3>
                <div class="form-group mb-3">
                <label for="email">Email Id</label>
                    <input type="text" className="form-control mt-1" value={loginData.emailId} name="email" placeholder="Enter Email" onChange={(e) => { dispatch({ type: "email", payload: e.target.value }) }}></input>
                    <span className="vt-error">{loginData?.emailError}</span>
                </div>
                <div class="form-group  mb-3">
                <label for="password">Password</label>
                    <input type="password" className="form-control mt-1" maxLength={6} value={loginData.password} name="password" placeholder="Enter Password" onChange={(e) => { dispatch({ type: "password", payload: e.target.value }) }}></input>
                    <span className="vt-error">{loginData?.passError}</span>
                </div>
                <div className="login">
                    <button class="btn btn-primary" 
                    onClick={(e) => { loginHandler(e) }}
                    //  disabled={(loginData.emailId !== "" && loginData.password !== "") ? false : true}
                     >Login</button>
                </div>
            </form>
            </div>
    );
}
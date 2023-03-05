import { useNavigate, Outlet } from "react-router-dom";
import "./Main.css"
export const Main = () => {
    const navigate = useNavigate();
    return (
        <>
            <button onClick={() => { navigate("/logout") }} className="btn btn-light logout">Logout</button>
                <div className="tabs">
                    <button className="btn btn-light" onClick={() => { navigate("/main/todo") }}>Add Task</button>
                    <button className="btn btn-light" onClick={() => { navigate("/main/todolist") }}>List of Tasks</button>
                </div>
                <div>
                    <Outlet />
                </div>
            </>);
}
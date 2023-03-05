import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../Login/Login";
import { Main } from "../Main/Main";
import { Todo } from "../Todo/Todo";
import { TodoList } from "../TodoList/TodoList";

export const Home = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="main" element={<Main />}>
                    <Route path="todo" element={<Todo {...props}/>} />
                    <Route path="todolist" element={<TodoList {...props}/>} />
                </Route>
                <Route path="logout" element={<Login />} />
            </Routes>

        </BrowserRouter>
    );
}
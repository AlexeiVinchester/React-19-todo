import { Route, Routes } from "react-router"
import { UsersPage } from "../pages/users"
import { TodoList } from "../pages/todo-list"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />}></Route>
      <Route path="/:userId/tasks" element={<TodoList />}></Route>
    </Routes>
  )
}
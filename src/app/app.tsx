import { Route, Routes } from "react-router"
import { UsersPage } from "../pages/users"
import { TodolistPage } from "../pages/todo-list"
import { UsersProvider } from "../pages/users/ui/UsersContext"

export const App = () => {
  return (
    <UsersProvider>
      <Routes>
        <Route path="/" element={<UsersPage />}></Route>
        <Route path="/:userId/tasks" element={<TodolistPage />}></Route>
      </Routes>
    </UsersProvider>

  )
}
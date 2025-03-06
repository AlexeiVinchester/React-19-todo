import { Route, Routes } from "react-router"
import { UsersPage } from "../pages/users"
import { TodolistPage } from "../pages/todo-list"
import { UsersProvider } from "../entities/usersContext/UsersProvider";

export const App = () => {
  return (
    <UsersProvider>
      <Routes>
        <Route path="/" element={<UsersPage />}></Route>
        <Route path="/:userId/tasks" element={<TodolistPage />}></Route>
      </Routes>
    </UsersProvider>
  );
};
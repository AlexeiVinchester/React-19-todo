import { Route, Routes } from "react-router"
//import { UsersPage } from "../pages/users"
import { TodolistPage } from "../pages/todo-list"
import { UsersProvider } from "../entities/usersContext/UsersProvider";
import { RepeatUsersPage } from "../repeat/pages/users/ui/page";

export const App = () => {
  return (
    <UsersProvider>
      <Routes>
        <Route path="/" element={<RepeatUsersPage />}></Route>
        <Route path="/:userId/tasks" element={<TodolistPage />}></Route>
      </Routes>
    </UsersProvider>
  );
};
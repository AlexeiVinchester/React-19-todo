import { TRepeatUser } from "../model/user.type";

export const repeatFetchUsers = async () => {
  const response = await fetch('http://localhost:3001/users');
  const data: TRepeatUser[] = await response.json();

  return data;
};

export const repeatCreateUser = async (user: TRepeatUser) => {
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();

  return data;
};

export const repeatDeleteUser = async (id: string) => {
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();

  return data;
}
export type TUser = {
  id: string;
  email: string;
}
const sleep = (delay: number) => new Promise((res) => setTimeout(res, delay));

export const fetchUsers = async () => {
  await sleep(2000)
  const response = await fetch('http://localhost:3001/users');
  const data: TUser[] = await response.json();

  return data;
};

export const createUser = async (user: TUser) => {
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();

  return data;
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();

  return data;
}



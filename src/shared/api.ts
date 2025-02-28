export type TUser = {
  id: string;
  email: string;
}

export const fetchUsers = async () => {
  const response = await fetch('http://localhost:3001/users');
  const data: TUser[] = await response.json();

  return data;
};

export const createUser = async (user: TUser) => {
  throw new Error('Yoooops')
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



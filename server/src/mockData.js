// @flow

type User = {
  id: number,
  name: string,
  email: string
}

const users: User[] = [
  {
    id: 1,
    name: 'Michal',
    email: 'svrcekmichal@gmail.com'
  }
];

export const getUserById = (id: number) => new Promise((resolve,reject) => {
  const user = users.find((user) => user.id === id);
  user ? resolve(user) : reject(new Error('User does not exists'));
})

export const getUsers = () => Promise.resolve(users);

export function addUser(id, user, email) {
  users.push({ id: id, name: user, email: email });
}
export function getAllUsers() {
  console.log(users);
  return users;
}

export function findUserById(id) {
  const user = users.find((user) => user.id === id);
  console.log(user);
}
export function emailExists(email) {
  const user = users.find((p) => p.email === email);
  console.log(user); // { email: "pepe@example.com" }
}

export function updateUserById(id, userData) {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userData };
    console.log(users[userIndex]);
  }
}

export function deleteUserById(id) {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    console.log(deletedUser);
  }
}

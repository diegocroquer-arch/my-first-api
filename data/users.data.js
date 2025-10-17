function addUser(id, user, email) {
  users.push({ id: id, name: user, email: email });
}
function getAllUsers() {
  console.log(users);
  return users;
}

function findUserById(id) {
  const user = users.find((user) => user.id === id);
  console.log(user);
}
function emailExists(email) {
  const user = users.find((p) => p.email === email);
  console.log(user); // { email: "pepe@example.com" }
}

function updateUserById(id, userData) {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userData };
    console.log(users[userIndex]);
  }
}

function deleteUserById(id) {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    console.log(deletedUser);
  }
}

let users = [];

exports.addUser = ({ id, name, room, pfp }) => {
  if (!name || !room) return { error: "Username and room are required." };
  const user = { id, name, room, pfp };

  users.push(user);

  return { user };
};
exports.removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  return users[index];
};

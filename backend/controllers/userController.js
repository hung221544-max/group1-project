let users = [
  { id: 1, name: "Phan Thanh Vu" },
  { id: 2, name: "Nguyen Chi Hy" }
];

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
};

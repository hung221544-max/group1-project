// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Lỗi khi lấy danh sách user:", error));
  }, []);

  return (
    <div>
      <h2>Danh sách User</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

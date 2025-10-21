import React from "react";

function UserList({ users }) {
  return (
    <ul className="user-list">
      {users.map((user, index) => (
        <li key={index} className="user-item">
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;

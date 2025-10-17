// src/components/AddUser.jsx
import React, { useState } from "react";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email };

    axios.post("http://localhost:3000/users", newUser)
      .then(() => {
        alert("Thêm user thành công!");
        onUserAdded(); // gọi lại hàm cập nhật danh sách
        setName("");
        setEmail("");
      })
      .catch(error => console.error("Lỗi khi thêm user:", error));
  };

  return (
    <div>
      <h2>Thêm User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Thêm_Vào</button>
      </form>
    </div>
  );
}

export default AddUser;

import React, { useState } from "react";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email };

    axios
      .post("http://localhost:5000/users", newUser)
      .then((res) => {
        alert("✅ Thêm user thành công!");
        onUserAdded(res.data);
        setName("");
        setEmail("");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm user:", error);
        alert("❌ Không thể thêm user, kiểm tra lại server backend!");
      });
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Thêm</button>
    </form>
  );
}

export default AddUser;

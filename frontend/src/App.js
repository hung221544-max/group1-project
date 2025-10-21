import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import UserList from './components/UserList';
//import AddUser from './components/AddUser';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import './App.css';

/*function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Lỗi khi lấy danh sách người dùng:', err));
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="container">
      <h1>Quản lý User</h1>

      <h2>Thêm người dùng</h2>
      <AddUser onUserAdded={handleUserAdded} />

      <h2>Danh sách User</h2>
      <UserList users={users} />
    </div>
  );
}*/
function App() {
  const [activeTab, setActiveTab] = useState("login"); // mặc định hiện đăng nhập

  return (
    <div className="app-container">
      <h1>Đăng Ký Đăng Nhập</h1>
      <div className="tab-buttons">
        <button
          className={activeTab === "login" ? "active" : ""}
          onClick={() => setActiveTab("login")}
        >
          Đăng nhập
        </button>
        <button
          className={activeTab === "signup" ? "active" : ""}
          onClick={() => setActiveTab("signup")}
        >
          Đăng ký
        </button>
      </div>

      <div className="form-area">
        {activeTab === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}


export default App;

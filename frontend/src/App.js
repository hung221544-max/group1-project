import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import UserList from './components/UserList';
//import AddUser from './components/AddUser';
import Signup from "./components/SignupForm";
import Login from "./components/LoginForm";
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
  return (
    <div className="container">
      <h1>Authentication cơ bản</h1>
      <div style={{ display: "flex", gap: "50px" }}>
        <Signup />
        <Login />
      </div>
    </div>
  );
}


export default App;

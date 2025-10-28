import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formEdit, setFormEdit] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      alert("🗑️ Đã xóa user thành công!");
      fetchUsers();
    } catch (err) {
      alert("❌ Lỗi khi xóa user!");
      console.error(err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setFormEdit({ name: user.name, email: user.email });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3000/users/${editingUserId}`, formEdit);
      alert("✅ Cập nhật thành công!");
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      alert("❌ Lỗi khi cập nhật user!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setFormEdit({ name: "", email: "" });
  };

  return (
    <div className="card">
      <h2>Danh sách người dùng</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <td>{i + 1}</td>
              {editingUserId === user._id ? (
                <>
                  <td>
                    <input
                      value={formEdit.name}
                      onChange={(e) =>
                        setFormEdit({ ...formEdit, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={formEdit.email}
                      onChange={(e) =>
                        setFormEdit({ ...formEdit, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleSave} disabled={loading}>
                      💾 {loading ? "Đang lưu..." : "Lưu"}
                    </button>
                    <button onClick={handleCancel}>❌ Hủy</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleEditClick(user)}>✏️ Sửa</button>
                    <button onClick={() => handleDelete(user._id)}>🗑️ Xóa</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

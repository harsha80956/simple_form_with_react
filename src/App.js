import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    isEdit: false,
  });
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingIndex, setUpdatingIndex] = useState(null);

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;

    if (!user.name) {
      formIsValid = false;
      formErrors["name"] = "*Name is required";
    }

    if (typeof user.name !== "undefined") {
      if (!user.name.match(/^[a-zA-Z ]{3,30}$/)) {
        formIsValid = false;
        formErrors["name"] =
          "*Name should contain letters only and have length between 3-30.";
      }
    }

    if (!user.email) {
      formIsValid = false;
      formErrors["email"] = "*Email is required.";
    }

    if (typeof user.email !== "undefined") {
      // regular expression for email validation
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (!pattern.test(user.email)) {
        formIsValid = false;
        formErrors["email"] = "*Invalid email.";
      }
    }

    if (!user.phone) {
      formIsValid = false;
      formErrors["phone"] = "*Phone number is required.";
    }

    if (typeof user.phone !== "undefined") {
      var pattern = /^[2-9]{2}\d{8}$/;
      if (!pattern.test(user.phone)) {
        formIsValid = false;
        formErrors["phone"] =
          "*Invalid phone number. It should be in the format '1234567890'.";
      }
    }

    if (!user.address) {
      formIsValid = false;
      formErrors["address"] = "*Address is required.";
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setUser({ ...user, isEdit: e.target.checked });
  };

  const handleAddOrUpdateUser = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isUpdating) {
        const newUsers = [...users];
        newUsers[updatingIndex] = user;
        setUsers(newUsers);
        setIsUpdating(false);
        setUpdatingIndex(null);
      } else {
        setUsers([...users, user]);
      }
      setUser({ name: "", email: "", phone: "", address: "", isEdit: false });
    }
  };

  const handleDeleteUser = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    if (userToEdit.isEdit) {
      setUser(userToEdit);
      setIsUpdating(true);
      setUpdatingIndex(index);
    } else {
      alert("You are not allowed to edit this user.");
    }
  };

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <form onSubmit={handleAddOrUpdateUser}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
          />
          <div className="text-danger">{errors.name}</div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
          />
          <div className="text-danger">{errors.email}</div>
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Phone"
          />
          <div className="text-danger">{errors.phone}</div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            name="address"
            value={user.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Address"
          />
          <div className="text-danger">{errors.address}</div>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            checked={user.isEdit}
            onChange={handleCheckboxChange}
            className="form-check-input"
          />
          <label className="form-check-label">Edit</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Editable</th>
          <th>Action</th>
        </tr>
        {users.map((user, index) => (
          <tr>
            <td key={index}>{user.name} </td>
            <td> {user.email} </td> <td>{user.phone}</td>
            <td> {user.address}</td>
            <td> {user.isEdit ? "Editable" : "Non-editable"}</td>
            <td>
              <div>
                {user.isEdit ? (
                  <button
                    onClick={() => handleEditUser(index)}
                    className="btn btn-primary mr-2"
                  >
                    Edit
                  </button>
                ) : null}
                <button
                  onClick={() => handleDeleteUser(index)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;

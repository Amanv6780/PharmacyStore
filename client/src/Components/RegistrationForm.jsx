import { useState } from "react";
import { UseRegister } from "../Hooks/useRegister";
import { Loader } from "./Loader";

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    username : "",
    email : "",
    password : "",
    role : ""
  });

  const { loading,  CallRegisterRoute } = UseRegister();

  async function handleFormData(e) {
    e.preventDefault();

    //!!! important !!! check validity of inputs

    const {resp,role} = await CallRegisterRoute(formData);
   
    if (resp) {
      console.log(resp);
      localStorage.setItem("access_token", resp);
      localStorage.setItem('role',role)
      alert("user created");
    } else {
      console.log("error");
    }
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleFormData(e)}>
        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail"></label>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            id="mail"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            className="form-control"
            type="password"
            placeholder="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="role"></label>
          <input
            className="form-control"
            type="role"
            placeholder="role"
            id="role"
            value={formData.role}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, role: e.target.value }))
            }
          />
        </div>

        <button
          className={`btn btn-outline-dark ${loading ? "disabled" : null} `}
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

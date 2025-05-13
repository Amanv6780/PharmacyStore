import { useEffect, useState } from "react";
import { CenterBlock } from "../Components/CenterBlockWrapper";
import { ComponentWrapper } from "../Components/ComponentWrapper";
import { FormInputGroup } from "../Components/FormInputGroup";
import { UseRegister } from "../Hooks/useRegister";
import { Loader } from "../Components/Loader";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const sampleRegisterFormState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "",
    securityQuestion: "",
    securityAnswer: "",
  };

  const [formData, setFormData] = useState(sampleRegisterFormState);
  const { loading, CallRegisterRoute } = UseRegister();
  const navigate = useNavigate();
  const [validErr, setValidErr] = useState(false);

  useEffect(() => {
    function handleInputValidation() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  
      if (
        !formData.username ||
        !formData.email ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.password ||
        !formData.role ||
        !formData.securityAnswer ||
        !formData.securityQuestion
      ) {
        setValidErr(true);
      } else if (!emailRegex.test(formData.email)) {
        setValidErr(true);
      } else if (!usernameRegex.test(formData.username)) {
        setValidErr(true);
      } else if (!passwordRegex.test(formData.password)) {
        setValidErr(true);
      } else {
        setValidErr(false);
      }
    }
  
    handleInputValidation();
  }, [formData]);

  async function handleFormData(e) {
    e.preventDefault();

    if (validErr) {
      return;
    }

    const { resp, role } = await CallRegisterRoute(formData);

    if (resp) {
      console.log(resp);
      localStorage.setItem("access_token", resp);
      localStorage.setItem("role", role);

      if (role === "storeAdmin") {
        navigate("/storeadmindash");
      } else {
        navigate("/home");
      }
    } else {
      console.log("error");
    }
  }

  return (
    <div className="background">
    <CenterBlock>
      <ComponentWrapper>
        <h1 className="text-center mb-4">Register Page</h1>
        {validErr && (
          <p className="alert alert-warning">Error in your data</p>
        )}
        <form onSubmit={handleFormData}>
          <FormInputGroup
            type="text"
            label="First Name"
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <FormInputGroup
            type="text"
            label="Last Name"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <FormInputGroup
            type="text"
            label="Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <FormInputGroup
            type="email"
            label="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <FormInputGroup
            type="password"
            label="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <div className="form-group mb-3">
            <label htmlFor="role">Role</label>
            <select
              className="form-control"
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="">Select Role</option>
              <option value="storeAdmin">Store Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="securityQuestion">Security Question</label>
            <select
              className="form-control"
              id="securityQuestion"
              value={formData.securityQuestion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  securityQuestion: e.target.value,
                  securityAnswer: "",
                })
              }
            >
              <option value="">Select a Security Question</option>
              <option value="pet">What is your pet's name?</option>
              <option value="school">
                What was the name of your first school?
              </option>
              <option value="city">What city were you born in?</option>
            </select>
          </div>

          {formData.securityQuestion && (
            <FormInputGroup
              type="text"
              label="Answer"
              onChange={(e) =>
                setFormData({ ...formData, securityAnswer: e.target.value })
              }
            />
          )}

          <button
            type="submit"
            disabled={loading || validErr}
            className="btn btn-primary btn-block mt-5 py-2"
          >
            {loading ? <Loader /> : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted">
            Already have an account?{" "}
            <a href="/" className="font-weight-bold text-primary">
              Sign In
            </a>
          </p>
        </div>
      </ComponentWrapper>
    </CenterBlock>
    </div>
  );
}

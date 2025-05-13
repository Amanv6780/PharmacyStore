import { useEffect, useState } from "react";
import { CenterBlock } from "../Components/CenterBlockWrapper";
import { ComponentWrapper } from "../Components/ComponentWrapper";
import { FormInputGroup } from "../Components/FormInputGroup";

import { Loader } from "../Components/Loader";

import { UseUpdateUser } from "../Hooks/useUpdateUser";
import axios from "axios";
import { Base_Url } from "../Configs/Constants";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    securityQuestion: "",
    securityAnswer: "",
    password: "",
  });

  const navigate = useNavigate();
  const [validErr, setValidErr] = useState(false);

  useEffect(() => {
    function handleInputValidation() {

      const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      if (
        !formData.username || !formData.password


      ) {
        setValidErr(true);
      } else if (!usernameRegex.test(formData.username)) {
        setValidErr(true);
      } else if (!passwordRegex.test(formData.password)) {
        setValidErr(true);
        return;
      }
      else {
        setValidErr(false);
      }
    }
    handleInputValidation();
  }, [formData]);


  const handleUpdatePassword = async (e) => {
    e.preventDefault();


    setLoading(true);

    try {
      await axios.put(`${Base_Url}/updateuser/forgotpassword`, formData);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenterBlock>
      <ComponentWrapper>
        <h1 className="text-start mb-4">Forgot Password </h1>
        {validErr && (
          <p className="alert alert-warning">
            Make Sure Fields are not empty and username should be atleast 3
            characters long
          </p>
        )}
        <form onSubmit={handleUpdatePassword} autoComplete="off">
          <FormInputGroup
            type="text"
            label="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <FormInputGroup
            type="password"
            label="New Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

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
                  securityAnswer: "", // Clear the answer when the question changes
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
              value={formData.securityAnswer}
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
            {loading ? <Loader /> : "Update"}
          </button>
        </form>
        <button
          onClick={() => navigate("/")}
          disabled={loading}
          className="btn btn-outline-primary btn-block mt-3 py-2"
        >
          Login
        </button>
      </ComponentWrapper>
    </CenterBlock>
  );
}

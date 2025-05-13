import { useEffect, useState } from "react";
import { CenterBlock } from "../Components/CenterBlockWrapper";
import { ComponentWrapper } from "../Components/ComponentWrapper";
import { FormInputGroup } from "../Components/FormInputGroup";
import { UseSignin } from "../Hooks/useSignin";
import { Loader } from "../Components/Loader";
import { useNavigate } from "react-router-dom";

export function SigninPage() {
  const sampleLoginData = {
    username: "",
    email: "",
    password: "",
  };

  const [formdata, setFormData] = useState(sampleLoginData);

  const { loading, CallSigninRoute } = UseSignin();
  const navigate = useNavigate();
  const [validErr, setValidErr] = useState(false);

  useEffect(() => {
    function handleInputValidation() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  
      if (!formdata.username || !formdata.email || !formdata.password) {
        setValidErr(true);
        return;
      }
  
      if (!emailRegex.test(formdata.email)) {
        setValidErr(true);
        return;
      }
  
      if (!usernameRegex.test(formdata.username)) {
        setValidErr(true);
        return;
      }
  
      if (!passwordRegex.test(formdata.password)) {
        setValidErr(true);
        return;
      }
  
      setValidErr(false);
    }
  
    handleInputValidation();
  }, [formdata]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    //!!! important !!! check validity of inputs - done

    const { resp, role } = await CallSigninRoute(formdata);

    if (resp) {
      console.log(resp);
      localStorage.setItem("access_token", resp);
      localStorage.setItem("role", role);
      if (role === "storeAdmin") {
        navigate("/storeadmindash");
      } else if (role === "user") {
        navigate("/home");
      } else if (role === "mainAdmin") {
        navigate("/mainadmindashboard");
      } //changes by aman
    } else {
      console.log("error");
    }
  }

  return (
    <div className="background">
    <CenterBlock>
      <ComponentWrapper>
        <h1 className="text-start mb-4">Login</h1>
        {validErr && (
          <p className="alert alert-warning">
            Make Sure Fields are not empty and username should be atleast 3
            characters long
          </p>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInputGroup
            type="text"
            label="Username"
            onChange={(e) =>
              setFormData({
                ...formdata,
                username: e.target.value,
              })
            }
          />

          <FormInputGroup
            type="email"
            label="Email"
            onChange={(e) =>
              setFormData({
                ...formdata,
                email: e.target.value,
              })
            }
          />

          <FormInputGroup
            type="password"
            label="Password"
            onChange={(e) =>
              setFormData({
                ...formdata,
                password: e.target.value,
              })
            }
          />
          
          <button
            type="submit"
            disabled={loading || validErr}
            className="btn btn-primary btn-block mt-5 py-2"
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </form>
        <button
          onClick={() => navigate("/forgotpassword")}
          className="btn btn-outline-primary btn-block mt-3 py-2"
        >
          Forgot Password
        </button>
      </ComponentWrapper>

      <div className="text-center mt-3 d-flex ">
        <p className="text-muted mx-2">
          Don't have an account?{" "}
          <a href="/register" className="font-weight-bold text-primary">
            Sign up
          </a>
        </p>
      </div>
    </CenterBlock>
    </div>
  );
}

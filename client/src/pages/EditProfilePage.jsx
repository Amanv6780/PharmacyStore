import { useState, useEffect } from "react";
import { CenterBlock } from "../Components/CenterBlockWrapper";
import { ComponentWrapper } from "../Components/ComponentWrapper";
import { FormInputGroup } from "../Components/FormInputGroup";
import { UseRegister } from "../Hooks/useRegister";
import { Loader } from "../Components/Loader";
import { useGetUserDetails } from "../Hooks/useViewUser";
import { ProtectedPage } from "../Components/ProtectedPage";
import { UseUpdateUser } from "../Hooks/useUpdateUser";

export function EditProfilePage() {
  const { user1, fetchUserDetails } = useGetUserDetails();
  const { callUpdateRoute, loading } = UseUpdateUser();

  const sampleRegisterFormState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  };

  const [formData, setFormData] = useState(sampleRegisterFormState);
  const [validErr, setValidErr] = useState(false);

  useEffect(() => {
    function handleInputValidation() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;

      if (
        !formData.username ||
        !formData.email ||
        !formData.firstName ||
        !formData.lastName
      ) {
        setValidErr(true);
      } else if (!emailRegex.test(formData.email)) {
        setValidErr(true);
      } else if (!usernameRegex.test(formData.username)) {
        setValidErr(true);
      } else {
        setValidErr(false);
      }
    }
    handleInputValidation();
  }, [formData]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    await callUpdateRoute(formData);
    setFormData(sampleRegisterFormState);
    fetchUserDetails();
  }

  return (
    <ProtectedPage role={localStorage.getItem("role")}>
      <CenterBlock>
        <ComponentWrapper>
          <h1 className="text-start mb-4">Edit Profile : {user1.username}</h1>
          {validErr && (
            <p className="alert alert-warning">Make Sure Fields are not empty and username should be atleast 3 characaters long</p>
          )}

          <form onSubmit={handleFormSubmit}>
            <FormInputGroup
              type="text"
              label="First Name"
              value={user1.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <FormInputGroup
              type="text"
              label="Last Name"
              value={user1.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <FormInputGroup
              type="text"
              label="Username"
              value={user1.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <FormInputGroup
              type="email"
              label="Email"
              value={user1.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <button
              type="submit"
              disabled={loading || validErr}
              className="btn btn-primary btn-block mt-5 py-2"
            >
              {loading ? <Loader /> : "Update"}
            </button>
          </form>
        </ComponentWrapper>
      </CenterBlock>
    </ProtectedPage>
  );
}

import React from "react";
import { Loader } from "../Components/Loader";
import { ProtectedPage } from "../Components/ProtectedPage";
import useViewUser from "../Hooks/useViewUser";
import { DataTable } from "../Components/StoreAdminComponents/DataTable";

const ViewStores = () => {
  const { users, loading, error } = useViewUser('storeAdmin');

  const columns = ["Sl.No", "ID", "Username", "Email", "Role"];

  const rows = users.map((user) => [
    user._id,
    user.username,
    user.email,
    user.role,
  ]);

  return (
    <ProtectedPage role="mainAdmin">
    <div className="container py-4">
      <h3 className="mb-4">Registered Stores</h3>

      {loading && <Loader />}

      {error && <p className="text-danger">{error}</p>}

      {users.length === 0 && !loading && !error ? (
        <p>No users found.</p>
      ) : (
        <DataTable columns={columns} rows={rows} />
      )}
    </div>
     </ProtectedPage>
  );
};

export default ViewStores;

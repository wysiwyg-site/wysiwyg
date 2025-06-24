import React from "react";
import EditPageComponent from "../../components/EditPageComponent";
import withAuth from "../../components/withAuth";

const page = () => {
  return (
    <div className="bg-[#fefdf8]">
      <EditPageComponent />
    </div>
  );
};

export default withAuth(page);

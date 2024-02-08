import React from "react";
import { useParams } from "react-router-dom";

function EditIncome() {
  const { id } = useParams();

  return <div>EditIncome {id}</div>;
}

export default EditIncome;

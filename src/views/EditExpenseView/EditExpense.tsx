import React from "react";
import { useParams } from "react-router-dom";

function EditExpense() {
  const { id } = useParams();

  return <div>EditExpense {id}</div>;
}

export default EditExpense;

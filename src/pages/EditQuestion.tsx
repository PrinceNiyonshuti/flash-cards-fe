import React from 'react'
import { useParams } from "react-router-dom";
function EditQuestion() {
    const { id } = useParams();
  return (
      <div>EditQuestion { id }</div>
  )
}

export default EditQuestion

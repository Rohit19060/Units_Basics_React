import React from "react";
import { useParams } from "react-router-dom";

const Un = ({ units }) => {
  const code = useParams().code;
  const unit = units.find((n) => n.code === code);
  return (
    <div>
      <h2>
        <strong>Title:</strong> {unit.title}
      </h2>
      <h4>
        <strong>Code:</strong> {unit.code}
      </h4>
      <h4>
        <strong>Offerings:</strong> {unit.offering}
      </h4>
    </div>
  );
};

export default Un;

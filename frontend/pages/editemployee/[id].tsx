import React from "react";
import { useRouter } from "next/router";
import EditEmployee from "../../components/employee/EditEmployee";

function Editemployee() {
  const router = useRouter();

  const { id } = router.query;
  return <EditEmployee employeeId={id} />;
}

export default Editemployee;

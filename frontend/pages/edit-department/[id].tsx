import React from "react";
import EditDepartment from "../../components/department/EditDepartment";
import { useRouter } from "next/router";

function Editdepartment() {
  const router = useRouter();
  const { id } = router.query;

  return <EditDepartment />;
}

export default Editdepartment;

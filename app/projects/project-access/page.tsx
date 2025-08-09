import React, { Suspense } from "react";
import ProjectAccess from "./ProjectAccess";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading access page...</div>}>
      <ProjectAccess />
    </Suspense>
  );
}

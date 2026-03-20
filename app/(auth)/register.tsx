import React, { Suspense } from "react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const RegisterScreenModule = require("../screens/RegisterScreen");
const RegisterScreen = RegisterScreenModule.default;

export default function RegisterRoute() {
  return (
    <Suspense fallback={null}>
      <RegisterScreen />
    </Suspense>
  );
}

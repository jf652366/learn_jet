import React from "react";

// import { Try } from "./screens/try";

import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { AuthenticatedApp } from "./authenticated-app";

function App() {
  // @ts-ignore
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;

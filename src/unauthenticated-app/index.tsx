import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      {isLogin ? <LoginScreen /> : <RegisterScreen />}

      <button onClick={() => setIsLogin(!isLogin)}>
        切换到
        {!isLogin ? "登录" : "注册"}
      </button>
    </div>
  );
};

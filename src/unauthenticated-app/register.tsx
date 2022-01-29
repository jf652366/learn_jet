import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // @ts-ignore
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = ({
    cpassword,
    ...value
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== value.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    run(register(value))
      .then()
      .catch((err) => onError(err));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="text" id="password" />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请再次输入密码" }]}
      >
        <Input placeholder={"确认密码"} type="text" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

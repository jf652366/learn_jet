import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModel } from "./util";
import { UserSelect } from "../../components/user-select";
import { useAddProject, useEditProject } from "../../utils/use-project";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "../../components/lib";
import { useEffect } from "react";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModel();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: MutateLoading } = useMutateProject();

  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [form, editingProject]);

  const title = editingProject ? "编辑项目" : "创建项目";
  return (
    <Drawer
      onClose={close}
      width={"100%"}
      visible={projectModalOpen}
      forceRender={true}
    >
      <Contaniner>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ message: "请输入项目名", required: true }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ message: "请输入部门名", required: true }]}
              >
                <Input placeholder={"请输入部门名称"} />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={MutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Contaniner>
    </Drawer>
  );
};
const Contaniner = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

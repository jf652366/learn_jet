import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <ProjectListScreen />
      <button
        onClick={(event) => {
          event.preventDefault();
          logout();
        }}
      >
        退出
      </button>
    </div>
  );
};

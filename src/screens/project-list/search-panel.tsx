export interface User {
  token: string;
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}

interface searchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: searchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: searchPanelProps) => {
  return (
    <form>
      <input
        type="text"
        value={param.name}
        onChange={(evt) =>
          setParam({
            ...param,
            name: evt.target.value,
          })
        }
      />
      <select
        value={param.personId}
        onChange={(evt) =>
          setParam({
            ...param,
            personId: evt.target.value,
          })
        }
      >
        <option value={""}>负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};

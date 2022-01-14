import { useMount, useArray } from "../../utils";
import { useEffect } from "react";

export const Try = () => {
  const persons: {
    name: string;
    age: number;
  }[] = [
    { name: "jack", age: 28 },
    { name: "ma", age: 17 },
  ];
  useMount(() => {
    // 期待这里报错：Property 'notExist' does not exist on type '{ name: string; age: number; }[]'
    //console.log(value.notExist);
  });
  const { value, add, clear, removeIndex } = useArray(persons);
  console.log(value);
  return (
    <div>
      <ul>
        {value.map(({ name, age }, index) => {
          return (
            <li key={index}>
              {name}^^^^{age}
            </li>
          );
        })}
      </ul>
      <button onClick={() => add({ name: "李四", age: 20 })}>点击添加</button>
      <button onClick={() => removeIndex(0)}>删除下标为0</button>
      <button onClick={() => clear()}>清空</button>
    </div>
  );
};

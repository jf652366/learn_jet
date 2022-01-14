import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
//使用泛型进行修改
export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <P>(Person: P[]) => {
  const [value, setValue] = useState(Person);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    const newArr = value.slice();
    console.log(index);
    newArr.splice(index, 1);
    setValue(newArr);
  };
  const add = (AddPerson: P) => {
    setValue([...value, AddPerson]);
  };

  return {
    value,
    clear,
    removeIndex,
    add,
  };
};

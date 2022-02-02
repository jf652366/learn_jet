import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //TODD 依赖项里面加上callback会造成无线循环 这个和useCallback以及useMemo 有关系
    // eslint-disable-next-line
  }, []);
};
//使用泛型进行修改
export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      clearTimeout(timeout);
    };
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
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [title, keepOnUnmount]);
};

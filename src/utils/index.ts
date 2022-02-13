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

export const resetRoute = () => (window.location.href = window.location.origin);
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
// TODO 返回组件的挂载状态，如果没有进行挂载或者已经进行卸载，返回false
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};

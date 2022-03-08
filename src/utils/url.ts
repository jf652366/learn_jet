/**
 * 返回页面utl中，指定键的参数值
 * */
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject, subset } from "./index";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [SearchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(SearchParams), keys) as {
          [key in K]: string;
        },
      [SearchParams]
    ),
    (Params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(Params);
    },
  ] as const;
};
export const useSetUrlSearchParam = () => {
  const [SearchParams, setSearchParams] = useSearchParams();
  return (Params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(SearchParams),
      ...Params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

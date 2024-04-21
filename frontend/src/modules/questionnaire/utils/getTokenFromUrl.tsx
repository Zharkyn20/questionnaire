import { last } from "lodash";

export const getTokenFromUrl = () => {
  const url = window.location.pathname;
  return last(url.split("/")) as string;
};

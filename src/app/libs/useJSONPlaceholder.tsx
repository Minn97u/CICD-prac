import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const fetchJSONPlaceholder = async <T = any,>(path: string) => {
  const response = await axios.get<T>(
    `https://jsonplaceholder.typicode.com/${path}`
  );

  return response.data;
};

export const useJSONPlaceholder = <T = any,>(path: string) =>
  useQuery({
    queryKey: ["jsonplaceholder", path],

    queryFn: (param) => {
      return fetchJSONPlaceholder<T>(param.queryKey[1]);
    },
  });

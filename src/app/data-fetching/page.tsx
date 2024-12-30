"use client";
import { NextPage } from "next";
import { Post, Todo, useJSONPlaceholder } from "../libs/useJSONPlaceholder";

const DataFetchingComponent: NextPage = () => {
  const { data: posts } = useJSONPlaceholder<Post>("posts/1");
  const { data: todos } = useJSONPlaceholder<Todo>("todos/1");

  if (posts === undefined || todos === undefined) {
    return <div>Loading...</div>;
  }

  console.log({ posts });
  console.log({ todos });

  return (
    <div>
      <h1>Data Fetching</h1>
      <h2 className="mt-40 font-bold text-2xl">Posts</h2>
      <ul>
        {Object.entries(posts).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
      <h2 className="mt-40 font-bold text-2xl">Todos</h2>
      <ul>
        {Object.entries(todos).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetchingComponent;

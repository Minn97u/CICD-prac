import { NextPage } from "next";

const Query: NextPage = () => {
  // ul: role list
  return (
    <ul>
      <li>{"Red"}</li>
      <li>{"Blue"}</li>
      <li>{"Green"}</li>
    </ul>
  );
};

export default Query;

const noEmptyString = (str: string) => {
  if (str === "") {
    throw new Error("빈 문자열이 들어왔습니다.");
  }

  return str;
};

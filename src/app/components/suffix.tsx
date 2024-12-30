import { useState } from "react";

export const Suffix: React.FC = () => {
  const [email, setEmail] = useState<string>("hello");

  return (
    <form>
      <h3>{"Data Input"}</h3>
      <div data-testid="codeit-img-wrapper">
        <img alt="codeit-img" src="codeit.jpg" />
      </div>
      <label htmlFor="email">{"email"}</label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="color">{"color"}</label>
      <input id="color" type="text" placeholder="type color" />
      <button title="click when you are ready to submit">{"submit"}</button>
    </form>
  );
};

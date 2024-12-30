// ARIA Roles

export const Role: React.FC = () => {
  return (
    <div>
      <a href="/link">{"link"}</a>
      <button>{"button"}</button>
      <footer>{"footer"}</footer>
      <h1 aria-label="에이치원">{"에이치원"}</h1>
      <h2>{"h2"}</h2>
      <h3>{"h3"}</h3>
      <header>{"header"}</header>
      <img src="/img" alt="img" aria-label = "첫번째 이미지"/>
      <img src="/img" alt="img" aria-label = "두번째 이미지"/>
      {"image"}
      <input type="text" />
      {"input"}
      <input type="checkbox" />
      {"checkbox"}
      <input type="number" />
      {"number"}
      <input type="radio" />
      {"radio"}
      <ul>
        <li>Red</li>
        <li>Blue</li>
        <li>Green</li>
      </ul>
    </div>
  );
};

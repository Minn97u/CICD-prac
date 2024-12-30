import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { List } from "./list";
import { TODO } from "./types";
import * as StorageAPI from "../libs/storage-api";
import { list } from "postcss";
// import { saveToStorage } from "../libs/storage-api";
jest.mock("../libs/storage-api");

// jest.mock("../libs/storage-api", () => ({
//   saveToStorage: jest.fn(),
// }));

describe("list test suite", () => {
  const todos: TODO[] = [
    {
      id: 1,
      done: false,
      todo: "first todo",
    },
    {
      id: 2,
      done: false,
      todo: "second todo",
    },
  ];

  const User = UserEvent.setup();
  const setTodosMock = jest.fn();

  // const saveToStorageMock = saveToStorage as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("delete 버튼을 누르면 handleDelete 함수가 호출되어야 한다.", async () => {
    render(<List setTodos={setTodosMock} todos={todos} />);
    const saveToStorageMock = jest.spyOn(StorageAPI, "saveToStorage");

    // 첫번째 todo를 삭제
    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];

    await User.click(deleteButton);

    expect(setTodosMock).toHaveBeenCalledTimes(1);
    expect(setTodosMock).toHaveBeenCalledWith([todos[1]]);
    expect(saveToStorageMock).toHaveBeenCalled();
    expect(saveToStorageMock).toHaveBeenCalledWith([todos[1]]);
  });

  it("update 버튼을 누르면 handleUpdate 함수가 호출되어야 한다.", async () => {
    render(<List setTodos={setTodosMock} todos={todos} />);
    const saveToStorageMock = jest.spyOn(StorageAPI, "saveToStorage");
    const newTodos = todos.map((todo) => {
      if (todo.id === todos[0].id) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });

    // 첫번째 todo를 업데이트
    const updateButton = screen.getAllByRole("button", { name: /update/i })[0];

    await User.click(updateButton);

    expect(setTodosMock).toHaveBeenCalledTimes(1);

    expect(setTodosMock).toHaveBeenCalledWith(newTodos);
    expect(saveToStorageMock).toHaveBeenCalled();
    expect(saveToStorageMock).toHaveBeenCalledWith(newTodos);
  });

  it("todo의 상태에 따라서 아이콘이 done 또는 not yet 아이콘이어야 한다", () => {
    render(<List setTodos={() => {}} todos={todos} />);

    const listItems = screen.getAllByRole("listitem");

    // li 태그 안에 아이콘이 렌더링된것을 보장
    listItems.forEach((listItem, index) => {
      // const icon = listItem.querySelector("svg");
      const icon = within(listItem).getByLabelText(/done|not-yet/i);
      expect(icon).toHaveAttribute(
        "id",
        todos[index].done ? "done" : "not-yet"
      );
    });

    // DOM tree 전체에서 아이콘을 찾음
    // done이 false인 todo들의 갯수 == XCircleIcon의 갯수
    const notYetTodos = todos.filter((todo) => !todo.done);

    //XCircleIcon
    const notYetIcons = screen.queryAllByLabelText(/not-yet/i);
    expect(notYetIcons).toHaveLength(notYetTodos.length);

    // done이 true인 todo들의 갯수 == CheckCircleIcon의 갯수
    const doneTodos = todos.filter((todo) => todo.done);
    const doneIcons = screen.queryAllByLabelText(/done/i);
    expect(doneIcons).toHaveLength(doneTodos.length);
  });

  it("should render list items with same length as todos", () => {
    render(<List setTodos={() => {}} todos={todos} />);

    // todo 2개면
    /**
     * <ul>
     * <li>first todo</li>
     * <li>second todo</li>
     * </ul>
     */
    const listItems = screen.getAllByRole("listitem");

    expect(listItems).toHaveLength(todos.length);
  });

  it("todo의 상태에 따라서 button의 텍스트가 취소 또는 완료여야한다.", () => {
    render(<List setTodos={() => {}} todos={todos} />);

    const listItems = screen.getAllByRole("listitem");
    screen.debug();

    listItems.forEach((listItem, index) => {
      const button = within(listItem).getByRole("button", {
        name: /update/i,
      });
      // const buttons = screen.getByRole("button", { name: /update/i });

      expect(button).toHaveTextContent(todos[index].done ? "취소" : "완료");
    });
  });

  it("todo가 빈배열인 경우", () => {
    render(<List setTodos={() => {}} todos={[]} />);

    const ul = screen.getByRole("list");
    expect(ul).toBeInTheDocument();

    const deleteButton = screen.queryByRole("button", { name: /delete/i });
    expect(deleteButton).not.toBeInTheDocument();
    expect(deleteButton).toBeNull();
  });
});

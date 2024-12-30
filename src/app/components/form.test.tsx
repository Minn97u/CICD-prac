import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./form";
import { TODO } from "./types";
import exp from "constants";

describe("form 테스트", () => {
  const User = userEvent.setup();

  it("생성하기 버튼을 클릭하면 handleAddToDo가 호출되고 setTodos와 handleSaveToStorage가 호출되어야한다.", async () => {
    const setTodosMock = jest.fn();
    const handleSaveToStorageMock = jest.fn();
    const newTodo: TODO = {
      id: 1,
      todo: "test",
      done: false,
    };
    //Arrange
    jest.spyOn(Date.prototype, "getTime").mockReturnValue(newTodo.id);

    render(
      <Form
        handleSaveToStorage={handleSaveToStorageMock}
        setTodos={setTodosMock}
      />
    );

    const input = screen.getByRole("textbox");
    // await User.type(input, newTodo.todo);
    fireEvent.change(input, { target: { value: newTodo.todo } });


    const submitButton = screen.getByRole("button", { name: "생성하기" });
    // await User.click(submitButton);
    fireEvent.click(submitButton); 


    expect(setTodosMock).toHaveBeenCalledTimes(1);
    expect(handleSaveToStorageMock).toHaveBeenCalledTimes(1);
    expect(handleSaveToStorageMock).toHaveBeenCalledWith(newTodo);
  });


  it("Input에 값을 입력하면 value에 값이 있어야한다.", async () => {
    //Arrange
    const setTodoMock = jest.fn();
    render(<Form handleSaveToStorage={jest.fn()} setTodos={setTodoMock} />);

    //Act
    //1. input 요소를 찾아서
    const input = screen.getByRole("textbox");

    //2. input 요소를 클릭한다.
    await User.click(input);

    //3. input 요소에 값을 입력한다.
    await User.type(input, "test");

    // input에 value가 있는지 확인한다.
    expect(input).toHaveValue("test");
  });

  const RenderForm = () => {
    render(<Form handleSaveToStorage={jest.fn()} setTodos={jest.fn()} />);
  };
  it("form 렌더링", () => {
    RenderForm();

    const form = screen.getByLabelText("form");
    expect(form).toBeInTheDocument();

    const formByTitle = screen.getByTitle(/form/i);
    expect(formByTitle).toBeInTheDocument();

    const formByQuery = document.querySelector("form");
    expect(formByQuery).toBeInTheDocument();

    const formById = document.getElementById("todo-form");
    expect(formById).toBeInTheDocument();
  });

  it("input이 렌더링 되어야 합니다.: ", () => {
    RenderForm();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const inputByLabel = screen.getByLabelText("입력");
    expect(inputByLabel).toBeInTheDocument();

    const inputByPlaceholder =
      screen.getByPlaceholderText("할 일을 입력하세요");
    expect(inputByPlaceholder).toBeInTheDocument();

    const inputByQuery = document.querySelector("form input");
    expect(inputByQuery).toBeInTheDocument();
  });

  it("button이 렌더링 되어야 합니다.: ", () => {
    RenderForm();

    const buttonByType = screen.getByRole("button", { name: "생성하기" });
    expect(buttonByType).toBeInTheDocument();

    const buttonByQuery = document.querySelector("form button");
    expect(buttonByQuery).toBeInTheDocument();
  });
});

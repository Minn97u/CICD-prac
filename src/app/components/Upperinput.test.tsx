import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpperInput from "./Upperinput";

test("소문자를 대문자로 변환해 준다.", async () => {
  // UpperInput 컴포넌트를 렌더링합니다.
  render(<UpperInput />);

  // input 요소를 찾습니다.
  const upperInput = screen.getByLabelText(/upper/i);
  // input 요소에 "kimmingyu"를 입력합니다.
  const text = "kimmingyu";
  fireEvent.change(upperInput, { target: { value: text } });
  // input 요소의 값이 대문자로 변환되었는지 확인합니다.
  await waitFor(() => {
    expect(screen.getByDisplayValue(text.toUpperCase())).toBeInTheDocument();
  });
  //   expect(upperInput.value).toEqual(text.toUpperCase());`
});

import React, { useRef } from "react";
import styled from "@emotion/styled";
import type { Todo } from "../model";

type TodoCreationPayload = Omit<Todo, "id">;

interface InputFieldProps {
  onAdd: (data: TodoCreationPayload) => void;
}

const InputFieldForm = styled.form`
  display: flex;
  width: 90%;
  position: relative;
  align-items: center;
  @media (max-width: 700px) {
    width: 95%;
  }
`;

const TodoInputBox = styled.input`
  width: 100%;
  border-radius: 50px;
  padding: 20px 30px;
  font-size: 25px;
  border: none;
  transition: 0.2s;
  box-shadow: inset 0 0 5px black;

  &:focus {
    box-shadow: 0 0 10px 2000px rgba(0, 0, 0, 0.5);
    outline: none;
  }
`;

const TodoSubmitButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  margin: 12px;
  border-radius: 50px;
  right: 0px;
  border: none;
  font-size: 15px;
  background-color: #2f74c0;
  color: white;
  transition: 0.2s all;
  box-shadow: 0 0 10px black;

  &:hover {
    background-color: #388ae2;
  }

  &:active {
    transform: scale(0.8);
    box-shadow: 0 0 5px black;
  }
`;

const TodoCreationForm: React.FC<InputFieldProps> = (props) => {
  const { onAdd } = props;
  const [formData, setFormData] = React.useState<Omit<Todo, "id">>({
    isDone: false,
    todo: ""
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((formData) => ({ ...formData, todo: e.currentTarget.value }));
    },
    []
  );

  const handleSubmit = React.useCallback(() => {
    onAdd(formData);
    inputRef.current?.blur();
  }, [formData, onAdd]);

  return (
    <InputFieldForm onSubmit={handleSubmit}>
      <TodoInputBox
        ref={inputRef}
        type="input"
        value={formData.todo}
        placeholder="Enter a task"
        onChange={handleTitleChange}
      />
      <TodoSubmitButton type="submit">GO</TodoSubmitButton>
    </InputFieldForm>
  );
};

export { TodoCreationForm };

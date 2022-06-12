import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import styled from "@emotion/styled";

type Props = {
  todo: Todo;
  onClickDelete: (todo: Todo) => void;
};

const TodoListItemForm = styled.form`
  display: flex;
  width: 29.5%;
  border-radius: 5px;
  padding: 20px;
  margin-top: 15px;
  background-image: url("https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?size=626&ext=jpg");
`;

const TodoListItemText = styled.span`
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 20px;
  &:focus {
    outline: none;
  }
  @media (max-width: 1200px) {
    width: 40%;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Icon = styled.span`
  margin-left: 10px;
  font-size: 25px;
  cursor: pointer;
`;

const TodoListItem: React.FC<Props> = (props) => {
  const { todo, onClickDelete } = props;
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = React.useCallback(() => {
    props.onClickDelete(todo);
  }, [todo, onClickDelete]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <TodoListItemForm onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <TodoListItemText>
          <s>{todo.todo}</s>
        </TodoListItemText>
      ) : (
        <TodoListItemText>{todo.todo}</TodoListItemText>
      )}

      <div>
        <Icon
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </Icon>
        <Icon onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </Icon>
        <Icon onClick={() => handleDone(todo.id)}>
          <MdDone />
        </Icon>
      </div>
    </TodoListItemForm>
  );
};
export default TodoListItem;

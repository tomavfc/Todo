import React from "react";
import type { Todo } from "../model";
import TodoListItem from "./TodoListItem";
import styled from "@emotion/styled";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  flex-wrap: wrap;
  @media (max-width: 700px) {
    width: 95%;
  }
`;

const TodoList: React.FC<TodoListProps> = (props) => {
  const { onDelete } = props;
  const handleDeleteClick = React.useCallback(
    async (todo: Todo) => {
      const confirmed = await window.confirm(
        `Are you sure you want to delete "${todo}"? This action cannot be undone.`
      );

      if (!confirmed) return;

      onDelete(todo.id);
    },
    [onDelete]
  );
  return (
    <Container>
      {props.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onClickDelete={handleDeleteClick}
        />
      ))}
    </Container>
  );
};

export { TodoList };

'use client';

// CSR

import axios from 'axios';
import { useState } from 'react';

type Todo = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

const page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 투두 입력하기
  const postTodo = async () => {
    const res = await axios.post('http://localhost:4000/todos', {
      title,
      content,
      isDone: false,
    });

    const data = res.data;
    const newTodos = [...todos, data];
    setTodos(newTodos);

    return data;
  };

  // isDone이 false인 투두 찾기
  const falseTodo = todos.filter((todo) => {
    if (todo.isDone === false) return true;
  });

  // 위에서 찾은 투두로 map 돌려서 화면에 뿌려주기
  const TodoList = falseTodo.map((todo) => {
    if (todo.isDone === false) {
      return {
        title,
        content,
        isDone: false,
      };
    }
    setTodos(TodoList);
  });

  return (
    <div>
      <h1>My Todo List</h1>
      <div>
        <label>제목</label>
        <input
          className="border"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>내용</label>
        <input
          className="border"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button className="border px-4" onClick={postTodo}>
          작성
        </button>
      </div>
      <div>
        {/* isDone이 false인 목록 노출 */}
        <h1>Working</h1>
        <div>
          {todos.length > 0 ? (
            <div>
              <p>{title}</p>
              <p>{content}</p>
            </div>
          ) : (
            <p>작성된 투두가 없습니다!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

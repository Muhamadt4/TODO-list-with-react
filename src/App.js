import { useReducer, useRef } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const TODO_ACTIONS = {
    ADD_TASK: "ADD_TASK",
    DELETE: "DELETE",
    RESET: "RESET",
  };

  const initialstate = [];
  const reducer = (state, action) => {
    switch (action.type) {
      case TODO_ACTIONS.ADD_TASK:
        if (action.payload === "" || action.payload === null) {
          return state;
        }
        return [...state, { id: state.length + 1, name: action.payload }];
      case TODO_ACTIONS.DELETE:
        return state.filter((d) => d.id !== action.payload);

      case TODO_ACTIONS.RESET:
        return initialstate;
      default:
        return state;
    }
  };

  function handleAdd(e) {
    if (inputval.trim() !== "") {
      dispatch({ type: TODO_ACTIONS.ADD_TASK, payload: inputval });
    }
    setInputval("");
    inputRef.current.focus();
  }
  const inputRef = useRef(null);
  const [inputval, setInputval] = useState("");
  const [todos, dispatch] = useReducer(reducer, initialstate);
  return (
    <div className="App">
      <div className=" flex items-center flex-col h-[100lvh] w-[100lvw] bg-gradient-to-br from-slate-300 to-gray-700">
        <div>
          <h1 className="text-2xl py-6">ToDo's {todos.length}</h1>
        </div>
        <button
          className="rounded-2xl bg-red-400 border-2 border-red-200 hover:bg-red-800 hover:border-red-500 px-4 py-2 my-3 duration-200 hover:text-red-100"
          onClick={() => dispatch({ type: TODO_ACTIONS.RESET })}
        >
          RESET
        </button>
        <div className="w-full flex justify-center ">
          <div className=" transition-all duration-700 md:w-1/2 w-[90%] flex">
            <input
              placeholder="enter task here..."
              className="w-full shadow-xl rounded-l-xl bg-slate-300 p-3 outline-none"
              value={inputval}
              ref={inputRef}
              onChange={(e) => setInputval(e.target.value)}
            ></input>
            <button
              className="p-3 bg-slate-300 rounded-r-xl hover:bg-slate-500 px-8 border-l-2 border-stone-400 duration-500"
              onClick={handleAdd}
            >
              ADD
            </button>
          </div>
        </div>
        <div className="h-[90%] md:w-1/2 w-[90%] overflow-auto">
          {todos.map((task) => (
            <div className="transition-all duration-700 flex justify-start py-3 items-center">
              <li className=" w-full list-none relative text-xl font-semibold">
                {task.name}
                <span className="float-end">
                  <button
                    className=" transition-all duration-500 bg-slate-800 text-slate-200 text-sm px-4 py-1 rounded-2xl hover:bg-slate-300 hover:text-slate-800"
                    onClick={() =>
                      dispatch({ type: TODO_ACTIONS.DELETE, payload: task.id })
                    }
                  >
                    DELETE
                  </button>
                </span>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

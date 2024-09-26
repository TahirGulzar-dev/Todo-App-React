import React, { useReducer } from 'react'


//variable for crud
const TODO_CRUD = {
  ADD: "add",
  DELETE: "delete",
  EDIT: "edit",
}


//todoReducer function
function todoReducer(state, action) {
  switch (action.type) {
    case TODO_CRUD.ADD:
      return { todo: [...state.todo, action.payload] };
    case TODO_CRUD.DELETE:
      return { todo: [...state.todo.slice(0, action.payload.index), ...state.todo.slice(action.payload.index + 1)] }
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, { todo: [] })

  //function for form submission
  function handleOnSubmit(e) {
    e.preventDefault();
    if (e.target[0].value === "") {
      return;
    }
    let todoName = e.target[0].value;
    let todoDate = e.target[1].value;
    if (todoDate === "") {
      todoDate = new Date().toISOString().split('T')[0];
    }
    dispatch({ type: TODO_CRUD.ADD, payload: { todoName, todoDate } })
    e.target[1].value = "";
    e.target[0].value = "";
  }


  //delete function
  function handleDelete(index) {
    dispatch({ type: TODO_CRUD.DELETE, payload: { index } })
  }
  //edit function
  function handleEdit(index) {

  }
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="container mt-8 w-full">
          <form onSubmit={(e) => handleOnSubmit(e)} className="flex items-center justify-center space-x-4">
            <input
              type="text"
              placeholder="Enter todo Here..."
              className="w-3/5 p-2 border-2 border-orange-600 rounded-2xl focus:outline-none focus:ring-2"
            />
            <input
              type="date"
              className="w-1/5 p-2 border-2 border-orange-600 rounded-2xl focus:outline-none focus:ring-2"
            />
            <button
              type="submit"
              className="w-auto px-4 py-2 bg-orange-600 text-white font-semibold rounded-2xl hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Add
            </button>
          </form>
        </div>

        <div className="container mt-8 w-full">
          <ul className="space-y-4">
            {state.todo.map((todo, index) => (
              <li key={index} className="flex items-center justify-center space-x-4 p-2 border-b border-gray-600">
                <div className="flex items-center space-x-4 w-4/5">
                  <p className="text-lg font-semibold w-3/5">{todo.todoName}</p>
                  <p className="text-sm text-gray-500 w-1/5 text-center">{todo.todoDate}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(index)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </>
  )
}

export default TodoApp



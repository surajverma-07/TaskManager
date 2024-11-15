import { createSlice, nanoid } from "@reduxjs/toolkit";

// Fetching data in todos from localStorage if available 
const  initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [{
        id:1,
        text:"",
        date:"01-1-2001",
        priority:"low",
        editable:false,
        completed:false,
    }]
}

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        //Adding new Task
        addTodo: (state,action) => {
          const  todo = {
              id: nanoid(),
              text:action.payload.text,
              date:action.payload.date,
              priority:action.payload.priority,
              completed:action.payload.completed,
          }
          state.todos.push(todo)
          localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        // Delete Todo
        removeTodo:(state,action) => {
          state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
          localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        //Update Todo
        updateTodo:(state,action) => {
           state.todos.map((todo)=> todo.id === action.payload.id ?(todo.text = action.payload.text):(todo.text = todo.text))
           localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        // toggle completed
        toggleCompleted: (state, action) => {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    // Toggle completed status
                    const updatedTodo = { ...todo, completed: !todo.completed };
                    // If completed is true, set currentTodo and upcoming to false
                    if (updatedTodo.completed) {
                        updateTodo.priority = "low";
                    }else{
                        updateTodo.priority = todo.priority;
                    }
                    return updatedTodo;
                }
                return todo;
            });
        },
        
    }
})

// exporting all the reducers 
export const {addTodo,removeTodo,updateTodo,toggleCompleted} = todoSlice.actions

export default todoSlice.reducer 
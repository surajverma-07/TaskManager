import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import { useSelector } from "react-redux";
import Todos from "./components/Todos.jsx";
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('recent'); // New state for sorting
  const todos = useSelector((state) => state.todos);

  // Search
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortTodos = (todos) => {
    return [...todos].sort((a, b) => {
      switch (sortCriteria) {
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }; // Define priority levels
          return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sort high to low
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'recent':
        default:
          return new Date(b.date) - new Date(a.date); // Most recent first
      }
    });
  };

  const sortedFilteredTodos = sortTodos(filteredTodos);
  const sortedTodos = sortTodos(todos);

  return (
    <div className="min-h-screen bg-[#DCF2F1] xl:py-8 py-4 ">
      <div className="font-bold text-2xl text-center xl:text-3xl text-[#0F1035] shadow-lg xl:h-16">Manage Your Todos</div>
      <div className="w-full md:max-w-[80vw] mx-auto xl:mt-6 mt-1 lg:mt-2  shadow-lg rounded-lg xl:px-44 py-3 px-2 max-w-[100vw]">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Sorting Dropdown */}
        <div className="sort-bar">
          <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
            <option value="recent">Sort by Recent</option>
            <option value="priority">Sort by Priority</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
        
        {/* Current Todo Section */}
        <div className="text-xl heading md:text-2xl lg:text-3xl text-center mb-4 lg:mb-8 mt-2 ">
          Planned Stage
        </div>
        <div className="mb-4">
          <AddTodo />
        </div>
        
        <div className="flex flex-wrap gap-y-3">
          {sortedFilteredTodos.map((todo) => (
            <div key={todo.id} className={`w-full`}>
              {!todo.completed ? (<Todos todo={todo} />) : (null)}
            </div>
          ))}
        </div>

        {/* Completed Todo Section */}
        <div className="text-xl heading md:text-2xl lg:text-3xl text-center mb-8 mt-2 ">
          Completed Stage
        </div>          
        <div className="flex flex-wrap gap-y-3">
          {sortedTodos.map((todo) => (
            <div key={todo.id} className={`${todo.completed ? ("w-full") : ("h-0")}`}>
              {todo.completed ? (<Todos todo={todo} />) : (null)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
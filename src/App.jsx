import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import { useSelector } from "react-redux";
import Todos from "./components/Todos.jsx";
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('recent');
  const todos = useSelector((state) => state.todos);

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortTodos = (todos) => {
    return [...todos].sort((a, b) => {
      switch (sortCriteria) {
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'recent':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
  };

  const sortedFilteredTodos = sortTodos(filteredTodos);
  const sortedTodos = sortTodos(todos);

  return (
    <div className="min-h-screen bg-[#EEEEEE] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#00F82E] mb-8">Manage Your Todos</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-[#00F82E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00F82E]"
              />
            </div>
            <div className="w-full md:w-1/3">
              <select 
                value={sortCriteria} 
                onChange={(e) => setSortCriteria(e.target.value)}
                className="w-full p-2 border border-[#00F82E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00F82E]"
              >
                <option value="recent">Sort by Recent</option>
                <option value="priority">Sort by Priority</option>
                <option value="date">Sort by Date</option>
              </select>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#00F82E]">Planned Stage</h2>
            <AddTodo />
            <div className="space-y-4 mt-4">
              {sortedFilteredTodos.map((todo) => (
                !todo.completed && <Todos key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#00F82E]">Completed Stage</h2>
            <div className="space-y-4">
              {sortedFilteredTodos.map((todo) => (
                todo.completed && <Todos key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
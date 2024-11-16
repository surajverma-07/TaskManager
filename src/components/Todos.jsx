import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, removeTodo, toggleCompleted } from '../store/taskSlice';
import { Check, Edit2, Save, Trash2, Calendar, Flag } from 'lucide-react';

function Todos({ todo }) {
    console.log(todo);
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(todo.editable);
    const [text, setText] = useState(todo.text);
    const [priority, setPriority] = useState(todo.priority);
    const [completed, setCompleted] = useState(todo.completed);
    const [date, setDate] = useState(todo.date);

    const editTodo = () => {
        dispatch(updateTodo(todo.id, text));
        setEditable(false);
    };

    const toggleComplete = () => {
        dispatch(toggleCompleted({ id: todo.id, completed: !completed }));
    };
    
    useEffect(() => {
        function formatDate(dateString) {
            const date = new Date(dateString);
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
        const formattedDate = formatDate(todo.date);
        setDate(formattedDate);
    }, [todo.date]);

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'text-red-500';
            case 'medium': return 'text-yellow-500';
            case 'low': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <div
            className={`flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-lg font-medium p-4 gap-y-2 sm:gap-x-4 shadow-md text-sm md:text-base transition-all duration-300 ${
                completed ? "bg-gray-100 text-gray-500" : "bg-white text-gray-800"
            }`}
        >
            <div className="flex items-center w-full sm:w-1/2">
                <input
                    type="checkbox"
                    className="cursor-pointer mr-4 h-5 w-5 rounded border-gray-300 text-[#00F82E] focus:ring-[#00F82E]"
                    checked={completed}
                    onChange={toggleComplete}
                />
                <input
                    type="text"
                    className={`border outline-none w-full text-sm sm:text-base bg-transparent rounded-lg p-2 ${
                        editable ? "border-[#00F82E] px-2" : "border-transparent"
                    } ${completed ? "line-through" : ""}`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    readOnly={!editable}
                />
            </div>
            <div className="flex items-center justify-between w-full sm:w-1/2">
                <div className="flex items-center text-sm sm:text-base text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{date}</span>
                </div>
                <div className={`flex items-center text-sm sm:text-base ${getPriorityColor(priority)}`}>
                    <Flag className="w-4 h-4 mr-1" />
                    <span>{priority}</span>
                </div>
                <div className="flex space-x-2">
                    <button
                        className={`inline-flex w-8 h-8 rounded-full justify-center items-center transition-colors duration-200 ${
                            completed ? "bg-gray-300 cursor-not-allowed" : "bg-[#00F82E] hover:bg-[#00F82E]/80 text-white"
                        }`}
                        onClick={() => {
                            if (completed) return;
                            if (editable) {
                                editTodo();
                            } else setEditable((prev) => !prev);
                        }}
                        disabled={completed}
                    >
                        {editable ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                    </button>
                    <button
                        className="inline-flex w-8 h-8 rounded-full justify-center items-center bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
                        onClick={() => dispatch(removeTodo(todo.id))}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Todos;
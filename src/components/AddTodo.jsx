import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/taskSlice.js';

function AddTodo() {
    const dispatch = useDispatch();
    const [date, setDate] = useState("");
    const [text, setText] = useState("");
    const [priority, setPriority] = useState("Low");
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(false);

    const addTodoHandler = (e) => {
        e.preventDefault();
        if (text.length > 0 && date.length > 0) {
            setError(false);
            dispatch(addTodo({ text, date, priority, completed }));
            setText("");
            setDate("");
            setPriority("Low");
        } else {
            setError(true);
        }
    };

    return (
        <div className="mb-6">
            <form onSubmit={addTodoHandler} className='w-full bg-[#D9D9D9] flex flex-col sm:flex-row justify-center gap-4 p-4 rounded-lg shadow-md'>
                <input
                    type="text"
                    className='flex-grow text-[#0F1035] bg-[#EEEEEE] rounded-lg text-center border-2 border-[#00F82E] p-2 text-md lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00F82E]'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Enter Task'
                />
                <input
                    type="date"
                    className='text-[#0F1035] bg-[#EEEEEE] cursor-pointer border-2 border-[#00F82E] text-center rounded-lg p-2 text-md lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00F82E]'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder='Set Deadline'
                />
                <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className='text-[#0F1035] bg-[#EEEEEE] border-2 border-[#00F82E] rounded-lg p-2 text-md lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00F82E]'
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button
                    type='submit'
                    className='bg-[#00F82E] text-[#0F1035] rounded-lg p-2 text-md lg:text-lg hover:bg-[#00F82E]/80 transition-colors duration-200'
                >
                    Create Task
                </button>
            </form>
            {error && <p className='text-red-600 text-center font-semibold mt-2'>Please Enter Task and Due Date Properly</p>}
        </div>
    );
}

export default AddTodo;
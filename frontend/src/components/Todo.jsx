import { useState } from "react";
import { Trash2, Check, Plus, ChevronDown } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [userSelect, setUserSelect] = useState("all");
  const token = localStorage.getItem("accessToken");
  

  const addTolist = async () => {
    // add to list
    if (!input.trim()) {
      return alert("please write something!!!");
    } else {
      const task = { text: input, completed: false, id: Math.random() * 100 };

      try {
        const { data } = await axios.put(
          "/api/todo/add",
          { task },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log("data", data);
        setTodos((c) => [...c, task]);
        setInput("");
      } catch (error) {
        console.log("erroe", error.response.data.message);
      }
    }
  };

  const removeFromList = async (id) => {
  try {
    const { data } = await axios.delete(`/api/todo/deleteTask/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setTodos((prev) => {
      const index = prev.findIndex((todo) => todo.id === id);
      if (index === -1) return prev;   

      const updated = [...prev];
      updated.splice(index, 1);       
      return updated;
    });
  } catch (e) {
    console.log(e.response?.data?.message);
  }
};


const toggleTodo = async (id) => {
  try {
    const { data } = await axios.put(
      "/api/todo/toggleList",
      { id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTodos((prev) => {
      const index = prev.findIndex((todo) => todo.id === id);
      if (index === -1) return prev;

      const updated = [...prev]; // copy
      updated[index] = {
        ...updated[index],
        completed: !updated[index].completed,
      };

      return updated;
    });
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};



  const handleKeyPress = (e) => {
    // press enter to Add list
    if (e.key === "Enter") {
      addTolist();
    }
  };

  const clearTodoos = async (e) => {
    const confirmDelete = confirm("Do you really want to delete?");
    if (confirmDelete) {
      try {
        const { data } = await axios.delete("/api/todo/deleteAllTask", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("delete Data=", data);
        setTodos([]);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  const activeTodos = todos.filter((t) => !t.completed).length;

  const fetchAllCompletedTask = async () => {
    try {
      const { data } = await axios.get("/api/todo/getAllCompleted", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(data.completedTask);
    } catch (error) {
      console.log(
        "Error=",
        error?.response?.data?.message || error.message || error
      );
    }
  };

  const fetchAllInCompletedTask = async () => {
    try {
      
      const { data } = await axios.get("/api/todo/getAllInCompleted", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(data.inCompletedTasks);
    } catch (error) {
      console.log(
        "Error=",
        error?.response?.data?.message || error.message || error
      );
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/api/todo/getTask", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("tasks=", data.todos);
      setTodos(data.todos);
    } catch (error) {
      console.log(
        "Error=",
        error?.response?.data?.message || error.message || error
      );
    }
  };

  const handleSelect = (e) => {
    const option = e.target.value;
    localStorage.setItem("Selected", option);
    setUserSelect(option);
    if (option === "all") {
      fetchTasks();
    } else if (option === "completed") {
      fetchAllCompletedTask();
    } else {
      fetchAllInCompletedTask();
    }
  };

  useEffect(() => {
    const option =localStorage.getItem("Selected");
    setUserSelect(option);
    if (option === "all") {
      fetchTasks();
    } else if (option === "completed") {
      fetchAllCompletedTask();
    } else {
      fetchAllInCompletedTask();
    }
  }, []);


  return (
    <div className="  min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
      <div className="bg-white rounded-2xl flex items-center flex-col gap-2 max-w-2xl mx-auto shadow-2xl pt-7 mt-15">
        <div>
          <h1 className="text-3xl font-bold">My To-Do List</h1>
        </div>
        <div className="text-gray-500">
          {activeTodos} {activeTodos <= 1 ? "task" : "tasks"} remaining
        </div>
        <div className="relative">
          <select
            value={userSelect}
            onChange={handleSelect}
            className="w-full px-6 py-1 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all bg-gradient-to-r from-purple-50 to-pink-50 text-gray-700 font-medium appearance-none cursor-pointer hover:border-purple-300 shadow-sm hover:shadow-md"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed Tasks</option>
            <option value="incompleted">Incompleted Tasks</option>
          </select>
          <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500 pointer-events-none" />
        </div>
        <div className="flex gap-2 w-4/5 mt-5 mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            className=" flex-1 py-2 pl-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={addTolist}
            className="px-3 text-white font-bold bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            <span className="text-lg font-semibold flex justify-center items-center gap-2">
              <Plus size={18} /> Add
            </span>
          </button>
        </div>

        {todos?.length? (
          <div className=" w-4/5 ">
            {" "}
            <ul className="py-3">
              {" "}
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-xl flex justify-center items-center gap-4 py-2 px-1 group mb-2"
                >
                  <button
                    onClick={() => {
                      toggleTodo(todo.id);
                    }}
                    className={`border-2 rounded-full h-6 w-6 flex justify-center items-center ${
                      todo.completed
                        ? "bg-green-500 border-green-500"
                        : " border-gray-300 hover:border-purple-500"
                    } `}
                  >
                    {todo.completed && (
                      <Check size={18} className="text-white" />
                    )}
                  </button>
                  <span
                    className={` flex-1 ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700  py-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      removeFromList(todo.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="py-10 pb-18 text-gray-500 text-center">
            No tasks yet. Add one to get started!
          </div>
        )}

        {todos.length >= 1 && (
          <div>
            <button
              onClick={clearTodoos}
              className="px-3 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 mb-2"
            >
              <span className="text-lg font-semibold flex justify-center items-center gap-2">
                Clear All
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Todo;

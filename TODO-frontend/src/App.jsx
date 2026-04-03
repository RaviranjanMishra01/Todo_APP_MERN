import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [dark, setDark] = useState(true);

  const API = "http://localhost:5000/api/todos";

  // GET TODOS
  const fetchTodos = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // CREATE TODO
  const addTodo = async () => {
    if (!title) return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  // DELETE TODO
  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  // UPDATE TODO (Toggle Complete)
  const toggleTodo = async (todo) => {
    const res = await fetch(`${API}/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t._id === updated._id ? updated : t)));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  // Theme classes
  const theme = {
    page:       dark ? "bg-zinc-950 text-white"     : "bg-stone-50 text-zinc-900",
    subtext:    dark ? "text-zinc-500"               : "text-zinc-400",
    progressBg: dark ? "bg-zinc-800"                 : "bg-zinc-200",
    input:      dark
      ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-amber-400 focus:ring-amber-400"
      : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-amber-500 focus:ring-amber-500",
    todoBase:   dark
      ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
      : "bg-white border-zinc-200 hover:border-zinc-300 shadow-sm",
    todoFaded:  dark
      ? "bg-zinc-900/40 border-zinc-800/50"
      : "bg-zinc-50 border-zinc-200/60",
    todoText:   dark ? "text-zinc-200"  : "text-zinc-800",
    todoStrike: dark ? "text-zinc-600"  : "text-zinc-400",
    deleteBtn:  dark ? "text-zinc-600 hover:text-red-400" : "text-zinc-400 hover:text-red-500",
    footerText: dark ? "text-zinc-600 hover:text-zinc-400" : "text-zinc-400 hover:text-zinc-600",
    toggleBg:   dark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-zinc-200 hover:bg-zinc-300",
    toggleIcon: dark ? "text-amber-400" : "text-zinc-600",
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 font-mono transition-colors duration-300 ${theme.page}`}>
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className={`text-xs tracking-[0.3em] uppercase mb-1 ${theme.subtext}`}>
              Task Manager
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              Todo<span className="text-amber-400">.</span>
            </h1>
            {todos.length > 0 && (
              <p className={`text-xs mt-2 ${theme.subtext}`}>
                {completedCount}/{todos.length} completed
              </p>
            )}
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDark(!dark)}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${theme.toggleBg} cursor-pointer`}
          >
            {dark ? (
              // Sun icon
              <svg className={`w-5 h-5 ${theme.toggleIcon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="4" />
                <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              // Moon icon
              <svg className={`w-5 h-5 ${theme.toggleIcon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Progress bar */}
        {todos.length > 0 && (
          <div className={`h-px mb-6 relative overflow-hidden rounded-full ${theme.progressBg}`}>
            <div
              className="absolute top-0 left-0 h-full bg-amber-400 transition-all duration-500"
              style={{ width: `${(completedCount / todos.length) * 100}%` }}
            />
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task..."
            className={`flex-1 border text-sm px-4 py-3 rounded-lg outline-none focus:ring-1 transition-all duration-200 ${theme.input}`}
          />
          <button
            onClick={addTodo}
            className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm px-5 py-3 rounded-lg transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 && (
            <div className={`text-center py-12 text-sm ${theme.subtext}`}>
              No tasks yet. Add one above.
            </div>
          )}

          {todos.map((todo) => (
            <div
              key={todo._id}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 ${
                todo.completed ? theme.todoFaded : theme.todoBase
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTodo(todo)}
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  todo.completed
                    ? "border-amber-400 bg-amber-400"
                    : "border-zinc-400 hover:border-amber-400"
                }`}
              >
                {todo.completed && (
                  <svg className="w-2.5 h-2.5 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Title */}
              <span
                onClick={() => toggleTodo(todo)}
                className={`flex-1 text-sm cursor-pointer select-none transition-all duration-200 ${
                  todo.completed ? `line-through ${theme.todoStrike}` : theme.todoText
                }`}
              >
                {todo.title}
              </span>

              {/* Delete */}
              <button
                onClick={() => deleteTodo(todo._id)}
                className={`opacity-0 group-hover:opacity-100 transition-all duration-150 p-1 rounded ${theme.deleteBtn} cursor-pointer`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className={`mt-6 flex justify-between items-center text-xs ${theme.subtext}`}>
            <span>{todos.filter((t) => !t.completed).length} remaining</span>
            <button
              onClick={() =>
                todos.filter((t) => t.completed).forEach((t) => deleteTodo(t._id))
              }
              className={`transition-colors duration-150 ${theme.footerText} cursor-pointer`}
            >
              Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
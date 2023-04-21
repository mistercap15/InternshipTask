import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import {
  addToDo,
  getAllToDo,
  updateToDo,
  deleteToDo
} from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("index");
    const newToDo = [...toDo];
    const draggedToDo = newToDo[draggedIndex];
    newToDo.splice(draggedIndex, 1);
    newToDo.splice(index, 0, draggedToDo);
    setToDo(newToDo);
  };

  const toggleComplete = (_id) => {
    const newToDo = [...toDo];
    const itemIndex = newToDo.findIndex((item) => item._id === _id);
    newToDo[itemIndex].completed = !newToDo[itemIndex].completed;
    setToDo(newToDo);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Ebay ToDo List</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo.map((item, index) => (
            <div
              key={item._id}
              className={`todo ${item.completed ? "completed" : ""}`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <ToDo
                text={item.text}
                completed={item.completed}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => deleteToDo(item._id, setToDo)}
                toggleComplete={() => toggleComplete(item._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

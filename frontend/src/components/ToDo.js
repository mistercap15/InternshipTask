import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

const ToDo = ({ text, updateMode, deleteToDo }) => {
  const [completed, setCompleted] = useState(false);

  const handleCompletion = () => {
    setCompleted(!completed);
  };

  return (
    <div className={`todo ${completed ? 'completed' : ''}`}>
      <div className="text" onClick={handleCompletion}>
        {text}
      </div>
      <div className="icons">
        <BiEdit className="icon" onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteToDo} />
      </div>
    </div>
  );
};

export default ToDo;

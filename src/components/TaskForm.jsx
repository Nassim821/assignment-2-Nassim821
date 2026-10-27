import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (text.trim() === '') return
    onAddTask(text.trim())
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        aria-label="New task"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm

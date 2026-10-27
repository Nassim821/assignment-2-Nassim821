function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className={task.completed ? 'task-item completed' : 'task-item'}>
      <label>
        <input
          type="checkbox"
          name="task"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />
        <span>{task.text}</span>
      </label>
      <button
        type="button"
        className="delete-btn"
        aria-label={`Delete task: ${task.text}`}
        onClick={() => onDeleteTask(task.id)}
      >
        ×
      </button>
    </li>
  )
}

export default TaskItem

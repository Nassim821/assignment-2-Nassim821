import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, emptyMessage, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  )
}

export default TaskList

import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskCounter from './components/TaskCounter.jsx'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

const EMPTY_MESSAGES = {
  all: 'No tasks yet. Add one above!',
  active: 'No active tasks.',
  completed: 'No completed tasks.',
}

const INITIAL_TASKS = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('all')

  function handleAddTask(text) {
    const nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1
    setTasks([...tasks, { id: nextId, text, completed: false }])
  }

  function handleToggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const activeCount = tasks.length - completedCount

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <button className="menu-btn" aria-label="Menu">
            <img src={menuIcon} alt="" />
          </button>
          <div className="search-container">
            <img src={searchIcon} alt="" className="search-icon" />
            <input type="text" placeholder="Quick find" className="search-input" />
          </div>
        </div>
        <div className="header-right">
          <TaskCounter total={tasks.length} completed={completedCount} />
        </div>
      </header>

      <div className="app-container">
        <nav className="sidebar">
          <ul className="nav-list">
            <li className="nav-item active">
              <a href="#">
                <img src={inboxIcon} alt="" className="icon" />
                <span>Inbox</span>
                <span className="badge">{activeCount}</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#">
                <img src={calendarIcon} alt="" className="icon" />
                <span>Today</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#">
                <img src={upcomingIcon} alt="" className="icon" />
                <span>Upcoming</span>
              </a>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <h1>Inbox</h1>

          <div className="filters">
            {FILTERS.map((item, index) => (
              <span key={item.key} className="filter-group">
                {index > 0 && <span className="filter-separator">| </span>}
                <button
                  type="button"
                  className={filter === item.key ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setFilter(item.key)}
                >
                  {item.label}
                </button>
              </span>
            ))}
          </div>

          <TaskForm onAddTask={handleAddTask} />

          <TaskList
            tasks={visibleTasks}
            emptyMessage={EMPTY_MESSAGES[filter]}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </main>
      </div>
    </>
  )
}

export default App

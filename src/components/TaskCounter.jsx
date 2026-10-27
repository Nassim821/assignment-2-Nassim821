import checkIcon from '../assets/check_icon.png'

function TaskCounter({ total, completed }) {
  return (
    <span className="counter-badge">
      <img src={checkIcon} alt="" className="check-icon" /> {total}/{completed}
    </span>
  )
}

export default TaskCounter

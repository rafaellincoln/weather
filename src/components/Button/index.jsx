import './style.css'

export default function Button ({ onClick, children }) {
  return (
    <button className="pure-material-button-contained" onClick={onClick}>{children}</button>
  )
}
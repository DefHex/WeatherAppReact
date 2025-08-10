import './App.css'

function Widget(props) {

  return (
    <div className='mainDiv'>
      <h1>Show data: {props.data}</h1>
    </div>
  )
}

export default Widget

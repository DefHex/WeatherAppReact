import './App.css';

function Widget({ info }) {
  return (
    <>
      <div className="mainWidget">
        <p>Test text {info}</p>
      </div>
    </>
  );
}

export default Widget;

import { useEffect } from "react";
import "./App.css";

function dayWidget(props) {
  return (
    <>
      <div className="outerDayWidget">
        <div className="mainDayWidget">
          <h1>Show data: {props.data}</h1>
        </div>
      </div>
    </>
  );
}

export default dayWidget;

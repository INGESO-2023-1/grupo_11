import React from 'react';
import "./Admin.css"

const Admin = () => {
    return (
      <div className="main-content">
        <h1>Welcome to Admin!</h1>
        <div className="centered-content">
          <HLR text={"HLR"} />
          <MSC className="msc-left" text={"MSC 1"} />
          <MSC className="msc-right" text={"MSC 2"} />
          <Cell text={"Celda 1"} />
          <Cell text={"Celda 2"} />
          <Cell text={"Celda 3"} />
          <Cell text={"Celda 4"} />
          <Device />
        </div>
      </div>
    );
  };
  

function Device() {
    function handleOnDrag(e, widgetType){
        const dragIcon = new Image(100, 200);
        dragIcon.src = "cellphone icon.jpg";
        var div = document.createElement('div');
        div.appendChild(dragIcon);
        e.dataTransfer.setDragImage(div, 0, 0);

    }

    return (
        <img 
        src="cellphone icon.jpg"
        height='200px'
        width='100px'
        alt="celu"
        draggable='true'
        onDragStart={(ev) => handleOnDrag(ev, "Phone")}>
        </img>
    )
}

function Cell({text}) {
    function handleDragOver(ev){
        ev.preventDefault()
    }
    return(
        <div
            className='cell'
            onDragOver={handleDragOver}
            >{text}
        </div>
    )
}

function HLR({ text }) {
    function handleDragOver(ev){
        ev.preventDefault()
    }
    return (
      <div 
        className="hlr" onDragOver={handleDragOver}>
        {text}
      </div>
    );
  }
  
  function MSC({ text, className }) {
    function handleDragOver(ev) {
      ev.preventDefault();
    }
    return (
      <div className={`msc ${className}`} onDragOver={handleDragOver}>
        {text}
      </div>
    );
  }
  

export default Admin;

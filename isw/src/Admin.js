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
    function handleOnDrag(ev){
		const dragImage = new Image();
		dragImage.src = "cellphone icon.jpg";
		dragImage.width = 100;
		dragImage.height = 200;

		ev.dataTransfer.setData("text/plain", ev.target.id);
        ev.dataTransfer.setDragImage(dragImage, 0, 0);
    } 

    return (
        <img 
		id="phone"
		src="cellphone icon.jpg"
		height='200px'
		width='100px'
		alt="celu"
		draggable='true'
		onDragStart={(ev) => handleOnDrag(ev)}>
		</img>
    )
}

function Cell({text}) {
	function handleDragOver(ev){
		ev.preventDefault();
	}

	function handleDrop(ev){
		ev.preventDefault();
		const data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
	}
	
    return(
        <div
            className='cell'
			onDragOver={(ev) => handleDragOver(ev)}
			onDrop={(ev) => handleDrop(ev)}
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

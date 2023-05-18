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
          <Device id="A" />
          <Device id="B" />
          <Device id="C" />
		  <DisconnectedSlot id="Disconnected"/>
        </div>
      </div>
    );
  };


  const devices = {
    A: {
      casillaVoz: true,
      SMS: true,
      DDN: true,
      DDI: false,
      roaming: true,
      prePago: false,
      postPago: true,
      estado: 'Off',
    },
    B: {
      casillaVoz: false,
      SMS: true,
      DDN: true,
      DDI: false,
      roaming: false,
      prePago: true,
      postPago: false,
      estado: 'Off',
    },
    C: {
      casillaVoz: true,
      SMS: true,
      DDN: true,
      DDI: true,
      roaming: false,
      prePago: false,
      postPago: true,
      estado: 'Off',
    },
  };


function DisconnectedSlot(){
	function handleDragOver(ev){
		ev.preventDefault();
	}

	function handleDrop(ev){
		ev.preventDefault();
		const data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
	}
	
    return(
		<div className='disconnected-div'> Desconectados
			<div
				className='disconnected-area border border-dark py-4'
				onDragOver={(ev) => handleDragOver(ev)}
				onDrop={(ev) => handleDrop(ev)}
				>
			</div>
		</div>	
    )
}
  

function Device({id}) {
    function handleOnDrag(ev){
		const dragImage = new Image();
		dragImage.src = "smartphone.png";

		ev.dataTransfer.setData("text/plain", ev.target.id);
        ev.dataTransfer.setDragImage(dragImage, 0, 0);
    } 

    return (
        <img 
		id={id}
		src="smartphone.png"
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
            className='cell border border-dark py-4'
			onDragOver={(ev) => handleDragOver(ev)}
			onDrop={(ev) => handleDrop(ev)}
            >{text}
        </div>
    )
}

function HLR({ text }) {
    return (
        <div 
			class="hlr border border-dark py-4">
        {text}
    	</div>
    );
  }
  
  function MSC({ text, className }) {
		return (
			<div className={`msc ${className} border border-dark py-4`}>
				{text}
			</div>
		);
  }
  

export default Admin;

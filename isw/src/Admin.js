import React, { useState } from 'react';
import "./Admin.css"


const Admin = () => {
  // Initialize MSC data inside Admin component
  const [MSCData, setMSCData] = useState({
    MSC1: {

    },
    MSC2: {

    },
  });

  return (
    <div className="main-content">
      <h1>Welcome to Admin!</h1>
      <div className="centered-content">
        <HLR text={"HLR"} />
        <MSC className="msc-left" text={"MSC 1"} MSCData={MSCData.MSC1} />
        <MSC className="msc-right" text={"MSC 2"} MSCData={MSCData.MSC2} />
        <Cell text={"Celda 1"} setMSCData={setMSCData} />
        <Cell text={"Celda 2"} setMSCData={setMSCData} />
        <Cell text={"Celda 3"} setMSCData={setMSCData} />
        <Cell text={"Celda 4"} setMSCData={setMSCData} />
        <Device id="1" />
        <Device id="2" />
        <Device id="3" />
        <DisconnectedSlot setMSCData={setMSCData} />
      </div>
    </div>
  );
};



function DisconnectedSlot({setMSCData}){
  function handleDragOver(ev){
    ev.preventDefault();
  }

  function handleDrop(ev){
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log(`Device ${data} was disconnected`);
  
    fetch(`http://localhost:5001/devices/${data}`, { method: 'DELETE' }).catch(err => console.error(err));
  

    setMSCData(prevMSCData => {
      let newMSCData = {...prevMSCData}; // create a copy
      if (newMSCData.MSC1[data]) {
        delete newMSCData.MSC1[data];
      }
      if (newMSCData.MSC2[data]) {
        delete newMSCData.MSC2[data];
      }
      console.log(newMSCData);
      return newMSCData;
    });
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

function Cell({text, setMSCData}) {
  // This mapping decides which MSC each cell belongs to
  const cellToMSC = {
    'Celda 1': 'MSC1',
    'Celda 2': 'MSC1',
    'Celda 3': 'MSC2',
    'Celda 4': 'MSC2',
  };

  function handleDragOver(ev){
    ev.preventDefault();
  }

  function handleDrop(ev){
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log(`Device ${data} was dropped into ${text}`);
  
    // decide which MSC this cell belongs to
    const MSC = cellToMSC[text];
  
    fetch(`http://localhost:5001/devices/${data}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msc: MSC }),
    }).catch(err => console.error(err));

    setMSCData(prevMSCData => {
      let newMSCData = {...prevMSCData}; // create a copy
      
      // decide which MSC this cell belongs to
      const MSC = cellToMSC[text];

      // if the device was in another MSC, remove it from there
      const otherMSC = MSC === 'MSC1' ? 'MSC2' : 'MSC1';
      if (newMSCData[otherMSC] && newMSCData[otherMSC][data]) {
        delete newMSCData[otherMSC][data];
      }
      
      // add or update the device in the correct MSC
      if (!newMSCData[MSC]) {
        newMSCData[MSC] = {};  // Create the MSC if it doesn't exist yet
      }
      newMSCData[MSC][data] = {
        SMS: true, // this can be adjusted according to your needs
        cell: text, // update the cell
      };

      console.log(newMSCData);
      return newMSCData;
    });
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
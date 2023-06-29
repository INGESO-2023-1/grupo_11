import {React , useState} from "react";
import {
    MDBBtn,
    MDBTextArea,
} from "mdb-react-ui-kit";


const Add_message = ({ onSend, originId, recipientId}) =>{
	const [description, setDescription] = useState("");
	const onsubmit  = async e =>{
		e.preventDefault();
        console.log(onSend.origin_id)
		try{
			const body = {
                origigin_id: originId,
                recipient_id: recipientId,
                description};
			const response = await fetch("http://localhost:5001/mensajes/"+originId+"/"+recipientId,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body: JSON.stringify(body)
			})
			console.log(response)
			onSend(description);
			setDescription('')
		}catch(err){
			console.error(err.message)
		}
	}
	return(
		<div>
			<li className="bg-white mb-3">
	        	<MDBTextArea label="Message" id="textAreaExample" rows={4} value={description} onChange ={e=>setDescription(e.target.value)}/>
	        </li>
	        <MDBBtn color="info" rounded className="float-end" onClick={onsubmit} style={{ padding: "10px", marginBottom: "10px" }}>
	            Enviar
	        </MDBBtn>
		</div>
	);
}

export default Add_message ;
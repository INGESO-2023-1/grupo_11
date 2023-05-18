import {React , useState} from "react";
import {
    MDBBtn,
    MDBTextArea,
} from "mdb-react-ui-kit";


const Add_message = () =>{
	const [description, setDescription] = useState("");
	const onsubmit  = async e =>{
		e.preventDefault();
		try{
			const id1 = 0
			const id2 = 1
			const body = {description};
			const response = await fetch("http://localhost:5001/usuarios/"+id1+"/"+id2,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body: JSON.stringify(body)
			})
			console.log(response)
		}catch(err){
			console.error(err.message)
		}
	}
	return(
		<div>
			<li className="bg-white mb-3">
	        	<MDBTextArea label="Message" id="textAreaExample" rows={4} value={description} onChange ={e=>setDescription(e.target.value)}/>
	        </li>
	        <MDBBtn color="info" rounded className="float-end" onClick={onsubmit}>
	            Send
	        </MDBBtn>
		</div>
	);
}

export default Add_message ;
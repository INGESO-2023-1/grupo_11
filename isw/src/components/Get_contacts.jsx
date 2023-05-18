import {React , useState, useEffect} from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBTypography,
    MDBIcon,
    MDBCol,
    MDBRow,
} from "mdb-react-ui-kit";

import "./ClientChat.css";
import Add_message from "./Add_message";

const Get_contacts = () =>{
    const sesion_id = 0
    const sesion_name = "Usuario"
    const [list, setList] = useState([]);
    const [conv, setConv] = useState([]);
    const get_contacts  = async () =>{
        try{
            const response = await fetch("http://localhost:5001/usuarios/"+sesion_id);
            const jsondata = await response.json();
            //console.log(jsondata);
            setList(jsondata);
        }catch(err){
            console.error(err.message);
        }
    }
    const get_convo = async ()=>{
        try{
            const id2 = 1;
            const response = await fetch("http://localhost:5001/usuarios/"+sesion_id+"/"+id2);
            const response2 = await fetch("http://localhost:5001/usuarios/"+id2+"/"+sesion_id);
            const jsondata = await response.json();
            const jsondata2 = await response2.json();
            const setter = jsondata.concat(jsondata2)
            console.log("SETEST",setter)
            setter.sort()
            console.log("setset",setter)
            setConv(setter);
            setter.sort((a, b) => {
                const timestampA = new Date(a.timestamp);
                const timestampB = new Date(b.timestamp);
                return timestampA - timestampB;
            });
            console.log(jsondata);
        }catch(err){
            console.error(err.message);
        }
    }
    useEffect(() => {
        get_contacts()
        get_convo()
    },[])
    

    return(
        <MDBCol>
            <h5 className="font-weight-bold text-center border-bottom border-dark">
                Dispositivos Disponibles
            </h5>

            <MDBRow md="6" lg="5" xl="4" className="mb-4 mb-md-0 contact_list">
                <MDBCol class="chat_spacer"></MDBCol>
                <MDBCol className="border border-dark">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBTypography listUnStyled className="mb-0">
                                {list.map(contacto => (
                                    <li className="p-2 border-bottom">
                                        <a href="#!" className="d-flex justify-content-between" onClick = {get_convo}>
                                            <div className="d-flex flex-row">
                                                <div className="pt-1">
                                                    <p className="fw-bold mb-0">Dispositvo</p>
                                                </div>
                                            </div>

                                            <div className="pt-1">
                                                <p className="small text-muted mb-1">{contacto.timestamp}</p>                                    </div>
                                        </a>
                                    </li>
                                    ))}
                            </MDBTypography>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol class="chat_spacer"></MDBCol>
            </MDBRow>

            <h5 className="font-weight-bold text-center border-top border-bottom border-dark ">
                Chat
            </h5>

            <MDBRow md="6" lg="7" xl="8">
                <MDBCol class="chat_spacer">
                </MDBCol>
                <MDBCol className="border border-dark">
                    <MDBTypography listUnStyled>
                        {conv.map(msg => {
                            if (msg.origin_id == sesion_id) {
                                return (
                                    <li className="d-flex justify-content-between mb-4">
                                        <MDBCard className="w-100">
                                            <MDBCardHeader className="d-flex justify-content-between p-3">
                                                <p className="fw-bold mb-0">{sesion_name}</p>
                                                <p className="text-muted small mb-0">
                                                    {msg.timestamp}
                                                </p>
                                            </MDBCardHeader>
                                            <MDBCardBody>
                                                <p className="mb-0">{msg.msg_content}</p>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="d-flex justify-content-between mb-4">
                                        <MDBCard>
                                            <MDBCardHeader className="d-flex justify-content-between p-3">
                                                <p className="fw-bold mb-0">{msg.origin_id}</p>
                                                <p className="text-muted small mb-0">
                                                    {msg.timestamp}
                                                </p>
                                            </MDBCardHeader>
                                            <MDBCardBody>
                                                <p className="mb-0">
                                                    {msg.msg_content}
                                                </p>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </li>
                                );
                            }
                        })}
                        <Add_message />
                    </MDBTypography>
                </MDBCol>
                <MDBCol class="chat_spacer"></MDBCol>
            </MDBRow>


        </MDBCol>
        )
}

export default Get_contacts ;
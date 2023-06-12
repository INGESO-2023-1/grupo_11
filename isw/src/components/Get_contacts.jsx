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

const Get_contacts = (props) =>{
    const sesion_id = props.userid
    console.log(sesion_id)
    const sesion_name = "Usuario"
    const [list, setList] = useState([]);
    const [conv, setConv] = useState([]);
    const [msgreceptor, setMsgreceptor] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    
    const get_contacts  = async () =>{
        try{
            const response = await fetch("http://localhost:5001/mensajes/"+sesion_id);
            const jsondata = await response.json();
            const result = []
            const visited = []
            for (const elem of jsondata) {
                if (!visited.includes(elem.origin_id) && !visited.includes(elem.recipient_id)) {
                    let user_id
                    if (elem.origin_id != sesion_id){
                        visited.push(elem.origin_id);
                        user_id = await get_user_by_id(elem.origin_id)
                    }
                    if (elem.recipient_id != sesion_id){
                        visited.push(elem.recipient_id);
                        user_id =  await get_user_by_id(elem.recipient_id)
                    }
                    const updatedElem = {
                                       ...elem,
                                        username: user_id[0].username,
                                        };
                    result.push(updatedElem);
                }
            }
            setList(result);
        }catch(err){
            console.error(err.message);
        }
    }
    const get_convo = async (id2)=>{
        try{
            const response = await fetch("http://localhost:5001/mensajes/"+sesion_id+"/"+id2);
            const response2 = await fetch("http://localhost:5001/mensajes/"+id2+"/"+sesion_id);
            const jsondata = await response.json();
            const jsondata2 = await response2.json();
            const setter = jsondata.concat(jsondata2)
            setter.sort((a, b) => {
                const timestampA = new Date(a.timestamp);
                const timestampB = new Date(b.timestamp);
                return timestampA - timestampB;
            });
            setConv(setter);
        }catch(err){
            console.error(err.message);
        }
    }
    const get_user_by_id = async (id) =>{
        try{
            const response = await fetch("http://localhost:5001/usuarios/"+id);
            const data = await response.json();
            //console.log("retorno get_user_by_id\n", data)
            return(data)
        }catch(err){
            console.error(err.message)
        }

    }
    
    //para timestamp más lindo
    const formatTimestamp = (timestamp) => {
        const msg_date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const options = {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
            timeZone: "America/Santiago",
        }

        if(msg_date.getDate() == today.getDate()){
            const time = "Hoy a las "
            return time + msg_date.toLocaleString("es-CL", options);
        }
        else if(msg_date.getDate() === yesterday.getDate() && msg_date.getMonth() === yesterday.getMonth() && msg_date.getFullYear() === yesterday.getFullYear()){
            const time = "Ayer a las "
            return time + msg_date.toLocaleString("es-CL", options);
        }
        else{
            const options = {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
              timeZone: "America/Santiago",
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            };
            return msg_date.toLocaleString("es-CL", options);
        }
      };

    //click handler para hacer el cambio de conversacion sin morir
    const cambio_conv = async (contacto) => {
        try {
            let user
            if (contacto.origin_id == sesion_id) {
                user = await get_user_by_id(contacto.recipient_id);
            } else {
                user = await get_user_by_id(contacto.origin_id);
            }
            setMsgreceptor(user[0])
            console.log("WAWAWAWAAAAAA", user[0]); // This will log the updated value of msgreceptor
            get_convo(user[0].id)
            setSelectedChat(contacto);
        }catch (err) {
            console.error(err.message);
            }
    } 
    // handler para que se actualice la cosa
    const handleSendMessage = async (message) => {
        try {
            const newMessage = {
                origin_id: sesion_id,
                recipient_id: msgreceptor.id,
                timestamp: new Date().toISOString(),
                msg_content: message,
            };
            setConv((prevConv) => [...prevConv, newMessage]);
        } catch (err) {
            console.error(err.message);
        }
    }; 

    useEffect(() => {
        get_contacts()
    },[])
    
    return (
        <MDBCol>
          <h5 className="font-weight-bold text-center border-bottom border-dark">Dispositivos Disponibles</h5>
    
          <MDBRow md="6" lg="5" xl="4" className="mb-4 mb-md-0 contact_list">
            <MDBCol class="chat_spacer"></MDBCol>
            <MDBCol className="border border-dark">
              <MDBCard>
                <MDBCardBody>
                  <MDBTypography listUnStyled className="mb-0">
                    {list.map((contacto) => (
                      <li className="p-2 border-bottom" key={contacto.id}>
                        <a href="#!" className="d-flex justify-content-between" onClick={() => cambio_conv(contacto)}>
                          <div className="d-flex flex-row">
                            <div className="pt-1">
                              <p className="fw-bold mb-0">{contacto.username}</p>
                            </div>
                          </div>
    
                          <div className="pt-1">
                            <p className="small text-muted mb-1">{formatTimestamp(contacto.timestamp)}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </MDBTypography>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol class="chat_spacer"></MDBCol>
          </MDBRow>
    
          {selectedChat && (
            <>
    
              <h5 className="font-weight-bold text-center border-top border-bottom border-dark">Chat</h5>
    
              <MDBRow md="6" lg="7" xl="8">
                <MDBCol class="chat_spacer"></MDBCol>
                <MDBCol className="border border-dark">
                  <MDBTypography listUnStyled>
                    <button className="btn btn-primary mb-4 backButton" onClick={() => setSelectedChat(null)}>
                        Salir
                    </button>
                    {conv.map((msg) => {
                      if (msg.origin_id == sesion_id) {
                        return (
                          <li className="d-flex justify-content-between mb-4" key={msg.id}>
                            <MDBCard className="w-100">
                              <MDBCardHeader className="d-flex justify-content-between p-3">
                                <p className="fw-bold mb-0">{sesion_name}</p>
                                <p className="text-muted small mb-0">{formatTimestamp(msg.timestamp)}</p>
                              </MDBCardHeader>
                              <MDBCardBody>
                                <p className="mb-0">{msg.msg_content}</p>
                              </MDBCardBody>
                            </MDBCard>
                          </li>
                        );
                      } else {
                        return (
                          <li className="d-flex justify-content-between mb-4" key={msg.id}>
                            <MDBCard>
                              <MDBCardHeader className="d-flex justify-content-between p-3">
                                <p className="fw-bold mb-0">{msgreceptor.username}</p>
                                <p className="text-muted small mb-0">{formatTimestamp(msg.timestamp)}</p>
                              </MDBCardHeader>
                              <MDBCardBody>
                                <p className="mb-0">{msg.msg_content}</p>
                              </MDBCardBody>
                            </MDBCard>
                          </li>
                        );
                      }
                    })}
                    <Add_message onSend={handleSendMessage} />
                  </MDBTypography>
                </MDBCol>
                <MDBCol class="chat_spacer"></MDBCol>
              </MDBRow>
            </>
          )}
        </MDBCol>
      );
    };
    
    export default Get_contacts;
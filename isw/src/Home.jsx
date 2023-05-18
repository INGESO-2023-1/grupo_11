import React from "react";
import {MDBContainer} from "mdb-react-ui-kit";

import Get_contacts from "./components/Get_contacts";

export default function Home() {
    return (
        <MDBContainer fluid className="py-3" style={{ backgroundColor: "#eee" }}>    
            <Get_contacts />
        </MDBContainer>
    );
}
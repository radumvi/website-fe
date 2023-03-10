import { useEffect, useState } from "react"

import AdminNav from "../nav/AdminNav";
import MainNav from "../nav/MainNav";

function AdminHome() {
    /*
        Admin home page. It redirects the user if they are not an admin.
    */
    // using a state for the role of the user admin/not admin
    const [isAdminLocal, setAdminLocal] = useState(false);

    useEffect(() => {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/role");
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, []);

    function receiveServerResponse(x) {
        const xJSON = JSON.parse(x);
        // changing the state based on the server response
        if (xJSON.role === "admin") {
            setAdminLocal(true);
        }
        else {
            setAdminLocal(false);
        }
    }

    if (isAdminLocal === false) {
		return (<h1>Not allowed</h1>)
    }
    else {
    	return (
        	<div>
                <MainNav />
                <AdminNav />
        	</div>
    	)
	}
}

export default AdminHome;
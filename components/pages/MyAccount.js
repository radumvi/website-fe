import { useEffect, useState } from "react";
import AccLNav from "../nav/AccLNav";
import AccNNav from "../nav/AccNNav";

import MainNav from "../nav/MainNav";

function MyAccount() {
    /*
        Component that is shown when the user wants to see/change their data.
    */

    // state for user role
    const [isLogged, setLogged] = useState(false);

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
        // changing the state when I get the server response
        const xJSON = JSON.parse(x);
        if (xJSON.role !== "visitor") {
            setLogged(true);
        }
        else {
            setLogged(false);
        }
    }

    // deciding which navigation bar to show
    if (isLogged) {
        return (
            <div>
                <MainNav />
                <AccLNav />
            </div>
        )
    }
    else {
        return (
            <div>
                <MainNav />
                <AccNNav />
            </div>
        )
    }
}

export default MyAccount;
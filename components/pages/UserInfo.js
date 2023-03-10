import { useEffect } from "react"

import AccLNav from "../nav/AccLNav";
import MainNav from "../nav/MainNav";

function UserInfo() {
    /*
        Page for showing the user's information.
    */
    useEffect(() => {
        // hiding the delete verification question and button
        document.getElementById("question").style.display = 'none';

        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/user");
	    xhr.withCredentials = true;

        // the function that i want to be called when I get the response
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, []);

    function receiveServerResponse(x) {
        // when I get the response, I update the fields in the contents
        const xJSON = JSON.parse(x);

        if (xJSON.success) {
            document.getElementById("emailAddress").innerHTML = xJSON.emailAddress;
            document.getElementById("phoneNumber").value = xJSON.phoneNumber;
            document.getElementById("firstName").value = xJSON.firstName;
            document.getElementById("lastName").value = xJSON.lastName
        }
        else {
            document.getElementById("message").innerHTML = "A aparut o eroare";
        }
    }
    
    function submitHandler() {
        // updating the data on a user
        let xhr = new XMLHttpRequest();
	    xhr.open("PUT", "http://127.0.0.1:8081/backend/user");
	    xhr.withCredentials = true;

       // here I formulate the request (JSON Object)
	    var jsonObj = {};
	    jsonObj.phoneNumber = document.getElementById("phoneNumber").value;
	    jsonObj.firstName = document.getElementById("firstName").value;
        jsonObj.lastName = document.getElementById("lastName").value;
	
        // set the function that I want to be called when I get the response
	    xhr.onload = () => receiveServerResponseSubmit(xhr.responseText);
        // sending the JSON in text form as the request body
	    xhr.send(JSON.stringify(jsonObj));
    }

    function receiveServerResponseSubmit(x) {
        const xJSON = JSON.parse(x);
        // displaying a message based on the server response
        if (xJSON.success) {
            document.getElementById("message").innerHTML = "Operatia s-a efectuat cu success";
        }
        else {
            document.getElementById("message").innerHTML = "Nu s-a putut realiza actualizarea";
        }
    }

    function checkDelete() {
        // showing the delete question
        document.getElementById("question").style.display = 'inline';
    }

    function handleDelete() {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://127.0.0.1:8081/backend/user");
	    xhr.withCredentials = true;

        // the function that i want to be called when I get the response
	    xhr.onload = () => receiveServerResponseDelete(xhr.responseText);
        xhr.send("");
    }

    function receiveServerResponseDelete(x) {
        // message to the user
        const xJSON = JSON.parse(x);

        if (xJSON.success) {
            window.location.replace("/");
        }
        else {
            document.getElementById("message2").innerHTML = "Nu se poate face stergerea";
        }
    }

    /*
        Showing all the information an the delete functions.
    */
    return (
        <div>
            <MainNav />
            <AccLNav />
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>Adresa email:</td>
                        <td id="emailAddress">ceva</td>
                    </tr>
                    <tr>
                        <td>Numar telefon :</td>
                        <td><input id="phoneNumber" type="text"></input></td>
                    </tr>
                    <tr>
                        <td>Nume : </td>
                        <td><input id="lastName" type="text"></input></td>
                    </tr>
                    <tr>
                        <td>Prenume : </td>
                        <td><input id="firstName" type="text"></input></td>
                    </tr>
                    <tr>
                        <td><button onClick={submitHandler}>Submit</button></td>
                        <td><p id="message">\</p></td>
                    </tr>
                </tbody>
            </table>
            
            <button onClick={checkDelete}>Sterge cont</button>
            <br />
            <div id="question">
                Sunteti sigur? <button onClick={handleDelete}>DA</button>
            </div>
            <p id="message2"></p>
        </div>
    )
}

export default UserInfo;
import AccNNav from "../nav/AccNNav";
import MainNav from "../nav/MainNav";

function Register() {
    /*
        Page that contains the registration form.
    */
    function handleRegister() {
        
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://127.0.0.1:8081/backend/user");
        xhr.withCredentials = true;

        // here I formulate the request body (JSON Object)
	    var jsonObj = {};
	    jsonObj.firstName = document.getElementById("first-name-field").value;
	    jsonObj.lastName = document.getElementById("last-name-field").value;
        jsonObj.phoneNumber = document.getElementById("phone-number-field").value;
        jsonObj.emailAddress = document.getElementById("email-field").value;
        jsonObj.password = document.getElementById("password1-field").value;
        jsonObj.isAdmin = false;
	
        // setting the function that I want to be called when the response is here
	    document.getElementById("register-form").reset();

	    xhr.onload = () => receiveServerResponse(xhr.responseText);
	    xhr.send(JSON.stringify(jsonObj));
    }

    function receiveServerResponse(x) {
        const xJSON = JSON.parse(x);

        // displaying a message
        if (xJSON.error) {
            document.getElementById("error-message").innerHTML = xJSON.message;
        }
        else {
            document.getElementById("error-message").innerHTML = "Operatia s-a efectuat cu succes. Va rugam sa va autentificati";
        }
    }
    return (
        <div>
            <MainNav />
            <AccNNav />
            <br />
            <form id="register-form">
                <table>
                    <tbody>
                        <tr>
                            <td>Nume</td>
                            <td><input type="text" id="last-name-field"/></td>
                        </tr>
                        <tr>
                            <td>Prenume</td>
                            <td><input type="text" id="first-name-field" /></td>
                        </tr>
                        <tr>
                            <td>Numar telefon</td>
                            <td><input type="text" id="phone-number-field" /></td>
                        </tr>
                        <tr>
                            <td>Adresa email</td>
                            <td><input type="text" id="email-field" /></td>
                        </tr>
                        <tr>
                            <td>Parola</td>
                            <td><input type="password" id="password1-field" /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <br />
            <button id="register-button" onClick={handleRegister}>Inregistreaza-ma</button> <br /> <br />
            <p id="error-message"></p>
        </div>
    )
}

export default Register;
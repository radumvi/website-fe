import MainNav from "../nav/MainNav";
import AccNNav from "../nav/AccNNav";

function Login() {
    /*
        Login page.
    */
    function loginHandler() {
        
        // the HTTP request object
        let xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://127.0.0.1:8081/backend/login");
        xhr.withCredentials = true;

        // here I formulate the request (JSON Object)
	    var jsonObj = {};
	    jsonObj.emailAddress = document.getElementById("email-field").value;
	    jsonObj.password = document.getElementById("password-field").value;
	
        // set the function that I want to be called when I get the response
	    xhr.onload = () => receiveServerResponse(xhr.responseText);

        // the request body
	    xhr.send(JSON.stringify(jsonObj));
    }

    function receiveServerResponse(x) {

        const xJSON = JSON.parse(x);
        
        if (xJSON.success === true) {
            if (xJSON.role === "admin") {
                // if the user is an admin
                window.location.replace("/adminhome");
            }
            else {
                // if the user is registered
                window.location.replace("/");
            }
        }
        else {
            // if the user is not registered
            document.getElementById("error-msg").innerHTML = "Email sau parola incorecte!";
        }
    }

    /*
        From for logging in.
    */
    return (
        <div>
            <MainNav />
            <AccNNav />
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>Email&nbsp;&nbsp;&nbsp;</td>
                        <td><input type="text" id="email-field"/></td>
                    </tr>
                    <tr>
                        <td>Parola&nbsp;&nbsp;&nbsp;</td>
                        <td><input type="password" id="password-field"/></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <button onClick={loginHandler}>Login</button>
            <p id="error-msg"></p>
        </div>
    )
}

export default Login;
export function logout() {
    /*
        Called when the user wants to log out.
    */

    // the HTTP request object
    let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://127.0.0.1:8081/backend/logout");
    xhr.withCredentials = true;

	
    // set the function that I want to be called when I get the response
	xhr.onload = () => receiveServerResponse(xhr.responseText);
    xhr.send("");

    function receiveServerResponse(x) {
        window.location.replace("/");
    }
}

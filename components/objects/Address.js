function Address(props) {
    /*
        Address item shown in the user's addresses menu.
        It has the option to be deleted.
    */
    function deleteAddress() {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
        let url = "http://127.0.0.1:8081/backend/user/address/" + props.id;
        xhr.open("DELETE", url);
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }

    function receiveServerResponse(x) {
        const xJSON = JSON.parse(x);

        // if the operation is successful, I want to reload the page,
        // s.t. the user can see the change
        if (xJSON.success === true) {
            window.location.reload();
        }
    }
    
    // showing basic information about the address
    return (
        <tr>
            <td>{props.county}</td>
            <td>{props.city}</td>
            <td>{props.exactAddress}</td>
            <td><button onClick={deleteAddress}>Delete</button></td>
        </tr>
    )
}

export default Address;

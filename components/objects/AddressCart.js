function AddressCart(props) {
    /*
        Address item shown in the cart page.
        It has the option to send the order.
    */
    function sendOrder() {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8081/backend/user/orders");
        xhr.withCredentials = true;

        var jsonObj = {};
	    jsonObj.addressID = props.id;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send(JSON.stringify(jsonObj));
    }

    function receiveServerResponse(x) {
        const xJSON = JSON.parse(x);

        // if the operation is successful, I want to reload the page,
        // s.t. the user can see that the cart is empty
        if (xJSON.success === true) {
            window.location.reload();
        }
    }
    
    // basic information about the address
    return (
        <tr>
            <td>{props.county}</td>
            <td>{props.city}</td>
            <td>{props.exactAddress}</td>
            <td><button onClick={sendOrder}>Trimite comanda aici</button></td>
        </tr>
    )
}

export default AddressCart;
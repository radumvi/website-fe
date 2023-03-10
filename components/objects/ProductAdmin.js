function ProductAdmin(props) {
    /*
        Product item shown in the admin menu.
        Has delete and modify functions attached to it.
    */
    function handleDelete() {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://127.0.0.1:8081/backend/product/" + props.id);
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }

    function receiveServerResponse(x) {
        // if the operation is successful, I want to reload the page,
	    // s.t. the admin can see if the product info has changed or not
        window.location.reload();
    }

    function handleChange() {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("PUT", "http://127.0.0.1:8081/backend/product/" + props.id);
	    xhr.withCredentials = true;

       // here I formulate the request body (JSON Object)
	    var jsonObj = {};
	    jsonObj.name = document.getElementById("name").value;
	    jsonObj.brand = document.getElementById("brand").value;
        jsonObj.price = parseFloat(document.getElementById("price").value);
        
	
        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        // sending the json object as text
	    xhr.send(JSON.stringify(jsonObj));
    }

    // showing info about a product and buttons for modifying and deleting it
    return (
        <tr>
            <td><input id="name" defaultValue={props.name}></input></td>
            <td><input id="brand" defaultValue={props.brand}></input></td>
            <td><input id="quantity" defaultValue={props.quantity}></input></td>
            <td><input id="price" defaultValue={props.price}></input></td>
            <td><button onClick={handleChange}>Modfica</button></td>
            <td><button onClick={handleDelete}>Delete</button></td>
        </tr>
    )
}

export default ProductAdmin;
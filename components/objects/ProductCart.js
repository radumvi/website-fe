import {useState, useEffect} from "react";

function ProductCart(props) {
    /*
        Product item shown in the user's cart.
        Has functions for modifying the quantity.
    */
   
    // the product's information
    const [info, setInfo] = useState({"name" : "null", "brand" : "null", "quantity" : null, "price" : 0});
    // the quantity of this product in the cart
    const [count, setCount] = useState(props.count);

    useEffect(() => {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/product/" + props.id);
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);

        xhr.send("");
    }, [props.id]);

    function receiveServerResponse(x) {
        const xJSON = JSON.parse(x);
        // if I get the product's info, I want to change the state of the component
        if (xJSON.success) {
            setInfo(xJSON);
            console.log(xJSON);
        }
    }

    function subHandler() {
        // updating the state
        setCount(count - 1);

        // building the HTTP request
        // I want to tell the server that the quantity has changed
        let xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://127.0.0.1:8081/backend/user/cart");
        xhr.withCredentials = true;
        
        // here I formulate the request body (JSON Object)
	    var jsonObj = {};
	    jsonObj.id = props.id;
        jsonObj.count = count - 1;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse1(xhr.responseText);

        // sending the json object as text
	    xhr.send(JSON.stringify(jsonObj));
    }

    function addHandler() {
        // updating the state
        setCount(count + 1);


        // building the HTTP request
        // I want to tell the server that the quantity has changed
        let xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://127.0.0.1:8081/backend/user/cart");
        xhr.withCredentials = true;
        
        // here I formulate the request body (JSON Object)
	    var jsonObj = {};
	    jsonObj.id = props.id;
        jsonObj.count = count + 1;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse1(xhr.responseText);

        // sending the json object as text
	    xhr.send(JSON.stringify(jsonObj));
    }

    function receiveServerResponse1() {
        // if the operation is successful, I want to reload the page
        window.location.reload();
    }

    /*
        Information on the product, it's quantity and buttons for adding, subtracting.
    */
    return (
        <tr>
            <td>{info.name}</td>
            <td>{info.brand}</td>
            <td>{info.quantity}</td>
            <td>{info.price} lei</td>
            <td><p>&nbsp;&nbsp;&nbsp;</p></td>
            <td><button onClick={subHandler}>-</button></td>
            <td>{count}</td>
            <td><button onClick={addHandler}>+</button></td>
        </tr>
    )
}


export default ProductCart;
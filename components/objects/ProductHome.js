import { Link } from "react-router-dom";

function ProductHome(props) {
    /*
        Product item shown in the home page.
        It has the option to add to cart.
	*/
    const url = "/product/" + props.id;

    function handleAdd() {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://127.0.0.1:8081/backend/user/cart");
        xhr.withCredentials = true;

        // here I formulate the request body (JSON Object)
	    var jsonObj = {};
	    jsonObj.id = props.id;
        jsonObj.count = 1;

	    // I don't want to do anything when I get the response
        xhr.onload = () => {};

        // sending the json object as text
	    xhr.send(JSON.stringify(jsonObj));
    }

    /*
        Showing information,
        link to more about the product,
        button to add to cart.
    */
    return (
        <tr>
            <td><Link to={url}>{props.name}</Link></td>
            <td>{props.brand}</td>
            <td>{props.quantity}</td>
            <td>{props.price} lei</td>
            <td><button onClick={handleAdd}>Adauga in cos</button></td>
        </tr>
    )

}
export default ProductHome;
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import MainNav from "../nav/MainNav";
import AccLNav from "../nav/AccLNav";

import ProductOrder from "../objects/ProductOrder";

function OrderPage() {
    /*
        Page describing an order.
    */

    // getting the order id from the upper component
    let {id} = useParams();

    // state for all the products in the order
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/user/order/" + id);
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, [id]);

    function receiveServerResponse(x) {
        // changing the state when I get the server response
        const xJSON = JSON.parse(x);

        if (!xJSON.hasOwnProperty("result")) {
            setProducts([{"id" : 0}]);
        }
        else {
            setProducts(xJSON.result);
        }
    }
    // showing a table with the products in the order
    return (
        <div>
            <MainNav />
            <AccLNav />
            <br />
            <table>
                <tbody>
                    {products.map(({id, name, brand, quantity}) => (
                        <ProductOrder key={id} id={id} name={name} brand={brand} quantity={quantity} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderPage;
import { useState, useEffect } from "react";

import AdminNav from "../nav/AdminNav";
import MainNav from "../nav/MainNav";
import ProductAdmin from "../objects/ProductAdmin";

function AdminProducts() {
    // state for all the products shown
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/products");
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, []);

    function receiveServerResponse(x) {
        // changing the state when the server response is here
        const xJSON = JSON.parse(x);
        console.log(xJSON);
        setProducts(xJSON.result);
    }

    /*
        Showing a table with all the products in the store.
    */
    return(
        <div>
            <MainNav />
            <AdminNav />
            <p>Admin products</p>

            <table>
                <tbody>
                    {products.map(({id, name, brand, quantity, price}) => (
                        <ProductAdmin key={id} id={id} name={name} brand={brand} quantity={quantity} price={price} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}   

export default AdminProducts;
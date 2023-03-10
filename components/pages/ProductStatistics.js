import {useEffect, useState} from "react";
import MainNav from "../nav/MainNav";
import AdminNav from "../nav/AdminNav";

import ProductSpecial from "../objects/ProductSpecial";

function ProductStatistics() {
    /*
        Page for showing product statistics in the admin;s menu
    */

    // state for all the products shown
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/products/special");
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, []);

    function receiveServerResponse(x) {
        // updating the state when the server response is here
        const xJSON = JSON.parse(x);

        if (!xJSON.hasOwnProperty("result")) {
            setProducts([{"county":"null", "city":"null", "exactAddress":"null"}]);
        }
        else {
            setProducts(xJSON.result);
        }
    }

    /*
        Showing a table with all the products concerned.
    */
    return (
        <div>
            <MainNav />
            <AdminNav />
            <br />
            <p>Primele 5 produse ca incasari sunt:</p>
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>Nume</td>
                        <td>Brand</td>
                        <td>Cantitate</td>
                        <td>Incasari</td>
                    </tr>
                    {products.map(({id, name, brand, quantity, total}) => (
                        <ProductSpecial key={id} id={id} name={name} brand={brand} quantity={quantity} total={total} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductStatistics;
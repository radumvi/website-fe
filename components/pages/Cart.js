import {useEffect, useState } from "react";

import MainNav from "../nav/MainNav";
import ProductCart from "../objects/ProductCart";
import AddressCart from "../objects/AddressCart";

function Cart() {
    // state for all the products in the cart
    const [products, setProducts] = useState([]);
    // state for all the user's addresses
    const [addressesJSON, setAddressesJSON] = useState([]);

    useEffect(() => {
        // hiding the user's addresses until I fetch all the items in the cart
        document.getElementById("address-table").style.display = 'none';
      
        // making 2 HTTP requests
        // one for each state
        let xhr1 = new XMLHttpRequest();
        let xhr2 = new XMLHttpRequest();

	    xhr1.open("GET", "http://127.0.0.1:8081/backend/user/cart");
        xhr2.open("GET", "http://127.0.0.1:8081/backend/user/addresses");

	    xhr1.withCredentials = true;
        xhr2.withCredentials = true;

        // separate functions for each
	    xhr1.onload = () => receiveServerResponse1(xhr1.responseText);
        xhr2.onload = () => receiveServerResponse2(xhr2.responseText);

        xhr1.send("");
        xhr2.send("");
    }, []);

    function receiveServerResponse1(x) {
        // when the server provides all the items in the cart, I update the state
        const xJSON = JSON.parse(x);
        setProducts(xJSON.result);

        // if the cart is empty, I don't want to show addresses
        if (Object.keys(xJSON.result).length === 0) {
            console.log("here");
            document.getElementById("address-table").style.display = 'none';
        }
        else {
            document.getElementById("address-table").style.display = 'inline';
        }
    }

    function receiveServerResponse2(x) {
        // updating the state for all the addresses
        const xJSON = JSON.parse(x);
        //setAddressesJSON(xJSON.result);

        if (!xJSON.hasOwnProperty("result")) {
            document.getElementById("address-table").style.display = 'none';
            setAddressesJSON([{"county":"null", "city":"null", "exactAddress":"null"}]);
        }
        else {
            setAddressesJSON(xJSON.result);
        }
    }

    /*
        Displaying all the items in the cart and all the addresses.
    */
    return (
        <div>
            <MainNav />
            <br />
            <table id="table">
                <tbody>
                    {products.map(({id, count}) => (
                        <ProductCart key={id} id={id} count={count} />
                    ))}
                </tbody>
            </table>
            <div id="address-table">
                <p>Selectati o adresa:</p>
                <table>
                    <tbody>
                        <tr>
                            <td>Judet</td>
                            <td>Localitate</td>
                            <td>Adresa</td>
                        </tr>
                        {addressesJSON.map(({id, county, city, exactAddress}) => (
                            <AddressCart key={id} id={id} county={county} city={city} exactAddress={exactAddress} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

    
}

export default Cart;
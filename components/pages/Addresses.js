import { useEffect, useState } from "react"

import AccLNav from "../nav/AccLNav";
import MainNav from "../nav/MainNav";
import Address from "../objects/Address";

function Addresses() {
    /*
        Page for displaying the user's addresses.
    */

    // state for all the addresses'information
    const [addressesJSON, setAddressesJSON] = useState([]);
    
    useEffect(() => {
        // hiding the add form when component is rendered
        document.getElementById("address-form").style.display = 'none';

        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/user/addresses");
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, []);

    function receiveServerResponse(x) {
        
        const xJSON = JSON.parse(x);
        
        // changing the state when I get a response from the server
        if (!xJSON.hasOwnProperty("result")) {
            document.getElementById("address-table").style.display = 'none';
            setAddressesJSON([{"county":"null", "city":"null", "exactAddress":"null"}]);
        }
        else {
            setAddressesJSON(xJSON.result);
        }
    }

    function addAddress() {
        // displaying the form when the user wants to add an address
        document.getElementById("address-form").style.display = 'inline';
    }

    function handleCreate() {

        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://127.0.0.1:8081/backend/user/address");
        xhr.withCredentials = true;
	
        // here I formulate the request body (JSON Object)
	    var jsonObj = {};
	    jsonObj.county = document.getElementById("county-field").value;
	    jsonObj.city = document.getElementById("city-field").value;
        jsonObj.exactAddress = document.getElementById("exactAddress-field").value;
	
        // hiding the form
	    document.getElementById("address-form").style.display = 'none';

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponseAddress(xhr.responseText);
        // sending the json object as text
	    xhr.send(JSON.stringify(jsonObj));
    }

    function receiveServerResponseAddress(x) {
        // if the operation is successful, I want to reload the page,
        // s.t. the user can see that the address has been added
        const xJSON = JSON.parse(x);
        if (xJSON.success === true) {
            window.location.reload();
        }
    }
    /*
        Displaying a table with all the user's addresses and a form for adding more.
    */
    return (
        <div>
            <MainNav />
            <AccLNav />
            <br />
            <p>Adresele mele:</p>
            <table id="address-table">
                <tbody>
                    <tr>
                        <td>Judet</td>
                        <td>Localitate</td>
                        <td>Adresa</td>
                    </tr>
                    {addressesJSON.map(({id, county, city, exactAddress}) => (
                        <Address key={id} id={id} county={county} city={city} exactAddress={exactAddress} />
                    ))}
                </tbody>
            </table>
            <br />
            <br />
            <button onClick={addAddress}>Adauga adresa</button>
            <br />
            <div id="address-form">
                <table>
                    <tbody>
                        <tr>
                            <td>Judet</td>
                            <td><input id="county-field" type="text"></input></td>
                        </tr>
                        <tr>
                            <td>Localitate</td>
                            <td><input id="city-field" type="text"></input></td>
                        </tr>
                        <tr>
                            <td>Adresa</td>
                            <td><input id="exactAddress-field" type="text"></input></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleCreate}>Submit</button>
            </div>
        </div>
    )
}

export default Addresses;
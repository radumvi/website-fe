import { useEffect, useState } from "react"

import AccLNav from "../nav/AccLNav";
import MainNav from "../nav/MainNav";

import OrderClient from "../objects/OrderClient";

function Orders() {
    /*
        Page that is shown to the user when they choose to see their orders.
    */
    // state for all the orders of the user
    const [ordersJSON, setOrdersJSON] = useState([]);
    
    useEffect(() => {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/user/orders");
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, []);

    function receiveServerResponse(x) {
        // updating the state when I get the server response
        const xJSON = JSON.parse(x);

        //setOrdersJSON(xJSON.result);
        if (!xJSON.hasOwnProperty("result")) {
            document.getElementById("orders-table").style.display = 'none';
            setOrdersJSON([{"id" : 0, "status" : "null", "total" : 0, "data" : "null"}]);
        }
        else {
            setOrdersJSON(xJSON.result);
        }
    }
    
    // showing a table with all the user's orders
    return (
        <div>
            <MainNav />
            <AccLNav />
            <br />
            <p>Comenzile mele:</p>
            <table id="orders-table">
                <tbody>
                    <tr>
                        <td>Comanda</td>
                        <td>Data</td>
                        <td>Total</td>
                        <td>Status</td>
                    </tr>
                    {ordersJSON.map(({id, date, total, status}) => (
                        <OrderClient key={id} id={id} date={date} total={total} status={status} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;
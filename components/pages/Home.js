import {useState, useEffect} from "react"
import MainNav from "../nav/MainNav";
import ProductHome from "../objects/ProductHome";

function Home() {
    /*
        The homepage of this application
    */
    // state for all the products shwon
    const [products, setProducts] = useState([]);
    
    function showCat(cat) {
        /*
            Function called when the user wants to see products belonging to a certain category.
        */

        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/products?category=" + cat);
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }

    useEffect(() => {
        // getting all the products in the DB
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/products");
	    xhr.withCredentials = true;

	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, []);

    function receiveServerResponse(x) {
        // updating the state when I get the response from the server
        const xJSON = JSON.parse(x);
        if (!xJSON.hasOwnProperty("result")) {
            setProducts([{"id" : 0}]);
        }
        else {
            setProducts(xJSON.result);
        }
    }

    /*
        Displaying a table with all the products.
    */
    return (
        <div>
            <MainNav />
            <br />
            <table>
                <tbody>
                    <tr>
                        <td><button onClick={() => showCat("Corp")}>Corp</button></td>
                        <td><button onClick={() => showCat("Par")}>Par</button></td>
                        <td><button onClick={() => showCat("Ten")}>Ten</button></td>
                        <td><button onClick={() => showCat("Barbierit")}>Barbierit</button></td>
                        <td><button onClick={() => showCat("Parfum")}>Parfum</button></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <table>
                <tbody>
                    {products.map(({id, name, brand, quantity, price}) => (
                        <ProductHome key={id} id={id} name={name} brand={brand} quantity={quantity} price={price} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;
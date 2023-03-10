import AdminNav from "../nav/AdminNav";
import MainNav from "../nav/MainNav";

function AddProduct() {
    /*
        Form in the admin's menu for adding a product.
    */
    function handleSubmit() {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://127.0.0.1:8081/backend/products");
        xhr.withCredentials = true;
	
        // getting the category from the form
        var e = document.getElementById("cat");
        var value = e.value;

        // here I formulate the request body (JSON Object)
	    var jsonObj = {};
	    jsonObj.name = document.getElementById("name").value;
	    jsonObj.brand = document.getElementById("brand").value;
        jsonObj.quantity = document.getElementById("quantity").value;
        jsonObj.price = parseFloat(document.getElementById("price").value);
        jsonObj.category = value;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        // sending the json object as text
	    xhr.send(JSON.stringify(jsonObj));
    }

    function receiveServerResponse(x) {
        // if the operation is successful, I want to reload the page
        window.location.reload();
    }
    
    /*
        A simple form for getting the name, brand, quantity, price
        and category.
    */
    return(
        <div>
            <MainNav />
            <AdminNav />
            <table>
                <tbody>
                    <tr>
                        <td>Nume</td>
                        <td><input id="name"></input></td>
                    </tr>
                    <tr>
                        <td>Brand</td>
                        <td><input id="brand"></input></td>
                    </tr>
                    <tr>
                        <td>Cantitate</td>
                        <td><input id="quantity"></input></td>
                    </tr>
                    <tr>
                        <td>Pret</td>
                        <td><input id="price"></input></td>
                    </tr>
                    <tr>
                        <td>Categorie</td>
                        <td>
                            <select name="cat" id="cat">
                                <option value="Barbierit">Barbierit</option>
                                <option value="Corp">Corp</option>
                                <option value="Par">Par</option>
                                <option value="Parfum">Parfum</option>
                                <option value="Ten">Ten</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddProduct;
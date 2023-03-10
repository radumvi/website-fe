import {useState, useEffect} from "react";

import AccLNav from "../nav/AccLNav";
import MainNav from "../nav/MainNav";
import ReviewUser from "../objects/ReviewUser";

function Reviews() {
    /*
        Page for showing the user's reviews.
    */

    // state for all the reviews
    const [reviewsJSON, setReviewsJSON] = useState([]);
    
    useEffect(() => {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/client/reviews");
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, []);

    function receiveServerResponse(x) {
        // updating the state when the server response is here
        const xJSON = JSON.parse(x);
        //setReviewsJSON(xJSON.result);
        if (!xJSON.hasOwnProperty("result")) {
            document.getElementById("reviews-table").style.display = 'none';
            setReviewsJSON([{"rating":0, "id":0, "title":"null", "brand":"null", "productName" : "null"}]);
        }
        else {
            setReviewsJSON(xJSON.result);
        }
    }
    /*
        Showing a table with all the results.
    */
    return (
        <div>
            <MainNav />
            <AccLNav />
            <br />
            <p>Review-urile mele:</p>
            <table id="address-table">
                <tbody>
                    <tr>
                        <td>Nume produs</td>
                        <td>Brand</td>
                        <td>Titlu</td>
                        <td>Rating</td>
                    </tr>
                    {reviewsJSON.map(({id, productName, brand, title, rating}) => (
                        <ReviewUser key={id} productName={productName} brand={brand} title={title} rating={rating} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Reviews;
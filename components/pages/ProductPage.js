import { useParams } from "react-router-dom";
import MainNav from "../nav/MainNav";
import { useState, useEffect} from "react";

import ReviewError from "../objects/ReviewError";
import ReviewForm from "../objects/ReviewForm";
import ReviewProdUser from "../objects/ReviewProductUser";
import ReviewProduct from "../objects/ReviewProduct";

function ProductPage() {
    /*
        Page for all the item's information.
    */
    let {id} = useParams();
    
    // state for the product's information
    const [info, setInfo] = useState({"success":false,"name":"undef", "brand":"undef", "quantity":"undefined", "price":0, "rating":0});
    
    // state for the role of the user and review status
    const [isUser, setUser] = useState(false);
    const [isReview, setReview] = useState(false);

    // state for the user's review and all other reviews
    const [userReview, setUserReview] = useState({"title" : "undefined", "rating" : 0});
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        // making 3 HTTP requests

        let xhr1 = new XMLHttpRequest(); // for product information
        let xhr2 = new XMLHttpRequest(); // for user's review
        let xhr3 = new XMLHttpRequest(); // for all the product's reviews

	    xhr1.open("GET", "http://127.0.0.1:8081/backend/product/" + id);
        xhr2.open("GET", "http://127.0.0.1:8081/backend/user/review?productid=" + id);
        xhr3.open("GET", "http://127.0.0.1:8081/backend/product/reviews?productid=" + id);

	    xhr1.withCredentials = true;
        xhr2.withCredentials = true;
        xhr3.withCredentials = true;

        // when a response from the server arrives, I update the state accordingly
	    xhr1.onload = () => receiveServerResponse1(xhr1.responseText);
	    xhr2.onload = () => receiveServerResponse2(xhr2.responseText);
        xhr3.onload = () => receiveServerResponse3(xhr3.responseText);

        xhr1.send("");
        xhr2.send("");
        xhr3.send("");
    }, [id]);

    function receiveServerResponse1(x) {
        const xJSON = JSON.parse(x);
        if (xJSON.success) {
            setInfo(xJSON);
        }
    }

    function receiveServerResponse2(x) {
        const xJSON = JSON.parse(x);
        if (xJSON.valid) {
            setUser(true);
            if (xJSON.exists) {
                setUserReview(xJSON);
                setReview(true);
            }
            else {
                setReview(false);
            }
        }
        else {
            setUser(false);
        }
    }

    function receiveServerResponse3(x) {
        const xJSON = JSON.parse(x);

        if (xJSON.hasOwnProperty("result")) {
            setReviews(xJSON.result);
        }
    }

    /*
        Showing:
        - product info
        - user's review
        - all reviews
    */
    return(
        <div>
            <MainNav />
            <br />
            <div>
                <div>
                    <table>
                    <tbody>
                        <tr>
                            <td>Nume</td>
                            <td>{info.name}</td>
                        </tr>
                        <tr>
                            <td>Brand</td>
                            <td>{info.brand}</td>
                        </tr>
                        <tr>
                            <td>Cantitate</td>
                            <td>{info.quantity}</td>
                        </tr>
                        <tr>
                            <td>Pret</td>
                            <td>{info.price}</td>
                        </tr>
                        <tr>
                            <td>Rating</td>
                            <td>{info.rating}</td>
                        </tr>
                </tbody>
            </table>
            </div>
            <div>
            </div>
            <div>
                {isUser ? (isReview ?  <ReviewProdUser title={userReview.title} rating={userReview.rating} /> : <ReviewForm id={id}/>) : <ReviewError /> }
            </div>
            <div>
                <h2>Review-uri:</h2>
                {reviews === null ? <p>Nu exista review-uri</p> :
                    reviews.map(({id, firstName, lastName, rating, title}) => (
                        <ReviewProduct key={id} firstName={firstName} lastName={lastName} rating={rating} title={title} />
                ))}
            </div>
            </div>
        </div>
    )
}

export default ProductPage;
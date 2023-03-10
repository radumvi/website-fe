function ReviewForm(props) {
    /*
        Form for posting a review in the product page
    */
    function handleSubmit() {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://127.0.0.1:8081/backend/product/reviews?productid=" + props.id);
        xhr.withCredentials = true;

        // getting the value that the user has given for rating
        var e = document.getElementById("stars");
        var value = e.value;

        // here I formulate the request body (JSON Object)
	    var jsonObj = {};
	    jsonObj.title = document.getElementById("field").value;
	    jsonObj.rating = parseInt(value);

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        // sending the json object as text
	    xhr.send(JSON.stringify(jsonObj));
    }

    function receiveServerResponse(x) {
        // if the operation is successful, I want to reload the page,
        window.location.reload();
    }
    
    /*
        Form for giving a rating [1-5] and a title for the review.
    */
    return (
        <div>
            <p>Adauga un review</p>
            <input type="text" id="field"></input>
            <br />
            <br />
            <div>
                <label for="stars">Rating:</label>
                <select name="stars" id="stars">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ReviewForm;
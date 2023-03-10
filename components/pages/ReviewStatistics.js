import {useEffect, useState} from "react";
import MainNav from "../nav/MainNav";
import AdminNav from "../nav/AdminNav";

import UserReviewSpecial from "../objects/UserReviewSpecial";

function UserStatistics() {
    /*
        Page for user statistics regarding reviews.
    */
    // state for all the users to be shown
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/reviews/special");
	    xhr.withCredentials = true;

        // setting the function that I want to be called when the response is here
	    xhr.onload = () => receiveServerResponse(xhr.responseText);
        xhr.send("");
    }, []);

    function receiveServerResponse(x) {
        // updating the state when I get the server response
        const xJSON = JSON.parse(x);
        if (!xJSON.hasOwnProperty("result")) {
            setUsers([{"county":"null", "city":"null", "exactAddress":"null"}]);
        }
        else {
            setUsers(xJSON.result);
        }
        console.log(xJSON);
    }

    /*
        Displaying a table with all the users'details.
    */
    return (
        <div>
            <MainNav />
            <AdminNav />
            <br />
            <p>Clientii care au acordat cele mai putine stele sunt:</p>
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>Nume</td>
                        <td>Prenume</td>
                        <td>Email</td>
                        <td>Media rating-urilor</td>
                        <td></td>
                    </tr>
                    {users.map(({id, lastName, firstName, emailAddress, average}) => (
                        <UserReviewSpecial key={id} id={id} lastName={lastName} firstName={firstName} emailAddress={emailAddress} average={average}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserStatistics;
import {useEffect, useState} from "react";
import MainNav from "../nav/MainNav";
import AdminNav from "../nav/AdminNav";

import UserSpecial from "../objects/UserSpecial";

function UserStatistics() {
    /*
        Page for user statistics in the admin menu.
    */
    // state for all the users to be shown
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // building the HTTP request
        let xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://127.0.0.1:8081/backend/users/special");
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
    }

    /*
        Displaying a table with all the users'details.
    */
    return (
        <div>
            <MainNav />
            <AdminNav />
            <br />
            <p>Clientii cu comenzi peste medie sunt:</p>
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>Nume</td>
                        <td>Prenume</td>
                        <td>Email</td>
                    </tr>
                    {users.map(({id, lastName, firstName, emailAddress}) => (
                        <UserSpecial key={id} id={id} lastName={lastName} firstName={firstName} emailAddress={emailAddress} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserStatistics;
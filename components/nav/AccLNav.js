import {logout} from "../../logout";
import { Link } from "react-router-dom"

function AccLNav() {
    /*
        Navigation bar for logged in user.
        It displays links to : userinfo, addresses, reviews and orders
    */
    return (
        <div>
        <br />
        <table>
            <tbody>
                <tr>
                    <td><Link to="/userinfo" >Date</Link>&nbsp;&nbsp;</td>
                    <td><Link to="/addresses" >Adrese</Link>&nbsp;&nbsp;</td>
                    <td><Link to="/reviews" >Reviews</Link>&nbsp;&nbsp;</td>
                    <td><Link to="/orders">Comenzi</Link>&nbsp;&nbsp;</td>
                    <td><button onClick={logout}>Logout</button></td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

export default AccLNav;
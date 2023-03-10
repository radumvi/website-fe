import { Link } from "react-router-dom"

function AccNNav() {
    /*
        Navigation bar for users that have not logged in.
        It displays links to : login and register.
    */
    return (
    <div>
        <br />
        <table>
            <tbody>
                <tr>
                    <td><Link to="/login">Login</Link>&nbsp;&nbsp;</td>
                    <td><Link to="/register" >Register</Link>&nbsp;&nbsp;</td>
                </tr>
            </tbody>
        </table>
    </div>

    )
}

export default AccNNav;
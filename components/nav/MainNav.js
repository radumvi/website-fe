import { Link } from "react-router-dom"

function MainNav() {
    /*
        Navigation bar for all people visiting the site.
        It displays links to : home, the cart, and account options.
    */
    return (
        <table>
            <tbody>
                <tr>
                    <td><Link to="/" >Adonis</Link>&nbsp;&nbsp;</td>
                    <td><Link to="/cart" >Cosul meu</Link>&nbsp;&nbsp;</td> 
                    <td><Link to="/myaccount" >Contul meu</Link>&nbsp;&nbsp;</td>
                </tr>
            </tbody>
        </table>
    );
}

export default MainNav;
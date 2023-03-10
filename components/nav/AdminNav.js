import { Link } from "react-router-dom";

function AdminNav() {
    /*
        Navigation bar for admins.
        It displays links to : adding a product, modifying products, and 2 stats.
    */
    return (
        <div>
        <br />
            <Link to="/addproduct" >Adauga un produs</Link> <br />
            <Link to="/adminproducts">Modifica/Sterge un produs</Link><br />
            <Link to="/productstatistics">Vezi cele mai profitabile produse</Link><br />
            <Link to="/userstatistics">Vezi cei mai fideli clienti</Link><br />
            <Link to="/reviewstatistics">Vezi clientii cu cele mai negative review-uri</Link>
            <br />
            <br />
        </div>
    )
}

export default AdminNav;
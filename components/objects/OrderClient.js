import {Link} from "react-router-dom";

function OrderClient(props) {
    /*
        Order item shown int the user's orders menu.
        Has the option to redirect to a page with more details.
    */
    const url = "/user/order/" + props.id;

    return(
        <tr>
            <td><Link to={url} >Comanda {props.id}</Link></td>
            <td>{props.date}</td>
            <td>{props.total} lei</td>
            <td>{props.status}</td>
        </tr>
    ) 
}

export default OrderClient;
function ProductOrder(props) {
    /*
        Product item in the order product list.
    */
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.brand}</td>
            <td>{props.quantity}</td>
        </tr>
    )

}
export default ProductOrder;
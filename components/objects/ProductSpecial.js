function ProductSpecial(props) {
    /*
        Product item in the statistics for products list.
        Total stands for sales.
    */
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.brand}</td>
            <td>{props.quantity}</td>
            <td>{props.total}</td>
        </tr>
    )

}
export default ProductSpecial;
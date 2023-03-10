function ReviewProduct(props) {
    /*
        Review item shown in the product's page.
    */
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{props.lastName}</td>
                        <td>{props.firstName}</td>
                        <td>&nbsp;&nbsp;&nbsp;{props.rating} stele</td>
                    </tr>
                </tbody>
            </table>
            <p>{props.title}</p>
        </div>
    )
}

export default ReviewProduct;
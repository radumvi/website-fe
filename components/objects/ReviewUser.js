function ReviewUser(props) {
    /*
        Review item shown in the user's reviews page.
    */
    return(
        <tr>
            <td>{props.productName}</td>
            <td>{props.brand}</td>
            <td>{props.title}</td>
            <td>{props.rating}</td>
        </tr>
    )
}

export default ReviewUser;
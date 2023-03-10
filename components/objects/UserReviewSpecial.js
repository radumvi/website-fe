function UserReviewSpecial(props) {
    /*
        User item shown in statistics about clients and reviews.
    */

    return (
        <tr>
            <td>{props.lastName}</td>
            <td>{props.firstName}</td>
            <td>{props.emailAddress}</td>
            <td>{props.average}</td>
        </tr>
    )

}
export default UserReviewSpecial;
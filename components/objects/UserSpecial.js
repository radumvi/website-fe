function UserSpecial(props) {
    /*
        User item shown in statistics about clients.
    */
    return (
        <tr>
            <td>{props.lastName}</td>
            <td>{props.firstName}</td>
            <td>{props.emailAddress}</td>
        </tr>
    )

}
export default UserSpecial;
function ReviewProductUser(props) {
    /*
        Review item shown in the user's review for the product.
	*/
    return(
        <div>
            <p>Review-ul dumneavoastra:</p>
            <table>
                <tbody>
                    <tr>
                        <td>Titlu</td>
                        <td>{props.title}</td>
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td>{props.rating}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default ReviewProductUser;
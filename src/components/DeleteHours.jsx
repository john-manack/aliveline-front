const DeleteHours = ({handleReload, reload, hours_id}) => {
    
    const _handleDelete = async (e) => {
        const submitResponse = await fetch ('http://127.0.0.1:3030/activities/deleteHours', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hours_id
            })
        }).then((response) => response);

        if (submitResponse.status === 200) {
            reload ? handleReload(false) : handleReload(true)
        }
    }

    const _handleClick = () => {
        window.confirm('Are you sure you want to delete this hours entry?') ? _handleDelete() : handleReload(false)
    };


    return (
        <div>
            <button onClick={_handleClick}>X</button>
        </div>
    )
}

export default DeleteHours;

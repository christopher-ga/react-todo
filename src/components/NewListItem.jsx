
import PropTypes from "prop-types";
const NewListItem = ({listItem, onRemoveTodo, id, onListClick}) => {
    return (
        <>
            <div onClick={() => {onListClick(id)}} className="card-wrapper">
                <section className="content">
                    <p>{listItem}</p>
                </section>
                <section onClick={(e) => onRemoveTodo(e, id)} className="icons">
                    <img  src="/trash.png" alt=""/>
                </section>
            </div>
        </>
    )
}

NewListItem.propTypes = {
    listItem: PropTypes.string.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};


export default NewListItem;
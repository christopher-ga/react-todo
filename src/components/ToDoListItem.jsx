import PropTypes from "prop-types";
const ToDoListItem = ({listItem, onRemoveTodo, id}) => {
    return (
        <>
                <div className="card-wrapper">
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

ToDoListItem.propTypes = {
    listItem: PropTypes.string.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};


export default ToDoListItem;
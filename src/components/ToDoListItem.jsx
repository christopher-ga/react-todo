import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const ToDoListItem = ({listItem, onRemoveTodo, id, update, checked}) => {

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    const [isChecked, setIsChecked] = useState(checked)

    const handleChecked = () => {
        console.log(id);
        setIsChecked(!isChecked);
        update(id)
    }

    return (
        <>
            <div className="card-wrapper">
                <section className="content">
                    <input
                        checked={isChecked}
                        onChange={handleChecked}
                        className="checkbox"
                        type="checkbox" name="checkbox"/>
                    <p className={`task-title ${isChecked ? ("strike"):("")}`}>{listItem}</p>

                </section>
                <section onClick={(e) => onRemoveTodo(e, id)} className="icons">
                    <img src="/trash.png" alt=""/>
                </section>
            </div>
        </>
    )
}

ToDoListItem.propTypes = {
    listItem: PropTypes.string.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    update: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    emitCheckedTask: PropTypes.func.isRequired
};


export default ToDoListItem;
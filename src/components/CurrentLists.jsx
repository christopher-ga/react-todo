import PropTypes from 'prop-types';
import NewListItem from "./NewListItem.jsx";

const CurrentLists = ({lists, onRemoveTodo, onListClick}) => {
    return (
        <>
            <NewListItem onListClick={() => {onListClick("airtable")}} listItem={"Airtable List"} onRemoveTodo={() => {}} id={999}></NewListItem>
            {lists.map((el) => <NewListItem onListClick={onListClick} onRemoveTodo={onRemoveTodo} key={el.id} id={el.id} listItem={el.title}></NewListItem> )}
        </>
    )
}

CurrentLists.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    })).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};

export default CurrentLists;
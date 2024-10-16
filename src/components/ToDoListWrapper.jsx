import style from "../stylesheets/listWrapper.module.css"

const ToDoListWrapper = ({children}) => {

    return (
        <>
            <section className={style.wrapper} >
                {children}
            </section>
        </>
    )
}

export default ToDoListWrapper
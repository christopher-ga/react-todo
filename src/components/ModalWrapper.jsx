import style from "../stylesheets/modal.module.css"

const ModalWrapper = ({handleModal, modalHeader, children}) => {


    return <>
        <div className={style["modal-overlay"] } onClick={handleModal}>
            <section onClick={(e) => {
                e.stopPropagation()
            }} className={style["modal-content"]}>
                <h2>{modalHeader}</h2>
                {children}
            </section>
        </div>
    </>
}

export default ModalWrapper
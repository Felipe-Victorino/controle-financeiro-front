import Dialog from "./Dialog.tsx";


const errorDialog = ({message, isActive}: { message: string, isActive: boolean }) => {
    return (
        <Dialog
            message={message}
            icon={"warning"}
            className={"border-red-500 bg-red-100 dark:bg-red-950"}
            isActive={isActive}
        ></Dialog>
    )

}

export default errorDialog;
import Dialog from "./Dialog.tsx";

const WarningDialog = ({message}: { message: string }) => {
    return (
        <Dialog
            message={message}
            icon={"warning"}
            className={"border-amber-500 bg-amber-100 dark:bg-amber-950"}
        ></Dialog>
    )
}

export default WarningDialog;
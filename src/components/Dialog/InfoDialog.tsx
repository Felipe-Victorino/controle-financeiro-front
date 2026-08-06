import Dialog from "./Dialog.tsx";

const InfoDialog = ({message}: { message: string }) => {
    return (
        <Dialog
            message={message}
            icon={"warning"}
            className={"border-cyan-500 bg-cyan-100 dark:bg-cyan-950"}
        ></Dialog>
    )
}

export default InfoDialog;
import {CloseButton, Dialog, Portal} from "@chakra-ui/react";
import {type ReactNode} from "react";

interface ModalDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    role?: "dialog" | "alertdialog";
    closeOnInteractOutside?: boolean;
    footer?: ReactNode;
    children?: ReactNode;
}

export const ModalDialog = ({
                                open,
                                onOpenChange,
                                role = "dialog",
                                closeOnInteractOutside,
                                title,
                                children,
                                footer,
                                description

                            }: ModalDialogProps) => {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={(e) => onOpenChange(e.open)}
            role={role}
            closeOnInteractOutside={closeOnInteractOutside}
        >
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {description && <Dialog.Description mb="4">{description}</Dialog.Description>}
                            {children}
                        </Dialog.Body>
                        {footer && <Dialog.Footer>{footer}</Dialog.Footer>}
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
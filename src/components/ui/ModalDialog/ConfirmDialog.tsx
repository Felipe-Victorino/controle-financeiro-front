import {Button} from "@chakra-ui/react";
import {ModalDialog} from "./ModalDialog.tsx";
import {toaster} from "@/components/ui/toaster.tsx";
import {useRequest} from "@/hooks/useRequest.ts";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    confirmLabel?: string;
    onConfirm: () => Promise<void>;
}

export const ConfirmDialog = ({
                                  open,
                                  onOpenChange,
                                  title,
                                  description,
                                  confirmLabel = "Confirmar",
                                  onConfirm,
                              }: ConfirmDialogProps) => {
    const {loading, run} = useRequest((err) =>
        toaster.create({type: "error", title: err.message, duration: 3000}),
    );

    const handleConfirm = () =>
        run(async () => {
            await onConfirm();
            onOpenChange(false); // only reached if onConfirm didn't throw
        });

    return (
        <ModalDialog
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            role="alertdialog"
            closeOnInteractOutside={false}
            footer={
                <>
                    <Button variant="outline" disabled={loading} onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button colorPalette="red" loading={loading} onClick={handleConfirm}>
                        {confirmLabel}
                    </Button>
                </>
            }
        />
    );
};
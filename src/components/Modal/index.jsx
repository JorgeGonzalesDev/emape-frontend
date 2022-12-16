import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { forwardRef, useState, useImperativeHandle } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack, Tooltip, IconButton } from '@mui/material';

const MUIModal = forwardRef(({ children, show = false }, ref) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
        handleClose() {
            setOpen(false);
        },
    }));

    return (
        <Modal
            open={open}
            disableEscapeKeyDown={true}
            onClose={(_, reason) => {
                if (reason !== "backdropClick") {
                    handleClose();
                }
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction="row"
                    justifyContent='right'
                >
                    <Tooltip title="Cerrar">
                        <IconButton onClick={() => { handleClose(); }}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
                {children}
            </Box>
        </Modal>
    );
});

export default MUIModal;
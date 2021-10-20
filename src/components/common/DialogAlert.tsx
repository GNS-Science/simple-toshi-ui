import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import React from 'react';
interface DialogAlertProps {
  open: boolean;
  title: string;
  text: string;
  handleClose: () => void;
}
const DialogAlert: React.FC<DialogAlertProps> = ({ open, title, text, handleClose }: DialogAlertProps) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              ok
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogAlert;

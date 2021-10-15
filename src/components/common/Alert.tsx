import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import React from 'react';
interface AlertProps {
  open: boolean;
  title: string;
  text: string;
  handleClose: () => void;
}
const Alert: React.FC<AlertProps> = ({ open, title, text, handleClose }: AlertProps) => {
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

export default Alert;

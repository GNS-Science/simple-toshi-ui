import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
interface DialogAlertProps {
  open: boolean;
  title: string;
  text: string;
  handleClose: () => void;
}
const DialogAlert: React.FC<DialogAlertProps> = ({ open, title, text, handleClose }: DialogAlertProps) => {
  const history = useHistory();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(history.location.search);
    searchParams.set('modal', 'true');
    history.push({
      pathname: history.location.pathname,
      search: searchParams.toString(),
    });
    return () => {
      searchParams.delete('modal');
      history.push({
        pathname: history.location.pathname,
        search: searchParams.toString(),
      });
    };
  }, [history]);

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

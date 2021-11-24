import { makeStyles, Modal, Theme, Tooltip } from '@material-ui/core';
import { IconButton } from '@mui/material';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React from 'react';
import LoadInsert from './LoadInsert';
import ShareInsert from './ShareInsert';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 5),
  },
}));

interface CommonModalProps {
  input: boolean;
  openModal: boolean;
  title: string;
  text?: string;
  handleClose: () => void;
  handleImport?: (value: string) => void;
}

const CommonModal: React.FC<CommonModalProps> = ({
  input,
  openModal,
  title,
  text,
  handleClose,
  handleImport,
}: CommonModalProps) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2>
            {title}{' '}
            {!input && (
              <Tooltip title="copy to clipboard">
                <IconButton onClick={() => navigator.clipboard.writeText(text ?? '')} size="large">
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
            )}
          </h2>
          {input && handleImport ? <LoadInsert handleImport={handleImport} /> : <ShareInsert text={text as string} />}
        </div>
      </Modal>
    </>
  );
};

export default CommonModal;

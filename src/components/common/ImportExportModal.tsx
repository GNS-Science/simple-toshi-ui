import { Button, IconButton, makeStyles, Modal, TextField, Theme, Tooltip } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React, { useState } from 'react';

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
  text: {
    backgroundColor: '#d5d5d5',
    padding: 30,
    borderRadius: 5,
  },
  button: {
    margin: 10,
  },
}));

interface ExportModalProps {
  input: boolean;
  openModal: boolean;
  title: string;
  text?: string;
  handleClose: () => void;
  handleImport?: (value: string) => void;
}

const ImportExportModal: React.FC<ExportModalProps> = ({
  input,
  openModal,
  title,
  text,
  handleClose,
  handleImport,
}: ExportModalProps) => {
  const classes = useStyles();
  const [value, setValue] = useState<string>('');

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
          {input ? (
            <>
              <h2 id="simple-modal-title">{title}</h2>
              {handleImport && (
                <form
                  onSubmit={() => {
                    handleImport(value);
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    fullWidth
                    multiline
                    rows={7}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    variant="filled"
                    placeholder="Paste your json here"
                  />
                  <Button type="submit" className={classes.button} variant="contained" color="primary">
                    Import
                  </Button>
                </form>
              )}
            </>
          ) : (
            <>
              <h2 id="simple-modal-title">
                {title}
                <Tooltip title="copy to clipboard">
                  <IconButton onClick={() => navigator.clipboard.writeText(text ?? '')}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
              </h2>
              <div className={classes.text}>
                <p id="simple-modal-description">{text}</p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImportExportModal;

import { Modal, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import React from 'react';
import LoadInsert from './LoadInsert';
import ShareInsert from './ShareInsert';

const PREFIX = 'CommonModal';

const classes = {
  modal: `${PREFIX}-modal`,
  paper: `${PREFIX}-paper`,
};

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Paper = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 1000,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 4, 5),
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
  return (
    <>
      <StyledModal
        open={openModal}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper}>
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
        </Paper>
      </StyledModal>
    </>
  );
};

export default CommonModal;

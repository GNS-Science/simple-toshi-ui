import { styled } from '@mui/material/styles';
const PREFIX = 'ShareInsert';

const classes = {
  textContainer: `${PREFIX}-textContainer`,
};

const Root = styled('div')(() => ({
  [`& .${classes.textContainer}`]: {
    backgroundColor: '#d5d5d5',
    padding: 30,
    borderRadius: 5,
    overflowWrap: 'break-word',
  },
}));

interface ShareInsertProps {
  text: string;
}

const ShareInsert: React.FC<ShareInsertProps> = ({ text }: ShareInsertProps) => {
  return (
    <Root>
      <div className={classes.textContainer}>
        <p id="simple-modal-description">{text}</p>
      </div>
    </Root>
  );
};

export default ShareInsert;

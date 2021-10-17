import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  text: {
    backgroundColor: '#d5d5d5',
    padding: 30,
    borderRadius: 5,
  },
}));

interface ShareInsertProps {
  text: string;
}

const ShareInsert: React.FC<ShareInsertProps> = ({ text }: ShareInsertProps) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.text}>
        <p id="simple-modal-description">{text}</p>
      </div>
    </>
  );
};

export default ShareInsert;

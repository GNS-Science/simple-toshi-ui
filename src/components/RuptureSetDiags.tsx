import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';

import buildUrl from 'build-url-ts';

const PREFIX = 'RuptureSetDiags';

const classes = {
  root: `${PREFIX}-root`,
  cardContent: `${PREFIX}-cardContent`,
  media: `${PREFIX}-media`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.root}`]: {
    padding: theme.spacing(0),
  },

  [`& .${classes.cardContent}`]: {
    paddingTop: 0,
  },

  [`& .${classes.media}`]: {
    height: 600,
    padding: theme.spacing(0),
  },
}));

const reportBaseUrl = 'http://nzshm22-static-reports.s3-website-ap-southeast-2.amazonaws.com/opensha/DATA';

interface RuptureSetDiagsProps {
  fileId: string;
  metaAsString: string;
}

const RuptureSetDiags: React.FC<RuptureSetDiagsProps> = ({ fileId, metaAsString }: RuptureSetDiagsProps) => {
  const hash = 'subsection-count';

  const reportUrl = buildUrl(reportBaseUrl, {
    path: `/${fileId}/DiagnosticsReport/index.html`,
    hash: hash,
  });

  return (
    <StyledCard className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Rupture Set Diagnostics Report {`${fileId}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {metaAsString}
        </Typography>
      </CardContent>
      <CardMedia className={classes.media} src={reportUrl} title="DiagnosticsReport" component="iframe" />
    </StyledCard>
  );
};

export default RuptureSetDiags;

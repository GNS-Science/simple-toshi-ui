import React from 'react';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

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

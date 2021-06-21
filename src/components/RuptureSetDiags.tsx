import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import buildUrl from 'build-url-ts';

const reportBaseUrl = 'http://nzshm22-static-reports.s3-website-ap-southeast-2.amazonaws.com/opensha/DATA';
//http://nzshm22-rupset-diags-poc.s3-website-ap-southeast-2.amazonaws.com';

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 600,
  },
});

// const indexMap: Record<string, string> = {
//   RmlsZTo3ODYuMGRiR1hT: 'DATA6/RmlsZTo3ODYuMGRiR1hT/',
//   RmlsZTo3NzEuMGRlR2pw: 'DATA6/RmlsZTo3NzEuMGRlR2pw/',
// };

const hash = 'subsection-count';

const reportUrl = buildUrl(reportBaseUrl, {
  path: '/RmlsZTo3ODYuMGRiR1hT' + '/DiagnosticsReport/index.html',
  hash: hash,
});

const RuptureSetDiags: React.FC = () => {
  const classes = useStyles();

  // return <iframe src={reportUrl} width="1000" height="600" />;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Rupture Set Diagnostics Report {'RmlsZTo3ODYuMGRiR1hT'}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            fault_model: CFM_0_9_SANSTVZ_D90; min_sub_sects_per_parent: 2; min_sub_sections: 3; max_jump_distance: 15
            adaptive_min_distance: 6; thinning_factor: 0.0; scaling_relationship: TMG_CRU_2017
          </Typography>
        </CardContent>
        <CardMedia className={classes.media} src={reportUrl} title="DiagnosticsReport" component="iframe" />
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default RuptureSetDiags;

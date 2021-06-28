import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// prettier-ignore
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

import buildUrl from 'build-url-ts';
import PreviewMFD from '../components/PreviewMFD';

const reportBaseUrl = 'http://nzshm22-static-reports.s3-website-ap-southeast-2.amazonaws.com/opensha/DATA';

const useStyles = makeStyles({
  root: {
    maxWidth: 520,
    display: 'flex',
  },
  content: {
    flex: '1 1 auto',
  },
  media: {
    height: 350, // as an example I am modifying width and height
    width: '100%',
    //marginLeft: '5%',
  },
});

// const indexMap: Record<string, string> = {
//   RmlsZTo3ODYuMGRiR1hT: 'DATA6/RmlsZTo3ODYuMGRiR1hT/',
//   RmlsZTo3NzEuMGRlR2pw: 'DATA6/RmlsZTo3NzEuMGRlR2pw/',
// };

const view0 = 'resources/hist_MAG.png';
const view1 = 'resources/sect_max_LENGTH.png';

const file_id = 'RmlsZTo3ODYuMGRiR1hT';

const view0Url = buildUrl(reportBaseUrl, {
  path: '/' + file_id + '/DiagnosticsReport/' + view0,
});
const view1Url = buildUrl(reportBaseUrl, {
  path: '/' + file_id + '/DiagnosticsReport/' + view1,
});
const RuptureSetDiags: React.FC = () => {
  const classes = useStyles();

  return (
    <Box>
      <Typography gutterBottom variant="h5" component="h5">
        Rupture Set Views {file_id}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        fault_model: CFM_0_9_SANSTVZ_D90; min_sub_sects_per_parent: 2; min_sub_sections: 3; max_jump_distance: 15
        adaptive_min_distance: 6; thinning_factor: 0.0; scaling_relationship: TMG_CRU_2017
      </Typography>

      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.content}>
          <PreviewMFD width={380} height={300} bar_width={9} />
        </CardContent>
      </Card>

      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.content}>
          <CardMedia className={classes.media} image={view0Url} />
        </CardContent>
      </Card>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.content}>
          <CardMedia className={classes.media} image={view1Url} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RuptureSetDiags;

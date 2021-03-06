import React, { useState } from 'react';
import { SolutionDiagnosticsOption } from '../../interfaces/generaltask';
import { Card, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import buildUrl from 'build-url-ts';
import { classes } from './GeneralView';
import { MetaToolTip } from '../common/MetaToolTip';
import { MetaArguments } from '../../interfaces/mySolutions';

interface GeneralViewMfdStaticDialogProps {
  id: string;
  option: SolutionDiagnosticsOption;
  currentImage: number;
  automationTasksLength: number;
  filteredMeta: MetaArguments;
}

const GeneralViewMfdStaticDialog: React.FC<GeneralViewMfdStaticDialogProps> = ({
  id,
  option,
  currentImage,
  automationTasksLength,
  filteredMeta,
}: GeneralViewMfdStaticDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const reportUrl = (path: string, id: string) => {
    return buildUrl(process.env.REACT_APP_REPORTS_URL, {
      path: `/opensha/DATA/${id}/solution_report/resources/${path}`,
    });
  };

  return (
    <>
      <Card onClick={handleClickOpen} key={option.finalPath} className={classes.card}>
        <img
          key={option.finalPath}
          className={classes.image}
          src={reportUrl(option.finalPath, id)}
          alt={option.finalPath}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            let newUrl;

            switch (option.finalPath) {
              case 'rate_dist.png':
                newUrl = reportUrl('sa_progress_rate_dist.png', id);
                break;
              case 'mfd_plot_Total_MFD.png':
                newUrl = reportUrl('mfd_plot_Total_Target_MFDs.png', id);
                break;
              case 'mfd_plot_Total_MFD_cumulative.png':
                newUrl = reportUrl('mfd_plot_Total_Target_MFDs_cumulative.png', id);
                break;
              default:
                newUrl = '/img-placeholder.jpg';
            }

            if (e.currentTarget.src !== newUrl && e.currentTarget.src !== '/imgPlaceholder.jpeg') {
              e.currentTarget.src = newUrl;
            } else if (e.currentTarget.src === newUrl && e.currentTarget.src !== '/imgPlaceholder.jpeg') {
              e.currentTarget.src = '/img-placeholder.jpg';
            }
          }}
        />
      </Card>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClick={handleClose}
        PaperProps={{
          className: classes.image,
        }}
      >
        <DialogTitle>
          <Typography className={classes.title}>
            {currentImage + 1}&nbsp;of&nbsp;{automationTasksLength}
          </Typography>
          <MetaToolTip meta={filteredMeta} />
        </DialogTitle>
        <DialogContent>
          <Card key={option.finalPath} className={classes.card} style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              key={option.finalPath}
              className={classes.image}
              style={{ height: '80vh' }}
              src={reportUrl(option.finalPath, id)}
              alt={option.finalPath}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                console.log('print source', e.currentTarget.src);
                let newUrl;

                switch (option.finalPath) {
                  case 'rate_dist.png':
                    newUrl = reportUrl('sa_progress_rate_dist.png', id);
                    break;
                  case 'mfd_plot_Total_MFD.png':
                    newUrl = reportUrl('mfd_plot_Total_Target_MFDs.png', id);
                    break;
                  case 'mfd_plot_Total_MFD_cumulative.png':
                    newUrl = reportUrl('mfd_plot_Total_Target_MFDs_cumulative.png', id);
                    break;
                  default:
                    newUrl = '/img-placeholder.jpg';
                }

                if (e.currentTarget.src !== newUrl && e.currentTarget.src !== '/imgPlaceholder.jpeg') {
                  e.currentTarget.src = newUrl;
                } else if (e.currentTarget.src === newUrl && e.currentTarget.src !== '/imgPlaceholder.jpeg') {
                  e.currentTarget.src = '/img-placeholder.jpg';
                }
              }}
            />
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GeneralViewMfdStaticDialog;

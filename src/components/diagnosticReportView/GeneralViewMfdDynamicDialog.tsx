import React, { useState } from 'react';
import { SolutionDiagnosticsOption } from '../../interfaces/generaltask';
import { Card, CircularProgress, Dialog, DialogContent } from '@mui/material';
import { ParentSize } from '@visx/responsive';
import GeneralViewMfd from './GeneralViewMfd';
import { Root, classes } from './GeneralView';

interface GeneralViewMfdDynamicDialogProps {
  mfdTableId: string;
  meta:
    | readonly ({
        readonly k: string | null;
        readonly v: string | null;
      } | null)[]
    | null
    | undefined;
  option: SolutionDiagnosticsOption;
}

const GeneralViewMfdDynamicDialog: React.FC<GeneralViewMfdDynamicDialogProps> = ({
  mfdTableId,
  meta,
  option,
}: GeneralViewMfdDynamicDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Root>
      <Card onClick={handleClickOpen} key={option.finalPath} className={classes.card}>
        <div className={classes.image}>
          <React.Suspense fallback={<CircularProgress />}>
            <ParentSize>
              {(parent) => (
                <GeneralViewMfd
                  mfdTableId={mfdTableId}
                  meta={meta}
                  parentWidth={parent.width}
                  parentRef={parent.ref}
                  dialog={true}
                  cumulative={option.finalPath === 'mfd_plot_Total_MFD_cumulative.png'}
                  resizeParent={parent.resize}
                />
              )}
            </ParentSize>
          </React.Suspense>
        </div>
      </Card>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClick={handleClose}
        PaperProps={{ sx: { width: '60%', height: '100%' } }}
      >
        <DialogContent>
          <div className={classes.image}>
            <React.Suspense fallback={<CircularProgress />}>
              <ParentSize>
                {(parent) => (
                  <GeneralViewMfd
                    mfdTableId={mfdTableId}
                    meta={meta}
                    parentWidth={parent.width}
                    parentRef={parent.ref}
                    dialog={true}
                    cumulative={option.finalPath === 'mfd_plot_Total_MFD_cumulative.png'}
                    resizeParent={parent.resize}
                  />
                )}
              </ParentSize>
            </React.Suspense>
          </div>
        </DialogContent>
      </Dialog>
    </Root>
  );
};

export default GeneralViewMfdDynamicDialog;

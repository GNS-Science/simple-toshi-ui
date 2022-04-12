import React from 'react';
import { IconButton, styled, Tooltip, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import FavouriteControls from '../../common/FavouriteControls';

const FlipChartControlsContainer = styled('div')({
  paddingLeft: '25%',
  paddingRight: '25%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledIconButton = styled(IconButton)({
  paddingLeft: 70,
  paddingRight: 70,
});

interface FlipChartControlsProps {
  id: string;
  producedBy: string;
  currentImage: number;
  handlePrev: () => void;
  handleNext: () => void;
  totalLength: number;
  disableHotkey: boolean;
}

const FlipChartControls: React.FC<FlipChartControlsProps> = ({
  id,
  producedBy,
  currentImage,
  handlePrev,
  handleNext,
  totalLength,
  disableHotkey,
}: FlipChartControlsProps) => {
  return (
    <FlipChartControlsContainer>
      <Tooltip title="use (<,) (>.) or arrow keys to navigate">
        <StyledIconButton color="primary" onClick={handlePrev} disabled={currentImage === 0} size="large">
          <ArrowBackIosIcon />
        </StyledIconButton>
      </Tooltip>
      <Typography>
        {currentImage + 1}&nbsp;of&nbsp;{totalLength}
      </Typography>
      <Tooltip title="use (<,) (>.) or arrow keys to navigate">
        <StyledIconButton color="primary" onClick={handleNext} disabled={currentImage === totalLength - 1} size="large">
          <ArrowForwardIosIcon />
        </StyledIconButton>
      </Tooltip>
      <FavouriteControls id={id} producedBy={producedBy} disableHotkey={disableHotkey} />
    </FlipChartControlsContainer>
  );
};

export default FlipChartControls;

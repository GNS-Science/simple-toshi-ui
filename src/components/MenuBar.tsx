import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';

const PREFIX = 'MenuBar';

const classes = {
  appBar: `${PREFIX}-appBar`,
};

const StyledSlide = styled(Slide)(({ theme }) => ({
  [`& .${classes.appBar}`]: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const MenuBar: React.FC = () => {
  const trigger = useScrollTrigger();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledSlide appear={false} direction="down" in={!trigger}>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick} size="large">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <MenuItem component={Link} to="/Search" onClick={handleClose}>
              Search
            </MenuItem>
            <MenuItem component={Link} to="/Find" onClick={handleClose}>
              Find by ID
            </MenuItem>
            <MenuItem component={Link} to="/Preview" onClick={handleClose}>
              Preview
            </MenuItem>
            <MenuItem component={Link} to="/MySolutions" onClick={handleClose}>
              My Solutions
            </MenuItem>
          </Menu>
          <Typography style={{ margin: '0 auto' }} variant="h6">
            Toshi
          </Typography>
        </Toolbar>
      </AppBar>
    </StyledSlide>
  );
};

export default MenuBar;

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Menu, MenuItem, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const MenuBar: React.FC = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            getContentAnchorEl={null}
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
    </Slide>
  );
};

export default MenuBar;

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TaskIcon from '@mui/icons-material/Task';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { ColorModeContext } from '../App';
import { doLogin } from '../store/modules/LoggedSlice';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

const settings = ['Sair'];

function Header() {
  const colorMode = React.useContext(ColorModeContext);

  const [auth, setAuth] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
    colorMode.toggleColorMode();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    dispatch(doLogin(''));
    navigate('/');
    setAnchorElUser(null);
  };

  return (
    <>
      <FormGroup
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'background.default' }}
      >
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label=""
          sx={{ backgroundColor: 'background.default', margin: '0px' }}
        />
        <Typography variant="body1" sx={{ color: 'text.primary', fontFamily: 'Poppins' }}>
          {auth ? 'Light' : 'Dark'}
        </Typography>
      </FormGroup>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TaskIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2.5 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Cutive Mono',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                TaskList
              </Typography>

              <TaskIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'Cutive Mono',

                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                TaskList
              </Typography>
            </Box>

            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(setting => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Header;

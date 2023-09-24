import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from 'mui-image'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../features/auth/authSlice"
import { selectCurrentToken, selectCurrentUserCredit } from "../features/auth/authSlice"

const pages = [{ name:'Menu', url:"/foodItems" }, { name:'My Order', url:"/currentOrder" }];

function ResponsiveAppBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)
    const credit = useSelector(selectCurrentUserCredit)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    
  };

  const buttonHandler = (route) => 
  {
    setAnchorElNav(null);
    navigate(route)
    
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
        <Image 
            height={30}
            width={30}
            fit="contain"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, pr:4 }}
            src={'tahalufLogo.png'}/>
          <Typography
            variant="h6"
            noWrap
            component="Link"
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Tahaluf®Eats
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => buttonHandler(page.url)} >
                    <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
              {token ?
                <>
                  <MenuItem >
                    <Typography textAlign="center">Credit: ${credit.toFixed(2)}</Typography>
                  </MenuItem>
                  <MenuItem onClick={ () => dispatch(logOut()) } >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
                :<>
                    <MenuItem onClick={ () => buttonHandler("/login") } >
                        <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem onClick={ () => buttonHandler("/register") } >
                        <Typography textAlign="center">Register</Typography>
                    </MenuItem>
                </>
                }
            </Menu>
          </Box>
          <Image 
            height={30}
            width={30}
            fit="contain"
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, pr:4 }}
            src={'tahalufLogo.png'}/>
          <Typography
            variant="h5"
            noWrap
            component="Link"
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Tahaluf®Eats
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={ () => buttonHandler(page.url) }
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {token ?
              <>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
                }}>
                  <Button
                    onClick={ () => dispatch(logOut()) }
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                      Logout
                  </Button>
                  <Typography  
                    textAlign="center">
                          CREDIT: ${credit.toFixed(2)}
                  </Typography>
                </Box>
              </>:
              <>
                  <Button
                      onClick={ () =>  buttonHandler("/login") }
                      sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                      lOGIN
                  </Button>
                  <Button
                      onClick={ () =>  buttonHandler("/register") }
                      sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                      Register
                  </Button>
              </>
               
            }
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
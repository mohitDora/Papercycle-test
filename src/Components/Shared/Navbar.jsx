"use client";
import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
  useScrollTrigger,
  Slide,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NAV_ITEMS, PROFILE_ITEMS } from "../../../utils/Constant";
import { useStoreContext } from "../../../lib/Context/store";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../lib/assets/logo ppcy.svg";
import Navlink from "./Navlink";

const drawerWidth = 240;

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 5 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function DrawerAppBar(props) {
  const { isLoggedIn } = useStoreContext();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <div className="flex flex-col justify-between h-full">
      <Box onClick={handleDrawerToggle} className="flex flex-col">
        {NAV_ITEMS.map((item,index) => {
          if (item?.isLoggedIn == isLoggedIn || item?.isLoggedIn === "both") {
            return (
              <Navlink key={index} href={item.link} className="hover:bg-gray-100 p-2">
                <Button className="block text-black p-4">{item.text}</Button>
              </Navlink>
            );
          }
        })}
      </Box>
      {isLoggedIn && (
        <Box onClick={handleDrawerToggle} className="flex flex-col">
          {PROFILE_ITEMS.map((item,index) => {
            return (
              <Navlink key={index} href={item.link} className="hover:bg-gray-100 p-2">
                <Button className="block text-black p-4">{item.text}</Button>
              </Navlink>
            );
          })}
          <Box className="flex bg-secondary p-2 gap-2 items-center">
            <Avatar sx={{ bgcolor: "white", color: "black" }}>A</Avatar>
            <Typography className="flex justify-center align-middle">
              Hi User
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="flex mb-20 important">
      {/* <CssBaseline /> */}
      <HideOnScroll {...props}>
     
        <AppBar component="nav" className="py-2 bg-neutral-100" elevation={0}>
          

          
          <Toolbar sx={{display:"flex",justifyContent:{sm:"flex-start",md:"space-between"}}} classame="px-12 md:max-w-screen-xl ">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Image src={Logo} component="div"></Image>
            {/* <Typography
              className="text-2xl font-bold sm:text-3xl"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "non", sm: "block" } }}
            >
              PaperCycle
            </Typography> */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: "2rem",
                alignItems: "center",
              }}
            >
              {NAV_ITEMS.map((item, index) => {
                if (
                  item?.isLoggedIn == isLoggedIn ||
                  item?.isLoggedIn === "both"
                ) {
                  return (
                    <Navlink key={index} href={item.link} className="h-full">
                      <Button sx={{color:"black"}}>
                        {item.text}
                      </Button>
                    </Navlink>
                  );
                }
              })}
              {isLoggedIn && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Account">
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar sx={{ bgclor: "white", color: "black" }} className="bg-secondary">
                        A
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {PROFILE_ITEMS.map((item, index) => (
                      <Link href={item.link} key={index}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">
                            {item.text}
                          </Typography>
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Box>
              )}
            </Box>
            
          </Toolbar>
        
        </AppBar>
      
      </HideOnScroll>
      {/* </div> */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

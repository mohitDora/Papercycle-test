"use client";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NAV_ITEMS, PROFILE_ITEMS } from "@/Constant";
import { useStoreContext } from "@/Context/store";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo ppcy.svg";
import Navlink from "./Navlink";
import Navlink2 from "./Navlink2";
import { useRouter } from "next/navigation";

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
  window: PropTypes.func,
};

export default function DrawerAppBar(props) {
  const { isLoggedIn, Logout, getMe, token } = useStoreContext();
  const [name, setName] = useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { window } = props;

  useEffect(() => {
    const nameStored = localStorage.getItem("name");
    if (nameStored) {
      setName(nameStored);
    }
  }, []);
  console.log(name);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const Router = useRouter();

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
        {NAV_ITEMS?.map((item, index) => {
          if (item?.isLoggedIn == isLoggedIn || item?.isLoggedIn === "both") {
            return (
              <Navlink key={index} href={item?.link}>
                <Button
                  sx={{ "&:hover": { backgroundColor: "transparent" } }}
                  disableRipple
                  className="block text-black py-4 "
                >
                  {item.text}
                </Button>
              </Navlink>
            );
          }
        })}
      </Box>
      {isLoggedIn && (
        <Box onClick={handleDrawerToggle} className="flex flex-col">
          {PROFILE_ITEMS.map((item, index) => {
            return (
              <Navlink
                key={index}
                href={item?.link}
                className="hover:bg-gray-200 p-2"
              >
                <Button
                  disableRipple
                  sx={{ "&:hover": { backgroundColor: "transparent" } }}
                  className="block text-black p-4"
                  onClick={item?.text === "Logout" ? () => Logout() : null}
                >
                  {item?.text}
                </Button>
              </Navlink>
            );
          })}
          <Box className="flex bg-secondary p-2 gap-2 items-center">
            <Avatar sx={{ bgcolor: "white", color: "black" }}>
              {name?.split(" ")[0][0]}
            </Avatar>
            <Typography className="flex justify-center align-middle">
              Hi {name?.split(" ")[0]}
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className="flex mb-16 justify-between">
      {/* <CssBaseline /> */}
      <HideOnScroll {...props}>
        <AppBar component="nav" className="py-2 bg-gray-100 shadow-md" elevation={2} >
          <Toolbar className="w-[100%] flex justify-between md:max-w-screen-xl m-auto">
            <div className="flex">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ m: 1, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Image
                onClick={() => Router.push("/")}
                src={Logo}
                component="div"
                className="w-[15rem]"
                alt="logo.svg"
              ></Image>
            </div>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: "5rem",
                alignItems: "center",
              }}
            >
              {NAV_ITEMS?.map((item, index) => {
                if (
                  item?.isLoggedIn == isLoggedIn ||
                  item?.isLoggedIn === "both"
                ) {
                  return (
                    <Navlink2 key={index} href={item?.link} className="h-full">
                      {/* <Button sx={{ color: "black" }}></Button> */}

                      <p className="font-medium text-lg"> {item?.text}</p>
                    </Navlink2>
                  );
                }
              })}
              {isLoggedIn && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Account">
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar sx={{ color: "black" }} className="bg-secondary">
                        {name?.split(" ")[0][0]}
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
                    <div className="text-secondary px-4 py-2">
                      <Typography textlign="center" className="font-bold">
                        Hi {name?.split(" ")[0]}
                      </Typography>
                    </div>

                    {PROFILE_ITEMS?.map((item, index) => (
                      <Link
                        href={item.link}
                        key={index}
                        onClick={
                          item?.text === "Logout" ? () => Logout() : null
                        }
                      >
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
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

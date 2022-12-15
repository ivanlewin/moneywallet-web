import { Box, Drawer, Hidden, SwipeableDrawer, useTheme } from "@mui/material";
import { ReactNode, useState } from "react";
import SearchAppBar from "./SearchAppBar";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onDrawerOpen = () => { setDrawerOpen(true); };
  const onDrawerClose = () => { setDrawerOpen(false); };
  const theme = useTheme();

  return (
    <Box sx={{
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    }}>
      <SearchAppBar hamburgerOnClick={() => setDrawerOpen(!drawerOpen)} />
      <Hidden mdDown>
        <Drawer open variant='persistent'>
          <Sidebar />
        </Drawer>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          open={drawerOpen}
          onOpen={onDrawerOpen}
          onClose={onDrawerClose}
        >
          <Sidebar />
        </SwipeableDrawer>
      </Hidden>
      <Box component='main'
        sx={{
          width: '100%',
          overflowX: 'auto',
          flexGrow: 1,
          [theme.breakpoints.up('md')]: {
            marginLeft: 2,
          }
        }}>
        {children}
      </Box>
    </Box>
  );
};
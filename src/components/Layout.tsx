import { Box, Drawer, Theme } from "@mui/material";
import { ReactNode, useState } from "react";
import SearchAppBar from "./SearchAppBar";
import Sidebar from "./Sidebar";
import { useMediaQuery } from '@mui/material';


const DRAWER_WIDTH = 320;

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [drawerOpenMobile, setDrawerOpenMobile] = useState(false);
  const handleDrawerToggle = () => { setDrawerOpenMobile(d => !d); };

  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const drawerVisible = drawerOpenMobile && lgDown;

  const container = typeof window !== 'undefined' ? (() => window)().document.body : undefined;

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={drawerVisible}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box component='main'
        sx={{
          width: ['100%', undefined, undefined, drawerVisible ? undefined : `calc(100% - ${DRAWER_WIDTH}px)`],
          marginLeft: 'auto',
        }}>
        <SearchAppBar onClickOnIcon={handleDrawerToggle} />
        {children}
      </Box>
    </>
  );
};
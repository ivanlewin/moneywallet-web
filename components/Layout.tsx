import { Drawer, Hidden, SwipeableDrawer } from "@mui/material";
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

  return (
    <div >
      <SearchAppBar onClick={() => setDrawerOpen(!drawerOpen)} />
      <Hidden mdDown>
        <Drawer open variant='persistent'>
          <Sidebar />
        </Drawer>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          keepMounted
          open={drawerOpen}
          onOpen={onDrawerOpen}
          onClose={onDrawerClose}
        >
          <Sidebar />
        </SwipeableDrawer>
      </Hidden>
      <main >
        {children}
      </main>
    </div>
  );
};
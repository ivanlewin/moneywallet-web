import { Drawer, Hidden, SwipeableDrawer } from "@mui/material";
import { ReactNode, useState } from "react";

type LayoutProps = {
  children?: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onDrawerOpen = () => { setDrawerOpen(true); };
  const onDrawerClose = () => { setDrawerOpen(false); };
  const classes = {} as any;

  return (
    <div className={classes.root}>
      <Hidden mdDown>
        <Drawer open variant='persistent' className={classes.hiddenOnPrint}>

        </Drawer>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          keepMounted
          open={drawerOpen}
          onOpen={onDrawerOpen}
          onClose={onDrawerClose}
          className={classes.hiddenOnPrint}
        >
        </SwipeableDrawer>
      </Hidden>
      <main className={classes.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
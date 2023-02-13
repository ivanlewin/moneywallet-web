import * as React from 'react';
import Layout from 'components/Layout';
import { Grid, Paper, Typography } from '@mui/material';
import { UserInterfaceIcon, UtilitiesIcon, DatabaseIcon, AboutIcon } from 'components/Icons';
import Link, { LinkProps } from 'next/link';

type SettingsMenuProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: LinkProps['href'];
};
function SettingsMenu({ title, subtitle, icon, href }: SettingsMenuProps) {
  return (
    <Link href={href}>
      <Grid item xs={12} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Grid item>
          {icon}
        </Grid>
        <Grid item>
          <Typography variant='subtitle1'>{title}</Typography>
          <Typography variant='subtitle2'>{subtitle}</Typography>
        </Grid>
      </Grid>
    </Link>
  );
}

export default function Settings() {
  return (
    <Layout>
      <Paper sx={{ minHeight: '100vh' }} >
        <Grid container flexDirection='column' sx={{ padding: 3, gap: 3 }}>
          <SettingsMenu
            title='User interface'
            subtitle='Personalize it as you want'
            icon={<UserInterfaceIcon />}
            href='/settings/user-interface'
          />
          <SettingsMenu
            title='Utilities'
            subtitle='Setup the available tools'
            icon={<UtilitiesIcon />}
            href='/settings/utilities'
          />
          <SettingsMenu
            title='Database'
            subtitle='Manage your data'
            icon={<DatabaseIcon />}
            href='/settings/database'
          />
          <SettingsMenu
            title='About'
            subtitle='Credits and licenses'
            icon={<AboutIcon />}
            href='/settings/about'
          />
        </Grid>
      </Paper>
    </Layout >
  );
}

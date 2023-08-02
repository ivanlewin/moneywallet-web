import * as React from 'react';
import Layout from 'components/Layout';
import { Grid, Paper, Typography } from '@mui/material';
import { UserInterfaceIcon, UtilitiesIcon, DatabaseIcon, AboutIcon } from 'components/Icons';
import Link, { LinkProps } from 'next/link';

interface SettingsLinkProps extends LinkProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};
export function SettingsLink({ title, subtitle, icon, ...props }: SettingsLinkProps) {
  return (
    <Link {...props}>
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
          <SettingsLink
            title='User interface'
            subtitle='Personalize it as you want'
            icon={<UserInterfaceIcon />}
            href='/settings/user-interface'
          />
          <SettingsLink
            title='Utilities'
            subtitle='Setup the available tools'
            icon={<UtilitiesIcon />}
            href='/settings/utilities'
          />
          <SettingsLink
            title='Database'
            subtitle='Manage your data'
            icon={<DatabaseIcon />}
            href='/settings/database'
          />
          <SettingsLink
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

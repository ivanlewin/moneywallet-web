import * as React from 'react';
import { Grid, GridProps, Typography } from '@mui/material';

interface SettingsSectionItemProps extends GridProps {
  title: string;
  subtitle: string;
};
export function SettingsSectionItem({ title, subtitle, ...props }: SettingsSectionItemProps) {
  return (
    <Grid
      item
      xs={12}
      sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
      {...props}
    >
      <Grid item>
        <Typography variant='body1'>{title}</Typography>
        <Typography variant='subtitle2' color='GrayText'>{subtitle}</Typography>
      </Grid>
    </Grid>
  );
}
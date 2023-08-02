import { Grid, Typography, useTheme } from '@mui/material';
import * as React from 'react';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}
export default function SettingsSection({ title, children }: SettingsSectionProps) {
  const theme = useTheme();
  return (
    <Grid
      container
      flexDirection='column'
      sx={{ padding: 2, gap: 1 }}
    >
      <Typography variant='caption' color={theme.palette.primary.light}>{title}</Typography>
      {children}
    </Grid>
  );
}

import * as React from 'react';
import Layout from 'components/Layout';
import { Grid, Paper } from '@mui/material';
import ImportDatabaseButton from 'components/settings/database/import-database-button';

export default function DatabaseBackup() {
  return (
    <Layout>
      <Paper sx={{ minHeight: '100vh' }} >
        <Grid container flexDirection='column' sx={{ padding: 3, gap: 3 }}>
          <ImportDatabaseButton />
        </Grid>
      </Paper>
    </Layout >
  );
}

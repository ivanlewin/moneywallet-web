import * as React from 'react';
import Layout from 'components/Layout';
import { Paper } from '@mui/material';
import SettingsSection from 'components/settings/SettingsSection';
import { SettingsSectionItem } from 'components/settings/SettingsSectionItem';

export default function DatabaseSettings() {
  return (
    <Layout>
      <Paper sx={{ minHeight: '100vh' }} >
        <SettingsSection title='Backup'>
          <SettingsSectionItem title='Backup services' subtitle='Create and restore the database' />
        </SettingsSection>
        <SettingsSection title='Import/Export'>
          <SettingsSectionItem title='Import data' subtitle='Read data from an external file' />
          <SettingsSectionItem title='Export data' subtitle='Write data on an external file' />
        </SettingsSection>
      </Paper>
    </Layout >
  );
}

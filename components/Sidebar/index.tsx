import * as React from 'react';
import Box from '@mui/material/Box';
import SidebarHeader, { SidebarHeaderProps } from './SidebarHeader';

export default function Sidebar() {
  const [headerExpanded, setHeaderExpanded] = React.useState(true);
  const handleHeaderChange: SidebarHeaderProps['onChange'] = (event, isExpanded) => {
    setHeaderExpanded(isExpanded);
  };
  return (
    <SidebarHeader
      expanded={headerExpanded}
      onChange={handleHeaderChange}
    />
  );
}
import * as React from 'react';
import SidebarHeader, { SidebarHeaderProps } from './SidebarHeader';
import SidebarMenu from './SidebarMenu';

export default function Sidebar() {
  const [headerExpanded, setHeaderExpanded] = React.useState(true);
  const handleHeaderChange: SidebarHeaderProps['onChange'] = (event, isExpanded) => {
    setHeaderExpanded(isExpanded);
  };
  return (
    <>
      <SidebarHeader
        expanded={headerExpanded}
        onChange={handleHeaderChange}
      />
      <SidebarMenu />
    </>
  );
}
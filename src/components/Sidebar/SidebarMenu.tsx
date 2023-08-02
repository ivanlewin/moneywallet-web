import * as React from 'react';

import {
  Button, ButtonProps, Divider, Paper, Typography, useTheme
} from '@mui/material';

import {
  AboutIcon,
  AtmIcon,
  BudgetIcon,
  CalculatorIcon,
  CategoryIcon,
  ConverterIcon,
  DebtIcon,
  EventIcon,
  ModelIcon,
  OverviewIcon,
  PeopleIcon,
  PlaceIcon,
  RecurrenceIcon,
  SavingsIcon,
  SettingsIcon,
  TransactionIcon
} from 'components/Icons';
import Link, { LinkProps } from 'next/link';

interface SidebarMenuLinkProps extends LinkProps {
  buttonProps?: ButtonProps;
  disabled?: boolean;
  icon: React.ReactNode;
  title: string;
};
function SidebarMenuLink({ disabled = false, icon, title, buttonProps, ...props }: SidebarMenuLinkProps) {
  const theme = useTheme();
  return (
    <Link
      onClick={(event) => { if (disabled) { event.preventDefault(); } }}
      {...props}
    >
      <Button
        title={title}
        sx={{
          color: theme.palette.common.white,
          display: 'flex',
          width: ' 100%',
          justifyContent: 'flex-start',
          gap: 3,
          textTransform: 'none',
          padding: theme.spacing(1.5, 2),
          mt: 1,
        }}
        disabled={disabled}
        {...buttonProps}
      >
        {icon}
        <Typography>
          {title}
        </Typography>
      </Button>
    </Link>
  );
}

export default function SidebarMenu() {
  return (
    <Paper>
      <SidebarMenuLink href='/' icon={<TransactionIcon />} title='Transactions' />
      <SidebarMenuLink disabled href='/categories' icon={<CategoryIcon />} title='Categories' />
      <SidebarMenuLink disabled href='/overview' icon={<OverviewIcon />} title='Overview' />
      <SidebarMenuLink disabled href='/debts' icon={<DebtIcon />} title='Debts' />
      <SidebarMenuLink disabled href='/budgets' icon={<BudgetIcon />} title='Budgets' />
      <SidebarMenuLink disabled href='/savings' icon={<SavingsIcon />} title='Savings' />
      <SidebarMenuLink disabled href='/events' icon={<EventIcon />} title='Events' />
      <SidebarMenuLink disabled href='/recurrences' icon={<RecurrenceIcon />} title='Recurrences' />
      <SidebarMenuLink disabled href='/models' icon={<ModelIcon />} title='Models' />
      <SidebarMenuLink disabled href='/places' icon={<PlaceIcon />} title='Places' />
      <SidebarMenuLink disabled href='/people' icon={<PeopleIcon />} title='People' />
      <Divider sx={{ m: 2 }} />
      <SidebarMenuLink disabled href='/calculator' icon={<CalculatorIcon />} title='Calculator' />
      <SidebarMenuLink disabled href='/converter' icon={<ConverterIcon />} title='Converter' />
      <SidebarMenuLink disabled href='/converter' icon={<ConverterIcon />} title='Converter' />
      <SidebarMenuLink disabled href='/search-atm' icon={<AtmIcon />} title='Search ATM' />
      <Divider sx={{ m: 2 }} />
      <SidebarMenuLink href='/settings' icon={<SettingsIcon />} title='Settings' />
      <SidebarMenuLink disabled href='/about' icon={<AboutIcon />} title='About' />
    </Paper>
  );
}
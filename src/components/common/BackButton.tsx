import { IconButton, IconButtonProps } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link, { LinkProps } from "next/link";

interface BackButtonProps extends LinkProps {
  iconButtonProps?: IconButtonProps;
  title?: string;
};
export default function BackButton({ iconButtonProps, ...props }: BackButtonProps) {
  return (
    <Link {...props} title={props.title}>
      <IconButton {...iconButtonProps} >
        <ArrowBackIcon />
      </IconButton>
    </Link>
  );
}
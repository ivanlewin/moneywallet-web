import { IconButton, IconButtonProps } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link, { LinkProps } from "next/link";

type BackButtonProps = LinkProps & {
  iconButtonProps?: IconButtonProps;
};
export default function BackButton({ iconButtonProps, ...props }: BackButtonProps) {
  return (
    <Link {...props}>
      <IconButton {...iconButtonProps} >
        <ArrowBackIcon />
      </IconButton>
    </Link>
  );
}
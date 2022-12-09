import { Avatar } from "@mui/material";
import type { Icon as IconType } from "types";

type IconProps = IconType & {

};
export default function Icon(props: IconProps) {
  if (props.type === 'color') {
    return (
      <Avatar sx={{ bgcolor: props.color }}>{props.name}</Avatar>
    );
  } else {
    return (
      // <Avatar sx={{ bgcolor: '#1976D2' }}>{'WA'}</Avatar>
      <Avatar>{props.resource}</Avatar>
    );
  }
}
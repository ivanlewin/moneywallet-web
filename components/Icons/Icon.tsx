import { Avatar, Icon as MUIIcon } from "@mui/material";
import type { Icon as IconType } from 'types/database';
import { iconMapping } from "./icon-mapping";

export default function Icon(props: IconType) {
  if (props.type === 'color') {
    return (
      <Avatar sx={{ bgcolor: props.color }}>{props.name}</Avatar>
    );
  } else {
    const icon = iconMapping[props.resource];
    if (icon) {
      return (
        <MUIIcon
          sx={{
            bgcolor: '#2196F3',
            color: '#FFF',
            height: 40,
            width: 40,
            p: '0.3em',
            listStyle: 'none',
            boxSizing: 'border-box',
            position: 'relative',
            flexShrink: 0,
            lineHeight: 1,
            borderRadius: '50%',
            overflow: 'hidden',
            userSelect: 'none',
          }}
        >
          {icon}
        </MUIIcon>
      );
    } else {
      return (
        <Avatar>{props.resource}</Avatar>
      );
    }
  }
}
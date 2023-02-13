import { Avatar, Icon as MUIIcon, SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";
import type { Icon as IconType } from 'types/database';
import { iconMapping } from "./icon-mapping";

export type IconProps = IconType & {
  onClick?: () => any;
  sx?: SxProps<Theme>;
  style?: CSSProperties;
};
export default function Icon({ ...props }: IconProps) {
  if (props.type === 'color') {
    return (
      <Avatar sx={{ bgcolor: props.color }} {...props}>{props.name}</Avatar>
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
          {...props}
        >
          {icon}
        </MUIIcon>
      );
    } else {
      return (
        <Avatar {...props}>{props.resource}</Avatar>
      );
    }
  }
}
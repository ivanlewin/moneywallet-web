import { Avatar, Icon as MUIIcon, SxProps, Theme, useTheme } from "@mui/material";
import { CSSProperties } from "react";
import type { Icon as IconType } from 'types/database';
import { iconMapping } from "./icon-mapping";

export type IconProps = IconType & {
  onClick?: () => any;
  sx?: SxProps<Theme>;
  style?: CSSProperties;
};
export default function Icon({ ...props }: IconProps) {
  const theme = useTheme();
  if (props.type === 'color') {
    return (
      <Avatar sx={{ bgcolor: props.color, color: theme.palette.getContrastText(props.color) }} {...props}>{props.name}</Avatar>
    );
  } else {
    const icon = iconMapping[props.resource];
    if (icon) {
      return (
        <MUIIcon
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
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
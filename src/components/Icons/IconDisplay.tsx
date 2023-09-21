import Icon, { IconProps } from 'components/Icons/Icon';
import { FALLBACK_ICON } from 'fixtures';
import React from 'react';
import { LegacyIconSchema } from 'schemas';

type IconDisplayProps = Partial<IconProps> & {
  icon?: string;
};
export default function IconDisplay({ icon, ...props }: IconDisplayProps) {
  const iconProps = React.useMemo(() => {
    if (!icon) {
      return FALLBACK_ICON;
    }
    try {
      const object = JSON.parse(icon);
      const parsed = LegacyIconSchema.parse(object);
      return parsed;
    } catch (error) {
      return FALLBACK_ICON;
    }
  }, [icon]);

  return (
    <Icon {...props} {...iconProps} />
  );
}
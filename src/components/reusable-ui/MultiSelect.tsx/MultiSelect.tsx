import { ComponentProps } from "react";
import Select from "react-select";

type MultiSelectProps = ComponentProps<typeof Select>;

export const MultiSelect = ({
  isMulti = true,
  ...otherProps
}: MultiSelectProps) => {
  return <Select {...otherProps} isMulti={isMulti} />;
};

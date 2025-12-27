import React from "react";
import styled from "styled-components";
import { MenuInputs, MenuInputsProps } from "../MenuForm/MenuInputs";
import ImagePreview from "../MenuForm/ImagePreview";

type MenuFormProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
} & MenuInputsProps;

const MenuForm = React.forwardRef<HTMLInputElement, MenuFormProps>(
  ({ menu, onSubmit, children, onChange, onFocus, onBlur }, ref) => {
    return (
      <MenuFormStyled onSubmit={onSubmit}>
        <ImagePreview imageSource={menu.imageSource} title={menu.title} />
        <MenuInputs
          menu={menu}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
        />
        <div className="form-footer">{children}</div>
      </MenuFormStyled>
    );
  }
);

export default MenuForm;

const MenuFormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(4, 1fr);
  height: 100%;
  width: 100%;
  grid-column-gap: 20px;
  grid-row-gap: 8px;

  .form-footer {
    grid-area: 4 / -2 / -1 / -1;
    display: flex;
    align-items: center;
    position: relative;
    top: 3px;
  }
`;

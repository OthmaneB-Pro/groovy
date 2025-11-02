import React from "react";
import TextInput from "@/components/reusable-ui/TextInput";
import SelectInput from "@/components/reusable-ui/SelectInput";
import styled from "styled-components";
import { getInputTextsConfig, getSelectInputConfig } from "./inputConfig";
import { Product } from "@/types/Product";
import { FormEvents } from "@/types/FormEvents";

export type InputsProps = {
  product: Product;
} & FormEvents;

export const Inputs = React.forwardRef<HTMLInputElement, InputsProps>(
  ({ product, onChange, onFocus, onBlur }, ref) => {
    const inputTexts = getInputTextsConfig(product);
    const inputSelects = getSelectInputConfig(product);

    return (
      <InputsStyled>
        {inputTexts.map((input) => (
          <TextInput
            {...input}
            key={input.id}
            onChange={onChange}
            version="minimalist"
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref && input.name === "title" ? ref : null}
          />
        ))}
        {inputSelects.map((inputSelect) => (
          <SelectInput
            {...inputSelect}
            key={inputSelect.id}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ))}
      </InputsStyled>
    );
  }
);

const InputsStyled = styled.div`
  grid-area: 1 / 2 / -2 / 3;

  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 8px;
  grid-column-gap: 8px;

  .title {
    grid-area: 1/1/2/4;
  }
  .image-source {
    grid-area: 1/4/2/7;
  }
  .categories {
    grid-area: 2/1/3/7;
  }
  .price {
    grid-area: 3/1/4/3;
  }
  .is-available {
    grid-area: 3/3/4/5;
  }
  .is-publicised {
    grid-area: 3/5/4/7;
  }
`;

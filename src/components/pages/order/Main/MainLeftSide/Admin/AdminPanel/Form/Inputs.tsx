import React from "react";
import TextInput from "@/components/reusable-ui/TextInput";
import SelectInput from "@/components/reusable-ui/SelectInput";
import styled from "styled-components";
import { getInputTextsConfig, getSelectInputConfig } from "./inputConfig";
import { Product } from "@/types/Product";
import { FormEvents } from "@/types/FormEvents";
import { MultiSelect } from "@/components/reusable-ui/MultiSelect.tsx/MultiSelect";
import { useOrderContext } from "@/context/OrderContext";
import { IoPricetag } from "react-icons/io5";
import { MultiValue } from "react-select";
import { Category } from "@/types/Category";
import { ADMIN_TAB_LABEL } from "@/constants/tabs";

export type InputsProps = {
  product: Product;
} & FormEvents;

export const Inputs = React.forwardRef<HTMLInputElement, InputsProps>(
  ({ product, onChange, onFocus, onBlur }, ref) => {
    const { categories, productSelected, newProduct, currentTabSelected } =
      useOrderContext();

    const inputTexts = getInputTextsConfig(product);
    const inputSelects = getSelectInputConfig(product);

    const onChangeMulti = (selectedCategories: MultiValue<Category>) => {
      const eventMulti = {
        target: {
          name: "categories",
          value: selectedCategories,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
      onChange && onChange(eventMulti);
    };

    return (
      <InputsStyled>
        <div className="first-row">
          <TextInput
            {...inputTexts[0]}
            onChange={onChange}
            version="minimalist"
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref && inputTexts[0].name === "title" ? ref : null}
          />
          <TextInput
            {...inputTexts[1]}
            onChange={onChange}
            version="minimalist"
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <div className="categories">
          <MultiSelect
            menuPlacement="auto"
            options={categories}
            onChange={onChangeMulti}
            customIcon={IoPricetag}
            placeholder="Catégorie (ex: Boisson)"
            value={
              currentTabSelected === ADMIN_TAB_LABEL.ADD
                ? newProduct.categories
                : productSelected.categories
            }
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <TextInput
          {...inputTexts[2]}
          onChange={onChange}
          version="minimalist"
          onFocus={onFocus}
          onBlur={onBlur}
        />

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
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 8px;
  grid-column-gap: 8px;

  .first-row {
    grid-area: 1/1/2/4;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 8px;

    .title {
      grid-template-areas: 1/1/2/2;
    }

    .image-source {
      grid-template-areas: 1/2/-1/-1;
      min-width: 0;
    }
  }

  .categories {
    grid-area: 2/1/-3/-1;
  }

  .price {
    grid-area: 3/1/4/2;
  }
`;

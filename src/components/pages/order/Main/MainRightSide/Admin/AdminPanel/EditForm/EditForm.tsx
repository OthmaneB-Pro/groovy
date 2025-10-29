import { useState } from "react";
import { useOrderContext } from "@/context/OrderContext";
import Form from "../Form/Form";
import EditInfoMessage from "./EditInfoMessage";
import SavingMessage from "./SavingMessage";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import { useParams } from "react-router-dom";

export default function EditForm() {
  const { productSelected, setProductSelected, handleEdit, titleEditRef } =
    useOrderContext();
  const { username } = useParams();
  const [valueOnFocus, setValueOnFocus] = useState<string>();
  const { isSubmitted: isSaved, displaySuccessMessage } = useSuccessMessage();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    const productBeingUpdated = {
      ...productSelected,
      [name]: value,
    };

    setProductSelected(productBeingUpdated);
    username && handleEdit(productBeingUpdated, username);
  };

  const handleOnFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement, Element>
  ) => {
    const valueOnFocus = event.target.value;
    setValueOnFocus(valueOnFocus);
  };

  const handleOnBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement, Element>
  ) => {
    const valueOnBlur = event.target.value;
    if (valueOnFocus !== valueOnBlur) {
      console.log("ça a changé !!");
      displaySuccessMessage();
    }
  };

  return (
    <Form
      product={productSelected}
      onChange={handleChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      ref={titleEditRef}
    >
      {isSaved ? <SavingMessage /> : <EditInfoMessage />}
    </Form>
  );
}

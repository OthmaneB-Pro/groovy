import { useOrderContext } from "@/context/OrderContext";
import { EMPTY_PRODUCT } from "@/constants/product";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import { replaceFrenchCommaWithDot } from "@/utils/maths";
import Form from "../Form/Form";
import SubmitButton from "./SubmitButton";
import { useParams } from "react-router-dom";

export default function AddForm() {
  const { handleAdd, newProduct, setNewProduct } = useOrderContext();
  const { isSubmitted, displaySuccessMessage } = useSuccessMessage();

  const { username } = useParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username) return;
    const newProductToAdd = {
      ...newProduct,
      id: crypto.randomUUID(),
      price: replaceFrenchCommaWithDot(newProduct.price),
    };
    handleAdd(newProductToAdd, username);
    setNewProduct(EMPTY_PRODUCT);

    displaySuccessMessage();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <Form product={newProduct} onSubmit={handleSubmit} onChange={handleChange}>
      <SubmitButton
        label="Ajouter un nouveau produit au menu"
        isSubmitted={isSubmitted}
      />
    </Form>
  );
}

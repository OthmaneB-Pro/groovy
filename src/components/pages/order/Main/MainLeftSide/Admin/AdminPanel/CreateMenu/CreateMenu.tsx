import { useParams } from "react-router-dom";
import SubmitButton from "../AddForm/SubmitButton";
import { useOrderContext } from "@/context/OrderContext";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import { replaceFrenchCommaWithDot } from "@/utils/maths";
import Form from "../Form/Form";
import { fakeCategories } from "@/fakeData/fakeCategories";
import { CATEGORY_MENUS, EMPTY_MENU } from "@/constants/menus";

export default function CreateMenu() {
  const { handleAddMenu, newMenu, setNewMenu } = useOrderContext();
  const { isSubmitted, displaySuccessMessage } = useSuccessMessage();

  const { username } = useParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username) return;
    const newMenuToAdd = {
      ...newMenu,
      id: crypto.randomUUID(),
      price: replaceFrenchCommaWithDot(newMenu.price),
      categories: [CATEGORY_MENUS],
      products: [
        {
          id: "1",
          imageSource: "https://www.tacosgratines.com/produit/2093_105.png",
          title: "Burger Maison",
          price: 5.297,
          quantity: 0,
          isAvailable: true,
          isPublicised: false,
          categories: [fakeCategories.LARGE[0]],
        },
      ],
    };
    handleAddMenu(newMenuToAdd);
    setNewMenu(EMPTY_MENU);

    displaySuccessMessage();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewMenu({ ...newMenu, [name]: value });
  };

  return (
    <Form product={newMenu} onSubmit={handleSubmit} onChange={handleChange}>
      <SubmitButton
        label="Ajouter un nouveau menu"
        isSubmitted={isSubmitted}
      />
    </Form>
  );
}

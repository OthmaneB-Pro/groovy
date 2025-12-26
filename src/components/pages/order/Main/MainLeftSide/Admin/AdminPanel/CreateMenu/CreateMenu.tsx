import { useParams } from "react-router-dom";
import SubmitButton from "../AddForm/SubmitButton";
import { useOrderContext } from "@/context/OrderContext";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import { replaceFrenchCommaWithDot } from "@/utils/maths";
import { CATEGORY_MENUS, EMPTY_MENU } from "@/constants/menus";
import MenuForm from "../MenuForm/MenuForm";

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
    };
    handleAddMenu(username, newMenuToAdd);
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
    <MenuForm product={newMenu} onSubmit={handleSubmit} onChange={handleChange}>
      <SubmitButton label="Ajouter un nouveau menu" isSubmitted={isSubmitted} />
    </MenuForm>
  );
}

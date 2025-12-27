import { useParams } from "react-router-dom";
import SubmitButton from "../AddForm/SubmitButton";
import { useOrderContext } from "@/context/OrderContext";
import { useSuccessMessage } from "@/hooks/useSuccessMessage";
import { replaceFrenchCommaWithDot } from "@/utils/maths";
import { EMPTY_MENU } from "@/constants/menus";
import MenuForm from "../MenuForm/MenuForm";
import { getCategoriesFromMenuProducts, getMenuPrice } from "./helper";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { Menu } from "@/types/Menu";

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
    };
    handleAddMenu(username, newMenuToAdd);
    setNewMenu(EMPTY_MENU);

    displaySuccessMessage();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = event.target;

    let menuPrice: number = newMenu.price;
    let menuCategories: Category[] = newMenu.categories || [];

    if (name === "products") {
      menuPrice = getMenuPrice(value as unknown as Product[]);
      menuCategories = getCategoriesFromMenuProducts(
        value as unknown as Product[]
      );
    }

    if (name === "price") {
      menuPrice = value as unknown as number; // car "value" (de event.target) est par défaut TOUJOURS de type string (même si c'est pas vrai dans la vraie vie)
    }

    const newMenuToAdd: Menu = {
      ...newMenu,
      [name]: value,
      price: menuPrice,
      categories: menuCategories,
    };

    setNewMenu(newMenuToAdd);
  };

  return (
    <MenuForm menu={newMenu} onSubmit={handleSubmit} onChange={handleChange}>
      <SubmitButton label="Ajouter un nouveau menu" isSubmitted={isSubmitted} />
    </MenuForm>
  );
}

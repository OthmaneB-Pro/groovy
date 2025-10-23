import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { useMenu } from "@/hooks/useMenu";
import { useBasket } from "@/hooks/useBasket";
import { findObjectById } from "@/utils/array";
import { EMPTY_PRODUCT } from "@/constants/product";
import { BasketProductQuantity, MenuProduct } from "@/types/Product";
import { ADMIN_TAB_LABEL } from "@/constants/tabs";

type OrderContextType = {
  isModeAdmin: boolean;
  setIsModeAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  currentTabSelected: ADMIN_TAB_LABEL;
  setCurrentTabSelected: React.Dispatch<React.SetStateAction<ADMIN_TAB_LABEL>>;
  menu: MenuProduct[] | undefined;
  handleAdd: (newProduct: MenuProduct, username: string) => void;
  handleDelete: (idOfProductToDelete: string, username: string) => void;
  handleEdit: (productBeingEdited: MenuProduct, username: string) => void;
  resetMenu: (username: string) => void;
  newProduct: MenuProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<MenuProduct>>;
  productSelected: MenuProduct;
  setProductSelected: React.Dispatch<React.SetStateAction<MenuProduct>>;
  handleProductSelected: (idProductClicked: string) => Promise<void>;
  titleEditRef: React.RefObject<HTMLInputElement>;
  basket: BasketProductQuantity[];
  handleAddToBasket: (idProductToAdd: string, username: string) => void;
  handleDeleteBasketProduct: (
    idBasketProduct: string,
    username: string
  ) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderContextProvider = ({ children }: PropsWithChildren) => {
  const [isModeAdmin, setIsModeAdmin] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTabSelected, setCurrentTabSelected] = useState<ADMIN_TAB_LABEL>(
    ADMIN_TAB_LABEL.ADD
  );
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
  const [productSelected, setProductSelected] = useState(EMPTY_PRODUCT);
  const titleEditRef = useRef<HTMLInputElement>(null);
  const { menu, setMenu, handleAdd, handleDelete, handleEdit, resetMenu } =
    useMenu();
  const { basket, setBasket, handleAddToBasket, handleDeleteBasketProduct } =
    useBasket();

  const handleProductSelected = async (idProductClicked: string) => {
    if (!menu) return;
    const productClickedOn = findObjectById(idProductClicked, menu);
    if (!productClickedOn) return;
    await setIsCollapsed(false);
    await setCurrentTabSelected(ADMIN_TAB_LABEL.EDIT);
    await setProductSelected(productClickedOn);
    titleEditRef.current?.focus();
  };

  const orderContextValue = {
    isModeAdmin,
    setIsModeAdmin,
    isCollapsed,
    setIsCollapsed,
    currentTabSelected,
    setCurrentTabSelected,
    menu,
    setMenu,
    handleAdd,
    handleDelete,
    resetMenu,
    newProduct,
    setNewProduct,
    productSelected,
    setProductSelected,
    handleEdit,
    titleEditRef,
    basket,
    setBasket,
    handleAddToBasket,
    handleDeleteBasketProduct,
    handleProductSelected,
  };

  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);

import { MdQuestionMark } from "react-icons/md";
import { FaHamburger } from "react-icons/fa";
import { RiDrinks2Line } from "react-icons/ri";
import { LuSalad, LuCakeSlice } from "react-icons/lu";
import { GiChocolateBar } from "react-icons/gi";
import { CiFries } from "react-icons/ci";
import { BsCupHotFill } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { IconName } from "@/types/Category";

export const getCategoryIcon = (iconName: IconName): IconType | null => {
  if (iconName === "sandwich") return FaHamburger;
  if (iconName === "verre") return RiDrinks2Line;
  if (iconName === "veggies") return LuSalad;
  if (iconName === "dessert") return LuCakeSlice;
  if (iconName === "frites") return CiFries;
  if (iconName === "chocolateBar") return GiChocolateBar;
  if (iconName === "tasse chaude") return BsCupHotFill;
  if (iconName === "menu") return IoFastFoodOutline;
  if (iconName === "") return null;
  return MdQuestionMark;
};

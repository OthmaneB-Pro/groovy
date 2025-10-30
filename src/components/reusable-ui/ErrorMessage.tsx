import { theme } from "@/theme";
import styled from "styled-components";

export default function ErrorMessage({ error }: { error: string | null }) {
  return <ErrorMessageStyled>{error}</ErrorMessageStyled>;
}

const ErrorMessageStyled = styled.p`
  color: ${theme.colors.red};
  font-family: ${theme.fonts.family.openSans};
  font-size: ${theme.fonts.size.P0};
  line-height: 100%;
`;

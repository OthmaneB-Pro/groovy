import styled from "styled-components";

export default function ContentLogin() {
  return (
    <ContentLoginStyled>
      <p>© 2025 Groovy Burger — Tous droits réservés.</p>
      <p>Made with ❤️ by Othmane</p>
    </ContentLoginStyled>
  );
}

const ContentLoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50px;
  width: 100%;
  gap: 10px;
  p {
    font-family: Open Sans;
    font-size: 15px;
    line-height: 100%;
    color: white;
    margin: 0px;
    box-shadow: (0, 0, 0, 0.2);
  }
`;

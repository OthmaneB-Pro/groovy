import styled from "styled-components";
import Logo from "@/components/reusable-ui/Logo";
import LoginForm from "./LoginForm";
import ContentLogin from "./ContentLogin";

export default function LoginPage() {
  return (
    <LoginPageStyled>
      <div className="login">
        <Logo className={"logo-login-page"} />
        <LoginForm />
      </div>
      <ContentLogin />
    </LoginPageStyled>
  );
}

const LoginPageStyled = styled.div`
  .login {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 700px;
    position: relative;
    top: 10vh;
  }

  content: "";
  background: url("/images/burger-right.jpg") rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-position: center;
  background-blend-mode: darken;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  .logo-login-page {
    transform: scale(2.5);
  }
`;

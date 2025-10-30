import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoChevronForward } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import Welcome from "./Welcome";
import { authenticateUser } from "@/api/user";
import TextInput from "@/components/reusable-ui/TextInput";
import { theme } from "@/theme";
import Button from "@/components/reusable-ui/Button";
import { UserSchema } from "./userSchema";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const zodUsername = UserSchema.safeParse({ username });
    if (!zodUsername.success) setError(zodUsername.error.issues[0].message);
    else {
      const userReceived = await authenticateUser(username);
      setIsLoading(true);

      setTimeout(() => {
        setUsername("");
        navigate(`order/${userReceived.username}`);
      }, 2000);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <LoginFormStyled action="submit" onSubmit={handleSubmit}>
      <Welcome />
      <div>
        <TextInput
          value={username}
          onChange={handleChange}
          placeholder={"Votre prénom"}
          Icon={<BsPersonCircle />}
          className="input-login"
          version="normal"
        />
        {error && <p>{error}</p>}
        <Button
          label={"Accéder à mon espace"}
          disabled={isLoading}
          isLoading={isLoading}
          Icon={<IoChevronForward />}
        />
      </div>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.form`
  text-align: center;
  max-width: 500px;
  min-width: 400px;
  margin: 0px auto;
  padding: 40px ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.round};
  font-family: "Amatic SC", cursive;

  hr {
    border: 1.5px solid ${theme.colors.loginLine};
    margin-bottom: ${theme.gridUnit * 5}px;
  }

  h1 {
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.P5};
  }

  h2 {
    margin: 20px 10px 10px;
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.P4};
  }

  .input-login {
    margin: 18px 0;
  }
  button {
    svg {
      width: 25px;
    }
  }
  p {
    color: ${theme.colors.red};
    font-family: ${theme.fonts.family.openSans};
    font-size: ${theme.fonts.size.P0};
    line-height: 100%;
  }
`;

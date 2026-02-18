import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { IconEye, IconEyeOff } from "../icon/icons";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MOCK_LOGIN, MOCK_PASSWORD } from "../mock/mock";
import { MOCK_USERID } from "../mock/mock";

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{6,}$/;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 10px;

  input {
    padding: 12px 16px;
    font-size: 16px;
    outline: none;
  }

  label {
    top: -10px;
    left: 8px;
    color: #a2acb0;
    font-weight: 600;
    font-size: 15px;
    line-height: 147%;
    letter-spacing: 0.01em;
  }
`;

const InputWrapper = styled.div<{ error: boolean }>`
  width: 100%;
  position: relative;
  margin-bottom: 20px;

  input {
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.01em;
    border: 2px solid rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    12px 16px;
    margin-bottom: 8px;
  }

  label {
    position: absolute;
    left: 16px;
    top: 19px;
    color: #e6e6e6;
    background: #fff;
    padding: 0 4px;
    font-size: 16px;
    pointer-events: none;
    transition: 0.2s;
    z-index: 1;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    top: -10px;
    left: 8px;
    color: #007AFF;
    font-weight: 600;
    font-size: 15px;
    line-height: 147%;
    letter-spacing: 0.01em;
  }
 
  input:focus {
    border-color: #007AFF;
  }

  input:-webkit-autofill + label,
  input:-moz-autofill + label {
    top: 6px;
    transform: none;
    font-size: 12px;
    color: #555;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition:
      background-color 9999s ease-in-out 0s,
      color 9999s ease-in-out 0s;
    -webkit-text-fill-color: #000 !important;
  }

  ${({ error }) =>
    error &&
    css`
      input {
        border-color: #e53935 !important;
        border-width: 2px !important;
      }

      input:focus {
        border-color: #e53935 !important;
      }

      label {
        color: #e53935 !important;
      }
    `}
`;

const InputHint = styled.div`
  position: static;
  color: #e53935;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 8px;
  background: none;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  min-width: 0;
  max-width: 100%;
  opacity: 1;
  transition: opacity 0.2s;
  word-break: break-word;
  text-align: center;
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 24px;
  display: flex;
  justify-content: center;
  background: ${({ disabled }) => (disabled ? "#b3d1ff" : "#007aff")};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 15px 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 17px;
  line-height: 153%;
  letter-spacing: 0.01em;
  text-align: center;
  color: #fff;
  border: 1px solid #e6e6e6;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;
  pointer-events: auto;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 18px;
  color: #a2acb0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &:hover {
    color: #646cff;
  }

  &:focus {
    outline: none;
  }
`;

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const navigate = useNavigate();
  const { fetchUserProfile } = useUser();

  const isFormFilled = login.trim() !== "" && password.trim() !== "";

  // Валидация полей
  const validate = () => {
    let valid = true;
    
    // Сброс ошибок при новой попытке
    setLoginError(false);
    setPasswordError(false);
    setIsAuthError(false);
    setAuthMessage("");

    if (!emailRegex.test(login)) {
      setLoginError(true);
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      valid = false;
    }

    return valid;
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;

    // Сначала проверяем валидацию
    if (!validate()) return;

    // Если валидация прошла, проверяем авторизацию
    if (login === MOCK_LOGIN && password === MOCK_PASSWORD) {
      await fetchUserProfile(MOCK_USERID);
      navigate("/account");
    } else {
      setIsAuthError(true);
      setAuthMessage("Неверный логин или пароль");
    }
  };

  // Обработчики изменения полей
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    if (loginError) setLoginError(false);
    if (isAuthError) {
      setIsAuthError(false);
      setAuthMessage("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(false);
    if (isAuthError) {
      setIsAuthError(false);
      setAuthMessage("");
    }
  };

  return (
    <LoginContainer>
      <Form id="login-form" onSubmit={handleSubmit}>
        {/* ловушки для автозаполнения — не мешают сабмиту и не совпадают по name */}
        <input
          type="text"
          autoComplete="username"
          tabIndex={-1}
          style={{
            position: "absolute",
            left: "-9999px",
            height: 0,
            width: 0,
            opacity: 0,
          }}
        />
        <input
          type="password"
          autoComplete="current-password"
          tabIndex={-1}
          style={{
            position: "absolute",
            left: "-9999px",
            height: 0,
            width: 0,
            opacity: 0,
          }}
        />

        {/* Логин */}
        <div className="form-group">
          <InputWrapper error={loginError}>
            <input
              type="email"
              id="login"
              name="login"
              autoComplete="off"
              value={login}
              onChange={handleLoginChange}
              required
              placeholder=" "
            />
            <label htmlFor="login">Логин</label>
          </InputWrapper>
        </div>

        {/* Пароль */}
        <div className="form-group">
          <InputWrapper error={passwordError}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder=" "
            />
            <label htmlFor="password">Пароль</label>
            {/* Кнопка-глаз */}
            <EyeButton
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? <IconEye /> : <IconEyeOff />}
            </EyeButton>
          </InputWrapper>
        </div>

        {/* Сообщение об ошибке авторизации */}
        {authMessage && <InputHint>{authMessage}</InputHint>}

        {/* Кнопка входа */}
        <SubmitButton type="submit" disabled={!isFormFilled}>
          Войти
        </SubmitButton>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;
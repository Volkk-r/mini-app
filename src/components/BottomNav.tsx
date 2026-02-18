import { useNavigate, useLocation } from "react-router-dom";
import * as S from "../styles/styles.BottomNav";
import { IconChannel, IconAddHome, IconPerson } from "../icon/icons";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <S.BottomNav>
      <S.NavItem
        onClick={() => navigate("/allEvents")}
        active={isActive("/allEvents")}
      >
        <span role="img" aria-label="events">
          <IconAddHome color={isActive("/allEvents") ? "blue" : "gray"} />
        </span>
        <div>Все ивенты</div>
      </S.NavItem>

      <S.NavItem onClick={() => navigate("/my")} active={isActive("/my")}>
        <span role="img" aria-label="my-events">
          <IconChannel color={isActive("/my") ? "blue" : "gray"} />
        </span>
        <div>Мои ивенты</div>
      </S.NavItem>

      <S.NavItem
        onClick={() => navigate("/account")}
        active={isActive("/account")}
      >
        <span role="img" aria-label="account">
          <IconPerson color={isActive("/account") ? "blue" : "gray"} />
        </span>
        <div>Аккаунт</div>
      </S.NavItem>
    </S.BottomNav>
  );
}

export default BottomNav;

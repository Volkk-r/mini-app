import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  showClose?: boolean;
}

export default function Header({
  title,
  onMenuClick,
  showClose = true,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      {showClose && <CloseButton onClick={() => navigate(-1)}>×</CloseButton>}
      <Title>{title}</Title>
      <MenuButton onClick={onMenuClick}>⋯</MenuButton>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 56px;
  background: #ffffff;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #d0d0d0;
  z-index:999;
`;

const CloseButton = styled.button`
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  color: #333333;
  font-size: 32px;         
  font-weight: 400;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

`;

const Title = styled.h1`
  margin: 0;
  flex: 1;
  font-size: 19px;      
  font-weight: 600;
  color: #333333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MenuButton = styled.button`
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  color: #333333;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

`;
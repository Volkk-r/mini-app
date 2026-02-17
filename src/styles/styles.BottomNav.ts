import styled from "@emotion/styled";

export const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
`;

export const NavItem = styled.div<{ active: boolean }>`
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ active }) => (active ? "#007AFF" : "#A2ACB0")};
  font-size: 13px;
  font-weight: 500;
  gap: 2px;
  transition: color 0.2s;
`;

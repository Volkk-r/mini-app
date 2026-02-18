import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px;
  background: #fff;
`;

export const Header = styled.div<{ background: string }>`
  height: 256px;
  position: relative;
  z-index: 1;
  background-image: ${({ background }) => background};
`;

export const Grid = styled.div`
  position: relative;
  z-index: 10;
  border-radius: 40px 40px 0 0;
`;

export const Card = styled.div`
  max-width: 600px;
  margin: -24px auto 0 auto;
  border-radius: 20px;
  overflow: hidden;
`;

export const Info = styled.div`
  background: #fff;
  padding: 16px 14px 16px 14px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 590;
  margin-bottom: 8px;
`;

export const ChipsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const Chip = styled.span<{ muted?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  background: ${({ muted }) => (muted ? "#EFEFF4" : "#F1F1F4")};
  color: #666;
`;

export const Description = styled.div`
  font-size: 15px;
  line-height: 22px;
  color: #707579;
  margin-bottom: 16px;
`;

export const CtaButton = styled.button<{
  background: string;
  disabled?: boolean;
}>`
  display: block;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background-image: ${({ background }) => background};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

export const NotFoundContainer = styled.div`
  padding: 16px;
`;

export const BackButton = styled.button`
  color: #1e90ff;
  border: none;
  font-weight: 600;
  margin-bottom: 16px;
  background: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  cursor: pointer;
`;

export const NotFoundMessage = styled.div`
  margin-top: 16px;
`;

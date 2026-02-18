import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const AllEventsContainer = styled.div`
  font-family: "Roboto", Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 70px;
`;

export const Banner = styled.div`
  position: relative;
  height: 350px;
  margin: 10px 16px 16px;
  overflow: hidden;
`;

export const BannerCarousel = styled.div<{ transition: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  transition: ${({ transition }) =>
    transition ? "transform 0.5s ease-in-out" : "none"};
`;

export const BannerSlide = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  background: #3596ff;
  border-radius: 20px;
  margin-right: 20px;
`;

export const BannerContent = styled.div`
  position: relative;
  width: 100%;
  padding: 48px 16px 16px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  gap: 20px;
`;

export const SeeAllButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 0;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 25px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #f8f9fa;
  }
`;

export const SliderDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 4;
`;

export const Dot = styled.span<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  opacity: ${({ active }) => (active ? 1 : 0.4)};
  display: inline-block;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const Section = styled.div<{ first?: boolean; empty?: boolean }>`
  padding: 0 16px;
  margin-top: ${({ first }) => (first ? "24px" : "0")};

  ${({ empty }) =>
    empty &&
    css`
      margin-top: 0;
      padding-bottom: 0;
    `}
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const sectionTitleStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const BtnEvent = styled.button`
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

export const EventsList = styled.div<{ empty?: boolean; bg?: string }>`
  display: ${({ empty }) => (empty ? "block" : "flex")};
  gap: 20px;
  overflow-x: ${({ empty }) => (empty ? "visible" : "auto")};
  padding-bottom: ${({ empty }) => (empty ? "0" : "16px")};
  scroll-behavior: smooth;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const EmptyPlaceholder = styled.div`
  color: #aaa;
  padding: 8px 0;
  width: 100%;
  text-align: center;
  font-size: 1rem;
`;

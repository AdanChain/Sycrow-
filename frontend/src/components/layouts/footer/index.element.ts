import styled from 'styled-components';

// Define an interface for potential color props
interface ColorProps {
  bgColorLight?: string;
  textColor?: string;
  borderColor?: string;
}

export const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.5px;
  // position: fixed;
  // width: 100%;
  // top: 0;
  // left: 0;
  // right: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => `${theme.space.sm} 0`};
`;

export const CopyrightText = styled.p`
  margin: 0;
  text-align: center;
  // Opacity isn't a color, but could be parameterized if needed
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

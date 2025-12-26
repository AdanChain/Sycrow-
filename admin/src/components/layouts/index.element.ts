import styled from 'styled-components';

const LayoutComponent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.backgroundLight} 100%
  );
  background-size: cover;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../assets/backgrounds/bg1.jpg') no-repeat center center fixed;
    background-size: cover;
    opacity: 0.2;
    z-index: -1;
  }
`;

export { LayoutComponent };

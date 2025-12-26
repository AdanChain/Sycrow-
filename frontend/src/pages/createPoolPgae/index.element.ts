import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  // max-width: 850px;
  // margin: 2rem auto;
  // background: ${({ theme }) => `${theme.colors.backgroundTransparent}`};
  // border-radius: ${({ theme }) => theme.borderRadius.large};
  // border: 1px solid ${({ theme }) => theme.colors.border};
  // box-shadow: ${({ theme }) => theme.shadows.medium};
  // backdrop-filter: blur(12px);
  transition: all 0.3s ease;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space.xl};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const Input = styled.input`
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.md}`};
  background: ${({ theme }) => theme.colors.backgroundTransparent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}33`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.7;
  }
`;

export const Button = styled.button`
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.xxl}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.8px;
  min-width: 200px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-3px);
    box-shadow: 0 6px 15px ${({ theme }) => `${theme.colors.primary}4D`};
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px ${({ theme }) => `${theme.colors.primary}33`};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.md};
  justify-content: center;
  flex-wrap: wrap;
`;

export const InfoContainer = styled.div`
  background: ${({ theme }) => `${theme.colors.backgroundTransparent}cc`};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    border-color: ${({ theme }) => `${theme.colors.primary}66`};
  }
`;

export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => `${theme.space.sm} 0`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    background: ${({ theme }) => `${theme.colors.primary}1A`};
    padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    transition: all 0.2s ease;
    
    &:hover {
      background: ${({ theme }) => `${theme.colors.primary}33`};
    }
  }
`;

export const FormSection = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SmallText = styled.small`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
`;

export const RewardConfig = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TotalRewardContainer = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => `${theme.colors.primary}1A`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`; 
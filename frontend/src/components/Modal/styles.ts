import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    background: ${({ theme }) => theme.colors.backgroundLight};
    padding: ${({ theme }) => theme.space.xl};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    position: relative;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideIn 0.3s ease-out;
    box-shadow: ${({ theme }) => theme.shadows.large};
    border: 1px solid ${({ theme }) => theme.colors.border};

    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: ${({ theme }) => theme.space.md};
    right: ${({ theme }) => theme.space.md};
    background: none;
    border: none;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: ${({ theme }) => theme.space.sm};
    line-height: 1;
    
    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
`; 
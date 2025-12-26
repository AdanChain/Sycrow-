import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from './Modal';
import usePools from '../../hooks/usePool';

const ModalTitle = styled.h2`
    margin: 0;
    padding: ${({ theme }) => theme.space.lg};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
`;

const Content = styled.div`
    padding: ${({ theme }) => theme.space.lg};
`;

const InputGroup = styled.div`
    margin-bottom: ${({ theme }) => theme.space.md};
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.xs};
    justify-content: space-evenly;
    align-items: center;
`;

const Label = styled.label`
    display: block;
    margin-bottom: ${({ theme }) => theme.space.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
    width: 60%;
    padding: ${({ theme }) => theme.space.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.space.sm};
    padding: ${({ theme }) => theme.space.lg};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
    padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    
    ${({ variant, theme }) => variant === 'primary' ? `
        background: ${theme.colors.primary};
        color: white;
        
        &:hover {
            background: ${theme.colors.primaryDark};
        }
    ` : `
        background: ${theme.colors.backgroundLight};
        color: ${theme.colors.text};
        
        &:hover {
            background: ${theme.colors.backgroundTransparent};
        }
    `}
`;


export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.lg};
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto ${({ theme }) => theme.space.lg};

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.colors.border};
    transition: all 0.3s ease;
  }

  .logo-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading-spinner {
      width: 30px;
      height: 30px;
      border: 3px solid ${({ theme }) => theme.colors.background};
      border-top-color: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  .avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.5);
    }
  }

  .avatar-edit-btn {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
      transform: translateY(-1px);
    }

    &:disabled {
      background: ${({ theme }) => theme.colors.border};
      cursor: not-allowed;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LogoText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: ${({ theme }) => theme.space.md};
  cursor: pointer;
  text-decoration: underline;
  display: inline-block;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const TokenEditModal: any = (props: any) => {

    const { isOpen, onClose } = props;
    const { addTokenLogo } = usePools();

    const [image, setImage] = useState<FormData | null>(null);
    const [isLogoUploading, setIsLogoUploading] = useState(false);
    const [tokenAddress, setTokenAddress] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string>('/default-token.jpg');
    
    // Clean up preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl !== '/default-token.jpg') {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);
    
    const updateLogo = async () => {
        if (!!image) {
            setIsLogoUploading(true);
            try {
                await addTokenLogo(image);  
            } finally {
                setIsLogoUploading(false);
                setImage(null);
                // Reset preview to default after successful upload
                setPreviewUrl('/default-token.jpg');
            }
        }
    }

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const formData = new FormData();
        if (file) {
            formData.append("image", file);
            formData.append("tokenAddress", tokenAddress);
            setImage(formData);
            
            // Create preview URL for the selected image
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };
  
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalTitle>Add Logo</ModalTitle>
            <Content>
                <InputGroup>
                    <Label>Token Address</Label>
                    <Input
                        type="text"
                        onChange={(e) => setTokenAddress(e.target.value)}
                    />
                </InputGroup>
                <LogoWrapper>
                    <img src={previewUrl} alt="Token logo preview" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        id="logo-upload"
                        hidden
                    />
                    {isLogoUploading && (
                        <div className="logo-loading-overlay">
                            <div className="loading-spinner" />
                        </div>
                    )}
                    <div className="avatar-overlay">
                        <button
                            className="avatar-edit-btn"
                            onClick={() => document.getElementById('logo-upload')?.click()}
                            disabled={isLogoUploading}
                        >
                            {isLogoUploading ? 'Uploading...' : 'Change'}
                        </button>
                    </div>
                </LogoWrapper>
            </Content>
            <ButtonGroup>
                <Button type="button" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="button" variant="primary" onClick={updateLogo}>
                    Save Changes
                </Button>
            </ButtonGroup>
        </Modal>
    );
};

export default TokenEditModal; 
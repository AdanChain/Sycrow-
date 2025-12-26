import React, { useEffect, useState } from 'react';
import {
    Container,
    Title,
    Input,
    Button,
    InfoText,
    Form,
    FormSection,
    TimeGrid,
    InputGroup,
    TotalRewardContainer,
    ButtonContainer
} from './index.element';
import { toast } from 'react-toastify';
import useContract from '../../hooks/useContract';

const CreatePoolPage = () => {

    const { createPool, getBlockTime } = useContract();

    const [startBlock, setStartBlock] = useState(0);
    const [endBlock, setEndBlock] = useState(0);
    const [endDateTime, setEndDateTime] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [rewardPerBlock, setRewardPerBlock] = useState("");
    const [lpTokenAddress, setLpTokenAddress] = useState('');
    const [rewardTokenAddress, setRewardTokenAddress] = useState('');
    const [totalRewardTokensNeeded, setTotalRewardTokensNeeded] = useState(0);
    const [mintSpeed, setMintSpeed] = useState(0);
    const [currentBlockNumber, setCurrentBlockNumber] = useState(0);

    useEffect(() => {
        calculateStartAndEndBlock();
    }, [startDateTime, endDateTime, rewardPerBlock])

    const convertDateTimeToBlock = async (dateTime: string) => {
        if (!dateTime || !mintSpeed || !currentBlockNumber) return 0;
        const targetTime = await new Date(dateTime).getTime();
        const currentTime = await Date.now();
        const timeDiff = await targetTime - currentTime;
        const blocksDiff = await Math.floor(timeDiff / (mintSpeed * 1000));
        return currentBlockNumber + blocksDiff;
    };

    const calculateStartAndEndBlock = async () => {
        const { mintSpeed, currentBlockNumber } = await getBlockTime();
        setMintSpeed(mintSpeed);
        setCurrentBlockNumber(currentBlockNumber);
        const startBlock = await convertDateTimeToBlock(startDateTime);
        console.log("startBlock", startBlock);
        const endBlock = await convertDateTimeToBlock(endDateTime);
        console.log("endBlock", endBlock);
        setStartBlock(startBlock);
        setEndBlock(endBlock);
        if (rewardPerBlock) {
            setTotalRewardTokensNeeded(parseInt(rewardPerBlock) * (endBlock - startBlock));
        }
    }

    const handleCreatePool = async () => {
        if (!startDateTime || !endDateTime || !rewardPerBlock || !rewardTokenAddress || !lpTokenAddress) {
            toast.error("Please fill all the fields");
            return;
        }

        if (startBlock >= endBlock) {
            toast.error("Start time must be before end time");
            return;
        }

        if (parseInt(rewardPerBlock) <= 0) {
            toast.error("Reward per block must be greater than 0");
            return;
        }

        const config: FarmingPoolConfig = {
            startBlock,
            endBlock,
            rewardRate: parseInt(rewardPerBlock),
            rewardTokenAddress: rewardTokenAddress,
            lpTokenAddress: lpTokenAddress,
        }
        console.log("config", config);
        await createPool(config);
    }

    return (
        <Container>
            <Title>Create Farming Pool</Title>
            <Form>
                <FormSection>
                    <TimeGrid>
                        <InputGroup>
                            <InfoText>Start Date</InfoText>
                            <Input
                                type="datetime-local"
                                name="startDateTime"
                                value={startDateTime}
                                onChange={(e) => setStartDateTime(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InfoText>End Date</InfoText>
                            <Input
                                type="datetime-local"
                                name="endDateTime"
                                value={endDateTime}
                                onChange={(e) => setEndDateTime(e.target.value)}
                            />
                        </InputGroup>
                    </TimeGrid>
                </FormSection>

                <FormSection>
                        <InputGroup>
                            <InfoText>Reward Per Block</InfoText>
                            <Input
                                type="text"
                                name="rewardPerBlock"
                                placeholder="e.g. 100"
                                value={rewardPerBlock}
                                onChange={(e) => setRewardPerBlock(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InfoText>Reward Token Address</InfoText>
                            <Input
                                type="text"
                                name="rewardTokenAddress"
                                placeholder="0x..."
                                value={rewardTokenAddress}
                                onChange={(e) => setRewardTokenAddress(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                        <InfoText>LP Token Address</InfoText>
                        <Input
                            type="text"
                            name="lpTokenAddress"
                            placeholder="0x..."
                            value={lpTokenAddress}
                            onChange={(e) => setLpTokenAddress(e.target.value)}
                        />
                    </InputGroup>
                </FormSection>

                {startDateTime && endDateTime && rewardPerBlock && (
                    <TotalRewardContainer>
                        <InfoText>
                            Total reward tokens needed: <span>{totalRewardTokensNeeded}</span>
                        </InfoText>
                    </TotalRewardContainer>
                )}

                <ButtonContainer>
                    <Button onClick={handleCreatePool}>Create Farming Pool</Button>
                </ButtonContainer>
            </Form>
        </Container>
    );
};

export default CreatePoolPage;

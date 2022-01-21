import React from "react";
import { TouchableOpacityProps } from "react-native";
import { RectButtonProps, TouchableOpacity } from "react-native-gesture-handler";



import { 
    Container,
    Icon,
    Title,
    Button,
    ContainerRect,
 } from "./styles";

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends RectButtonProps{
    type: 'up' | 'down';
    title: string;
    isActive: boolean;
    onPress:()=>void;
}

export function TransactionTypeButton({type, title, isActive, onPress}: Props){
    return(
            <Container
                isActive={isActive}
                type={type}        
            >
                <ContainerRect>
                    <Button
                        onPress={onPress}
                    >
                        <Icon 
                            name={icons[type]}
                            type={type}
                        />
                        <Title>
                            {title}
                        </Title>
                    </Button>
                </ContainerRect>
            </Container>
    )
}
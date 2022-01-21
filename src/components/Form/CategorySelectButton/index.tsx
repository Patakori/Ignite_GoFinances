import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { 
    Container,
    Category,
    Icon,

} from "./styles";

interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
}

export function CategorySelectButton({title, onPress}:Props){
    return(
        <GestureHandlerRootView>
            <Container onPress={onPress}>
                <Category> {title} </Category>
                <Icon name='chevron-down'/>
            </Container>
        </GestureHandlerRootView>
    )
}
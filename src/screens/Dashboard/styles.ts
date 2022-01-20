import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { DataListProps } from '.';

export const Container = styled.View`
    flex:1;

    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;

    background-color: ${({theme}) => theme.colors.primary};

    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
`;

export const UserWrapper = styled.View`
    width: 100%;
    
    padding: 0 24px;
    margin-top: ${RFValue(50)}px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    
`; 

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;

    border-radius: 10px;
`; 

export const User = styled.View`
    margin-left: 17px;
    
    
`; 

export const UserGreeting = styled.Text`
    color: ${({theme})=> theme.colors.shape};
    height: ${RFValue(24)}px;

    font-size: ${RFValue(18)}px;
    font-family: ${({theme})=> theme.fonts.regular};

    

`; 

export const UserName = styled.Text`
    color: ${({theme})=> theme.colors.shape};
    height: ${RFValue(24)}px;

    font-size: ${RFValue(18)}px;
    font-family: ${({theme})=> theme.fonts.bold};
`; 

export const Icon = styled(Feather)`
    color: ${({theme})=> theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`
export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingHorizontal:24}
})`
    width: 100%;

    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Transaction = styled.View`
    flex: 1%;
    padding: 0 24px;

    margin-top: ${RFPercentage(14)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme})=> theme.fonts.regular};
    
    padding-bottom: 10px;
`;

export const TransactionList = styled(FlatList as new (item: FlatListProps<DataListProps>) => FlatList<DataListProps>).attrs({
    showsVerticalScrollIndicator: false,
})``;
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { useTheme } from 'styled-components';

import { HighlightCard } from "../../components/Highlight";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";


import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transaction,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer,

} from "./styles";

import { useFocusEffect } from "@react-navigation/native";
import { LastTransaction } from "../../components/Highlight/styles";


export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    async function loadTransaction(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted = transactions
        .map((item: DataListProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount)
            } else {
                expensiveTotal += Number(item.amount)
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = new Date().toLocaleString('pt-BR',{
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            })

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });
        setTransactions(transactionsFormatted);

        function getLastTransactionDate(
            collection: DataListProps[],
            type: 'positive' | 'negative'
        ){
        const lastTransactionEntries = Math.max.apply(Math, collection
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date (transaction.date).getTime()));

            return new Date(lastTransactionEntries).toLocaleString('pt-BR',{
                day: '2-digit',
                month: 'long',
            })         
        }

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative')
        const totalInterval = `01 a ${lastTransactionExpensives}`

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction : `última entrada dia ${lastTransactionEntries}`
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction : `última saída dia ${lastTransactionExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction : totalInterval
            }
        });
        setIsLoading(false);
    }

    useEffect(()=>{
        loadTransaction();

       //const dataKey = '@gofinances:transactions';
       //AsyncStorage.removeItem(dataKey);
    },[])

    useFocusEffect(useCallback (() => {
        loadTransaction()
    },[]))

    return (
        <Container>
            <ActivityIndicator/>
            {
                isLoading ? 
                    <LoadContainer> 
                        <ActivityIndicator 
                            color={theme.colors.primary}
                            size="large"
                        /> 
                    </LoadContainer>  :
             <>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo source={{uri:'https://avatars.githubusercontent.com/u/86811450?v=4'}}/>
                            <User>
                                <UserGreeting>Olá,</UserGreeting>
                                <UserName>Edilson</UserName>
                            </User>
                        </UserInfo>

                        <LogoutButton onPress={()=>{}}>
                            <Icon name="power"/>
                        </LogoutButton>
                    </UserWrapper>
                </Header>

                <HighlightCards>
                    <HighlightCard type='up' title="Entradas" amount={highlightData.entries.amount} lastTransaction={highlightData.entries.lastTransaction}/>
                    <HighlightCard type='down' title="Saídas" amount={highlightData.expensives.amount} lastTransaction={highlightData.expensives.lastTransaction}/>
                    <HighlightCard type='total' title="Total" amount={highlightData.total.amount} lastTransaction={highlightData.total.lastTransaction}/>
                </HighlightCards>

                <Transaction>
                    <Title>Listagem</Title>

                    <TransactionList 
                        data={transactions}
                        keyExtractor={item => item.id}
                        renderItem={({item})=> <TransactionCard data={item} />}
                    />                
                </Transaction>
             </>
            }
            
        </Container>
    )
}
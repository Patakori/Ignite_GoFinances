import React, {useEffect, useState} from "react";
import { Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";


import { CategorySelect } from '../CategorySelect'

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles'

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid'

type NavigationProps = {
    navigate:(screen:string) => void;
}

export type FormData = {
    name: string;
    amount: string;
  }

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor númerico').positive('O valor não pode ser negativo').required('O valor é obrigatório'),
})

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    //const dataKey = '@gofinances:transactions';

    const navigation = useNavigation<NavigationProps>();

    const {
        control,
        handleSubmit,
        reset,
        formState:{errors}
    } = useForm({resolver: yupResolver(schema)})

    function handleTransactionTypesSelect (type: 'positive' | 'negative'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }
    
    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData){    
        if(!transactionType)
            return Alert.alert('Selecione o tipo da transação')
        
        if(category.key === 'category')
            return Alert.alert('Selecione a categoria')

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
            
        }
        
        try{
            const data = await AsyncStorage.getItem('@gofinances:transactions');
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                newTransaction,
                ...currentData,
            ]

            await AsyncStorage.setItem('@gofinances:transactions', JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            });

            navigation.navigate('Listagem');


        } catch (error){
            console.log(error);
            Alert.alert('Não foi possível salvar');

        }
    }

    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm 
                        name="name"
                        control={control}
                        placeholder='Nome'
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message}
                    />
                    <InputForm 
                        name="amount"
                        control={control}
                        placeholder='Preço'
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}
                    />
                    <TransactionTypes>
                        <TransactionTypeButton 
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionTypesSelect('positive')}
                            isActive={transactionType === 'positive'}
                        />
                        <TransactionTypeButton 
                            type="down"
                            title="Outcome"
                            onPress={() => handleTransactionTypesSelect('negative')}
                            isActive={transactionType === 'negative'}
                        />
                    </TransactionTypes>

                    <CategorySelectButton 
                        title={category.name} 
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>

                <Button 
                    title="Enviar"
                    onPress={handleSubmit(handleRegister)}
                />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>

        </Container>
    </TouchableWithoutFeedback>
    )
}

import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import { Container, Logo, GoBackButton, GoBackButtonText } from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const inputPasswordConfirmationRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Use a valid e-mail')
            .required('E-mail is required'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must have at least 6 characters'),
          password_confirmation: Yup.string()
            .required('Repeat the password')
            .equals([Yup.ref('password')], 'Passwords must match'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        Alert.alert('You have been successfully registered');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          Alert.alert('Sorry, that did not work. Try again.');
        }
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Logo
              style={{
                resizeMode: 'contain',
              }}
              source={logo}
            />

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ width: '100%' }}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Name"
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputEmailRef.current?.focus();
                }}
              />
              <Input
                ref={inputEmailRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputPasswordRef.current?.focus();
                }}
              />
              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputPasswordConfirmationRef.current?.focus();
                }}
              />
              <Input
                ref={inputPasswordConfirmationRef}
                name="password_confirmation"
                icon="repeat"
                placeholder="Confirm your password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  if (formRef.current) {
                    formRef.current.submitForm();
                  }
                }}
              />

              <Button
                onPress={() => {
                  if (formRef.current) {
                    formRef.current.submitForm();
                  }
                }}
              >
                Create Account
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <GoBackButton onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#5ecb57" />
        <GoBackButtonText>Go back</GoBackButtonText>
      </GoBackButton>
    </>
  );
};

export default SignUp;

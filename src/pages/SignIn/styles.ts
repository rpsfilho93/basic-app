import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #fff;

  padding: 0 30px 100px;
`;

export const Logo = styled.Image`
  height: 100px;
  margin-bottom: 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #484646;
  font-size: 14px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  flex: 1;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  width: 100%;
  background: #fff;
  border-top-width: 1px;
  border-color: #ddd;

  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #5ecb57;
  font-size: 16px;
  margin-left: 8px;
`;

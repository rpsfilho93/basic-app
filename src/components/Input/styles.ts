import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  hasErrors: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 8px;
  background: #ddd;
  border-radius: 4px;
  margin-bottom: 5px;
  border-width: 2px;
  border-color: #ddd;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.hasErrors &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #5ecb57;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'RobotoSlab-Medium';
  color: #484646;
  font-size: 16px;
`;

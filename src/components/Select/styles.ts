import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #65ad2f;
      border-color: #65ad2f;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #65ad2f;
      border-color: #65ad2f;
    `}


  input {
    margin-top: 5px;
    background: transparent;
    border: 0;
    width: 100%;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const InputBlock = styled.div`
  /* margin: 15px 27px 0px 27px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  label {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;
    color: #767676;
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  i {
    color: #3c649c;
    font-size: 12px;
    margin-left: 5px;
    border: none;
    padding: 4px;
    background: none;
  }

  svg {
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }

  .Tooltip {
    display: flex;
    position: absolute;
    top: 10px;
    z-index: 1;
    margin-left: 20px;
  }
  #arrow {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #282828;
  }

  #help {
    font-family: Montserrat;
    border-radius: 3px;
    margin: 0;
    color: #ffffff;
    font-size: 12px;
    font-weight: 300px;
    line-height: 16px;
    padding: 4px 10px;
    background: #282828;
  }

  #visible {
    display: block;
  }

  #disable {
    display: none;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

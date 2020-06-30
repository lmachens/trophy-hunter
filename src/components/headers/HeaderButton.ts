import styled from '@emotion/styled';

const HeaderButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  transition: 0.15s;
  color: #eaeaea;
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }

  :focus {
    outline: none;
  }

  &:hover,
  &:active {
    color: #fff;
    background-color: #59595c;
  }
`;

export default HeaderButton;

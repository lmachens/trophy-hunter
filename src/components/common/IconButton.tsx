import styled from '@emotion/styled';

type Props = {
  active?: boolean;
};
const IconButton = styled.button<Props>`
  background: #3f3e43;
  margin-left: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border: none;
  padding: 0;
  fill: ${(props) => (props.active ? '#EAEAEA' : '#77777A')};
  outline: none;

  &:hover {
    background: #616165;
  }
`;

export default IconButton;

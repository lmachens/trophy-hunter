import styled from '@emotion/styled';
import IconButton from './IconButton';

const NavIconButton = styled(IconButton)`
  width: 30px;
  height: 30px;
  border: ${(props) => (props.active ? '1px solid #EAEAEA' : 'none')};
  background: ${(props) => (props.active ? '#616165' : '#3f3e43')};
`;

export default NavIconButton;

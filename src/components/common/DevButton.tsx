import styled from '@emotion/styled';

const DevButton = styled.button`
  background: ${(props) =>
    props.disabled
      ? '#77777a'
      : 'linear-gradient(158.54deg, #EF1ACD -1.09%, #EFB31A 109.64%);'};
  padding: 4px;
  margin: 10px;
  border: none;
  outline: none;
  color: ${(props) => (props.disabled ? '#3f3e43' : '#EAEAEA')};
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
`;

export default DevButton;

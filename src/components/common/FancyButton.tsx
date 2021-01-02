import styled from '@emotion/styled';

const FancyButton = styled.button`
  background: ${(props) =>
    props.disabled
      ? '#77777a'
      : 'linear-gradient(158.54deg, #EF1ACD -1.09%, #EFB31A 109.64%);'};
  padding: 4px 8px;
  font-size: 16px;
  margin: 10px;
  border: none;
  outline: none;
  color: ${(props) => (props.disabled ? '#3f3e43' : '#EAEAEA')};
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;

  :hover {
    background: linear-gradient(137.21deg, #f543d9 3.57%, #fad064 100%);
  }
`;

export default FancyButton;

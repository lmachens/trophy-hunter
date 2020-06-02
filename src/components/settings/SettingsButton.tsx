import styled from '@emotion/styled';

const SettingsButton = styled.button`
  background: #3f3e43;
  padding: 4px;
  border: none;
  outline: none;
  color: #77777a;
  cursor: pointer;
  overflow: hidden;
  width: 80px;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;

  &:hover {
    color: #eaeaea;
  }
`;

export default SettingsButton;

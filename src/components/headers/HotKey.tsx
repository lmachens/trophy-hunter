import { FC } from 'react';
import styled from '@emotion/styled';

const Container = styled.span`
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Hint = styled.span`
  color: #77777a;
  margin-right: 4px;
`;

interface HotkeyProps {
  hint: string;
  value: string;
}
const Hotkey: FC<HotkeyProps> = ({ hint, value }) => {
  return (
    <Container>
      <Hint>{hint}</Hint>
      {value}
    </Container>
  );
};

export default Hotkey;

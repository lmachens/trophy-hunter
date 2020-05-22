import styled from '@emotion/styled';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(43, 42, 48, 0.9);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Backdrop;

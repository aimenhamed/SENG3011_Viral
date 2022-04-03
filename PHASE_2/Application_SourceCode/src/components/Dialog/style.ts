import styled from "styled-components";

export const Dim = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  max-height: 90vh;
  width: 85%;
  z-index: 101;
  background: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  border-radius: 0.5rem;
  position: fixed;
`;

export const CloseLockup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 0;
  margin-right: 0.3rem;
  margin-top: 0.3rem;
`;

import React from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const ModalDeleteWrapperTemplate = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={props.className}>{props.children}</Box>
      </Modal>
    </div>
  );
};

const AppModalDeleteWrapper = styled(ModalDeleteWrapperTemplate)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #000;
  background-color: white;
  box-shadow: 24;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  width: 350px;
  height: 100px;
`;

export default AppModalDeleteWrapper;

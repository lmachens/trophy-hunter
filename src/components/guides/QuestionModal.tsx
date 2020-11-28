import styled from '@emotion/styled';
import React, { FC } from 'react';
import { ModalName } from '../headers/AppHeader';
import SmallModal from '../modals/SmallModal';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  background: #77777a;
  text-align: right;
  min-width: 100px;

  li {
    padding: 8px 10px;
    cursor: pointer;

    :hover {
      background: #8e8e91;
    }

    :not(:first-child) {
      border-top: 1px solid rgba(234, 234, 234, 0.2);
    }
  }
`;

interface QuestionModalProps {
  onClose(): void;
  onSelect(name: ModalName): void;
}

const QuestionModal: FC<QuestionModalProps> = ({ onClose, onSelect }) => {
  return (
    <SmallModal onClose={onClose} targetId="question">
      <List>
        <li onClick={() => onSelect('help')}>Q&A</li>
        <li onClick={() => onSelect('changelog')}>Changelog</li>
      </List>
    </SmallModal>
  );
};

export default QuestionModal;

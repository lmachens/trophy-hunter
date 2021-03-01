import styled from '@emotion/styled';
import React, { FC } from 'react';
import { ModalName } from '../headers/AppHeader';
import SmallModal from '../modals/SmallModal';
import Link from 'next/link';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  background: #77777a;
  text-align: right;
  min-width: 100px;

  a {
    text-decoration: none;
  }

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
        <Link
          href={{
            pathname: '/league-of-legends',
            query: {
              subpage: 'help',
            },
          }}
          passHref
        >
          <a onClick={onClose}>
            <li>Q&A</li>
          </a>
        </Link>
        <li onClick={() => onSelect('changelog')}>Changelog</li>
      </List>
    </SmallModal>
  );
};

export default QuestionModal;

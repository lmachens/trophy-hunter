import { FC, useState } from 'react';
import Modal from './Modal';
import ModalButton from './ModalButton';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import { postFeedback } from '../../api/feedback';
import Airplane from '../icons/Airplane';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 10px;
  }

  ${ModalButton} {
    margin: 10px auto 0px auto;
  }

  input,
  textarea {
    color: #eaeaea;
    background: #2b2a30;
    padding: 5px 8px;
    border: none;

    &::placeholder {
      color: #77777a;
    }
  }

  textarea {
    resize: none;
  }
`;

const ActionContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  svg {
    margin-left: 10px;
  }
`;

interface FeedbackModalProps {
  onClose(): void;
}

const FeedbackModal: FC<FeedbackModalProps> = ({ onClose }) => {
  const [discordTag, setDiscordTag] = useState('');
  const [message, setMessage] = useState('');
  const { mutate, status } = useMutation(postFeedback);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await mutate({
        discordTag,
        message,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal onClose={onClose} title="Your opinion matters!">
      <Form onSubmit={handleSubmit}>
        <p>
          We are thrilled to see you using Trophy Hunter! we are working hard to
          build a high quality product for our users. We would love to learn
          more about your opinion. Please let us hear your feedback.
        </p>
        <input
          placeholder="#Discord Tag - *this is optional so that we can contact you back : )"
          value={discordTag}
          onChange={(event) => setDiscordTag(event.target.value)}
          disabled={status === 'success'}
        />
        <textarea
          placeholder="I would like to let you know that..."
          rows={10}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={status === 'success'}
        />
        <ActionContainer>
          {status !== 'success' && (
            <ModalButton
              disabled={status === 'loading' || message.length === 0}
            >
              Submit
            </ModalButton>
          )}
          {status === 'success' && (
            <>
              Message sent successfuly <Airplane />
            </>
          )}
        </ActionContainer>
      </Form>
    </Modal>
  );
};

export default FeedbackModal;

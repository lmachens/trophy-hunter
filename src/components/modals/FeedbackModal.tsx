import { FC, useState } from 'react';
import Modal from './Modal';
import ModalButton from './ModalButton';
import styled from '@emotion/styled';

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

interface FeedbackModalProps {
  onClose(): void;
}

const FeedbackModal: FC<FeedbackModalProps> = ({ onClose }) => {
  const [discordTag, setDiscordTag] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Modal onClose={onClose} title="YOUR OPINION MATTERS!">
      <Form onSubmit={handleSubmit}>
        <p>
          We are thrilled to see you using Trophy Hunter! we are working hard to
          build a high quality product for our users. We would love to learn
          more about your opinion. Please let us hear your feedback.
        </p>
        <input
          placeholder="#Discord Tag - *this is optional so that we can contact you back : )"
          value={discordTag}
          onChange={event => setDiscordTag(event.target.value)}
        />
        <textarea
          placeholder="I would like to let you know that..."
          rows={10}
          value={feedback}
          onChange={event => setFeedback(event.target.value)}
        />
        <ModalButton disabled={feedback.length === 0}>Submit</ModalButton>
      </Form>
    </Modal>
  );
};

export default FeedbackModal;

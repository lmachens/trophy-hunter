import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Component } from 'react';
import { error as logError } from '../../api/logs';
import { closeCurrentWindow } from '../../api/overwolf';
import FancyButton from './FancyButton';

const grid = css`
  display: grid;
  align-content: center;
  place-items: center;
`;

interface Props {
  grid?: boolean;
  autoClose?: boolean;
}
const Container = styled.div`
  flex-grow: 1;
  text-align: center;
  ${(props: Props) => (props.grid ? grid : '')}
`;

class ErrorBoundary extends Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo): void {
    logError(error, errorInfo);
    if (this.props.autoClose) {
      setTimeout(() => {
        closeCurrentWindow();
      }, 2000);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container grid={this.props.grid}>
          Something went wrong 😒.
          {this.props.autoClose ? (
            <span> Closing window...</span>
          ) : (
            <FancyButton onClick={() => location.reload()}>Reload</FancyButton>
          )}
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

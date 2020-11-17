import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Component } from 'react';
import { error as logError } from '../../api/logs';
import Button from './Button';

const grid = css`
  display: grid;
  align-content: center;
  place-items: center;
`;

interface Props {
  grid?: boolean;
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
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container grid={this.props.grid}>
          Something went wrong 😒.
          <Button onClick={() => location.reload()}>Reload</Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

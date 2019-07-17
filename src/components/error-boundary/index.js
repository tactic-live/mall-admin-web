import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.log('error', error, 'info', info)
  }

  render() {
    const { error } = this.state;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          error: {error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import React from 'react';
import { toast } from 'react-hot-toast';

class ErrorBoundary extends React.Component<{ children: JSX.Element }, { hasError: boolean }> {
  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    toast.error(error.message);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary as any;

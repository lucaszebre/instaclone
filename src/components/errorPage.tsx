import Link from 'next/link';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
children: ReactNode;
}

interface ErrorBoundaryState {
hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
}

static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state to indicate an error occurred
    return { hasError: true };
}

componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error information if needed
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
}

render(): ReactNode {
    if (this.state.hasError) {
    // Render a custom error component or redirect to an error page
    return (  <div>
        <h1>Session Expired</h1>
        <p>Your session has expired. Please refresh the page and log in again.</p>
        <Link href="/">Go to Login</Link>
        </div>);
    }

    return this.props.children;
}
}

export default ErrorBoundary;

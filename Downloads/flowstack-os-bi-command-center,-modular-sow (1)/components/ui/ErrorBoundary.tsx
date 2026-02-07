import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "./button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // In a real app, integrate with Sentry here
    // Sentry.captureException(error);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-8 bg-black/50 border border-red-500/20 rounded-lg backdrop-blur-sm text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
          <h3 className="text-lg font-mono font-medium text-red-400 mb-2">COMPONENT MALFUNCTION</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md">
            The visualization system encountered an unexpected anomaly. 
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => this.setState({ hasError: false })}
            className="border-red-500/30 hover:bg-red-500/10 text-red-400"
          >
            <RefreshCcw className="w-3 h-3 mr-2" />
            Reboot Module
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
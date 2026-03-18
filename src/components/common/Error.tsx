import React from 'react';
import Button from './Button';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

const Error: React.FC<ErrorProps> = ({
  message,
  onRetry,
  fullScreen = false
}) => {
  const content = (
    <div className="text-center p-8">
      <div className="text-red-600 text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Oups ! Une erreur est survenue
      </h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      {content}
    </div>
  );
};

export default Error;
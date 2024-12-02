import React from 'react';

interface ErrorLabelProps {
    message: string;
}

export const ErrorLabel: React.FC<ErrorLabelProps> = ({message}) => {
    return <div className="text-sm text-red-500">*{message}</div>;
};
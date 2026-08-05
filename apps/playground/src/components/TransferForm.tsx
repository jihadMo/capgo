import React, { useEffect, useState } from 'react';
import { DEFAULT_ADDRESS, PLACEHOLDER_ADDRESS } from '../constants/constants';

interface TransferFormProps {
  connectedWalletAddress?: string;
}

export const TransferForm: React.FC<TransferFormProps> = ({ connectedWalletAddress }) => {
  const [recipient, setRecipient] = useState<string>(DEFAULT_ADDRESS);

  // Auto-populate recipient with connected wallet address when available
  useEffect(() => {
    if (connectedWalletAddress && (!recipient || recipient === DEFAULT_ADDRESS)) {
      setRecipient(connectedWalletAddress);
    }
  }, [connectedWalletAddress]);

  return (
    <input
      type="text"
      value={recipient}
      placeholder={PLACEHOLDER_ADDRESS}
      onChange={(e) => setRecipient(e.target.value)}
      className="xcm-recipient-input"
    />
  );
};

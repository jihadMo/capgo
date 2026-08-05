import React from 'react';

export const BountySpeccingGuide: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-gray-100 rounded-lg shadow-md border border-gray-800">
      <h2 className="text-xl font-bold mb-4 text-amber-400">💡 Bounty Speccing Best Practices</h2>
      <ul className="space-y-2 text-sm text-gray-300">
        <li>✅ <strong>Clear Acceptance Criteria:</strong> List bulleted, testable conditions for completion.</li>
        <li>✅ <strong>Technical Guidance:</strong> Mention specific file paths and accepted tech stack.</li>
        <li>✅ <strong>Verification Steps:</strong> Include cURL repro commands or unit test criteria.</li>
        <li>✅ <strong>Scoped Boundaries:</strong> Keep bounties focused on single features or bug fixes.</li>
      </ul>
    </div>
  );
};

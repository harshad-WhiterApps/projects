import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { ChatInterface } from './components/ChatInterface';
import { KYCUpload } from './components/KYCUpload';
import { mockUser } from './utils/mockData';

function App() {
  const [user, setUser] = useState<typeof mockUser>({ ...mockUser });
  const [showKYC, setShowKYC] = useState(false);
  
  const handleLogin = (credentials: { username: string; password: string; }) => {
    // Simulate authentication
    setUser(prev => ({
      ...prev,
      isAuthenticated: true,
    }));
  };

  const handleLogout = () => {
    setUser(prev => ({
      ...prev,
      isAuthenticated: false,
    }));
  };

  return (
    <div className="app">
      {!user.isAuthenticated ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <>
          <ChatInterface 
            user={{ name: user.name, accountNumber: user.accountNumber }} 
            onLogout={handleLogout}
          />
          <KYCUpload 
            isOpen={showKYC}
            onClose={() => setShowKYC(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
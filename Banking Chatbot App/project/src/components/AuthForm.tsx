import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, User, Fingerprint, Smartphone } from 'lucide-react';

interface AuthFormProps {
  onLogin: (credentials: { username: string; password: string; }) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'password' | 'biometric' | 'otp'>('password');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onLogin(credentials);
    setIsLoading(false);
  };

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    // Simulate biometric authentication
    await new Promise(resolve => setTimeout(resolve, 2000));
    onLogin({ username: 'biometric_user', password: 'biometric_auth' });
    setIsLoading(false);
  };

  const handleOTPAuth = async () => {
    setIsLoading(true);
    // Simulate OTP authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    onLogin({ username: 'otp_user', password: 'otp_auth' });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">SecureBank</h1>
          <p className="text-gray-600 mt-2">AI Banking Assistant</p>
        </div>

        {/* Authentication Method Selector */}
        <div className="mb-6">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setAuthMethod('password')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                authMethod === 'password' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Password</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('biometric')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                authMethod === 'biometric' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Fingerprint className="w-4 h-4" />
              <span>Biometric</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('otp')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                authMethod === 'otp' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>OTP</span>
            </button>
          </div>
        </div>

        {authMethod === 'password' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username / Account Number
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password / PIN
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Secure Login'
            )}
          </button>
        </form>
        )}

        {authMethod === 'biometric' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <Fingerprint className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Biometric Authentication</h3>
              <p className="text-gray-600 text-sm mb-6">
                Use your fingerprint or face ID to securely access your account
              </p>
              <button
                onClick={handleBiometricAuth}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Authenticate with Biometric'
                )}
              </button>
            </div>
          </div>
        )}

        {authMethod === 'otp' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Smartphone className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">OTP Authentication</h3>
              <p className="text-gray-600 text-sm mb-6">
                We'll send a secure OTP to your registered mobile number
              </p>
              <button
                onClick={handleOTPAuth}
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Demo: Use any authentication method to login
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            256-bit SSL
          </span>
          <span>•</span>
          <span>RBI Compliant</span>
          <span>•</span>
          <span>ISO 27001</span>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Star, 
  Paperclip, 
  Send,
  User,
  Clock
} from 'lucide-react';
import { Message } from '../../types/message';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';

const MessageCenter: React.FC = () => {
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const mockMessages: Message[] = [
    {
      id: '1',
      fromUserId: '2',
      fromUserName: 'Dr. Michael Smith',
      toUserId: user?.id || '',
      toUserName: `${user?.firstName} ${user?.lastName}`,
      subject: 'Lab Results Available',
      content: 'Your recent blood work results are now available. Please schedule a follow-up appointment to discuss the findings.',
      attachments: ['lab-results-2024.pdf'],
      isRead: false,
      isStarred: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      readAt: undefined
    },
    {
      id: '2',
      fromUserId: '3',
      fromUserName: 'Jennifer Jones, RN',
      toUserId: user?.id || '',
      toUserName: `${user?.firstName} ${user?.lastName}`,
      subject: 'Appointment Reminder',
      content: 'This is a reminder that you have an appointment scheduled for tomorrow at 10:30 AM with Dr. Smith.',
      attachments: [],
      isRead: true,
      isStarred: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      readAt: new Date(Date.now() - 23 * 60 * 60 * 1000)
    }
  ];

  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.fromUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMessage) return;

    const reply: Message = {
      id: crypto.randomUUID(),
      fromUserId: user?.id || '',
      fromUserName: `${user?.firstName} ${user?.lastName}`,
      toUserId: selectedMessage.fromUserId,
      toUserName: selectedMessage.fromUserName,
      subject: `Re: ${selectedMessage.subject}`,
      content: newMessage,
      attachments: [],
      isRead: false,
      isStarred: false,
      parentMessageId: selectedMessage.id,
      createdAt: new Date()
    };

    setMessages([reply, ...messages]);
    setNewMessage('');
  };

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId && !msg.isRead
        ? { ...msg, isRead: true, readAt: new Date() }
        : msg
    ));
  };

  const toggleStar = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId
        ? { ...msg, isStarred: !msg.isStarred }
        : msg
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Compose
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-96">
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    markAsRead(message.id);
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
                  } ${!message.isRead ? 'bg-blue-25' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${!message.isRead ? 'font-semibold' : 'font-medium'} text-gray-900`}>
                        {message.fromUserName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {message.isStarred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      <span className="text-xs text-gray-500">
                        {format(new Date(message.createdAt), 'MMM dd')}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className={`text-sm mb-1 ${!message.isRead ? 'font-semibold' : ''} text-gray-900`}>
                    {message.subject}
                  </h4>
                  
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {message.content}
                  </p>
                  
                  {message.attachments.length > 0 && (
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Paperclip className="w-3 h-3 mr-1" />
                      <span>{message.attachments.length} attachment(s)</span>
                    </div>
                  )}
                  
                  {!message.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full absolute right-2 top-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h3>
                    <p className="text-sm text-gray-600">
                      From: {selectedMessage.fromUserName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleStar(selectedMessage.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Star className={`w-4 h-4 ${selectedMessage.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </button>
                    <span className="text-xs text-gray-500">
                      {format(new Date(selectedMessage.createdAt), 'MMM dd, yyyy h:mm a')}
                    </span>
                  </div>
                </div>
                
                {selectedMessage.attachments.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Paperclip className="w-4 h-4" />
                    <span>Attachments: {selectedMessage.attachments.join(', ')}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 p-4">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="space-y-3">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your reply..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="flex justify-between items-center">
                    <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      <Paperclip className="w-4 h-4 mr-1" />
                      Attach File
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
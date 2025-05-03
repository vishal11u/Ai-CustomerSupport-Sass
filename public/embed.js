(function() {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  const script2 = document.createElement('script');
  script2.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
  script2.crossOrigin = 'anonymous';
  document.head.appendChild(script2);

  const script3 = document.createElement('script');
  script3.src = 'https://unpkg.com/@babel/standalone/babel.min.js';
  script3.crossOrigin = 'anonymous';
  document.head.appendChild(script3);

  const div = document.createElement('div');
  div.id = 'support-genie-widget';
  document.body.appendChild(div);

  const script4 = document.createElement('script');
  script4.type = 'text/babel';
  script4.text = `
    const ChatWidget = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const [messages, setMessages] = React.useState([]);
      const [input, setInput] = React.useState('');
      const [isLoading, setIsLoading] = React.useState(false);
      const [userId, setUserId] = React.useState(null);

      // Check for user authentication
      React.useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await fetch('/api/auth/check', {
              method: 'GET',
              credentials: 'include'
            });
            const data = await response.json();
            if (data.userId) {
              setUserId(data.userId);
            }
          } catch (error) {
            console.error('Error checking auth status:', error);
          }
        };
        checkAuth();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
          const response = await fetch('${window.location.origin}/api/chat', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-User-ID': userId || ''
            },
            body: JSON.stringify({ 
              messages: newMessages,
              userId: userId
            }),
          });

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let assistantMessage = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            assistantMessage += chunk;
            setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
          }
        } catch (error) {
          console.error('Error in chat:', error);
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 50 }}>
          {!isOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              style={{
                display: 'flex',
                height: '56px',
                width: '56px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#000',
                color: '#fff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              💬
            </button>
          ) : (
            <div
              style={{
                height: '600px',
                width: '400px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  height: '56px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #e5e7eb',
                  padding: '0 16px',
                }}
              >
                <h3 style={{ fontWeight: 600 }}>SupportGenie</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    borderRadius: '50%',
                    padding: '4px',
                  }}
                >
                  ✕
                </button>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'calc(100% - 112px)',
                  overflowY: 'auto',
                  padding: '16px',
                }}
              >
                {messages.map((message, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      marginBottom: '16px',
                      justifyContent: message.role === 'assistant' ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '80%',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        backgroundColor: message.role === 'assistant' ? '#f3f4f6' : '#000',
                        color: message.role === 'assistant' ? '#000' : '#fff',
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderTop: '1px solid #e5e7eb',
                  padding: '16px',
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    padding: '8px 12px',
                    fontSize: '14px',
                  }}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    display: 'inline-flex',
                    height: '40px',
                    width: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    backgroundColor: '#000',
                    color: '#fff',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  {isLoading ? '...' : '→'}
                </button>
              </form>
            </div>
          )}
        </div>
      );
    };

    ReactDOM.render(<ChatWidget />, document.getElementById('support-genie-widget'));
  `;
  document.head.appendChild(script4);
})(); 
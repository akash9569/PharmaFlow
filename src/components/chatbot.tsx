'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Loader2, MessageCircle, Send, User, X } from 'lucide-react';
import { chat } from '@/app/chatbot/actions';
import { ScrollArea } from './ui/scroll-area';
import { Avatar } from './ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<string>('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setStreamingMessage('');

    try {
      const stream = await chat({
        message: currentInput,
        history: messages,
      });

      let accumulatedResponse = '';
      for await (const chunk of stream) {
        accumulatedResponse += chunk;
        setStreamingMessage(accumulatedResponse);
      }

      const modelMessage: Message = { role: 'model', content: accumulatedResponse };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Sorry, I am having trouble connecting. Please try again later.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setStreamingMessage('');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
        <span className="sr-only">Toggle Chatbot</span>
      </Button>
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-full max-w-sm">
          <Card className="flex flex-col h-[60vh] shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot />
                <CardTitle>PharmaBot</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-0">
              <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground">
                      <p>Ask me anything about our products or health topics!</p>
                    </div>
                  )}
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn('flex items-end gap-2', message.role === 'user' ? 'justify-end' : 'justify-start')}
                    >
                      {message.role === 'model' && (
                        <Avatar className="h-8 w-8">
                          <div className="flex items-center justify-center h-full w-full bg-primary rounded-full text-primary-foreground">
                            <Bot className="h-5 w-5" />
                          </div>
                        </Avatar>
                      )}
                      <div className={cn('max-w-[75%] rounded-lg px-3 py-2 text-sm', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                        {message.content}
                      </div>
                      {message.role === 'user' && (
                        <Avatar className="h-8 w-8">
                          <div className="flex items-center justify-center h-full w-full bg-secondary rounded-full text-secondary-foreground">
                            <User className="h-5 w-5" />
                          </div>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {(isLoading || streamingMessage) && (
                    <div className="flex items-end gap-2 justify-start">
                       <Avatar className="h-8 w-8">
                          <div className="flex items-center justify-center h-full w-full bg-primary rounded-full text-primary-foreground">
                              <Bot className="h-5 w-5" />
                          </div>
                      </Avatar>
                      <div className="max-w-[75%] rounded-lg px-3 py-2 text-sm bg-muted">
                        {streamingMessage}
                        {isLoading && !streamingMessage && <Loader2 className="h-5 w-5 animate-spin" />}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading} size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}

"use client"

import { useState } from "react"
import { 
  Code2, 
  Settings, 
  Workflow, 
  Mail,
  ChevronDown
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function DeveloperOptions() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Code2 className="h-4 w-4" />
        <span>Developer Options</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[600px] p-6 rounded-lg border bg-card shadow-lg">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="integration">
              <AccordionTrigger className="text-lg font-semibold">
                Integration Steps
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Add the Script</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm">
                      {`<script src="https://your-domain.com/embed.js"></script>`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Initialize the Widget</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm">
                      {`<script>
  SupportGenie.init({
    apiKey: 'your-api-key',
    theme: 'light',
    position: 'bottom-right'
  });
</script>`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Customize (Optional)</h4>
                    <p className="text-sm text-muted-foreground">
                      Customize the appearance and behavior of the widget using the configuration options.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="customization">
              <AccordionTrigger className="text-lg font-semibold">
                Customization Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Theme Customization</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm">
                      {`SupportGenie.customize({
  theme: {
    primary: '#8b5cf6',
    background: '#ffffff',
    text: '#1f2937'
  }
});`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Behavior Settings</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm">
                      {`SupportGenie.configure({
  autoOpen: false,
  welcomeMessage: 'How can I help you today?',
  position: 'bottom-right'
});`}
                    </pre>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="workflow">
              <AccordionTrigger className="text-lg font-semibold">
                System Workflow
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Chat Processing Flow</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li>1. User sends message through chat widget</li>
                      <li>2. Message is processed by AI system</li>
                      <li>3. Response is generated based on context</li>
                      <li>4. Response is delivered to user</li>
                      <li>5. Conversation is saved (if user is authenticated)</li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Email Automation Flow</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li>1. Contact is added to system</li>
                      <li>2. Email template is selected</li>
                      <li>3. Automation rules are applied</li>
                      <li>4. Email is sent and tracked</li>
                      <li>5. Follow-up actions are triggered</li>
                    </ol>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="advanced">
              <AccordionTrigger className="text-lg font-semibold">
                Advanced Features
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">API Integration</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm">
                      {`// Send message programmatically
await fetch('https://your-domain.com/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    message: 'Hello',
    userId: 'user-id'
  })
});`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Event Handling</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm">
                      {`SupportGenie.on('message', (message) => {
  console.log('New message:', message);
});

SupportGenie.on('response', (response) => {
  console.log('AI response:', response);
});`}
                    </pre>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  )
} 
"use client";

import { useState } from "react";
import { Mail, Upload, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Contact {
  id: string;
  name: string;
  email: string;
  source: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

export function EmailConfiguration() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    content: "",
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) return;

    const contact: Contact = {
      id: Math.random().toString(36).substr(2, 9),
      name: newContact.name,
      email: newContact.email,
      source: "Manual",
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", email: "" });
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.content)
      return;

    const template: EmailTemplate = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTemplate.name,
      subject: newTemplate.subject,
      content: newTemplate.content,
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: "", subject: "", content: "" });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would implement the actual file parsing logic
      console.log("File selected:", file.name);
    }
  };

  return (
    <Tabs defaultValue="contacts" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="contacts" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Contacts
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email Templates
        </TabsTrigger>
      </TabsList>

      <TabsContent value="contacts" className="space-y-4">
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Contact Name"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
              />
              <Input
                placeholder="Email Address"
                type="email"
                value={newContact.email}
                onChange={(e) =>
                  setNewContact({ ...newContact, email: e.target.value })
                }
              />
              <Button onClick={handleAddContact}>
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                id="file-upload"
                onChange={handleFileUpload}
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Contacts
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Source</td>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </TabsContent>

      <TabsContent value="templates" className="space-y-4">
        <Card className="p-4">
          <div className="space-y-4">
            <Input
              placeholder="Template Name"
              value={newTemplate.name}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, name: e.target.value })
              }
            />
            <Input
              placeholder="Email Subject"
              value={newTemplate.subject}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, subject: e.target.value })
              }
            />
            <textarea
              placeholder="Email Content"
              value={newTemplate.content}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, content: e.target.value })
              }
              rows={6}
            />
            <Button onClick={handleAddTemplate}>
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Content Preview</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id}>
                  <td>{template.name}</td>
                  <td>{template.subject}</td>
                  <td>{template.content.substring(0, 50)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

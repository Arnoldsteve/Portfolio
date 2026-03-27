import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
  Tailwind,
  Section,
} from "@react-email/components";
import * as React from "react";

// Define the props that our email component will accept
interface ContactFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  subject?: string;
  message: string;
}

export const ContactFormEmail = ({
  firstName,
  lastName,
  email,
  subject,
  message,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact inquiry from {firstName} {lastName}</Preview>
    <Tailwind>
      <Body className="bg-gray-50 font-sans">
        <Container className="max-w-2xl mx-auto py-8">
          {/* Header Section */}
          <Section className="bg-white rounded-t-lg border border-gray-200 px-8 py-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">📧</span>
              </div>
              <div>
                <Heading className="text-2xl font-bold text-gray-900 m-0">
                  New Contact Inquiry
                </Heading>
                <Text className="text-sm text-gray-500 m-0 mt-1">
                  Portfolio Website • {new Date().toLocaleDateString()}
                </Text>
              </div>
            </div>
          </Section>

          {/* Contact Info Card */}
          <Section className="bg-white border-l border-r border-gray-200 px-8 py-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm">👤</span>
                  </div>
                  <div>
                    <Text className="text-sm text-gray-500 m-0">From</Text>
                    <Text className="text-lg font-semibold text-gray-900 m-0">
                      {firstName} {lastName}
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm">📧</span>
                  </div>
                  <div>
                    <Text className="text-sm text-gray-500 m-0">Email</Text>
                    <Text className="text-lg font-medium text-blue-600 m-0">
                      {email}
                    </Text>
                  </div>
                </div>

                {subject && (
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm">💬</span>
                    </div>
                    <div>
                      <Text className="text-sm text-gray-500 m-0">Subject</Text>
                      <Text className="text-lg font-medium text-gray-900 m-0">
                        {subject}
                      </Text>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* Message Section */}
          <Section className="bg-white border-l border-r border-gray-200 px-8 py-6">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center mr-2">
                <span className="text-gray-600 text-xs">📝</span>
              </div>
              <Heading className="text-lg font-semibold text-gray-900 m-0">
                Message
              </Heading>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <Text className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap m-0">
                {message}
              </Text>
            </div>
          </Section>

          {/* Action Section */}
          <Section className="bg-white border-l border-r border-gray-200 px-8 py-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <Text className="text-sm text-gray-700 m-0 mb-3">
                <strong>Quick Actions:</strong>
              </Text>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Reply to {email}
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                  Add to CRM
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                  Mark Important
                </span>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <Section className="bg-white rounded-b-lg border border-gray-200 px-8 py-6">
            <Hr className="border-gray-200 my-4" />
            <div className="text-center">
              <Text className="text-xs text-gray-500 m-0">
                This message was sent from your portfolio contact form
              </Text>
              <Text className="text-xs text-gray-400 m-0 mt-1">
                Delivered securely • Portfolio System v2.0
              </Text>
            </div>
          </Section>

          {/* Bottom Spacing */}
          <Section className="h-8"></Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

// Add preview props for React Email preview server
ContactFormEmail.PreviewProps = {
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@techstartup.com",
  subject: "Collaboration Opportunity - Frontend Development",
  message: "Hi there!\n\nI came across your portfolio and I'm really impressed with your work, especially the e-commerce project you built with Next.js.\n\nWe're a growing tech startup looking for a talented frontend developer to join our team for an exciting project. Would you be interested in discussing this opportunity?\n\nI'd love to schedule a quick call to chat about the role and see if it might be a good fit.\n\nBest regards,\nSarah"
} as ContactFormEmailProps;

export default ContactFormEmail;
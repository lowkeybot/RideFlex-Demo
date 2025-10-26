import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  HelpCircle, 
  Clock, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  Send,
  Search
} from 'lucide-react';

export function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const supportChannels = [
    {
      icon: Phone,
      title: "24/7 Phone Support",
      description: "Call us anytime for immediate assistance",
      contact: "+63 2 8123 4567",
      available: "Available 24/7",
      action: "Call Now",
      color: "bg-green-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team instantly",
      contact: "Available in app and website",
      available: "7 AM - 11 PM Daily",
      action: "Start Chat",
      color: "bg-blue-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions and get detailed responses",
      contact: "support@rideflex.ph",
      available: "Response within 2 hours",
      action: "Send Email",
      color: "bg-purple-500"
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Find answers to common questions and guides",
      contact: "Comprehensive FAQ and tutorials",
      available: "Available anytime",
      action: "Browse FAQ",
      color: "bg-orange-500"
    }
  ];

  const emergencyContacts = [
    {
      type: "Emergency Roadside",
      number: "+63 917 123 4567",
      description: "For accidents, breakdowns, or urgent road assistance"
    },
    {
      type: "Police Emergency",
      number: "117",
      description: "For security incidents or police assistance"
    },
    {
      type: "Medical Emergency",
      number: "911",
      description: "For medical emergencies"
    }
  ];

  const faqItems = [
    {
      question: "How do I book a car?",
      answer: "You can book a car through our website or mobile app. Simply search for available cars in your area, select your preferred vehicle, choose your rental period, and complete the booking with payment."
    },
    {
      question: "What documents do I need to rent a car?",
      answer: "You need a valid Philippine driver's license, a government-issued ID, and a credit card or debit card for payment. International visitors need an International Driving Permit along with their home country license."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking up to 24 hours before your pickup time without any cancellation fee. Changes made within 24 hours may incur additional charges."
    },
    {
      question: "What happens if the car breaks down?",
      answer: "Call our emergency roadside assistance at +63 917 123 4567 immediately. We'll provide immediate support and arrange for a replacement vehicle if needed. You won't be charged for mechanical failures."
    },
    {
      question: "How is the rental fee calculated?",
      answer: "Rental fees are calculated based on the duration (hourly or daily), car category, and any additional services you select. All fees are displayed upfront with no hidden charges."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, Mastercard), debit cards, GCash, PayMaya, and bank transfers. Payment is required at the time of booking."
    },
    {
      question: "Is insurance included?",
      answer: "Yes, all our vehicles come with comprehensive insurance coverage. This includes third-party liability and vehicle damage protection. Additional coverage options are available."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, you can extend your rental through the app or by calling our support team, subject to vehicle availability. Extension rates will apply for the additional time."
    }
  ];

  const officeLocations = [
    {
      name: "BGC Head Office",
      address: "26th Street, Bonifacio Global City, Taguig",
      hours: "7:00 AM - 10:00 PM",
      phone: "+63 2 8123 4567"
    },
    {
      name: "Makati Branch",
      address: "Ayala Avenue, Makati City",
      hours: "7:00 AM - 9:00 PM",
      phone: "+63 2 8234 5678"
    },
    {
      name: "Ortigas Center",
      address: "EDSA, Ortigas Center, Pasig City",
      hours: "8:00 AM - 8:00 PM",
      phone: "+63 2 8345 6789"
    },
    {
      name: "Cebu Office",
      address: "IT Park, Lahug, Cebu City",
      hours: "8:00 AM - 7:00 PM",
      phone: "+63 32 123 4567"
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFaq = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[rgba(255,101,0,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white mb-4 font-bold">How Can We Help You?</h1>
          <p className="text-xl text-gray-300">Get support whenever you need it, however you prefer</p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h3 className="text-lg text-red-800">Emergency Assistance</h3>
          </div>
          <p className="text-red-700 mb-4">
            For roadside assistance, accidents, or urgent matters, call our emergency hotline immediately.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <h4 className="text-sm text-[rgba(0,0,0,1)] mb-1">{contact.type}</h4>
                <div className="text-lg text-[rgba(0,0,0,1)] mb-2">{contact.number}</div>
                <p className="text-xs text-[rgba(0,0,0,1)]">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="form">Send Message</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportChannels.map((channel, index) => {
                const IconComponent = channel.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className={`${channel.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg mb-2">{channel.title}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{channel.description}</p>
                      <p className="text-orange-500 mb-2 text-sm">{channel.contact}</p>
                      <Badge variant="secondary" className="mb-4 text-xs">
                        {channel.available}
                      </Badge>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-[14px] text-[15px] text-left no-underline mt-2">
                        {channel.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {filteredFaq.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No FAQ items match your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {officeLocations.map((location, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      <span>{location.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Address</div>
                      <div>{location.address}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Operating Hours</div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span>{location.hours}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-orange-500" />
                        <span>{location.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="form" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Send us a Message</span>
                </CardTitle>
                <p className="text-gray-600">
                  Can't find what you're looking for? Send us a message and we'll get back to you within 2 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm mb-2 block">Full Name</label>
                      <Input
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block">Email Address</label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Subject</label>
                    <Input
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="What can we help you with?"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Message</label>
                    <Textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Please describe your issue or question in detail..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-12 bg-orange-50 rounded-2xl p-8">
          <h3 className="text-2xl mb-6 text-center text-gray-900">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center space-x-2 h-auto py-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="text-left">
                <div>Report an Issue</div>
                <div className="text-sm text-gray-500">Car problems or concerns</div>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 h-auto py-4">
              <Clock className="h-5 w-5 text-blue-500" />
              <div className="text-left">
                <div>Extend Rental</div>
                <div className="text-sm text-gray-500">Need more time?</div>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 h-auto py-4">
              <Phone className="h-5 w-5 text-orange-500" />
              <div className="text-left">
                <div>Request Callback</div>
                <div className="text-sm text-gray-500">We'll call you back</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
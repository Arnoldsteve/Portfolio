"use client"; // Forms are interactive, so this needs to be a client component

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    // We add an id="contact" for navbar linking
    <section id="contact" className="container mx-auto px-4 py-12 sm:py-24">
      <h2 className="text-3xl font-bold text-center">
        Contact <span className="text-cyan-400">Me!</span>
      </h2>

      <form className="max-w-4xl mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name Input */}
          <Input 
            type="text" 
            placeholder="Full Name" 
            className="py-6"
          />

          {/* Email Address Input */}
          <Input 
            type="email" 
            placeholder="Email Address" 
            className="py-6"
          />

          {/* Mobile Number Input */}
          <Input 
            type="tel" 
            placeholder="Mobile Number" 
            className="py-6"
          />

          {/* Email Subject Input */}
          <Input 
            type="text" 
            placeholder="Email Subject" 
            className="py-6"
          />
        </div>

        {/* Your Message Textarea */}
        <Textarea 
          placeholder="Your Message" 
          className="mt-6"
          rows={7}
        />

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button type="submit" size="lg">
            Send Message
          </Button>
        </div>
      </form>
    </section>
  );
};
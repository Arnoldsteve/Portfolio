"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("A valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (_error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="container mx-auto px-4 py-20 sm:py-32 bg-slate-50/50">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Ready to Engineer <span className="text-cyan-500">Your Next Solution?</span>
        </h2>
        <p className="text-lg text-slate-600">
          Whether you are a global organization looking for a lead developer or a business owner ready to launch a high-performance website, 
           am here to help. From small business sites to complex enterprise apps, let's discuss how I can engineer the perfect solution for your vision.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg border-slate-200">
        <CardContent className="p-8 sm:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  {...register("firstName")}
                  placeholder="First Name"
                  className="py-6 bg-slate-50 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs font-medium ml-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="py-6 bg-slate-50 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs font-medium ml-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Input
                {...register("email")}
                placeholder="Email Address"
                className="py-6 bg-slate-50 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-medium ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                {...register("subject")}
                placeholder="Subject (e.g. E-commerce Site, Corporate Website, or Custom App)"
                className="py-6 bg-slate-50 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>

            <div className="space-y-2">
              <Textarea
                {...register("message")}
                placeholder="Tell me about your project goals or the technical challenges you want to solve..."
                className="min-h-[160px] bg-slate-50 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400 resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-xs font-medium ml-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-12 text-base shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </>
                )}
              </Button>
            </div>

          </form>
          
          <div className="mt-8 pt-8 border-t flex justify-center text-sm text-slate-500">
             <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>stevearnold9e@gmail.com</span>
             </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
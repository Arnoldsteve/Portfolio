"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// CHANGED: Updated schema for firstName and lastName
const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("A valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Infer the TypeScript type from the schema
type ContactFormInputs = z.infer<typeof contactFormSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      setSubmitStatus({ success: true, message: "Message sent successfully!" });
      reset(); // Reset form fields
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="container mx-auto px-4 py-12 sm:py-24">
      <h2 className="text-3xl font-bold text-center">
        Contact <span className="text-cyan-400">Me!</span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CHANGED: Split Full Name into First and Last Name inputs */}
          <div>
            <Input
              {...register("firstName")}
              placeholder="First Name"
              className="py-6"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("lastName")}
              placeholder="Last Name"
              className="py-6"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          {/* END CHANGE */}

          <div>
            <Input
              {...register("email")}
              placeholder="Email Address"
              className="py-6"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <Input
            {...register("subject")}
            placeholder="Email Subject"
            className="py-6"
          />
        </div>

        <div className="mt-6">
          <Textarea
            {...register("message")}
            placeholder="Your Message"
            rows={7}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="mt-8 text-center">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>

        {submitStatus && (
          <p
            className={`mt-4 text-center text-lg ${
              submitStatus.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {submitStatus.message}
          </p>
        )}
      </form>
    </section>
  );
};
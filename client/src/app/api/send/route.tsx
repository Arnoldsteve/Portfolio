import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { render } from "@react-email/render";
import { ContactFormEmail } from "@/emails/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { firstName, lastName, email, subject, message } = validation.data;

    const emailHtml = await render(
      <ContactFormEmail
        firstName={firstName}
        lastName={lastName}
        email={email}
        subject={subject}
        message={message}
      />
    );

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "stevearnold9e@gmail.com",
      subject: `New Message from ${firstName} ${lastName} via Portfolio`,
      replyTo: email, 
      html: emailHtml,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully!", data });
  } catch (_error) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
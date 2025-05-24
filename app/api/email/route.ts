import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, data } = await req.json();

    switch (action) {
      case "send_email":
        const { to, subject, content, templateId } = data;

        // If templateId is provided, fetch the template
        let emailContent = content;
        if (templateId) {
          const { data: template } = await supabase
            .from("email_templates")
            .select("*")
            .eq("id", templateId)
            .single();

          if (template) {
            emailContent = template.content;
          }
        }

        // Send email using Resend
        const { data: emailData, error: emailError } = await resend.emails.send(
          {
            from: "SupportGenie <support@yourdomain.com>",
            to,
            subject,
            html: emailContent,
          }
        );

        if (emailError) {
          throw emailError;
        }

        // Save email record to database
        await supabase.from("sent_emails").insert({
          user_id: userId,
          recipient: to,
          subject,
          content: emailContent,
          template_id: templateId,
          sent_at: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, data: emailData });

      case "save_template":
        const { name, subjects, contents } = data;

        const { data: template, error: templateError } = await supabase
          .from("email_templates")
          .insert({
            user_id: userId,
            name,
            subjects,
            contents,
            created_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (templateError) {
          throw templateError;
        }

        return NextResponse.json({ success: true, data: template });

      case "import_contacts":
        const { contacts } = data;

        const { error: contactsError } = await supabase.from("contacts").insert(
          contacts.map((contact: any) => ({
            user_id: userId,
            name: contact.name,
            email: contact.email,
            source: contact.source || "import",
            created_at: new Date().toISOString(),
          }))
        );

        if (contactsError) {
          throw contactsError;
        }

        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    switch (type) {
      case "templates":
        const { data: templates, error: templatesError } = await supabase
          .from("email_templates")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (templatesError) {
          throw templatesError;
        }

        return NextResponse.json({ success: true, data: templates });

      case "contacts":
        const { data: contacts, error: contactsError } = await supabase
          .from("contacts")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (contactsError) {
          throw contactsError;
        }

        return NextResponse.json({ success: true, data: contacts });

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

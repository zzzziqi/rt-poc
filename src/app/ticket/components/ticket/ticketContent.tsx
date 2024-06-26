import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUpdateSession from "@/lib/requests/useUpdateSession";
import { TicketType } from "@/models/schemas/ticketSchema";
import useSessionStore from "@/store/sessionStore";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";

export default function TicketContent({ ticket }: { ticket: TicketType }) {
  const router = useRouter();
  const { sessionId, currentTicketId } = useSessionStore();
  const { mutate: updateSession } = useUpdateSession();
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center min-h-12">
        <h3>Ticket content</h3>
        <Button
          onClick={() => {
            updateSession({
              sessionId,
              updateField: {
                currentTicket: {
                  ticket_id: currentTicketId,
                  end_time: new Date(),
                },
              },
            });

            router.push("/ticket");
          }}
        >
          Back
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ticket: {ticket.ticket_content.ticket_title}</CardTitle>
          <CardDescription>
            <i>Group: {ticket.group}, Category: xxx</i>
            <i>Customer xxx, Date: 2024/04/08</i>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{ticket.ticket_content.ticket_description}</p>
          <Separator className="my-4" />
          {ticket.ticket_content.previous_response && (
            <>
              <h6>Previous Responses</h6>
              <CardDescription>
                <i>Agent xxx, Date: 2024/04/08</i>
              </CardDescription>

              <p>{ticket.ticket_content.previous_response}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

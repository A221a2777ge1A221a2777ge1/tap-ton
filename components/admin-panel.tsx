
"use client";

import { useAuth } from "@/lib/auth";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Shield, Users, CreditCard, Gift, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export default function AdminPanel() {
  const { isSuperAdmin } = useAuth();

  if (!isSuperAdmin) {
    return (
      <Alert variant="destructive">
        <Shield className="h-4 w-4" />
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You do not have permission to view this page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="mr-2 h-4 w-4" /> Payments
            </TabsTrigger>
            <TabsTrigger value="actions">
              <Gift className="mr-2 h-4 w-4" /> Actions
            </TabsTrigger>
            <TabsTrigger value="tools">
              <Wrench className="mr-2 h-4 w-4" /> Tools
            </TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Search users..." />
                {/* Placeholder for user list */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md bg-muted p-2">
                    <div>
                      <p className="font-semibold">User 1</p>
                      <p className="text-sm text-muted-foreground">
                        user1@example.com
                      </p>
                    </div>
                    <Badge>Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-muted p-2">
                    <div>
                      <p className="font-semibold">User 2</p>
                      <p className="text-sm text-muted-foreground">
                        user2@example.com
                      </p>
                    </div>
                    <Badge variant="secondary">Player</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Input placeholder="User ID" />
                  <Input type="number" placeholder="Amount" />
                  <Button>Create Payment</Button>
                </div>
                <Separator />
                {/* Placeholder for payment list */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md bg-muted p-2">
                    <div>
                      <p className="font-semibold">Payment #123</p>
                      <p className="text-sm text-muted-foreground">User 1</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Pending</Badge>
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

"use client";

import { useAuth } from "@/lib/auth";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Mail, Calendar, Wallet } from "lucide-react";

export default function UserProfile() {
  const { user, isSuperAdmin, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your personal and game information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.photoURL || undefined} />
            <AvatarFallback>
              {user.displayName ? user.displayName[0] : "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{user.displayName}</p>
            <div className="flex items-center space-x-2">
              {isSuperAdmin && <Badge>Super Admin</Badge>}
              <Badge variant="secondary">Wallet Connected</Badge>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <p>{user.email}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <p>
              Joined{" "}
              {user.metadata.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-muted-foreground" />
          <p className="font-mono bg-muted p-2 rounded-md">
            {/* Placeholder for wallet address */}
            0x123...abc
          </p>
        </div>
        <Separator />
        <div className="flex space-x-2">
          <Button variant="outline">Settings</Button>
          <Button onClick={signOut}>Logout</Button>
        </div>
      </CardContent>
    </Card>
  );
}

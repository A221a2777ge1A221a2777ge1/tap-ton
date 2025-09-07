"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Moon, PiggyBank, Link as LinkIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <header className="w-full max-w-md flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Evana Tycoon</h1>
        <div className="flex items-center space-x-2">
          <TonConnectButton />
          <Button variant="ghost" size="icon">
            <Moon className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="w-full max-w-md text-center">
        <h2 className="text-5xl font-bold">Evana Tycoon</h2>
        <p className="text-lg text-gray-400">Your African Empire Awaits</p>

        <div className="grid grid-cols-2 gap-4 my-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <PiggyBank className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">$418.5K</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <LinkIcon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">$4.25K/s</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tap" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="tap">Tap</TabsTrigger>
            <TabsTrigger value="invest">Invest</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          <TabsContent value="tap">
            <div className="flex flex-col items-center justify-center h-64">
              <button className="w-48 h-48 bg-yellow-400 rounded-full flex items-center justify-center text-black text-4xl font-bold">
                ET
              </button>
            </div>
          </TabsContent>
          <TabsContent value="invest">
            <div className="py-8">
              <p>Investments coming soon!</p>
            </div>
          </TabsContent>
          <TabsContent value="leaderboard">
            <div className="py-8">
              <p>Leaderboard coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

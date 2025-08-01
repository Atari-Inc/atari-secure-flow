import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Shield, User, Building, Users, Chrome, Briefcase } from "lucide-react";

interface LoginProps {
  onLogin: (role: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (selectedRole && username && password) {
      onLogin(selectedRole);
    }
  };

  const roles = [
    { value: "admin", label: "Administrator", icon: Shield },
    { value: "user", label: "Internal User", icon: User },
    { value: "client", label: "External Client", icon: Building },
    { value: "vendor", label: "Vendor", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Branding */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Atari SFTP Manager</h1>
          </div>
          <p className="text-sm text-muted-foreground">Secure File Transfer Protocol</p>
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <span>Powered by</span>
            <span className="font-medium text-primary">Claud.ai</span>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-card-custom border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center space-x-2">
                        <role.icon className="h-4 w-4" />
                        <span>{role.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full"
              />
            </div>

            {/* Login Button */}
            <Button 
              onClick={handleLogin}
              className="w-full"
              variant="enterprise"
              disabled={!selectedRole || !username || !password}
            >
              <Shield className="h-4 w-4" />
              Sign In Securely
            </Button>

            {/* SSO Options */}
            <div className="space-y-3">
              <Separator />
              <p className="text-xs text-center text-muted-foreground">Or continue with</p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Chrome className="h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4" />
                  Microsoft
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-secure bg-secure/10 px-3 py-2 rounded-full">
            <Shield className="h-3 w-3" />
            <span>End-to-end encryption enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
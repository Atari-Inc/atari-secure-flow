import { useState } from "react";
import { Save, Server, Key, Bell, Shield, Database, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  const { toast } = useToast();
  
  // SFTP Server Settings
  const [sftpSettings, setSftpSettings] = useState({
    serverEndpoint: "sftp.atari-company.com",
    port: "22",
    protocol: "SFTP",
    encryption: "AES-256",
    maxConnections: "100",
    timeoutMinutes: "30",
    rootDirectory: "/secure-transfer",
    allowedIPs: "0.0.0.0/0"
  });

  // AWS Transfer Family Settings
  const [awsSettings, setAwsSettings] = useState({
    transferFamilyId: "s-1234567890abcdef0",
    s3Bucket: "atari-sftp-storage",
    region: "us-east-1",
    enableCloudWatch: true,
    enableAccessLogs: true,
    retentionDays: "90"
  });

  // API Integration Settings
  const [apiSettings, setApiSettings] = useState({
    webhookUrl: "https://api.atari-company.com/webhooks/sftp",
    apiKey: "**********************",
    enableWebhooks: true,
    enableApiAccess: true,
    rateLimitPerMinute: "1000"
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    slackWebhook: "",
    notifyOnUpload: true,
    notifyOnDownload: false,
    notifyOnLogin: true,
    notifyOnError: true,
    adminEmail: "admin@atari-company.com"
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    enforceStrongPasswords: true,
    maxLoginAttempts: "5",
    lockoutDurationMinutes: "30",
    sessionTimeoutMinutes: "60",
    enableTwoFactor: false,
    enableAuditLogs: true,
    requirePasswordChange: false,
    passwordChangeDays: "90"
  });

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your SFTP system, integrations, and security settings
        </p>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">SFTP Server</span>
              <Badge variant="default" className="bg-green-100 text-green-700">Online</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">AWS Transfer Family</span>
              <Badge variant="default" className="bg-green-100 text-green-700">Connected</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Monitoring</span>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Warning</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs defaultValue="server" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="server">SFTP Server</TabsTrigger>
          <TabsTrigger value="aws">AWS Integration</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* SFTP Server Settings */}
        <TabsContent value="server" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                SFTP Server Configuration
              </CardTitle>
              <CardDescription>
                Configure your SFTP server settings and connection parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="serverEndpoint">Server Endpoint</Label>
                  <Input
                    id="serverEndpoint"
                    value={sftpSettings.serverEndpoint}
                    onChange={(e) => setSftpSettings({ ...sftpSettings, serverEndpoint: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    value={sftpSettings.port}
                    onChange={(e) => setSftpSettings({ ...sftpSettings, port: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protocol">Protocol</Label>
                  <Select value={sftpSettings.protocol} onValueChange={(value) => setSftpSettings({ ...sftpSettings, protocol: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SFTP">SFTP</SelectItem>
                      <SelectItem value="FTPS">FTPS</SelectItem>
                      <SelectItem value="SCP">SCP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="encryption">Encryption</Label>
                  <Select value={sftpSettings.encryption} onValueChange={(value) => setSftpSettings({ ...sftpSettings, encryption: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AES-256">AES-256</SelectItem>
                      <SelectItem value="AES-128">AES-128</SelectItem>
                      <SelectItem value="3DES">3DES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxConnections">Max Concurrent Connections</Label>
                  <Input
                    id="maxConnections"
                    value={sftpSettings.maxConnections}
                    onChange={(e) => setSftpSettings({ ...sftpSettings, maxConnections: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="timeout"
                    value={sftpSettings.timeoutMinutes}
                    onChange={(e) => setSftpSettings({ ...sftpSettings, timeoutMinutes: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rootDirectory">Root Directory</Label>
                <Input
                  id="rootDirectory"
                  value={sftpSettings.rootDirectory}
                  onChange={(e) => setSftpSettings({ ...sftpSettings, rootDirectory: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowedIPs">Allowed IP Addresses (CIDR)</Label>
                <Textarea
                  id="allowedIPs"
                  value={sftpSettings.allowedIPs}
                  onChange={(e) => setSftpSettings({ ...sftpSettings, allowedIPs: e.target.value })}
                  placeholder="0.0.0.0/0 (all IPs) or specific ranges like 192.168.1.0/24"
                />
              </div>
              <Button onClick={() => handleSaveSettings("SFTP Server")}>
                <Save className="mr-2 h-4 w-4" />
                Save SFTP Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AWS Integration Settings */}
        <TabsContent value="aws" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                AWS Transfer Family Integration
              </CardTitle>
              <CardDescription>
                Configure your AWS Transfer Family and S3 storage settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Secure Connection</AlertTitle>
                <AlertDescription>
                  All data is encrypted in transit and at rest using AWS managed encryption keys.
                </AlertDescription>
              </Alert>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="transferFamilyId">Transfer Family Server ID</Label>
                  <Input
                    id="transferFamilyId"
                    value={awsSettings.transferFamilyId}
                    onChange={(e) => setAwsSettings({ ...awsSettings, transferFamilyId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s3Bucket">S3 Bucket Name</Label>
                  <Input
                    id="s3Bucket"
                    value={awsSettings.s3Bucket}
                    onChange={(e) => setAwsSettings({ ...awsSettings, s3Bucket: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">AWS Region</Label>
                  <Select value={awsSettings.region} onValueChange={(value) => setAwsSettings({ ...awsSettings, region: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                      <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                      <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                      <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retentionDays">Log Retention (days)</Label>
                  <Input
                    id="retentionDays"
                    value={awsSettings.retentionDays}
                    onChange={(e) => setAwsSettings({ ...awsSettings, retentionDays: e.target.value })}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>CloudWatch Monitoring</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed CloudWatch metrics and monitoring</p>
                  </div>
                  <Switch
                    checked={awsSettings.enableCloudWatch}
                    onCheckedChange={(checked) => setAwsSettings({ ...awsSettings, enableCloudWatch: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Access Logs</Label>
                    <p className="text-sm text-muted-foreground">Log all file transfer activities</p>
                  </div>
                  <Switch
                    checked={awsSettings.enableAccessLogs}
                    onCheckedChange={(checked) => setAwsSettings({ ...awsSettings, enableAccessLogs: checked })}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings("AWS Integration")}>
                <Save className="mr-2 h-4 w-4" />
                Save AWS Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Integration Settings
              </CardTitle>
              <CardDescription>
                Configure API access, webhooks, and external integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    value={apiSettings.webhookUrl}
                    onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                    placeholder="https://your-api.com/webhooks/sftp"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiSettings.apiKey}
                    onChange={(e) => setApiSettings({ ...apiSettings, apiKey: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Rate Limit (requests per minute)</Label>
                  <Input
                    id="rateLimit"
                    value={apiSettings.rateLimitPerMinute}
                    onChange={(e) => setApiSettings({ ...apiSettings, rateLimitPerMinute: e.target.value })}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Webhooks</Label>
                    <p className="text-sm text-muted-foreground">Send webhook notifications for file operations</p>
                  </div>
                  <Switch
                    checked={apiSettings.enableWebhooks}
                    onCheckedChange={(checked) => setApiSettings({ ...apiSettings, enableWebhooks: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable API Access</Label>
                    <p className="text-sm text-muted-foreground">Allow external API access to file operations</p>
                  </div>
                  <Switch
                    checked={apiSettings.enableApiAccess}
                    onCheckedChange={(checked) => setApiSettings({ ...apiSettings, enableApiAccess: checked })}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings("API Integration")}>
                <Save className="mr-2 h-4 w-4" />
                Save API Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how you want to be notified about system events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={notificationSettings.adminEmail}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, adminEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slackWebhook">Slack Webhook URL (Optional)</Label>
                <Input
                  id="slackWebhook"
                  value={notificationSettings.slackWebhook}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, slackWebhook: e.target.value })}
                  placeholder="https://hooks.slack.com/services/..."
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Enable email notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>File Upload Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify when files are uploaded</p>
                  </div>
                  <Switch
                    checked={notificationSettings.notifyOnUpload}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, notifyOnUpload: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>File Download Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify when files are downloaded</p>
                  </div>
                  <Switch
                    checked={notificationSettings.notifyOnDownload}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, notifyOnDownload: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify when users log in</p>
                  </div>
                  <Switch
                    checked={notificationSettings.notifyOnLogin}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, notifyOnLogin: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Error Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify when errors occur</p>
                  </div>
                  <Switch
                    checked={notificationSettings.notifyOnError}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, notifyOnError: checked })}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings("Notifications")}>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security policies and authentication requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockoutDuration"
                    value={securitySettings.lockoutDurationMinutes}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, lockoutDurationMinutes: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    value={securitySettings.sessionTimeoutMinutes}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeoutMinutes: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordChangeDays">Password Change (days)</Label>
                  <Input
                    id="passwordChangeDays"
                    value={securitySettings.passwordChangeDays}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordChangeDays: e.target.value })}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enforce Strong Passwords</Label>
                    <p className="text-sm text-muted-foreground">Require complex passwords with special characters</p>
                  </div>
                  <Switch
                    checked={securitySettings.enforceStrongPasswords}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enforceStrongPasswords: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch
                    checked={securitySettings.enableTwoFactor}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableTwoFactor: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logs</Label>
                    <p className="text-sm text-muted-foreground">Log all security-related events</p>
                  </div>
                  <Switch
                    checked={securitySettings.enableAuditLogs}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableAuditLogs: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Force Password Change</Label>
                    <p className="text-sm text-muted-foreground">Require periodic password changes</p>
                  </div>
                  <Switch
                    checked={securitySettings.requirePasswordChange}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requirePasswordChange: checked })}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings("Security")}>
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
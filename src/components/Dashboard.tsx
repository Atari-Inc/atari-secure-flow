import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  HardDrive, 
  Upload, 
  Download, 
  Users, 
  Activity, 
  Shield, 
  Clock,
  FileText,
  TrendingUp,
  AlertTriangle,
  FolderOpen
} from "lucide-react";

interface DashboardProps {
  userRole: string;
}

export const Dashboard = ({ userRole }: DashboardProps) => {
  // Mock data - in real app this would come from API
  const storageData = {
    used: 750,
    total: 1000,
    percentage: 75
  };

  const recentActivity = [
    { action: "Upload", file: "quarterly-report.pdf", user: "John Doe", time: "2 minutes ago", status: "completed" },
    { action: "Download", file: "project-specs.docx", user: "Jane Smith", time: "5 minutes ago", status: "completed" },
    { action: "Share", file: "client-data.xlsx", user: "Mike Johnson", time: "12 minutes ago", status: "pending" },
    { action: "Delete", file: "old-backup.zip", user: "Admin", time: "1 hour ago", status: "completed" },
  ];

  const stats = {
    totalFiles: 1247,
    activeUsers: 23,
    transfersToday: 156,
    securityAlerts: 0
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your SFTP overview.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-secure/10 text-secure border-secure/20">
            <Shield className="h-3 w-3 mr-1" />
            Secure Session Active
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageData.used} GB</div>
            <Progress value={storageData.percentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {storageData.used} GB of {storageData.total} GB used
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFiles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        {userRole === "admin" && (
          <Card className="shadow-card-custom">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                Currently online
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Transfers</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.transfersToday}</div>
            <p className="text-xs text-muted-foreground">
              Files uploaded/downloaded
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest file operations and transfers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {activity.action === "Upload" && <Upload className="h-4 w-4 text-blue-500" />}
                    {activity.action === "Download" && <Download className="h-4 w-4 text-green-500" />}
                    {activity.action === "Share" && <Users className="h-4 w-4 text-purple-500" />}
                    {activity.action === "Delete" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.action} • {activity.file}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                  <Badge 
                    variant={activity.status === "completed" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <button className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <Upload className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium text-sm">Upload Files</div>
                  <div className="text-xs text-muted-foreground">Add new files to your storage</div>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <FolderOpen className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium text-sm">Browse Files</div>
                  <div className="text-xs text-muted-foreground">Navigate your file system</div>
                </div>
              </button>

              {userRole === "admin" && (
                <button className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <Users className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium text-sm">Manage Users</div>
                    <div className="text-xs text-muted-foreground">Add or modify user accounts</div>
                  </div>
                </button>
              )}

              <button className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium text-sm">Security Settings</div>
                  <div className="text-xs text-muted-foreground">Configure security options</div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Status */}
      <Card className="shadow-card-custom bg-secure/5 border-secure/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-secure">
            <Shield className="h-5 w-5" />
            <span>Security Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-secure rounded-full"></div>
              <span className="text-sm">SSL/TLS Encryption Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-secure rounded-full"></div>
              <span className="text-sm">Two-Factor Authentication</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-secure rounded-full"></div>
              <span className="text-sm">Audit Logging Enabled</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
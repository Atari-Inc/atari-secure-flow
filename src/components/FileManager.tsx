import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Download, 
  FolderOpen, 
  File, 
  Search, 
  MoreVertical,
  Grid3X3,
  List,
  Plus,
  Share,
  Trash2,
  Eye,
  FileText,
  Image,
  Archive,
  Video
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FileManagerProps {
  userRole: string;
}

export const FileManager = ({ userRole }: FileManagerProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in real app this would come from API
  const currentPath = "/home/documents/projects";
  const folders = [
    { name: "Client Files", count: 24, lastModified: "2 days ago" },
    { name: "Templates", count: 8, lastModified: "1 week ago" },
    { name: "Archive", count: 156, lastModified: "1 month ago" },
  ];

  const files = [
    { 
      name: "project-proposal.pdf", 
      size: "2.3 MB", 
      type: "pdf", 
      lastModified: "1 hour ago",
      shared: true 
    },
    { 
      name: "design-mockup.png", 
      size: "4.1 MB", 
      type: "image", 
      lastModified: "3 hours ago",
      shared: false 
    },
    { 
      name: "client-data.xlsx", 
      size: "856 KB", 
      type: "document", 
      lastModified: "5 hours ago",
      shared: true 
    },
    { 
      name: "backup-archive.zip", 
      size: "125 MB", 
      type: "archive", 
      lastModified: "1 day ago",
      shared: false 
    },
    { 
      name: "presentation.mp4", 
      size: "45.2 MB", 
      type: "video", 
      lastModified: "2 days ago",
      shared: false 
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "image":
        return <Image className="h-8 w-8 text-green-500" />;
      case "archive":
        return <Archive className="h-8 w-8 text-orange-500" />;
      case "video":
        return <Video className="h-8 w-8 text-purple-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Handle file upload
    console.log("Files dropped");
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">File Manager</h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
            <span>Home</span>
            <span>/</span>
            <span>Documents</span>
            <span>/</span>
            <span className="text-foreground font-medium">Projects</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="enterprise" size="sm">
            <Plus className="h-4 w-4" />
            New Folder
          </Button>
          <Button variant="enterprise" size="sm">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Upload Zone */}
      <Card 
        className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">Drop files here to upload</p>
          <p className="text-sm text-muted-foreground mb-4">or click to browse your computer</p>
          <Button variant="outline">
            Browse Files
          </Button>
        </CardContent>
      </Card>

      {/* Content */}
      <div className="space-y-6">
        {/* Folders */}
        {folders.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Folders</h3>
            <div className={viewMode === "grid" ? "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-2"}>
              {folders.map((folder, index) => (
                <Card key={index} className="shadow-card-custom hover:shadow-enterprise transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <FolderOpen className="h-8 w-8 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{folder.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {folder.count} items • {folder.lastModified}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-card border-border">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          {userRole === "admin" && (
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Files */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Files</h3>
          <div className={viewMode === "grid" ? "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-2"}>
            {files.map((file, index) => (
              <Card key={index} className="shadow-card-custom hover:shadow-enterprise transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.lastModified}</span>
                        {file.shared && (
                          <>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">Shared</Badge>
                          </>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-card border-border">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        {userRole === "admin" && (
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
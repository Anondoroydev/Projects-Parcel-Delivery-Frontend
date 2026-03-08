import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { withAsyncHandler } from "@/hooks/eventHandler";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/auth.api";
import type { IUser, TStatus } from "@/types";

import {
  MoreHorizontal,
  RotateCw,
  Search,
  Shield,
  ShieldOff,
  ShieldQuestionMark,
} from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router";

// User Management Component
export const User: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || undefined;
  const isActive = searchParams.get("isActive") || undefined;

  const {
    data: users,
    isLoading,
    error,
  } = useGetAllUsersQuery({ searchTerm, isActive });
  const [updateUser, { isLoading: updateIsLoading }] = useUpdateUserMutation();

  const handleSearchValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("searchTerm", value);
    setSearchParams(params);
  };

  const handleFilterValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("isActive", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("isActive");
    params.delete("searchTerm");
    setSearchParams(params);
  };

  const statusHandler = withAsyncHandler(
    (data: { id: string; userInfo: { isActive: TStatus } }) => updateUser(data),
    {
      loadingMessage: "Changing user status",
      successMessage: "User status changed successfully!",
      showSuccess: true,
      showError: true,
    }
  );

  const handleStatusChange = async (userId: string, isActive: TStatus) => {
    const updateData = {
      id: userId,
      userInfo: { isActive },
    };

    await statusHandler(updateData);
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="p-4 text-primary text-center mt-10">
        Error loading users
      </div>
    );

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage all system users and their access permissions
        </CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => handleSearchValueChange(e.target.value)}
            />
          </div>
          <Select
            value={isActive || ""}
            onValueChange={(value) => {
              if (value === "all") {
                return handleClearFilter();
              }
              handleFilterValueChange(value);
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
            </SelectContent>
          </Select>
          <Button
            title="Rreset Searchfield and filter"
            onClick={handleClearFilter}
            size={"icon"}
            variant="default"
          >
            <RotateCw />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.data?.map((user: Partial<IUser>) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.isActive === "ACTIVE"
                          ? "default"
                          : user.isActive === "BLOCKED"
                          ? "destructive"
                          : "inactive"
                      }
                    >
                      {user.isActive === "ACTIVE"
                        ? "ACTIVE"
                        : user.isActive === "BLOCKED"
                        ? "BLOCKED"
                        : "INACTIVE"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt as Date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user.isActive === "ACTIVE" ? (
                          <>
                            <DropdownMenuItem
                              disabled={updateIsLoading}
                              onClick={() =>
                                handleStatusChange(
                                  user._id as string,
                                  "BLOCKED"
                                )
                              }
                              className="text-destructive"
                            >
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Block User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={updateIsLoading}
                              onClick={() =>
                                handleStatusChange(
                                  user._id as string,
                                  "INACTIVE"
                                )
                              }
                              className="text-chart-3"
                            >
                              <ShieldQuestionMark className="mr-2 h-4 w-4" />
                              Inactive User
                            </DropdownMenuItem>
                          </>
                        ) : user.isActive === "BLOCKED" ? (
                          <>
                            <DropdownMenuItem
                              disabled={updateIsLoading}
                              onClick={() =>
                                handleStatusChange(user._id as string, "ACTIVE")
                              }
                              className="text-green-600"
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Unblock User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={updateIsLoading}
                              onClick={() =>
                                handleStatusChange(
                                  user._id as string,
                                  "INACTIVE"
                                )
                              }
                              className="text-chart-3"
                            >
                              <ShieldQuestionMark className="mr-2 h-4 w-4" />
                              Inactive User
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem
                              disabled={updateIsLoading}
                              onClick={() =>
                                handleStatusChange(
                                  user._id as string,
                                  "BLOCKED"
                                )
                              }
                              className="text-destructive"
                            >
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Block User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={updateIsLoading}
                              onClick={() =>
                                handleStatusChange(user._id as string, "ACTIVE")
                              }
                              className="text-green-600"
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Active User
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {users?.data?.map((user: Partial<IUser>) => (
            <Card key={user._id} className="w-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.isActive === "ACTIVE" ? (
                        <>
                          <DropdownMenuItem
                            disabled={updateIsLoading}
                            onClick={() =>
                              handleStatusChange(user._id as string, "BLOCKED")
                            }
                            className="text-destructive"
                          >
                            <ShieldOff className="mr-2 h-4 w-4" />
                            Block User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={updateIsLoading}
                            onClick={() =>
                              handleStatusChange(user._id as string, "INACTIVE")
                            }
                            className="text-chart-3"
                          >
                            <ShieldQuestionMark className="mr-2 h-4 w-4" />
                            Inactive User
                          </DropdownMenuItem>
                        </>
                      ) : user.isActive === "BLOCKED" ? (
                        <>
                          <DropdownMenuItem
                            disabled={updateIsLoading}
                            onClick={() =>
                              handleStatusChange(user._id as string, "ACTIVE")
                            }
                            className="text-green-600"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Unblock User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(user._id as string, "INACTIVE")
                            }
                            className="text-chart-3"
                          >
                            <ShieldQuestionMark className="mr-2 h-4 w-4" />
                            Inactive User
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem
                            disabled={updateIsLoading}
                            onClick={() =>
                              handleStatusChange(user._id as string, "BLOCKED")
                            }
                            className="text-destructive"
                          >
                            <ShieldOff className="mr-2 h-4 w-4" />
                            Block User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={updateIsLoading}
                            onClick={() =>
                              handleStatusChange(user._id as string, "ACTIVE")
                            }
                            className="text-green-600"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Active User
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{user.role}</Badge>
                  <Badge
                    variant={
                      user.isActive === "ACTIVE"
                        ? "default"
                        : user.isActive === "BLOCKED"
                        ? "destructive"
                        : "inactive"
                    }
                  >
                    {user.isActive === "ACTIVE"
                      ? "ACTIVE"
                      : user.isActive === "BLOCKED"
                      ? "BLOCKED"
                      : "INACTIVE"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Joined:{" "}
                  {new Date(user.createdAt as Date).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

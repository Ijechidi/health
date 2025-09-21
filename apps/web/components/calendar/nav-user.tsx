

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { SunIcon } from "lucide-react";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground [&>svg]:size-5"
            >
              <Avatar className="size-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">S</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
              </div>
              <SunIcon className="dark:hidden" size={20} aria-hidden="true" />

            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) dark bg-sidebar"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-3 focus:bg-sidebar-accent">
              <SunIcon className="dark:hidden" size={20} aria-hidden="true" />

                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 focus:bg-sidebar-accent">
              <SunIcon className="dark:hidden" size={20} aria-hidden="true" />

                Accounts
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 focus:bg-sidebar-accent">
              <SunIcon className="dark:hidden" size={20} aria-hidden="true" />

                Upgrade
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 focus:bg-sidebar-accent">
              <SunIcon className="dark:hidden" size={20} aria-hidden="true" />

                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

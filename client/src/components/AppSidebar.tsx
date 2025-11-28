import { useLocation, Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Store,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  ChevronUp,
  Ticket,
  FileText,
  Target,
  Map,
} from 'lucide-react';

const adminMenuItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Slot Management', url: '/slots', icon: Map },
  { title: 'Slot Buyers', url: '/buyers', icon: Users },
  { title: 'Products', url: '/products', icon: Package },
  { title: 'Orders', url: '/orders', icon: ShoppingCart },
  { title: 'Payments', url: '/payments', icon: DollarSign },
  { title: 'Retailers', url: '/retailers', icon: Store },
  { title: 'Support', url: '/support', icon: MessageSquare },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
];

const buyerMenuItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'My Slot', url: '/my-slot', icon: Map },
  { title: 'Products', url: '/products', icon: Package },
  { title: 'My Orders', url: '/orders', icon: ShoppingCart },
  { title: 'Retailers', url: '/retailers', icon: Store },
  { title: 'Targets', url: '/targets', icon: Target },
  { title: 'Commission', url: '/commission', icon: DollarSign },
  { title: 'Documents', url: '/documents', icon: FileText },
  { title: 'Support', url: '/support', icon: MessageSquare },
];

export default function AppSidebar() {
  const [location] = useLocation();
  const { user, logout, switchRole } = useAuth();

  const menuItems = user?.role === 'admin' ? adminMenuItems : buyerMenuItems;

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SB</span>
          </div>
          <div>
            <h1 className="font-semibold text-sm">Slot Buying Panel</h1>
            <p className="text-xs text-muted-foreground">CRM System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.role === 'admin' ? 'Administration' : 'My Dashboard'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location === '/settings'}>
                  <Link href="/settings" data-testid="nav-settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full" data-testid="user-menu">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs capitalize no-default-hover-elevate no-default-active-elevate">
                    {user?.role}
                  </Badge>
                  <ChevronUp className="h-4 w-4 ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => console.log('View profile')}>
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('Settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* todo: remove mock functionality - role switcher for demo */}
                <DropdownMenuItem onClick={() => switchRole(user?.role === 'admin' ? 'buyer' : 'admin')}>
                  Switch to {user?.role === 'admin' ? 'Buyer' : 'Admin'} View
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

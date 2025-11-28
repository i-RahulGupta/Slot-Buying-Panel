import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    orders: true,
    payments: true,
    targets: true,
    products: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" data-testid="tab-profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" data-testid="tab-appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" data-testid="change-avatar">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    defaultValue={user?.name || ''} 
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email || ''} 
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+91 98765 43210" 
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="territory">Territory</Label>
                  <Input 
                    id="territory" 
                    defaultValue={user?.territory || ''} 
                    disabled={user?.role !== 'admin'}
                    data-testid="input-territory"
                  />
                </div>
              </div>

              <Button data-testid="save-profile">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what updates you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when orders are placed, approved, or shipped
                  </p>
                </div>
                <Switch 
                  checked={notifications.orders}
                  onCheckedChange={(checked) => setNotifications(n => ({ ...n, orders: checked }))}
                  data-testid="switch-orders"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders for pending and overdue payments
                  </p>
                </div>
                <Switch 
                  checked={notifications.payments}
                  onCheckedChange={(checked) => setNotifications(n => ({ ...n, payments: checked }))}
                  data-testid="switch-payments"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Target Achievements</p>
                  <p className="text-sm text-muted-foreground">
                    Get alerts when you reach 80% or 100% of your monthly target
                  </p>
                </div>
                <Switch 
                  checked={notifications.targets}
                  onCheckedChange={(checked) => setNotifications(n => ({ ...n, targets: checked }))}
                  data-testid="switch-targets"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Products</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new products are added to the catalogue
                  </p>
                </div>
                <Switch 
                  checked={notifications.products}
                  onCheckedChange={(checked) => setNotifications(n => ({ ...n, products: checked }))}
                  data-testid="switch-products"
                />
              </div>

              <Button data-testid="save-notifications">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    data-testid="input-current-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    data-testid="input-new-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    data-testid="input-confirm-password"
                  />
                </div>
              </div>

              <Button data-testid="update-password">Update Password</Button>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" data-testid="enable-2fa">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Theme</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => document.documentElement.classList.remove('dark')}
                    data-testid="theme-light"
                  >
                    <div className="w-8 h-8 rounded bg-white border" />
                    <span className="text-sm">Light</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => document.documentElement.classList.add('dark')}
                    data-testid="theme-dark"
                  >
                    <div className="w-8 h-8 rounded bg-gray-900 border" />
                    <span className="text-sm">Dark</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    data-testid="theme-system"
                  >
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-white to-gray-900 border" />
                    <span className="text-sm">System</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppSidebar from "@/components/AppSidebar";
import NotificationBell from "@/components/NotificationBell";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/AdminDashboard";
import BuyerDashboard from "@/pages/BuyerDashboard";
import SlotsPage from "@/pages/SlotsPage";
import ProductsPage from "@/pages/ProductsPage";
import OrdersPage from "@/pages/OrdersPage";
import RetailersPage from "@/pages/RetailersPage";
import SupportPage from "@/pages/SupportPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import PaymentsPage from "@/pages/PaymentsPage";
import SettingsPage from "@/pages/SettingsPage";

// todo: remove mock functionality
const mockNotifications = [
  {
    id: '1',
    type: 'order' as const,
    title: 'Order Approved',
    message: 'Your order #ORD-2024-156 has been approved and is being processed.',
    timestamp: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment' as const,
    title: 'Payment Reminder',
    message: 'Slot fee payment is due in 3 days. Please complete the payment.',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'target' as const,
    title: 'Target Achievement',
    message: 'Congratulations! You have reached 80% of your monthly target.',
    timestamp: 'Yesterday',
    read: true,
  },
  {
    id: '4',
    type: 'general' as const,
    title: 'New Product Added',
    message: 'A new product "Smart Air Purifier" has been added to the catalogue.',
    timestamp: '2 days ago',
    read: true,
  },
];

function Dashboard() {
  const { user } = useAuth();
  return user?.role === 'admin' ? <AdminDashboard /> : <BuyerDashboard />;
}

function Router() {
  const { user } = useAuth();
  
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      {user?.role === 'admin' && (
        <>
          <Route path="/slots" component={SlotsPage} />
          <Route path="/buyers" component={SlotsPage} />
          <Route path="/analytics" component={AnalyticsPage} />
        </>
      )}
      {user?.role === 'buyer' && (
        <>
          <Route path="/my-slot" component={SlotsPage} />
          <Route path="/targets" component={BuyerDashboard} />
          <Route path="/commission" component={PaymentsPage} />
          <Route path="/documents" component={SettingsPage} />
        </>
      )}
      <Route path="/products" component={ProductsPage} />
      <Route path="/orders" component={OrdersPage} />
      <Route path="/payments" component={PaymentsPage} />
      <Route path="/retailers" component={RetailersPage} />
      <Route path="/support" component={SupportPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  const { user } = useAuth();
  
  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 p-3 border-b bg-background shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              {user?.role === 'admin' && (
                <SearchBar 
                  placeholder="Search slots, buyers, orders..."
                  onSearch={(q) => console.log('Global search:', q)}
                  className="w-64 hidden md:block"
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <NotificationBell
                notifications={mockNotifications}
                onMarkAsRead={(id) => console.log('Mark as read:', id)}
                onMarkAllAsRead={() => console.log('Mark all as read')}
              />
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 bg-muted/30">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

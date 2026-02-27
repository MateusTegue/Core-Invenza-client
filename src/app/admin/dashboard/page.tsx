import SidebarNav from "@/components/ui/SidebarNav/SidebarNav.component";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex bg-background">

      <SidebarNav />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold">
          Welcome to the Dashboard!
        </h1>
      </main>

    </div>
  )
}

export default DashboardPage;

import UsersList from "@/components/ui/Users/UsersList.component"
import ToolUser from "@/components/ui/Tools/ToolUser.component"

const EmployeesPage = () => {
  return (
    <section className="space-y-4">
      <ToolUser />
      <UsersList />
    </section>
  )
}

export default EmployeesPage

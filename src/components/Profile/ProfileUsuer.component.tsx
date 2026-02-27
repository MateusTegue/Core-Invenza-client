"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { EdictIcon } from "@/assets/icons"
import { getStoredUser } from "@/api/login.api"

const ProfileUser = () => {
  const user = getStoredUser()

  const initials = useMemo(() => {
    const first = user?.name?.[0] ?? "U"
    const last = user?.last_name?.[0] ?? ""
    return `${first}${last}`.toUpperCase()
  }, [user])

  return (
    <section className="w-full h-full p-8 flex justify-center items-center">
      <Card className="w-full max-w-5xl rounded-none border-none shadow-none">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <article className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-64 h-64 border-4 border-primary">
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-xl font-semibold">
                  {user ? `${user.name} ${user.last_name}` : "Usuario"}
                </h2>
                <p className="text-muted-foreground">Usuario del sistema</p>
              </div>

              <Button className="w-full flex items-center justify-center gap-2">
                <EdictIcon width={16} height={16} />
                Editar perfil
              </Button>
            </article>

            <article className="space-y-6">
              <h3 className="text-lg font-semibold">Informacion del perfil</h3>

              <Separator />

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email ?? "No disponible"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Telefono</p>
                  <p className="font-medium">{user?.phone ?? "No disponible"}</p>
                </div>
              </div>
            </article>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default ProfileUser

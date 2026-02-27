"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { SingInIcon } from "@/assets/icons"
import { Input } from "@/components/ui/input"
import { login } from "@/api/login.api"



const LoginButton = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        try {
            setLoading(true)
            setError('')
            await login(email, password)
            router.push('/admin/dashboard')
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-[350px] rounded-md shadow-md">
            <CardHeader className="text-center">
                <CardTitle>Login</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <a className="block text-right text-sm text-muted-foreground hover:text-primary transition-colors">
                    Forgot your password?
                </a>
            </CardContent>

            <CardContent className="space-y-3 pt-0">
                <Button onClick={handleLogin} disabled={loading} className="w-full">
                    <SingInIcon className="h-4 w-4" />
                    {loading ? 'Signing in...' : 'Login'}
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardContent>
        </Card>

    )
}

export default LoginButton;
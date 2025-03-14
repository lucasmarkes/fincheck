import { Routes, Route, BrowserRouter } from "react-router-dom"
import { AuthGuard } from "./AuthGuard"
import { Login } from "../view/pages/Login"
import { SignUp } from "../view/pages/SignUp"
import { Dashboard } from "../view/pages/Dashboard"
import { AuthLayout } from "../view/layouts/AuthLayout"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
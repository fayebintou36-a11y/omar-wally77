import { pageHead } from '@/components/couture/site'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'

export const Route = createFileRoute('/_authenticated/admin')({
  head: () => ({meta:[...pageHead('Administration — Administration','Gestion sécurisée de la maison Omar Wally Fashion.').meta,{name:'robots',content:'noindex'}]}),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user?.user_metadata?.must_change_password) throw redirect({ to: '/reset-password' })
  },
  component: () => <Outlet />,
})

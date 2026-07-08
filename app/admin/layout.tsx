import { Metadata } from 'next'
import AdminShell from './admin-shell'

export const metadata: Metadata = {
  title: {
    default: 'Admin | ArvandSmartControl',
    template: '%s | ArvandSmartControl',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}

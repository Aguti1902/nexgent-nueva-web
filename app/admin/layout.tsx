export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      {/* Sin Header ni Footer de la web */}
      {children}
    </div>
  )
}


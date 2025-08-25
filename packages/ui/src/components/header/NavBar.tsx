

export default async function NavBarBody({children}:{children: React.ReactNode}) {



  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 py-2 px-4">
  

            {children}


    </header>
  )
}

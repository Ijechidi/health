

import { getUserInfo } from "@/services/users";
import type { ReactNode } from "react";


interface LayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

const Layout = async ({ children, params }: LayoutProps) => {
  const user = await getUserInfo();
  
  return (
    <div className="flex h-screen py-4 flex-col  items-center ">


        {children}

    </div>
  );
};

export default Layout;

import { getUserInfo } from '@/services/users';
import { redirect } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export default async function OrganizationLayout({ children, params }: LayoutProps) {
  const userInfo = await getUserInfo();
  
  if (!userInfo) {
    redirect('/login');
  }

  // if (userInfo.slug !== params.slug) {
  //   redirect(`/${userInfo.slug}`);
  // }

  return (
    <div>

                 
      {children}

    </div>
  );
}
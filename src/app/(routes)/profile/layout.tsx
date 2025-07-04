import ProfileMenu from "./_components/ProfileMenu";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="w-full h-[calc(100vh-70px)]  py-10 gap-4">
      {/* <div className="bg-card h-full w-[60px] md:w-[180px] rounded-sm shadow-md border overflow-hidden">
        <ProfileMenu />
      </div>

      <main className="h-full  w-full">{children}</main> */}

      {children}
    </div>
  );
};

export default ProfileLayout;

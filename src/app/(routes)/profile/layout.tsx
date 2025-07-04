interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="w-full h-[calc(100vh-70px)]  py-10 gap-4">{children}</div>
  );
};

export default ProfileLayout;

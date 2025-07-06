import { LucideIcon } from "lucide-react";

interface UserCardProps {
  Icon: LucideIcon;
  username: string;
  as?: React.ElementType;
  href?: string;
}

const UserCard = ({
  Icon,
  username,
  as: Component = "div",
  href,
}: UserCardProps) => {
  return (
    <Component
      {...(href ? { href } : {})}
      className="p-2 pb-5 pt-5 md:pt-10 mb-5 text-center bg-card border border-border shadow-md rounded-sm gap-2 hover:-translate-y-0.5 transition-all hover:shadow-primary/20 hover:border-primary/20 hover:bg-primary/10 hover:text-primary relative group"
    >
      <Icon className="border border-border shadow-2xl size-8 md:size-10 p-2 rounded-full bg-card text-primary absolute -top-5 left-1/2 -translate-x-1/2 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary" />

      <p className="text-sm md:text-xl">{username}</p>
    </Component>
  );
};

export default UserCard;

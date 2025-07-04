import { LucideIcon } from "lucide-react";

interface HeadingProps {
  icon: LucideIcon;
  title: string;
}

const Heading = ({ icon: Icon, title }: HeadingProps) => {
  return (
    <h2 className=" font-bold flex items-center gap-1 bg-primary/10 p-2 rounded-md text-primary w-fit">
      <Icon />
      {title}
    </h2>
  );
};

export default Heading;

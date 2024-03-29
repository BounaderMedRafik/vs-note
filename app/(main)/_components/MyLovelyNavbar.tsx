import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Title } from "./MyTitle";
import { MyBanner } from "./MyBanner";
import MyMenu from "./MyMenu";
import MyPublish from "./MyPublish";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const MyLovelyNavBar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document == undefined) {
    return (
      <nav className="bg-background px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <MyMenu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document == null) {
    return null;
  }

  return (
    <>
      <nav className="bg-[#EEEEEE] relative shadow-sm rounded-b-lg dark:border-b px-3 py-2 w-full  flex items-center gap-x-4 z-[2]">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className=" h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <MyPublish initialData={document} />
          </div>
        </div>
      </nav>
      {document.isArchived && <MyBanner documentId={document._id} />}
    </>
  );
};

export default MyLovelyNavBar;

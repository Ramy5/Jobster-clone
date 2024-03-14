import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface protectedRoute_TP {
  children: ReactNode;
}

const ProtectedRoute: React.FC<protectedRoute_TP> = ({ children }) => {
  const { user } = useSelector((store: any) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return router.push("/");
    }
  }, [user]);

  return children;
};

export default ProtectedRoute;

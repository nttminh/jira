import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/auth/auth.context";
import LoadingScreen from "../../../shared/LoadingScreen";

type Props = {
  children: React.ReactElement;
};

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated]);

  if (!isMounted) return null;
  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoute;

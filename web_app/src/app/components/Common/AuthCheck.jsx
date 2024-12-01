import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const AuthCheck = () => {
  const dispatch = useAppDispatch()
  const router = useRouter();
  
  useEffect(() => {
    dispatch(userActions.isValidJwt())
  }, []);

  return null;
};

export default AuthCheck;

import { useUserStore } from "@/store/userStore";
import { useUser } from "@clerk/expo";
import { useEffect } from "react";
import { useSupabase } from "./useSupabase";

export const useUserSync = () => {
  const { user } = useUser();
  const setIsAdmin = useUserStore((state) => state.setIsAdmin);

  const authSupabase = useSupabase();

  useEffect(() => {
    if (!user) return;
    syncUser();
  }, [user]);

  const syncUser = async () => {
    const { data } = await authSupabase
      .from("users")
      .select("clerk_id,is_admin")
      .eq("clerk_id", user!.id)
      .single();

    if (data) {
      // if the user exists in the database, set the isAdmin state based on the database value
      setIsAdmin(data.is_admin ?? false);
      return;
    }
  };
};

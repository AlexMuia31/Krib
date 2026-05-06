import { useUserStore } from "@/store/userStore";
import { useUser } from "@clerk/expo";

export const useUserSync = () => {
  const { user } = useUser();
  const setIsAdmin = useUserStore((state) => state.setIsAdmin);
};

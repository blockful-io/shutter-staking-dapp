import { useEffect, useState } from "react";
import { getKeypersData, KeyperData } from "../service/utils";
import { useUser } from "./useUser";

export const useKeypersList = () => {
  const { address } = useUser();
  const [keypersList, setKeypersList] = useState<
    KeyperData[] | undefined | null
  >(undefined);

  useEffect(() => {
    if (address) {
      getKeypersData()
        .then((keypers: KeyperData[]) => setKeypersList(keypers))
        .catch((error) => {
          console.error(error);
          setKeypersList(undefined);
        });
    } else {
      setKeypersList(null);
    }
  }, [address]);

  return {
    keypersList,
  };
};

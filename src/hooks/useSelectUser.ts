/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

type Props = {
  id: number;
  users: Array<User>;
};

// 選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelectUser = useCallback((props: Props) => {
    const { id, users } = props;
    const targetUser = users.find((user) => user.id === id);
    setSelectedUser(targetUser!);
  }, []);
  return { onSelectUser, selectedUser };
};

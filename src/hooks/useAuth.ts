import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessage";
import { User } from "../types/api/user";
import { useLoginUser } from "../hooks/useLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            setLoginUser(res.data);
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
          } else {
            setLoading(false);
            showMessage({
              title: "ユーザーが見つかりません",
              status: "error"
            });
          }
        })
        .catch(() => {
          showMessage({ title: "ログインできません", status: "error" });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );
  return { login, loading };
};

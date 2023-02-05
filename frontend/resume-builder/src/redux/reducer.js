import { userLoading, userSuccess, userError } from "./constants";

export const user = (
  state = {
    userLoading: false,
    userData: { userData: {}, isSuccess: false },
    userError: "",
  },
  { type, payload }
) => {
  switch (type) {
    case userLoading:
      return payload;
    case userSuccess:
      return payload;
    case userError:
      return payload;

    default:
      return state;
  }
};

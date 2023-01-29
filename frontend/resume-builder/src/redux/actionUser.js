import { userLoading, userSuccess, userError, client } from "./constants";
import { toast } from "react-toastify";

export const createUser = (values) => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: {
      ...getState().user,
      userData: {
        ...getState().user.userData,
        IsSuccessSignup: false,
      },
      userLoading: true,
    },
  });
  try {
    const { data } = await client.post("/user/signup", {
      ...values,
    });
    console.log(data);
    dispatch({
      type: userSuccess,
      payload: {
        userLoading: false,
        userData: { ...data, IsSuccessSignup: true },
        userError: "",
      },
    });
    toast.success(`کاربری ${data.user.username} با موفقیت ثبت گردید`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (error) {
    console.log(error);
    const errorMessage = error.response
      ? error.response.data.error
      : error.message;
    dispatch({
      type: userError,
      payload: {
        ...getState().user,
        userLoading: false,
        userError: errorMessage,
      },
    });
    toast.error(
      <div style={{textAlign:'right' ,paddingRight:"10px"}} dangerouslySetInnerHTML={{ __html: errorMessage }}></div>,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }
};

import { userLoading, userSuccess, userError, client } from "./constants";
import { toast } from "react-toastify";

export const createUser = (values) => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: {
      ...getState().user,
      userData: { userData: {}, isSuccess: false },
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
        userData: { ...data, isSuccessSignup: true },
        userError: "",
      },
    });
    toast.success(`کاربری ${data.userData.username} با موفقیت ثبت گردید`, {
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
      <div
        style={{ textAlign: "right", paddingRight: "10px" }}
        dangerouslySetInnerHTML={{ __html: errorMessage }}
      ></div>,
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
export const getUserTest = () => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: {
      ...getState().user,
      userData: { userData: {}, isSuccess: false },
      userLoading: true,
    },
  });
  try {
    const { data } = await client.get("/user/login");
    console.log(data);
    dispatch({
      type: userSuccess,
      payload: {
        userLoading: false,
        userData: { ...data, isSuccessSignup: true },
        userError: "",
      },
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
      <div
        style={{ textAlign: "right", paddingRight: "10px" }}
        dangerouslySetInnerHTML={{ __html: errorMessage }}
      ></div>,
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
export const updateProfile = (values) => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: {
      userData: { ...getState().user.userData, isSuccess: false },
      userLoading: true,
      userError: "",
    },
  });
  try {
    const { data } = await client.post("/user/updateProfile", values);

    dispatch({
      type: userSuccess,
      payload: {
        userLoading: false,
        userData: { ...data, isSuccess: true },
        userError: "",
      },
    });
    toast.success(`اطلاعات  پروفایل با موفقیت ثبت گردید`, {
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
        userData: { ...getState().user.userData, isSuccess: false },
        userLoading: false,
        userError: errorMessage,
      },
    });
    toast.error(
      <div
        style={{ textAlign: "right", paddingRight: "10px" }}
        dangerouslySetInnerHTML={{ __html: errorMessage }}
      ></div>,
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
export const UploadProfileImage = (values) => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: {
      userData: { ...getState().user.userData, isSuccess: false },
      userLoading: true,
      userError: "",
    },
  });
  try {
    const base64Response = await fetch(`${values.newImage}`);
    const blob = await base64Response.blob();
    const formData = new FormData();
  
    formData.append("image", blob, `${values.username}.jpg`);

    const { data } = await client.put("/user/updateUserImage", formData);

    dispatch({
      type: userSuccess,
      payload: {
        userLoading: false,
        userData: { ...data },
        userError: "",
      },
    });
    toast.success(`اطلاعات  پروفایل با موفقیت ثبت گردید`, {
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
        userData: { ...getState().user.userData, isSuccess: false },
        userLoading: false,
        userError: errorMessage,
      },
    });
    toast.error(
      <div
        style={{ textAlign: "right", paddingRight: "10px" }}
        dangerouslySetInnerHTML={{ __html: errorMessage }}
      ></div>,
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

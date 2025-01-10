import axios from "axios";
import { useEffect, useState } from "react";
import { API_LINK } from "./cfg";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
export default function App() {
  const [list, setList] = useState([]);
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState({ auth: false });
  const [name, setName] = useState("");
  const [edit, setEdit] = useState("");
  const [page, setPage] = useState("");
  useEffect(() => {
    axios
      .get(`${API_LINK}/user/check`, {
        headers: {
          "x-auth-token": localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        const { success, userInfo } = res.data;
        if (success) {
          setRefresh(!refresh);
          setUser({ auth: true, ...userInfo });
          // console.log(user);

          setRefresh(!refresh);
        } else {
          setUser({ auth: false });
        }
      });
  }, [refresh]);
  useEffect(() => {
    axios(API_LINK + "/list/getitem?id=" + user.userId).then((d) => {
      setList(d.data?.data);
      // console.log(list);
      setRefresh(!refresh);
      // console.log(page);
    });
  }, [refresh]);
  function delFunc(id) {
    axios.delete(`${API_LINK}/list/deleteitem?id=${id}`).then(() => {
      setRefresh(!refresh);
    });
  }
  function addFunc() {
    function forma() {
      const form = new FormData();
      form.append("userId", user.userId);
      form.append("name", name);
      return form;
    }
    axios.post(`${API_LINK}/list/additem`, forma()).then(() => {
      const { suc, msg } = result.data;
      if (!suc) {
        toast.error(msg);
      } else {
        toast.success(msg);
        setRefresh(!refresh);
      }
    });
  }
  function signIn() {
    axios.post(`${API_LINK}/user/signin`, data).then((res) => {
      const { suc, msg, access_token } = res.data;
      console.log(res.data);
      if (!suc) {
        toast.error(msg);
      } else {
        toast.success(msg);
        localStorage.setItem("access_token", access_token);
        setRefresh(!refresh);
        setPage("home");
      }
    });
  }
  function editFunc(id) {
    axios.put(`${API_LINK}/list/edititem?id=${id}`, edit).then((res) => {
      const { suc, msg } = res.data;
      if (!suc) {
        toast.error(msg);
      } else {
        toast.success(msg);
      }
    });
  }

  return (
    <div className="flex relative w-full min-h-[100vh] flex-col items-center content-start ">
      <ToastContainer />
      <div className="flex ml-2.5 mt-[-20px] pt-[40px] pb-[40px] absolute top-0 w-[600px] min-h-[100vh] flex-col items-center content-start">
        <div className="flex  rounded-[18px] w-[920px] min-h-[400px] flex-col pt-[40px] bg-[#222831] items-center content-start">
          <div className="flex items-center justify-center flex-col rounded-[35px] w-[90%] h-[290px]   shadow-lg">
            <p className="text-[40px] text-[#f1f1f1] font-bold ">To-Do List</p>
            <div className="flex relative items-start justify-center mt-[20px]">
              <input
                type="text"
                className="w-[400px] h-[40px] rounded-[16px] pl-[12px] pr-[110px]"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <button
                onClick={() => {
                  addFunc();
                  setName("");
                }}
                className="w-[100px] h-[40px] bg-[#00ADB5] text-[#EEEE] font-bold absolute right-0 rounded-[16px] hover:shadow-md active:scale-90 "
              >
                Add To List
              </button>
            </div>
            {page === "home" ? null : (
              <div className="flex items-center justify-center mt-[15px] w-full gap-[10px]">
                <button
                  onClick={() => setPage("signin")}
                  className="w-[150px] flex items-center justify-center active:scale-90 h-[35px] text-[18px] rounded-full  text-[#EEEE] bg-[#86003C] shadow-md"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setPage("signup")}
                  className="w-[150px] flex items-center justify-center active:scale-90 h-[35px] text-[18px] rounded-full  text-[#EEEE] bg-[#393E46] shadow-md"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          <div className="flex  mb-[40px]  w-[90%] min-h-[400px] flex-col pt-[40px] items-start justify-start">
            {page === "signup" ? (
              <div className="flex flex-col items-start justify-start w-full min-h-[560px] p-[10px] ">
                <div className="w-full flex items-center justify-between ">
                  <p className="text-[#f1f1f2] text-[25px] mr-10">Sign Up</p>
                  <span className="w-[600px] h-[5px] rounded-full bg-[#00FFF5]"></span>
                  <span className="w-[40px] h-[5px] rounded-full bg-[#00FFF5]"></span>
                  <span className="w-[5px] h-[5px] rounded-full bg-[#00FFF5]"></span>
                </div>
                <div className="flex w-full h-[400px] justify-center items-center">
                  <div className="flex w-[500px] p-[20px] rounded-lg flex-col justify-center items-center bg-[#00ADB5] ">
                    <div className="flex relative w-[90%] h-[35px] justify-center mt-[15px] items-center active:scale-90 transition-[0.5]">
                      <i className="fas fa-user absolute left-2"></i>
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full h-[35px] pl-[28px] jc rounded-md  "
                      />
                    </div>
                    <div className="relative flex w-[90%] h-[35px] justify-center mt-[15px] items-center active:scale-90 transition-[0.5]">
                      <i className="fas fa-lock absolute left-2 "></i>
                      <input
                        type="password"
                        placeholder="password"
                        className="w-full h-[35px] pl-[28px] jc rounded-md "
                      />
                    </div>
                    <div className="relative flex w-[90%] h-[35px] justify-center mt-[15px] items-center active:scale-90 transition-[0.5]">
                      <i className="fas fa-lock absolute left-2 "></i>
                      <input
                        type="password"
                        placeholder="Repassword"
                        className="w-full h-[35px] pl-[28px] jc rounded-md "
                      />
                    </div>
                    <button className="w-[90%] bg-[#FD7014] h-[35px] rounded-md  justify-center mt-[15px] items-center font-bold text-[#495e9aee] hover:text-[#EEEE] active:scale-90 transition-[0.5] ">
                      Submit
                    </button>
                    <p className="mt-[15px] text-[#EEEE]">
                      If you have account{" "}
                      <a className="text-[blue]" href="">
                        sign in.
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : page === "signin" ? (
              <div className="flex flex-col items-start justify-start w-full min-h-[560px] p-[10px] ">
                <div className="w-full flex items-center justify-between ">
                  <p className="text-[#f1f1f2] text-[25px] mr-10">Sign In</p>
                  <span className="w-[600px] h-[5px] rounded-full bg-[#00FFF5]"></span>
                  <span className="w-[40px] h-[5px] rounded-full bg-[#00FFF5]"></span>
                  <span className="w-[5px] h-[5px] rounded-full bg-[#00FFF5]"></span>
                </div>
                <div className="flex w-full h-[400px] justify-center items-center">
                  <div className="flex w-[500px] p-[20px] rounded-lg flex-col justify-center items-center bg-[#00ADB5] ">
                    <div className="flex relative w-[90%] h-[35px] justify-center mt-[15px] items-center active:scale-90 transition-[0.5]">
                      <i className="fas fa-user absolute left-2"></i>
                      <input
                        onChange={(d) =>
                          setData({ ...data, user_name: d.target.value })
                        }
                        type="text"
                        placeholder="Username"
                        className="w-full h-[35px] pl-[28px] rounded-md  "
                      />
                    </div>
                    <div className="relative flex w-[90%] h-[35px] justify-center mt-[15px] items-center active:scale-90 transition-[0.5]">
                      <i className="fas fa-lock absolute left-2 "></i>

                      <input
                        type="password"
                        placeholder="password"
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        className="w-full h-[35px] pl-[28px] jc rounded-md "
                      />
                    </div>
                    <button
                      onClick={() => signIn()}
                      className="w-[90%] bg-[#FD7014] h-[35px] rounded-md  justify-center mt-[15px] items-center font-bold text-[#495e9aee] hover:text-[#EEEE] active:scale-90 transition-[0.5] "
                    >
                      Submit
                    </button>
                    <p className="mt-[15px] text-[#EEEE]">
                      If you don't have account
                      <a className="text-[blue]" href="">
                        create accaunt.
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : page === "home" ? (
              <div className="flex flex-col items-center justify-start w-full min-h-[500px] p-[10px] ">
                <div className="w-full flex items-center justify-between ">
                  <p className="text-[#f1f1f2] text-[25px]">You should do</p>
                  <span className="w-[500px] h-[5px] rounded-full bg-[#00FFF5]"></span>
                  <span className="w-[40px] h-[5px] rounded-full bg-[#00FFF5]"></span>
                  <span className="w-[5px] h-[5px] rounded-full bg-[#00FFF5]"></span>
                </div>
                <div className="flex flex-col justify-start pt-[45px] pl-[20px] items-start w-full min-h-[600px] ">
                  {list.map((d, key) => {
                    return (
                      <>
                        <div
                          key={key}
                          className="flex flex-col justify-start w-full min-h-[80px] items-start"
                        >
                          <div className="flex w-full p-0 justify-between items-center">
                            <p className="text-[20px] text-[#f1f1f1] flex items-center">
                              <input
                                type="checkbox"
                                className="w-[30px] h-[30px] rounded-full border-none mr-1 "
                              />
                              <b className="text-[23px] text-[#00FFF5]">
                                {d.name}
                              </b>
                            </p>
                            <p className="text-[16px] text-[#f1f1f1] flex items-center justify-center p-0">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 448 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path>
                              </svg>
                              {d.date}
                              <button
                                onClick={() => {
                                  delFunc(d._id);
                                }}
                                className="active:scale-90 w-[40px] h-[40px] rounded-full border-none ml-1 bg-[red] flex items-center justify-center text-[20px] "
                              >
                                x
                              </button>
                              <button className="w-[40px] active:scale-90 h-[40px] rounded-full border-none ml-1 bg-[#40ff00] flex items-center justify-center text-[20px] ">
                                <i className="fa-solid fa-pen text-[#222831]"></i>
                              </button>
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>asdfghjkjhgfds</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

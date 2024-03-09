import React, { useContext, useState, useEffect } from "react";
import "../components/login.css";
import Navhome from "./navhome";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useFormik } from "formik";
import { advancedSchema3 } from "../schemas";
import GoogleButton from "react-google-button";
import AuthContext from "../context/AuthContext";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import axios from 'axios';
import Spinner from "./Spinner";

const onSubmit = async (values, actions) => {
  // console.log(values);
  // console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};
const handleClick = () => {
  console.log("hi");
};

const Login = () => {
  const { loginUser } = useContext(AuthContext)
  function showFormData() {
    const formData = {
      email: getElementValue("email"),
      password: getElementValue("password"),
    };

    console.log(formData);
    try {
      loginUser(formData)
    } catch(err) {
      console.error(err)
    }
  }

  const { googleAuthenticate, pageloading } = useContext(AuthContext)

  const onGoogleLoginSuccess = async () => {
      try {
          const res = await axios.get('https://api.eesiitbhu.co.in/api/user/auth/social/o/google-oauth2?redirect_uri=http://localhost:3000/signup', {
            withCredentials: true,
        });
          console.log(res)
          window.location = res.data.authorization_url;
      } catch (err) {
          console.error(err);
      }
  };

  let location = useLocation()
  
  useEffect(() => {
      const values = queryString.parse(location.search)
      const state = values.state ? values.state : null;
      const code = values.code ? values.code : null;
  
      // console.log("State : " + state)
      // console.log("Code : " + code)
      let mounted = true;
      if(mounted) {
        try {
          googleAuthenticate(state, code)
        } catch (err) {
            console.log(err);
        }
      }
      return () => {
        mounted = false;
      }
  }, [location])

  function getElementValue(id) {
    const element = document.getElementById(id);

    // Check if the element exists before accessing its value
    return element ? element.value : "";
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: advancedSchema3,
    onSubmit,
  });

  console.log(errors);
  return ( pageloading ? <Spinner /> :
    <div
      className="flex SignUpPage  flex-col  bg-contain w-100vw h-100vh text-white justify-center items-center gap-10"
      style={{}}
    >
      <Navhome />
      <div className="SignUp-card  w-[75vw] h-[80vh]" style={{}}>
        <div
          className="SignUp-card-whiteDiv bg-contain  w-full h-[35%] flex   gap-x-6 md:gap-x-24"
          style={{}}
        >
          <div
            className="EES-logo mt-12 mx-2 md:mx-12 px-4 w-[15%] none"
            style={{ borderRight: "3px dashed black" }}
          ></div>

          <div
            className="SignUp flex my-auto  justify-center mb-[20%] items-center"
            style={{ whiteSpace: "nowrap" }}
          >
            LOG IN
          </div>
        </div>

        <div
          className="SignUp-card-blackDiv w-[96%] h-[60%] text-white  relative"
          style={{}}
        >
          <div
            className="h-[100%] w-[30%]  flex flex-col relative     none"
            style={{}}
          >
            <div className="laptopDesignElement flex justify-end  w-[100%] h-[20%]">
              <svg
                width="65%"
                height="65%"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 0V20H0" stroke="white" stroke-width="2" />
              </svg>
            </div>
            <div className="SignUp-card-blackDiv-whiteEESpattern w-full h-[50%] mt-[70%] flex justify-center items-center absolute">
              <div className="SignUp-card-blackDiv-eesdesign w-[50%] translate-x-[-1.5rem] translate-y-[0.5rem] h-[50%]  "></div>
            </div>
          </div>

          <div
            className="h-[100%] w-[30%]   overflow-hidden justify-evenly items-center text-white amaan"
            style={{}}
          >
            <form
              className="w-full h-[75%] m-2 formDiv flex justify-evenly flex-col"
              style={{}}
            >
              <div
                className="relative"
                style={{ width: "contain", gap: "2rem" }}
              >
                <label htmlFor="email"></label>
                <input
                  value={values.email}
                  onChange={handleChange}
                  id="email"
                  placeholder="EMAIL"
                  type="email"
                  className={
                    errors.email && touched.email
                      ? "input-error w-[85%] h-[20%] px-4 py-2 mb-2 text-white bg-transparent white-placeholder  "
                      : "w-[85%] h-[20%] px-4 py-2 mb-2 text-white bg-transparent white-placeholder  "
                  }
                  onBlur={handleBlur}
                  style={{
                    fontFamily: "Goldman",
                    fontSize: "18px",
                    fontStyle: "normal",
                    height: "auto",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "1.2px",
                    borderBottom: "1px solid #FFF",
                  }}
                />
                {errors.email && touched.email && (
                  <p className="error">{errors.email}</p>
                )}
              </div>

              {/* <div
                className="relative"
                style={{ width: "contain", gap: "2rem" }}
              >
                <input
                  className="w-[85%] h-[20%] px-4 py-2 mb-2 text-white bg-transparent white-placeholder "
                  type="text"
                  placeholder="EMAIL"
                  style={{
                    fontFamily: "Goldman",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "1.2px",
                    borderBottom: "1px solid #FFF",
                  }}
                />
              </div> */}

              {/* <div
                className="relative"
                style={{ width: "contain", gap: "2rem" }}
              >
                <input
                  className="w-[85%] h-[20%] px-4 py-2 mb-2 text-white bg-transparent white-placeholder "
                  type="text"
                  placeholder="COLLEGE NAME"
                  style={{
                    fontFamily: "Goldman",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "1.2px",
                    borderBottom: "1px solid #FFF",
                  }}
                />
              </div> */}

              {/* <div
                className="relative"
                style={{ width: "contain", gap: "2rem" }}
              >
                <input
                  className="w-[85%] h-[20%] px-4 py-2 mb-2 text-white bg-transparent white-placeholder "
                  type="text"
                  placeholder="YEAR"
                  style={{
                    fontFamily: "Goldman",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "1.2px",
                    borderBottom: "1px solid #FFF",
                  }}
                />
              </div> */}

              <div
                className="relative"
                style={{ width: "contain", gap: "2rem" }}
              >
                <input
                  id="password"
                  type="password"
                  placeholder="PASSWORD"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
                  style={{
                    fontFamily: "Goldman",
                    height: "auto",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "1.2px",
                    borderBottom: "1px solid #FFF",
                  }}
                />
                {errors.password && touched.password && (
                  <p className="error">{errors.password}</p>
                )}
              </div>

              {/* <div
                className="relative"
                style={{ width: "contain", gap: "2rem" }}
              >
                <input
                  className="w-[85%] h-[20%] px-4 py-2 mb-2 text-white bg-transparent white-placeholder "
                  type="text"
                  placeholder="CONFIRM PASSWORD"
                  style={{
                    fontFamily: "Goldman",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "1.2px",
                    borderBottom: "1px solid #FFF",
                  }}
                />
              </div> */}

              <div
                className=" w-[100%] h-[20%] LogInButtonForLaptop cursor-pointer "
                onClick={showFormData}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 286 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H252.554L286 32.972V72H0V0Z" fill="white" />
                  <path
                    d="M66.3953 49L66.7953 45.8V25.48H72.0753V45.16H88.6353L90.2353 48.56C90.2353 48.6667 89.8753 48.7733 89.1553 48.88C88.4353 48.96 87.1953 49 85.4353 49H66.3953ZM103.737 49C101.871 49 100.404 48.7333 99.3372 48.2C98.2705 47.6667 97.5105 46.8667 97.0572 45.8C96.6305 44.7333 96.4172 43.4133 96.4172 41.84V32.6C96.4172 31.0533 96.6305 29.76 97.0572 28.72C97.4839 27.6533 98.2305 26.8533 99.2972 26.32C100.364 25.76 101.844 25.48 103.737 25.48H115.417C117.284 25.48 118.737 25.76 119.777 26.32C120.844 26.8533 121.591 27.6533 122.017 28.72C122.471 29.76 122.697 31.0533 122.697 32.6V41.84C122.697 44.1867 122.177 45.9733 121.137 47.2C120.097 48.4 118.191 49 115.417 49H103.737ZM104.897 45.16H114.297C115.284 45.16 116.044 44.9067 116.577 44.4C117.137 43.8933 117.417 43.2 117.417 42.32V32.12C117.417 31.3467 117.137 30.6933 116.577 30.16C116.017 29.6 115.257 29.32 114.297 29.32H104.897C103.937 29.32 103.164 29.5733 102.577 30.08C101.991 30.5867 101.697 31.2667 101.697 32.12V42.32C101.697 43.2267 101.977 43.9333 102.537 44.44C103.124 44.92 103.911 45.16 104.897 45.16ZM138.612 49C136.719 49 135.239 48.7333 134.172 48.2C133.106 47.6667 132.359 46.8667 131.932 45.8C131.506 44.7333 131.292 43.4133 131.292 41.84V32.92C131.292 30.36 131.866 28.48 133.012 27.28C134.159 26.0533 136.026 25.44 138.612 25.44H150.652C152.492 25.44 153.892 25.5467 154.852 25.76C155.839 25.9467 156.332 26.1467 156.332 26.36L155.532 29.68C155.079 29.6 153.732 29.52 151.492 29.44C149.279 29.3333 146.052 29.28 141.812 29.28H139.772C137.639 29.28 136.572 30.2267 136.572 32.12V42.32C136.572 43.2267 136.799 43.9333 137.252 44.44C137.732 44.92 138.572 45.16 139.772 45.16H141.412C143.972 45.16 146.132 45.1467 147.892 45.12C149.652 45.0667 151.106 45.0267 152.252 45V39.56L149.852 39.6L144.612 40V36.08H157.492V47.32L157.892 48.16C157.892 48.3733 157.332 48.5733 156.212 48.76C155.092 48.92 153.199 49 150.532 49H138.612ZM178.278 49V25.48H183.558V49H178.278ZM193.358 49V28.68L192.958 25.48H198.718L212.318 39.72L213.878 41.88H214.318V25.48H219.598V49H214.518L200.598 34.52L199.038 32.64H198.638V49H193.358Z"
                    fill="#020202"
                  />
                </svg>
              </div>
              <Link to="/forgotpassword">
                <p className="forgotbutton">Forgot Password?</p>
              </Link>
            </form>
            <div className="w-[100%] h-[20%] flex  justify-center items-center laptopDesignElement ">
              <div
                className=" w-[100%] LogInButtonForLaptop h-[100%] "
                onClick={showFormData}
              >
                <svg
                  width="75%"
                  height="75%"
                  viewBox="0 0 45 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 0V20H0" stroke="white" stroke-width="2" />
                  <path d="M0 28H20V48" stroke="white" stroke-width="2" />
                  <path
                    d="M25 48L25 28L45 28"
                    stroke="white"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* new code for signUp button and already have an account button mobile view */}
          <div className=" button-container   flex flex-col ">
            <div className="">
              <button
                onClick={showFormData}
                type="button"
                className="SignUpBtnForMobileView"
                class="text-gray-900 bg-gray-100 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                style={{
                  width: "100%",
                  fontFamily: "Goldman",
                  padding: "1rem",
                  width: "60%",
                  fontSize: "2rem",
                }}
              >
                LOG IN
              </button>
            </div>

            <div className="    flex items-center justify-evenly">
              <div className="w-[40%]  h-[10%] ">
                <div className=" ">
                  <p
                    style={{
                      alignItems: "center",
                      font: "Goldman",
                      textAlign: "center",
                    }}
                  >
                    Create an account?
                  </p>
                </div>
                <div
                  className="loginBtn cursor-pointer relative w-[100%] h-[40%] "
                  onClick={showFormData}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 151 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_i_2109_674)">
                      <path
                        d="M23.5577 0C22.6072 0 21.713 0.450417 21.1472 1.21414L3.54562 24.9726C2.07882 26.9525 3.49214 29.7585 5.95616 29.7585H127.442C128.393 29.7585 129.287 29.308 129.853 28.5443L147.454 4.78585C148.921 2.80598 147.508 0 145.044 0H23.5577Z"
                        fill="#1B1B1E"
                      />
                    </g>
                    <path
                      d="M47.5638 19C46.9292 19 46.4625 18.972 46.1638 18.916C45.8652 18.86 45.7158 18.7947 45.7158 18.72L46.2758 17.502C46.4905 17.5393 47.0225 17.5767 47.8718 17.614C48.7305 17.642 49.9065 17.656 51.3998 17.656H51.6658C52.0672 17.656 52.3518 17.586 52.5198 17.446C52.6878 17.2967 52.7718 17.0493 52.7718 16.704V16.424C52.7718 16.0973 52.7018 15.864 52.5618 15.724C52.4312 15.584 52.1325 15.514 51.6658 15.514H48.4178C47.4752 15.514 46.7892 15.3413 46.3598 14.996C45.9305 14.6413 45.7158 14.0673 45.7158 13.274V13.05C45.7158 12.6393 45.7905 12.2613 45.9398 11.916C46.0985 11.5707 46.3645 11.2953 46.7378 11.09C47.1112 10.8753 47.6245 10.768 48.2778 10.768H52.0858C52.7205 10.768 53.2338 10.8007 53.6258 10.866C54.0178 10.9313 54.2138 11.0013 54.2138 11.076L53.9338 12.252C53.6912 12.224 53.1405 12.196 52.2818 12.168C51.4232 12.1307 50.2705 12.112 48.8238 12.112L48.6698 12.098C48.2405 12.098 47.9512 12.1867 47.8018 12.364C47.6525 12.532 47.5732 12.7467 47.5638 13.008V13.246C47.5638 13.554 47.6478 13.7873 47.8158 13.946C47.9932 14.0953 48.2825 14.17 48.6838 14.17H51.7918C52.3892 14.17 52.8978 14.2307 53.3178 14.352C53.7378 14.4733 54.0598 14.6973 54.2838 15.024C54.5078 15.3413 54.6198 15.8127 54.6198 16.438V16.662C54.6198 17.362 54.4378 17.9267 54.0738 18.356C53.7192 18.7853 53.0985 19 52.2118 19H47.5638ZM58.3419 11.846C57.9965 11.846 57.7445 11.776 57.5859 11.636C57.4272 11.496 57.3479 11.2627 57.3479 10.936C57.3479 10.6 57.4225 10.3667 57.5719 10.236C57.7305 10.096 57.9872 10.026 58.3419 10.026C58.6965 10.026 58.9532 10.096 59.1119 10.236C59.2705 10.3667 59.3499 10.6 59.3499 10.936C59.3499 11.2533 59.2705 11.4867 59.1119 11.636C58.9532 11.776 58.6965 11.846 58.3419 11.846ZM57.4879 19V12.728H59.1959V19H57.4879ZM66.6816 21.464C65.6549 21.464 64.8196 21.4547 64.1756 21.436C63.5316 21.4173 63.0369 21.3893 62.6916 21.352C62.3463 21.3147 62.1083 21.268 61.9776 21.212C61.8563 21.156 61.7956 21.0953 61.7956 21.03L62.2156 19.98C62.3649 20.0267 62.6263 20.0827 62.9996 20.148C63.3823 20.2227 63.8676 20.26 64.4556 20.26H66.8496C67.1949 20.26 67.4376 20.2087 67.5776 20.106C67.7269 20.0033 67.8016 19.8213 67.8016 19.56V18.72C67.4003 18.7947 66.9243 18.86 66.3736 18.916C65.8323 18.972 65.2069 19 64.4976 19H63.7976C63.3309 19 62.9716 18.9393 62.7196 18.818C62.4676 18.6967 62.2856 18.5427 62.1736 18.356C62.0709 18.1693 62.0056 17.9733 61.9776 17.768C61.9589 17.5627 61.9496 17.376 61.9496 17.208V14.52C61.9496 14.38 61.9589 14.212 61.9776 14.016C62.0056 13.8107 62.0709 13.61 62.1736 13.414C62.2856 13.218 62.4676 13.0547 62.7196 12.924C62.9809 12.7933 63.3403 12.728 63.7976 12.728H64.5116C65.4916 12.728 66.2523 12.7467 66.7936 12.784C67.3443 12.8213 67.7456 12.8633 67.9976 12.91L68.3616 12.728H69.5096V19.672C69.5096 19.84 69.4816 20.0267 69.4256 20.232C69.3789 20.4373 69.2809 20.6333 69.1316 20.82C68.9823 21.0067 68.7676 21.1607 68.4876 21.282C68.2076 21.4033 67.8389 21.464 67.3816 21.464H66.6816ZM64.3296 17.796H67.3676C67.5823 17.796 67.7083 17.7773 67.7456 17.74C67.7829 17.7027 67.8016 17.5813 67.8016 17.376V14.03C67.4843 14.0113 67.0829 13.9927 66.5976 13.974C66.1123 13.946 65.5943 13.932 65.0436 13.932H64.3296C63.8816 13.932 63.6576 14.1187 63.6576 14.492V17.236C63.6483 17.6093 63.8723 17.796 64.3296 17.796ZM72.2448 19V12.728H73.3928L73.9528 13.008C74.3448 12.9333 74.8161 12.868 75.3668 12.812C75.9174 12.756 76.5474 12.728 77.2568 12.728H77.9568C78.4234 12.728 78.7828 12.7933 79.0348 12.924C79.2868 13.0547 79.4641 13.218 79.5668 13.414C79.6788 13.61 79.7441 13.8107 79.7628 14.016C79.7908 14.212 79.8048 14.38 79.8048 14.52V19H78.0968V14.492C78.0968 14.1187 77.8728 13.932 77.4248 13.932H74.3728C74.1954 13.932 74.0788 13.9507 74.0228 13.988C73.9761 14.016 73.9528 14.1 73.9528 14.24V19H72.2448ZM88.9468 19.14C88.0974 19.14 87.5048 18.9113 87.1688 18.454C86.8328 17.9967 86.6648 17.39 86.6648 16.634V10.768H88.5128V16.69C88.5128 17.1287 88.6201 17.4227 88.8348 17.572C89.0494 17.7213 89.3154 17.796 89.6328 17.796H92.6008C92.8994 17.796 93.1608 17.7213 93.3848 17.572C93.6088 17.4133 93.7208 17.1193 93.7208 16.69V10.768H95.5688V16.634C95.5688 17.138 95.4988 17.5767 95.3588 17.95C95.2188 18.3233 94.9854 18.6173 94.6588 18.832C94.3321 19.0373 93.8794 19.14 93.3008 19.14H88.9468ZM98.3635 21.604V12.728H99.5115L99.8615 12.91C100.281 12.8633 100.781 12.8213 101.359 12.784C101.947 12.7467 102.615 12.728 103.361 12.728H104.075C104.542 12.728 104.901 12.7887 105.153 12.91C105.405 13.0313 105.583 13.1853 105.685 13.372C105.797 13.5587 105.863 13.7547 105.881 13.96C105.909 14.1653 105.923 14.352 105.923 14.52V17.208C105.923 17.348 105.909 17.5207 105.881 17.726C105.863 17.922 105.797 18.118 105.685 18.314C105.583 18.51 105.405 18.6733 105.153 18.804C104.901 18.9347 104.542 19 104.075 19H103.361C102.652 19 102.022 18.9813 101.471 18.944C100.921 18.9067 100.454 18.8693 100.071 18.832V21.604H98.3635ZM100.505 17.796H103.543C103.721 17.796 103.875 17.7493 104.005 17.656C104.145 17.5627 104.215 17.4227 104.215 17.236V14.492C104.225 14.2867 104.173 14.142 104.061 14.058C103.959 13.974 103.786 13.932 103.543 13.932H102.843C102.246 13.932 101.714 13.946 101.247 13.974C100.79 13.9927 100.398 14.016 100.071 14.044V17.362C100.071 17.5673 100.09 17.6933 100.127 17.74C100.174 17.7773 100.3 17.796 100.505 17.796Z"
                      fill="white"
                    />
                    <defs>
                      <filter
                        id="filter0_i_2109_674"
                        x="-4.04932"
                        y="-7"
                        width="152.099"
                        height="36.7588"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="-7" dy="-7" />
                        <feGaussianBlur stdDeviation="9.4" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow_2109_674"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="w-[10%] h-[100%] ">
                <svg
                  width="100%"
                  height="103"
                  viewBox="0 0 7 103"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2630_2)">
                    <rect
                      width="5.0784"
                      height="86.8917"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -21.04 -65.8076)"
                      fill="white"
                    />
                    <rect
                      width="5.0784"
                      height="86.8917"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -20.9463 -48.0127)"
                      fill="white"
                    />
                    <rect
                      width="5.0784"
                      height="86.8917"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -20.8535 -30.2168)"
                      fill="white"
                    />
                    <rect
                      width="5.0784"
                      height="86.8917"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -20.7598 -12.4219)"
                      fill="white"
                    />
                    <rect
                      width="5.0784"
                      height="86.8917"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -20.6665 5.375)"
                      fill="white"
                    />
                    <rect
                      width="5.0784"
                      height="86.8917"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -20.5728 23.1719)"
                      fill="white"
                    />
                    <rect
                      width="5.0784"
                      height="86.8917"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -20.4795 40.9678)"
                      fill="white"
                    />
                    <rect
                      width="5.0784"
                      height="86.8917"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -20.3867 58.7627)"
                      fill="white"
                    />
                    <rect
                      width="5.0784"
                      height="86.8917"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -20.293 76.5596)"
                      fill="white"
                    />
                    <rect
                      width="5.0784"
                      height="86.0879"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -23.4399 -61.29)"
                      fill="#1B1515"
                    />
                    <rect
                      width="5.0784"
                      height="86.0879"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -23.3467 -43.4932)"
                      fill="#1B1515"
                    />
                    <rect
                      width="5.0784"
                      height="86.0879"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -23.2529 -25.6973)"
                      fill="#1B1515"
                    />
                    <rect
                      width="5.0784"
                      height="86.0879"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -23.1592 -7.90234)"
                      fill="#1B1515"
                    />
                    <rect
                      width="5.0784"
                      height="86.0879"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -23.0664 9.89453)"
                      fill="#1B1515"
                    />
                    <rect
                      width="5.0784"
                      height="86.0879"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -22.9727 27.6904)"
                      fill="#1B1515"
                    />
                    <rect
                      width="5.0784"
                      height="86.0879"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -22.8799 45.4854)"
                      fill="#1B1515"
                    />
                    <rect
                      width="5.0784"
                      height="86.0879"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -22.7856 63.2822)"
                      fill="#1B1515"
                    />
                    <rect
                      width="5.0784"
                      height="86.0879"
                      transform="matrix(0.494059 -0.869428 0.494059 0.869428 -22.6929 81.0781)"
                      fill="#1B1515"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2630_2">
                      <rect
                        width="5.14385"
                        height="103"
                        fill="white"
                        transform="translate(0.928223)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className="w-[40%] h-[100%]  flex flex-col items-center justify-center ">
                <div className="w-[100%] h-[30%]  ">
                  <svg
                    width="45%"
                    height="45%"
                    viewBox="0 0 58 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_2109_619)">
                      <path
                        d="M10.465 18C9.065 18 7.965 17.8 7.165 17.4C6.365 17 5.795 16.4 5.455 15.6C5.135 14.8 4.975 13.81 4.975 12.63V5.7C4.975 4.54 5.135 3.57 5.455 2.79C5.775 1.99 6.335 1.39 7.135 0.99C7.935 0.57 9.045 0.360001 10.465 0.360001L19.225 0.360001C20.625 0.360001 21.715 0.57 22.495 0.99C23.295 1.39 23.855 1.99 24.175 2.79C24.515 3.57 24.685 4.54 24.685 5.7V12.63C24.685 14.39 24.295 15.73 23.515 16.65C22.735 17.55 21.305 18 19.225 18L10.465 18ZM11.335 15.12L18.385 15.12C19.125 15.12 19.695 14.93 20.095 14.55C20.515 14.17 20.725 13.65 20.725 12.99V5.34C20.725 4.76 20.515 4.27 20.095 3.87C19.675 3.45 19.105 3.24 18.385 3.24L11.335 3.24C10.615 3.24 10.035 3.43 9.595 3.81C9.155 4.19 8.935 4.7 8.935 5.34V12.99C8.935 13.67 9.145 14.2 9.565 14.58C10.005 14.94 10.595 15.12 11.335 15.12ZM50.6012 18.3C49.8012 18.3 49.0112 18.18 48.2312 17.94C47.4712 17.68 46.6012 17.06 45.6212 16.08L43.4612 13.92C42.5812 13.02 41.6112 12.36 40.5512 11.94C39.5112 11.52 38.2012 11.31 36.6212 11.31H35.6912V18L31.7312 18V2.76L31.4312 0.329999L44.7212 0.329999C46.0012 0.329999 47.0012 0.499999 47.7212 0.84C48.4612 1.18 49.0012 1.63 49.3412 2.19C49.7012 2.73 49.9312 3.31 50.0312 3.93C50.1312 4.55 50.1812 5.14 50.1812 5.7V6.27C50.1812 6.71 50.1212 7.2 50.0012 7.74C49.8812 8.28 49.6512 8.81 49.3112 9.33C48.9712 9.85 48.4812 10.29 47.8412 10.65C47.2212 11.01 46.4012 11.22 45.3812 11.28C45.6412 11.42 45.9712 11.64 46.3712 11.94C46.7712 12.22 47.1812 12.53 47.6012 12.87C48.0412 13.21 48.4412 13.52 48.8012 13.8C49.1612 14.08 49.4412 14.28 49.6412 14.4C50.3612 14.82 51.0012 15.11 51.5612 15.27C52.1212 15.43 52.5812 15.52 52.9412 15.54C53.3012 15.56 53.5112 15.57 53.5712 15.57L52.9712 18C52.7912 18.06 52.4912 18.12 52.0712 18.18C51.6512 18.26 51.1612 18.3 50.6012 18.3ZM40.1912 8.58C40.9512 8.58 41.6312 8.57 42.2312 8.55C42.8312 8.51 43.3712 8.47 43.8512 8.43C44.7312 8.33 45.3412 8.09 45.6812 7.71C46.0412 7.31 46.2212 6.8 46.2212 6.18V5.49C46.2212 4.85 46.0512 4.31 45.7112 3.87C45.3712 3.43 44.7612 3.21 43.8812 3.21L35.6912 3.21V8.43C36.5712 8.49 37.3812 8.53 38.1212 8.55C38.8612 8.57 39.5512 8.58 40.1912 8.58Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_2109_619"
                        x="0.975098"
                        y="0.330078"
                        width="56.5962"
                        height="25.9697"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_2109_619"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_2109_619"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="   w-[100%] h-[20%]">
                  {/* <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 119 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.95027 7C1.49694 7 1.16361 6.98 0.950274 6.94C0.73694 6.9 0.630273 6.85333 0.630273 6.8L1.03027 5.93C1.18361 5.95667 1.56361 5.98333 2.17027 6.01C2.78361 6.03 3.62361 6.04 4.69027 6.04H4.88027C5.16694 6.04 5.37027 5.99 5.49027 5.89C5.61027 5.78333 5.67027 5.60667 5.67027 5.36V5.16C5.67027 4.92667 5.62027 4.76 5.52027 4.66C5.42694 4.56 5.21361 4.51 4.88027 4.51H2.56027C1.88694 4.51 1.39694 4.38667 1.09027 4.14C0.783607 3.88667 0.630273 3.47667 0.630273 2.91V2.75C0.630273 2.45667 0.683607 2.18667 0.790273 1.94C0.903607 1.69333 1.09361 1.49667 1.36027 1.35C1.62694 1.19667 1.99361 1.12 2.46027 1.12H5.18027C5.63361 1.12 6.00027 1.14333 6.28027 1.19C6.56027 1.23667 6.70027 1.28667 6.70027 1.34L6.50027 2.18C6.32694 2.16 5.93361 2.14 5.32027 2.12C4.70694 2.09333 3.88361 2.08 2.85027 2.08L2.74027 2.07C2.43361 2.07 2.22694 2.13333 2.12027 2.26C2.01361 2.38 1.95694 2.53333 1.95027 2.72V2.89C1.95027 3.11 2.01027 3.27667 2.13027 3.39C2.25694 3.49667 2.46361 3.55 2.75027 3.55H4.97027C5.39694 3.55 5.76027 3.59333 6.06027 3.68C6.36027 3.76667 6.59027 3.92667 6.75027 4.16C6.91027 4.38667 6.99027 4.72333 6.99027 5.17V5.33C6.99027 5.83 6.86027 6.23333 6.60027 6.54C6.34694 6.84667 5.90361 7 5.27027 7H1.95027ZM9.13887 7V1.12H10.4589V7H9.13887ZM14.5388 7C14.0655 7 13.6955 6.93333 13.4288 6.8C13.1621 6.66667 12.9755 6.46667 12.8688 6.2C12.7621 5.93333 12.7088 5.60333 12.7088 5.21V2.98C12.7088 2.34 12.8521 1.87 13.1388 1.57C13.4255 1.26333 13.8921 1.11 14.5388 1.11H17.5488C18.0088 1.11 18.3588 1.13667 18.5988 1.19C18.8455 1.23667 18.9688 1.28667 18.9688 1.34L18.7688 2.17C18.6555 2.15 18.3188 2.13 17.7588 2.11C17.2055 2.08333 16.3988 2.07 15.3388 2.07H14.8288C14.2955 2.07 14.0288 2.30667 14.0288 2.78V5.33C14.0288 5.55667 14.0855 5.73333 14.1988 5.86C14.3188 5.98 14.5288 6.04 14.8288 6.04H15.2388C15.8788 6.04 16.4188 6.03667 16.8588 6.03C17.2988 6.01667 17.6621 6.00667 17.9488 6V4.64L17.3488 4.65L16.0388 4.75V3.77H19.2588V6.58L19.3588 6.79C19.3588 6.84333 19.2188 6.89333 18.9388 6.94C18.6588 6.98 18.1855 7 17.5188 7H14.5388ZM21.608 7V1.92L21.508 1.12H22.948L26.348 4.68L26.738 5.22H26.848V1.12H28.168V7H26.898L23.418 3.38L23.028 2.91H22.928V7H21.608ZM34.947 7.1C34.3403 7.1 33.917 6.93667 33.677 6.61C33.437 6.28333 33.317 5.85 33.317 5.31V1.12H34.637V5.35C34.637 5.66333 34.7137 5.87333 34.867 5.98C35.0203 6.08667 35.2103 6.14 35.437 6.14H37.557C37.7703 6.14 37.957 6.08667 38.117 5.98C38.277 5.86667 38.357 5.65667 38.357 5.35V1.12H39.677V5.31C39.677 5.67 39.627 5.98333 39.527 6.25C39.427 6.51667 39.2603 6.72667 39.027 6.88C38.7937 7.02667 38.4703 7.1 38.057 7.1H34.947ZM41.9732 7V1.92L41.8732 1.11H46.3032C46.7299 1.11 47.0632 1.16667 47.3032 1.28C47.5499 1.39333 47.7299 1.54333 47.8432 1.73C47.9632 1.91 48.0399 2.10333 48.0732 2.31C48.1066 2.51667 48.1232 2.71333 48.1232 2.9V3.49C48.1232 3.64333 48.0999 3.81667 48.0532 4.01C48.0066 4.19667 47.9199 4.38 47.7932 4.56C47.6666 4.73333 47.4832 4.88 47.2432 5C47.0032 5.11333 46.6899 5.17 46.3032 5.17H45.2832C44.8632 5.17 44.4699 5.16 44.1032 5.14C43.7432 5.12 43.4732 5.10333 43.2932 5.09V7H41.9732ZM43.2932 4.21H46.0132C46.3132 4.21 46.5199 4.13667 46.6332 3.99C46.7466 3.84333 46.8032 3.66667 46.8032 3.46V2.83C46.8032 2.61667 46.7466 2.43667 46.6332 2.29C46.5199 2.14333 46.3166 2.07 46.0232 2.07H43.2932V4.21ZM54.127 7L52.517 2.52H53.917L54.727 5.06L54.987 5.95H55.087L55.237 5.16L55.927 2.52H57.527L58.257 5.16L58.397 5.95H58.497L58.767 5.04L59.527 2.52H60.927L60.767 3.13L59.327 7H57.727L56.897 4.25L56.797 3.78H56.697L56.577 4.25L55.727 7H54.127ZM63.0903 1.89C62.8436 1.89 62.6636 1.84 62.5503 1.74C62.4369 1.64 62.3803 1.47333 62.3803 1.24C62.3803 1 62.4336 0.833333 62.5403 0.74C62.6536 0.64 62.8369 0.59 63.0903 0.59C63.3436 0.59 63.5269 0.64 63.6403 0.74C63.7536 0.833333 63.8103 1 63.8103 1.24C63.8103 1.46667 63.7536 1.63333 63.6403 1.74C63.5269 1.84 63.3436 1.89 63.0903 1.89ZM62.4803 7V2.52H63.7003V7H62.4803ZM67.4972 7C66.9906 7 66.6439 6.89333 66.4572 6.68C66.2706 6.46667 66.1772 6.14667 66.1772 5.72V3.38H65.3572V2.52H65.7772C65.9039 2.52 65.9939 2.5 66.0472 2.46C66.1072 2.42 66.1506 2.34 66.1772 2.22L66.3772 1.15H67.3972V2.52H69.4772V3.38H67.3972V5.73C67.3972 5.89667 67.4372 6.00667 67.5172 6.06C67.5972 6.11333 67.7172 6.14 67.8772 6.14H69.2872L69.3872 6.9C69.2472 6.92 69.0339 6.94333 68.7472 6.97C68.4606 6.99 68.1472 7 67.8072 7H67.4972ZM71.0287 7V0.52H72.2487V2.72C72.5287 2.66667 72.8654 2.62 73.2587 2.58C73.652 2.54 74.102 2.52 74.6087 2.52H75.1087C75.442 2.52 75.6987 2.56667 75.8787 2.66C76.0587 2.75333 76.1854 2.87 76.2587 3.01C76.3387 3.15 76.3854 3.29333 76.3987 3.44C76.4187 3.58 76.4287 3.7 76.4287 3.8V7H75.2087V3.78C75.2087 3.51333 75.0487 3.38 74.7287 3.38H72.5487C72.422 3.38 72.3387 3.39333 72.2987 3.42C72.2654 3.44 72.2487 3.5 72.2487 3.6V7H71.0287ZM84.5687 8.76C83.8354 8.76 83.2387 8.75333 82.7787 8.74C82.3187 8.72667 81.9654 8.70667 81.7187 8.68C81.472 8.65333 81.302 8.62 81.2087 8.58C81.122 8.54 81.0787 8.49667 81.0787 8.45L81.3787 7.7C81.4854 7.73333 81.672 7.77333 81.9387 7.82C82.212 7.87333 82.5587 7.9 82.9787 7.9H84.6887C84.9354 7.9 85.1087 7.86333 85.2087 7.79C85.3154 7.71667 85.3687 7.58667 85.3687 7.4V6.8C85.082 6.85333 84.742 6.9 84.3487 6.94C83.962 6.98 83.5154 7 83.0087 7H82.5087C82.1754 7 81.9187 6.95667 81.7387 6.87C81.5587 6.78333 81.4287 6.67333 81.3487 6.54C81.2754 6.40667 81.2287 6.26667 81.2087 6.12C81.1954 5.97333 81.1887 5.84 81.1887 5.72V3.8C81.1887 3.7 81.1954 3.58 81.2087 3.44C81.2287 3.29333 81.2754 3.15 81.3487 3.01C81.4287 2.87 81.5587 2.75333 81.7387 2.66C81.9254 2.56667 82.182 2.52 82.5087 2.52H83.0187C83.7187 2.52 84.262 2.53333 84.6487 2.56C85.042 2.58667 85.3287 2.61667 85.5087 2.65L85.7687 2.52H86.5887V7.48C86.5887 7.6 86.5687 7.73333 86.5287 7.88C86.4954 8.02667 86.4254 8.16667 86.3187 8.3C86.212 8.43333 86.0587 8.54333 85.8587 8.63C85.6587 8.71667 85.3954 8.76 85.0687 8.76H84.5687ZM82.8887 6.14H85.0587C85.212 6.14 85.302 6.12667 85.3287 6.1C85.3554 6.07333 85.3687 5.98667 85.3687 5.84V3.45C85.142 3.43667 84.8554 3.42333 84.5087 3.41C84.162 3.39 83.792 3.38 83.3987 3.38H82.8887C82.5687 3.38 82.4087 3.51333 82.4087 3.78V5.74C82.402 6.00667 82.562 6.14 82.8887 6.14ZM89.7624 7C89.3157 7 88.9824 6.91 88.7624 6.73C88.549 6.55 88.4424 6.25667 88.4424 5.85V3.8C88.4424 3.7 88.449 3.58 88.4624 3.44C88.4824 3.29333 88.529 3.15 88.6024 3.01C88.6824 2.87 88.8124 2.75333 88.9924 2.66C89.179 2.56667 89.4357 2.52 89.7624 2.52H92.5224C92.8557 2.52 93.1124 2.56667 93.2924 2.66C93.4724 2.75333 93.599 2.87 93.6724 3.01C93.7524 3.15 93.799 3.29333 93.8124 3.44C93.8324 3.58 93.8424 3.7 93.8424 3.8V5.72C93.8424 5.84 93.8324 5.97333 93.8124 6.12C93.799 6.26667 93.7524 6.40667 93.6724 6.54C93.5924 6.67333 93.4624 6.78333 93.2824 6.87C93.1024 6.95667 92.849 7 92.5224 7H89.7624ZM90.1424 6.14H92.1424C92.469 6.14 92.6324 6.00667 92.6324 5.74V3.78C92.6324 3.51333 92.469 3.38 92.1424 3.38H90.1424C89.8224 3.38 89.6624 3.51333 89.6624 3.78V5.74C89.6624 6.00667 89.8224 6.14 90.1424 6.14ZM96.9089 7C96.4622 7 96.1289 6.91 95.9089 6.73C95.6955 6.55 95.5889 6.25667 95.5889 5.85V3.8C95.5889 3.7 95.5955 3.58 95.6089 3.44C95.6289 3.29333 95.6755 3.15 95.7489 3.01C95.8289 2.87 95.9589 2.75333 96.1389 2.66C96.3255 2.56667 96.5822 2.52 96.9089 2.52H99.6689C100.002 2.52 100.259 2.56667 100.439 2.66C100.619 2.75333 100.746 2.87 100.819 3.01C100.899 3.15 100.946 3.29333 100.959 3.44C100.979 3.58 100.989 3.7 100.989 3.8V5.72C100.989 5.84 100.979 5.97333 100.959 6.12C100.946 6.26667 100.899 6.40667 100.819 6.54C100.739 6.67333 100.609 6.78333 100.429 6.87C100.249 6.95667 99.9955 7 99.6689 7H96.9089ZM97.2889 6.14H99.2889C99.6155 6.14 99.7789 6.00667 99.7789 5.74V3.78C99.7789 3.51333 99.6155 3.38 99.2889 3.38H97.2889C96.9689 3.38 96.8089 3.51333 96.8089 3.78V5.74C96.8089 6.00667 96.9689 6.14 97.2889 6.14ZM106.125 8.76C105.392 8.76 104.795 8.75333 104.335 8.74C103.875 8.72667 103.522 8.70667 103.275 8.68C103.029 8.65333 102.859 8.62 102.765 8.58C102.679 8.54 102.635 8.49667 102.635 8.45L102.935 7.7C103.042 7.73333 103.229 7.77333 103.495 7.82C103.769 7.87333 104.115 7.9 104.535 7.9H106.245C106.492 7.9 106.665 7.86333 106.765 7.79C106.872 7.71667 106.925 7.58667 106.925 7.4V6.8C106.639 6.85333 106.299 6.9 105.905 6.94C105.519 6.98 105.072 7 104.565 7H104.065C103.732 7 103.475 6.95667 103.295 6.87C103.115 6.78333 102.985 6.67333 102.905 6.54C102.832 6.40667 102.785 6.26667 102.765 6.12C102.752 5.97333 102.745 5.84 102.745 5.72V3.8C102.745 3.7 102.752 3.58 102.765 3.44C102.785 3.29333 102.832 3.15 102.905 3.01C102.985 2.87 103.115 2.75333 103.295 2.66C103.482 2.56667 103.739 2.52 104.065 2.52H104.575C105.275 2.52 105.819 2.53333 106.205 2.56C106.599 2.58667 106.885 2.61667 107.065 2.65L107.325 2.52H108.145V7.48C108.145 7.6 108.125 7.73333 108.085 7.88C108.052 8.02667 107.982 8.16667 107.875 8.3C107.769 8.43333 107.615 8.54333 107.415 8.63C107.215 8.71667 106.952 8.76 106.625 8.76H106.125ZM104.445 6.14H106.615C106.769 6.14 106.859 6.12667 106.885 6.1C106.912 6.07333 106.925 5.98667 106.925 5.84V3.45C106.699 3.43667 106.412 3.42333 106.065 3.41C105.719 3.39 105.349 3.38 104.955 3.38H104.445C104.125 3.38 103.965 3.51333 103.965 3.78V5.74C103.959 6.00667 104.119 6.14 104.445 6.14ZM110.199 7V1.46L110.099 0.66H111.419V7H110.199ZM114.589 7C114.255 7 113.999 6.95667 113.819 6.87C113.639 6.78333 113.509 6.67333 113.429 6.54C113.355 6.40667 113.309 6.26667 113.289 6.12C113.275 5.97333 113.269 5.84 113.269 5.72V3.8C113.269 3.7 113.275 3.58 113.289 3.44C113.309 3.29333 113.355 3.15 113.429 3.01C113.509 2.87 113.639 2.75333 113.819 2.66C114.005 2.56667 114.262 2.52 114.589 2.52H116.739C117.179 2.52 117.522 2.56333 117.769 2.65C118.022 2.73 118.199 2.86333 118.299 3.05C118.405 3.23667 118.459 3.48667 118.459 3.8V5.28H116.709C116.109 5.28 115.619 5.26667 115.239 5.24C114.865 5.21333 114.615 5.19667 114.489 5.19V5.74C114.482 6.00667 114.642 6.14 114.969 6.14H115.479C115.839 6.14 116.189 6.13667 116.529 6.13C116.875 6.11667 117.192 6.10333 117.479 6.09C117.765 6.07 117.995 6.05333 118.169 6.04L118.569 6.69C118.569 6.89667 117.912 7 116.599 7H114.589ZM114.489 4.42H117.239V3.78C117.239 3.64667 117.222 3.55333 117.189 3.5C117.162 3.44667 117.075 3.41333 116.929 3.4C116.782 3.38667 116.532 3.38 116.179 3.38H114.969C114.649 3.38 114.489 3.51333 114.489 3.78V4.42Z"
                      fill="white"
                    />
                  </svg> */}
                </div>

                {/* <FaGoogle /> */}

                <button className="SignUpWithGoogleBtnMobileView   w-[100%] h-[100%] flex  items-center justify-evenly bg-white rounded-md">
                  <p> Signup with Google</p>
                  {/* <GoogleIcon /> */}
                  {/* <FaGoogle /> */}
                </button>
              </div>
            </div>
          </div>

          {/*  white pattern  border  */}
          <div
            className="h-[80%] w-[10%]  flex items-center ml-[2rem] zigzagPattern "
            style={{}}
          >
            <svg
              width="100%"
              height="90%"
              viewBox="0 0 51 271"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1692_2)">
                <rect
                  x="-40"
                  y="-145.857"
                  width="20"
                  height="342.201"
                  transform="rotate(-45 -40 -145.857)"
                  fill="white"
                />
                <rect
                  x="-39.4736"
                  y="-88.8574"
                  width="20"
                  height="342.201"
                  transform="rotate(-45 -39.4736 -88.8574)"
                  fill="white"
                />
                <rect
                  x="-38.9473"
                  y="-31.8574"
                  width="20"
                  height="342.201"
                  transform="rotate(-45 -38.9473 -31.8574)"
                  fill="white"
                />
                <rect
                  x="-38.4209"
                  y="25.1426"
                  width="20"
                  height="342.201"
                  transform="rotate(-45 -38.4209 25.1426)"
                  fill="white"
                />
                <rect
                  x="-37.8945"
                  y="82.1426"
                  width="20"
                  height="342.201"
                  transform="rotate(-45 -37.8945 82.1426)"
                  fill="white"
                />
                <rect
                  x="-37.3682"
                  y="139.143"
                  width="20"
                  height="342.201"
                  transform="rotate(-45 -37.3682 139.143)"
                  fill="white"
                />
                <rect
                  x="-36.8418"
                  y="196.143"
                  width="20"
                  height="342.201"
                  transform="rotate(-45 -36.8418 196.143)"
                  fill="white"
                />
                <rect
                  x="-36.3154"
                  y="253.143"
                  width="20"
                  height="342.201"
                  transform="rotate(-45 -36.3154 253.143)"
                  fill="white"
                />
                <rect
                  x="-53.5264"
                  y="-131.384"
                  width="20"
                  height="339.036"
                  transform="rotate(-45 -53.5264 -131.384)"
                  fill="#1B1515"
                />
                <rect
                  x="-53"
                  y="-74.3848"
                  width="20"
                  height="339.036"
                  transform="rotate(-45 -53 -74.3848)"
                  fill="#1B1515"
                />
                <rect
                  x="-52.4736"
                  y="-17.3848"
                  width="20"
                  height="339.036"
                  transform="rotate(-45 -52.4736 -17.3848)"
                  fill="#1B1515"
                />
                <rect
                  x="-51.9473"
                  y="39.6152"
                  width="20"
                  height="339.036"
                  transform="rotate(-45 -51.9473 39.6152)"
                  fill="#1B1515"
                />
                <rect
                  x="-51.4209"
                  y="96.6152"
                  width="20"
                  height="339.036"
                  transform="rotate(-45 -51.4209 96.6152)"
                  fill="#1B1515"
                />
                <rect
                  x="-50.8945"
                  y="153.615"
                  width="20"
                  height="339.036"
                  transform="rotate(-45 -50.8945 153.615)"
                  fill="#1B1515"
                />
                <rect
                  x="-50.3682"
                  y="210.615"
                  width="20"
                  height="339.036"
                  transform="rotate(-45 -50.3682 210.615)"
                  fill="#1B1515"
                />
                <rect
                  x="-49.8418"
                  y="267.615"
                  width="20"
                  height="339.036"
                  transform="rotate(-45 -49.8418 267.615)"
                  fill="#1B1515"
                />
              </g>
              <defs>
                <clipPath id="clip0_1692_2">
                  <rect width="50.951" height="271" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* sign up button and already have an account  */}
          <div
            className="h-[100%] mb-[20%]  w-[30%] flex flex-col items-center relative justify-between ButtonContainerRightMostDiv "
            style={{}}
          >
            <div className="w-[100%]  h-[20%] laptopDesignElement  ">
              <svg
                width="65%"
                height="65%"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 0V20H0" stroke="white" stroke-width="2" />
              </svg>
            </div>
            <div className="w-[100%] h-[40%] flex justify-center  items-center flex-col ">
            <GoogleButton
              type="light" // can be light or dark
              onClick={onGoogleLoginSuccess}
            />
        

              {/* <div className="google-icon    h-[20%] w-auto ">
                <Link
                  to="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" mb-10 flex flex-col items-center justify-between"
                >
                  <i className="uil uil-google"></i>
                </Link>
              </div> */}
            </div>

            <div className="h-[20%] w-full">
              <div className="w-full signup-button-blackDivAlreadyHaveAnAccount">
                Create an account?
              </div>
              <Link to="/signup">
                <button className="w-full h-[70%] cursor-pointer bg-transparent pb-[1.5rem] flex items-center justify-center signup-button-blackDivAlreadyHaveAnAccountButton">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
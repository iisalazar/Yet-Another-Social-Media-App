import {
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT,
} from "../types";
import { toast } from "react-toastify";
import { cookie } from "../../utils/cookies";

const reducer = (state, action) => {
	switch (action.type) {
		case SIGNUP_SUCCESS:
			toast.success("😊 Sign up success! You may now log in ", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return state;
		case LOGIN_SUCCESS: {
			cookie.set("authToken", action.payload.token);
			toast.success("❤️ Login success! Welcome to Socialapp", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return {
				...state,
				user: action.payload.user,
				token: cookie.get("authToken"),
				isAuthenticated: true,
			};
		}
		case LOGOUT: {
			cookie.set("authToken", "");
			toast.success("👋 Logout success! Thank you for using Socialapp!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return {
				...state,
				user: null,
				token: cookie.get("authToken"),
				isAuthenticated: false,
			};
		}
		default:
			return state;
	}
};

export default reducer;

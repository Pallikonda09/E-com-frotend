// // src/pages/Login.jsx
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, clearError } from "../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Login = () => {
//   const [form, setForm] = useState({
//     email: "test@example.com",
//     password: "12345678",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, loading, error } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (user) {
//       toast.success("Login successful!");
//       navigate("/");
//     }
//     if (error) toast.error(error);

//     return () => {
//       dispatch(clearError());
//     };
//   }, [user, error, navigate, dispatch]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(form));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="email"
//             type="email"
//             autoComplete="email"
//             placeholder="Email"
//             onChange={handleChange}
//             value={form.email}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             autoComplete="current-password"
//             placeholder="Password"
//             onChange={handleChange}
//             value={form.password}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p className="text-sm mt-4 text-center">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Eye, EyeOff, Mail, Lock,
  AlertCircle, CheckCircle, LogIn,
} from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});
  const location = useLocation();


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const validateField = (name, value) => {
    const errors = {};
    if (name === "email" && (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
      errors.email = "Please enter a valid email";
    }
    if (name === "password" && (!value || value.length < 6)) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) dispatch(clearError());
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const fieldErrors = validateField(name, value);
      setValidationErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name],
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validateField(name, value);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name],
    }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(form).forEach((key) => {
      const fieldErrors = validateField(key, form[key]);
      if (fieldErrors[key]) errors[key] = fieldErrors[key];
    });
    setValidationErrors(errors);
    setTouched({ email: true, password: true });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(form));
    }
  };

  const handleDemoLogin = () => {
    setForm({ email: "demo@example.com", password: "demo123" });
    setTouched({});
    setValidationErrors({});
  };

  const redirectTo = location.state?.from?.pathname || "/dashboard";
useEffect(() => {
  if (user) {
    toast.success("Login successful!");
    navigate(redirectTo); // now runs after user is set
  }

  if (error) {
    toast.error(error);
  }

  return () => {
    dispatch(clearError());
  };
}, [user, error, navigate, redirectTo, dispatch]);

  const isFormValid = Object.keys(validationErrors).length === 0 && form.email && form.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <div className="mb-6">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 px-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-lg border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all text-sm font-medium"
            >
              🚀 Fill Demo Credentials
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="off"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={`w-full px-4 py-3 pl-11 rounded-xl border-2 ${
                  validationErrors.email && touched.email ? "border-red-300 bg-red-50" : "border-gray-200"
                } focus:outline-none`}
              />
              {validationErrors.email && touched.email && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={`w-full px-4 py-3 pl-11 pr-10 rounded-xl border-2 ${
                  validationErrors.password && touched.password ? "border-red-300 bg-red-50" : "border-gray-200"
                } focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {validationErrors.password && touched.password && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

           <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don’t have an account?{' '}
              <a href="/signup" className="text-indigo-600 hover:underline">
                Create one here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

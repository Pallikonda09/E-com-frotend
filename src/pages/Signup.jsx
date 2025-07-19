// // src/pages/SignUp.jsx
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signupUser, clearError } from "../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const SignUp = () => {
//   const [form, setForm] = useState({
//     name: "Test User",
//     email: "test@example.com",
//     password: "12345678",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, loading, error } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (user) {
//       toast.success("Signup successful!");
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
//     dispatch(signupUser(form));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="name"
//             type="text"
//             autoComplete="name"
//             placeholder="Full Name"
//             onChange={handleChange}
//             value={form.name}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//             required
//           />
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
//             autoComplete="new-password"
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
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>
//         <p className="text-sm mt-4 text-center">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:underline">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// src/pages/SignUp.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearError } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, User, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { user, loading, error } = useSelector((state) => state.auth);

  // Password strength
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(form.password);
  const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  // Real-time validation
  const validateField = (name, value) => {
    const errors = {};
    if (name === "name" && (!value || value.trim().length < 2)) errors.name = "Name must be at least 2 characters";
    if (name === "email" && (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) errors.email = "Enter a valid email";
    if (name === "password" && (!value || value.length < 8)) errors.password = "Password must be at least 8 characters";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) dispatch(clearError());
    setForm({ ...form, [name]: value });

    if (touched[name]) {
      const fieldErrors = validateField(name, value);
      setValidationErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const validateForm = () => {
    const errors = {};
    for (let key in form) {
      const fieldErrors = validateField(key, form[key]);
      if (fieldErrors[key]) errors[key] = fieldErrors[key];
    }
    setValidationErrors(errors);
    setTouched({ name: true, email: true, password: true });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(signupUser(form));
    }
  };

  useEffect(() => {
    if (user) {
      toast.success("Account created successfully! 🎉");
      navigate("/dashboard");

    }
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, error, navigate, dispatch]);

  const isFormValid = Object.keys(validationErrors).length === 0 && form.name && form.email && form.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 text-sm">Join our e-commerce platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.name}
              disabled={loading}
              className={`w-full px-4 py-3 rounded-xl border ${validationErrors.name && touched.name ? "border-red-500 bg-red-50" : "border-gray-300"} focus:outline-none`}
            />
            {validationErrors.name && touched.name && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.email}
              disabled={loading}
              className={`w-full px-4 py-3 rounded-xl border ${validationErrors.email && touched.email ? "border-red-500 bg-red-50" : "border-gray-300"} focus:outline-none`}
            />
            {validationErrors.email && touched.email && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.password}
              disabled={loading}
              className={`w-full px-4 py-3 pr-10 rounded-xl border ${validationErrors.password && touched.password ? "border-red-500 bg-red-50" : "border-gray-300"} focus:outline-none`}
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

          {/* Password Strength */}
          {form.password && (
            <div className="space-y-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Strength: {strengthLabels[passwordStrength - 1] || "Very Weak"}
              </p>
            </div>
          )}

         <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;


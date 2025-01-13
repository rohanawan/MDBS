import React from "react";
import { Formik, Form, Field } from "formik";
import { FiMail, FiLock } from "react-icons/fi";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import AuthService from "@/services/authService";
import Link from "next/link";
import showToast from "@/components/showtoast";
import { LoginSchema } from "@/validations";

const Login = () => {
  const router = useRouter();
  const handleSubmit = async (values) => {
    try {
      const response = await AuthService.Signin(values);
      if (response?.user) {
        showToast("success", "Login successful");
        router.push("/dashboard");
      } else {
        showToast("error", response?.message || "Login failed");
      }
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  return (
    <Layout>
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="z-10 w-full max-w-md space-y-8 px-4">
          <div className="text-center">
            <h1 className="text-5xl font-semibold leading-[80px] text-center text-white">
              Sign in
            </h1>
          </div>
          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="block w-full rounded-md border-0 bg-white/10 py-2 pl-10 text-white placeholder-gray-400 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="block w-full rounded-md border-0 bg-white/10 py-2 pl-10 text-white placeholder-gray-400 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    {errors.password && touched.password && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-400"
                  >
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-[#2BD17E] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-400"
                >
                  Don't have an account ? <Link href={"/signup"}>Signup</Link>
                </label>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

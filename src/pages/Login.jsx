import React from "react";
import api from "../utils/api";
import { ThreeDots } from "react-loader-spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await api.post("/api/auth/admin/login", values);
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      navigate("/");
    } catch (err) {
      console.error(err.message);
      alert("Invalid Credentials");
    }
    setSubmitting(false);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email is required";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="auth">
          <Form className="form">
            <div className="form-group">
              <Field type="email" name="email" placeholder="Email" className="form-control" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="form-group">
              <Field type="password" name="password" placeholder="Password" className="form-control" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? (
                <div className="loader">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                    }}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              ) : (
                "Login"
              )}
            </button>

            <p>
              Dont have an account? <Link to="/signup">Signup</Link>
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;

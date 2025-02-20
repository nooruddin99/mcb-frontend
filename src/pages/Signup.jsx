import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { ThreeDots } from "react-loader-spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Name is required";
        }
        if (!values.email) {
          errors.email = "Email is required";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await api.post("/api/auth/admin/signup", values);

          localStorage.setItem("token", res.data.token);
          navigate("/");
        } catch (err) {
          console.error(err.message);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <div className="auth">
          <Form className="form">
            <div className="form-group">
              <Field type="text" name="name" placeholder="Name" className="form-control" />
              <ErrorMessage name="name" component="div" />
            </div>
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
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                "Signup"
              )}
            </button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Signup;

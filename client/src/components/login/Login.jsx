import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import Path from "../../path";

const LoginFormKeys = {
    Email: "email",
    Password: "password",
};
export default function Login() {
    const { loginSubmitHandler, isAuthenticated } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(
        {
            [LoginFormKeys.Email]: "",
            [LoginFormKeys.Password]: "",
        },
        loginSubmitHandler
    );

    return (
        <>
            <div className={styles.login}>
                <div className={styles.loginForm}>
                    <h2 className={styles.loginTitle}>Влез</h2>
                    <form onSubmit={onSubmit}>
                        <label className={styles.loginLabels} htmlFor="email">Е-мейл:</label>
                        <input
                            className={styles.loginFields}
                            type="text"
                            name={LoginFormKeys.Email}
                            value={values[LoginFormKeys.Email]}
                            onChange={onChange}
                            placeholder="username"
                        />

                        <label className={styles.loginLabels} htmlFor="password">Парола:</label>
                        <input
                            className={styles.loginFields}
                            type="password"
                            name={LoginFormKeys.Password}
                            value={values[LoginFormKeys.Password]}
                            onChange={onChange}
                            placeholder="********"
                        />

                        <button className={styles.loginBtn} type="submit">
                            Вход
                        </button>
                    </form>
                </div>
            </div >
            {isAuthenticated && <Navigate to={Path.NotFound} />
            }
        </>
    );
}

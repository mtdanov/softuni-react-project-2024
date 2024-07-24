import { useContext } from "react";
import { Link } from "react-router-dom";


import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

const RegisterFormKeys = {
    Name: "name",
    LastName: 'lastName',
    Email: "email",
    Password: "password",
    RePass: "rePass",
    Country: 'country',
    City: 'city',
    Street: 'street',
    StreetNumber: 'streetNumber'
};

export default function Register() {
    const { registerSubmitHandler, isAuthenticated } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(
        {
            [RegisterFormKeys.Name]: "",
            [RegisterFormKeys.LastName]: "",
            [RegisterFormKeys.Email]: "",
            [RegisterFormKeys.Password]: "",
            [RegisterFormKeys.RePass]: "",
            [RegisterFormKeys.Country]: "",
            [RegisterFormKeys.City]: "",
            [RegisterFormKeys.Street]: "",
            [RegisterFormKeys.StreetNumber]: "",
        },
        registerSubmitHandler
    );

    return (
        <div className="register">
            <form onSubmit={onSubmit} className='register-form'>
                <h2>Регистрация</h2>
                <div className="register-fields">
                    <label className="register-label" htmlFor="firstName">Име</label>
                    <input className="register-inputs" type="text" id="firstName" name={RegisterFormKeys.Name} value={values[RegisterFormKeys.Name]} onChange={onChange} required />
                </div>
                <div className="register-fields">
                    <label className="register-label" htmlFor="lastName">Фамилия</label>
                    <input className="register-inputs" type="text" id="lastName" name={RegisterFormKeys.LastName} value={values[RegisterFormKeys.LastName]} onChange={onChange} required />
                </div>
                <div className="register-fields">
                    <label className="register-label" htmlFor="country">Държава</label>
                    <input className="register-inputs" type="text" id="country" name={RegisterFormKeys.Country} value={values[RegisterFormKeys.Country]} onChange={onChange} required />
                </div>
                <div className="register-fields">
                    <label className="register-label" htmlFor="city">Град</label>
                    <input className="register-inputs" type="text" id="city" name={RegisterFormKeys.City} value={values[RegisterFormKeys.City]} onChange={onChange} required />
                </div>
                <div className="register-fields">
                    <label className="register-label" htmlFor="streetNumber">Улица</label>
                    <input className="register-inputs" type="text" id="street" name={RegisterFormKeys.Street} value={values[RegisterFormKeys.Street]} onChange={onChange} required />
                </div>
                <div className="register-fields">
                    <label className="register-label" htmlFor="streetNumber">Номер на улица</label>
                    <input className="register-inputs" type="text" id="streetNumber" name={RegisterFormKeys.StreetNumber} value={values[RegisterFormKeys.StreetNumber]} onChange={onChange} required />
                </div>
                <div className="register-fields">
                    <label className="register-label" htmlFor="email">Имейл</label>
                    <input className="register-inputs" type="email" id="email" name={RegisterFormKeys.Email} value={values[RegisterFormKeys.Email]} onChange={onChange} required />
                </div>
                <div className="register-fields">
                    <label className="register-label" htmlFor="password">Парола</label>
                    <input className="register-inputs" type="password" id="password" name={RegisterFormKeys.Password} value={values[RegisterFormKeys.Password]} onChange={onChange} required />
                </div>
                <div className="register-fields">
                    <label className="register-label" htmlFor="confirmPassword">Повтори парола</label>
                    <input className="register-inputs" type="password" id="confirmPassword" name={RegisterFormKeys.RePass} value={values[RegisterFormKeys.RePass]} onChange={onChange} required />
                </div>
                <div className="register-fields">
                    <button className="register-btn" type="submit">
                        Регистрация
                    </button>
                </div>
                <p className="have-acc">
                    Вече имаш регистрация?
                    <Link to="/login">
                        <span className="login-here"> Влез тук</span>
                    </Link>
                </p>
            </form>
        </div >
    )
}
import css from './ErrorMessage.module.css';

function ErrorMessage({ message = 'Whoops, something went wrong! Please try reloading this page!' }) {
    return (
        <p className={css.errorMessage}>{message}</p>
    );
}

export default ErrorMessage;
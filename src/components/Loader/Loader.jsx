import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.loaderContainer}>
      <div className={css.spinner}></div>
    </div>
  );
}

export default Loader;
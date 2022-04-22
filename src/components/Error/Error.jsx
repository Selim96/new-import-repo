import s from './Error.module.css';
import errorimage from '../errorImg/404.webp';

function Error() {
    return (
        <div className={s.errorbox}>
            <img src={errorimage} alt="" className={s.errorImg} width='400' height='400'/>
        </div>
    );
};

export default Error;
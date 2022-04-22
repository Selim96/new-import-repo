import s from './Loader.module.css';  
import CircleLoader from "react-spinners/CircleLoader";
// import { Bars } from 'react-loader-spinner';  

export default function Loader() {
    return (
        <div className={s.LoaderBox}>
            {/* <Bars color="rgb(45, 81, 201)" height={50} width={50} /> */}
            <CircleLoader color="rgb(45, 81, 201)" size={50} />
        </div>
    )
}
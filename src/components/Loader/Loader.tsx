import LoaderStyles from "./Loader.module.less";
import Spinner from "./Spinner.tsx";

const Loader = () => {
  return <div className={LoaderStyles.loaderContainer}><Spinner /></div>;
};
export default Loader;
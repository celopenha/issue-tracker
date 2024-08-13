import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssuePage = () => {
  return (
    <div className="max-w -xl">
      <Skeleton />
      <Skeleton count={8} />
    </div>
  );
};

export default LoadingNewIssuePage;

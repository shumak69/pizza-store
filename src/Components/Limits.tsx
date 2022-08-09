import { useDispatch, useSelector } from "react-redux";
import { setLimits } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";
import classNames from "classnames";
import { useEffect, useRef } from "react";
function Limits() {
    const isMounted = useRef(false)
  const dispatch = useDispatch();
  const limits = useSelector<RootState, number>((state) => state.filter.limits);
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("limits", String(limits));
    }
    isMounted.current = true;
  }, [limits]);
  console.log(limits);
  return (
    <div className="content__limits">
      <div
        className={classNames("content__limits-four", { active: 4 === limits })}
        onClick={() => dispatch(setLimits(4))}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        className={classNames("content__limits-eight", {
          active: 8 === limits,
        })}
        onClick={() => dispatch(setLimits(8))}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Limits;

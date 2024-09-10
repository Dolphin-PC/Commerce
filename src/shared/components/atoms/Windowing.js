import { jsx as _jsx } from "react/jsx-runtime";
import { useInView } from "react-intersection-observer";
const Windowing = ({ options, children }) => {
    const { ref, inView } = useInView(options);
    return _jsx("div", { ref: ref, children: inView && children });
};
export default Windowing;

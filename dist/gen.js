import { getResult } from "./utils";
const gen = ({ level, mask }) => {
    try {
        return getResult({ level, mask });
    }
    catch (_a) {
        return gen({ level, mask });
    }
};
export default gen;

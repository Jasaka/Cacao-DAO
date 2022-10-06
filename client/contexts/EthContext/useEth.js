import { useContext } from "react";
import EthContext from "./EthContext.js";

const useEth = () => useContext(EthContext);

export default useEth;

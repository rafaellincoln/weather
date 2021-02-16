import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Spinner = () => {
  return (
    <div className="w-100vw h-100vh center">
      <Loader type="Oval" color="#00BFFF" height={200} width={200} />
    </div>
  )
}
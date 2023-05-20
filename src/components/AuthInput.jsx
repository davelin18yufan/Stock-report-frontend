export const AuthContainer = ({children}) => {
  return (
    <div className=" h-full bg-login bg-cover bg-no-repeat py-5 sm:pt-[90px] sm:h-screen">
      <div className="w-1/2 mx-auto lg:max-w-[500px] bg-white bg-opacity-80 rounded-lg py-3">
        {children}
      </div>
    </div>
  )
}

export const LogoTitle = ({title}) => {
  return (
    <div className="w-full ">
      <h5 className="text-dark-green text-4xl font-bold text-center">
        LOGO
      </h5>
      <h2 className=" text-3xl text-center font-bold p-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-green-800">
        {title}
      </h2>
    </div>
  )
}

export const InputCard = ({label, placeholder, name, type }) => {
  return (
    <div className="w-4/5 bg-[#F5F8FA] my-4 px-2.5 mx-auto dark:bg-gray-700">
      <label className="block pb-0.5 text-dark-green dark:text-neutral-300">{label}</label>
      <input type={type} name={name} placeholder={placeholder} className="inputDefault inputDefault:hover inputDefault:focus dark:hover:border-sky-700 dark:focus:border-sky-700 dark:placeholder-gray-500/50"></input>
    </div>
  )
}

export const SubmitBtn = ({submit}) => {
  return (
    <button className="w-full btn btn:hover dark:bg-slate-400 dark:text-sky-700">{submit}</button>
  )
}
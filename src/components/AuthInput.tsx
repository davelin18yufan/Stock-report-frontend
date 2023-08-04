import { ChangeEventHandler } from "react";
import { ChildrenProp } from "types/user";

export const AuthContainer = ({ children }: ChildrenProp) => {
  return (
    <div className=" h-full bg-login bg-cover bg-no-repeat py-5 sm:pt-[90px] sm:h-screen">
      <div className="w-1/2 mx-auto lg:max-w-[500px] bg-white bg-opacity-80 rounded-lg py-3">
        {children}
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <div className="pl-5 py-2 contrast-100 bg-inherit text-center ">
      <h1 className="text-xl sm:text-3xl font-logo text-dark-green uppercase whitespace-nowrap animate-[letterMove_3s_alternate_ease-in-out_infinite]">
        Momentum
      </h1>
    </div>
  );
};

export const LogoTitle = ({ title }: { title: string }) => {
  return (
    <div className="">
      <Logo />
      <h2 className=" text-xl sm:text-2xl text-center font-bold p-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-green-800">
        {title}
      </h2>
    </div>
  );
};

export const InputCard = ({
  label,
  placeholder,
  name,
  type,
  onChange,
  disabled,
}: {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
}) => {
  return (
    <div className="w-4/5 bg-[#F5F8FA] my-4 px-2.5 mx-auto dark:bg-gray-700">
      <label
        className="block pb-0.5 text-dark-green dark:text-neutral-300"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className="inputDefault inputDefault:hover inputDefault:focus dark:placeholder-gray-500/50 "
        onChange={(e) => onChange?.(e)}
        disabled={disabled}
      ></input>
    </div>
  );
};

export const SubmitBtn = ({
  submit,
  onSubmit,
}: {
  submit: string;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="w-full btn btn:hover dark:bg-slate-400 dark:text-sky-700"
      onClick={onSubmit}
    >
      {submit}
    </button>
  );
};

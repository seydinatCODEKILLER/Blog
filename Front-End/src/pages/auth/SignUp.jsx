/* eslint-disable react/no-unescaped-entities */
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { LuUser2, LuMail, LuLock } from "react-icons/lu";
const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="p-3 max-w-4xl mx-auto flex flex-col md:flex-row gap-5 md:items-center">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via bg-purple-500 to-pink-600 rounded-lg text-white">
              AfroCode
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 text-gray-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
            voluptas temporibus architecto dignissimos iste repellat, maxime et
            rem aliquid quibusdam quod doloribus suscipit eaque fugiat, labore,
            sequi magni possimus quia?
          </p>
        </div>
        {/* Right */}
        <div className="flex-1">
          <form>
            <div className="flex flex-col gap-2">
              <Label value="username" />
              <TextInput
                type="text"
                placeholder="Your username"
                id="username"
                rightIcon={LuUser2}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="email" />
              <TextInput
                type="eamil"
                placeholder="Your email"
                id="email"
                rightIcon={LuMail}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="password" />
              <TextInput
                type="password"
                placeholder="Your password"
                id="password"
                rightIcon={LuLock}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="w-full mt-3"
            >
              S'inscrire
            </Button>
          </form>
          <div className="mt-5">
            <span>tu as déja un compte ? </span>
            <Link to="/connexion" className="text-blue-500">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

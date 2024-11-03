/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { LuMail, LuLock } from "react-icons/lu";
import { useState } from "react";
const SignIn = () => {
  //State...

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  //Handle Function..

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setErrorMessage("Please fill out all fields");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/auth/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      const data = await response.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label value="email" />
              <TextInput
                onChange={handleChange}
                type="eamil"
                placeholder="Your email"
                id="email"
                rightIcon={LuMail}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="password" />
              <TextInput
                onChange={handleChange}
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
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Spinner size="sm" />
                  <span>Chargement...</span>
                </div>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
          <div className="mt-5">
            <span>Vous n'avez de compte ? </span>
            <Link to="/inscription" className="text-blue-500">
              S'inscrire
            </Link>
            {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

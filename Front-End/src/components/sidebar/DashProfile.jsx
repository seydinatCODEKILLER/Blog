import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { LuUser2, LuMail, LuLock } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {};
  return (
    <div className="max-w-xl w-full p-3 mx-auto">
      <h1 className="font-semibold text-3xl my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="self-center h-32 w-32 cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilPicture}
            alt="user"
            className="w-full h-full object-cover border-2 border-gray-100 rounded-full"
          />
        </div>
        <TextInput
          type="text"
          defaultValue={currentUser.username}
          id="username"
          rightIcon={LuUser2}
        />
        <TextInput
          type="email"
          defaultValue={currentUser.email}
          id="email"
          rightIcon={LuMail}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          rightIcon={LuLock}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 mt-5">
        <span className="text-start cursor-pointer">Supprimer le compte</span>
      </div>
    </div>
  );
};

export default DashProfile;

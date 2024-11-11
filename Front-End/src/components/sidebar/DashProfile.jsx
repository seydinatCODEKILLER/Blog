import { Button, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { LuUser2, LuMail, LuLock } from "react-icons/lu";
import { useRef, useState } from "react";
import { updateProfilePicture } from "../../redux/user/userSlice";

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser.profilPicture);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("profilPicture", imageFile);
    formData.append("userId", currentUser._id);

    try {
      const response = await fetch(
        `/api/user/upload_profile/${currentUser._id}`,
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log(data.imageUrl);
      dispatch(updateProfilePicture(data.imageUrl));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      if (error.response) {
        console.error("Server response:", error.response);
      }
    }
  };

  return (
    <div className="max-w-xl w-full p-3 mx-auto">
      <h1 className="font-semibold text-3xl my-7 text-center">Profile</h1>

      {/* Formulaire de mise à jour de la photo de profil */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadImage();
        }}
        className="flex flex-col gap-4 items-center mb-8"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="h-32 w-32 cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilPicture}
            alt="user"
            className="w-full h-full object-cover border-2 border-gray-100 rounded-full"
          />
        </div>
        {imageFile && (
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            Mettre à jour la photo
          </Button>
        )}
      </form>

      {/* Formulaire de mise à jour des autres informations utilisateur */}
      <form className="flex flex-col gap-4">
        <TextInput
          type="text"
          defaultValue={currentUser.username}
          id="username"
          name="username"
          rightIcon={LuUser2}
        />
        <TextInput
          type="email"
          defaultValue={currentUser.email}
          id="email"
          name="email"
          rightIcon={LuMail}
        />
        <TextInput
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          rightIcon={LuLock}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Mettre à jour les informations
        </Button>
      </form>

      <div className="text-red-500 mt-5">
        <span className="text-start cursor-pointer">Supprimer le compte</span>
      </div>
    </div>
  );
};

export default DashProfile;

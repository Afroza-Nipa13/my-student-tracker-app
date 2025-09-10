import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import imageUpload from '../utils/ImageUpload';

const ProfilePage = () => {
    const { user, UpdateProfile } = useAuth();
    const { register, handleSubmit, setValue } = useForm();
    const axiosSecure = useAxiosSecure();
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    
    useEffect(() => {
        if (user) {
            setValue("displayName", user.displayName || "");
            setValue("phone", user.phone || "");
            setValue("address", user.address || "");
        }
    }, [user]);

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = await imageUpload(file);
        setSelectedImageFile(imageUrl);
    };

   const onSubmit = async (data) => {
        try {
            let imageUrl = user.photoURL;

            if (selectedImageFile) {
                imageUrl = await imageUpload(selectedImageFile);
            }

            const updatedProfile = {
                displayName: data.displayName,
                phone: data.phone,
                address: data.address,
                photoURL: imageUrl,
            };

            // Firebase profile update
            await UpdateProfile(updatedProfile);

            // MongoDB update
            const res = await axiosSecure.patch(`/users/${user.email}`, updatedProfile);

            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated!',
                    text: '✅ Your profile has been updated successfully.',
                    confirmButtonColor: '#3085d6'
                });
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: '❌ Failed to update your profile. Please try again.',
                confirmButtonColor: '#d33'
            });
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10">
            {/* Banner */}
            <div className="relative w-full h-80 rounded-xl bg-no-repeat bg-center bg-contain">
                <img
                    src="https://i.postimg.cc/Y01VsxNC/blue-3.jpg"
                    alt="Banner"
                    className="w-full h-full object-bottom rounded-2xl"
                />
                {/* Profile Picture */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/Y3fKn7F/default-avatar.jpg"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <label
                            htmlFor="photoUpload"
                            className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer"
                        >
                            <input
                                type="file"
                                id="photoUpload"
                                className="hidden"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                            <span className="text-sm"><FaCamera /></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold">{user?.displayName || "User Name"}</h2>
                <p className="text-sm text-gray-500 mt-1 uppercase badge badge-warning">{user?.role || "User"}</p>
            </div>

            {/* Edit Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 bg-base-50 p-6 rounded-lg shadow space-y-4"
            >
                <input
                    type="text"
                    placeholder="Name"
                    {...register("displayName")}
                    className="input input-bordered w-full"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={user?.email}
                    className="input input-bordered w-full"
                    disabled
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phone")}
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                    className="input input-bordered w-full"
                />

                <button className="btn btn-primary w-full">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;

import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import useAuth from '../hooks/useAuth';
import bannerImg from "../assets/toolkit.jpg";
import printedBg from '../assets/leaf-bg.jpg';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaCross, FaPenAlt } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { MdModeEditOutline } from 'react-icons/md';

const ClassSchedule = () => {
    const { user } = useAuth();
    console.log(user)
    const axiosSecure = useAxiosSecure();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        subject: "",
        time: "",
        day: "",
        instructor: "",
        color: "#4CAF50"
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editId, setEditId] = useState(null);

    // Fetch user's classes from database
    useEffect(() => {
        if (user?.email) {
            fetchClasses();
        }
    }, [user]);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get(`/classes?email=${user.email}`);
            setClasses(response.data);
        } catch (error) {
            console.error("Error fetching classes:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load your classes. Please try again.",
                confirmButtonColor: "#3085d6",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.subject || !form.time || !form.day) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill all required fields before adding a class.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        try {
            const classData = {
                ...form,
                userEmail: user.email,
                createdAt: new Date()
            };

            if (editId) {
                // Update existing class
                const response = await axiosSecure.put(`/classes/${editId}`, classData);
                if (response.data.modifiedCount > 0) {
                    setClasses(classes.map(cls => cls._id === editId ? { ...classData, _id: editId } : cls));
                    
                    Swal.fire({
                        icon: "success",
                        title: "Updated!",
                        text: "Class updated successfully.",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            } else {
                // Add new class
                const response = await axiosSecure.post("/classes", classData);
                if (response.data.insertedId) {
                    setClasses([...classes, { ...classData, _id: response.data.insertedId }]);
                    
                    Swal.fire({
                        icon: "success",
                        title: "Added!",
                        text: "New class added successfully.",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            }

            // Reset form
            setForm({ subject: "", time: "", day: "", instructor: "", color: "#4CAF50" });
            setEditIndex(null);
            setEditId(null);

        } catch (error) {
            console.error("Error saving class:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to save class. Please try again.",
                confirmButtonColor: "#3085d6",
            });
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = (index) => {
  Swal.fire({
    title: "Edit Class?",
    text: "Do you want to edit this class?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, edit",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      const classToEdit = classes[index];
      
      // Use functional update to ensure proper state merging
      setForm(prevForm => ({
        ...prevForm, // Keep existing form values
        subject: classToEdit.subject || "",
        time: classToEdit.time || "",
        day: classToEdit.day || "",
        instructor: classToEdit.instructor || "",
        color: classToEdit.color || "#4CAF50"
      }));
      
      setEditIndex(index);
      setEditId(classToEdit._id);

      Swal.fire({
        icon: "info",
        title: "Edit Mode",
        text: "You can now edit the selected class.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};

    const handleDelete = (index) => {
        const classToDelete = classes[index];
        
        Swal.fire({
            title: "Are you sure?",
            text: "This class will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/classes/${classToDelete._id}`);
                    if (response.data.deletedCount > 0) {
                        setClasses(classes.filter((_, i) => i !== index));
                        
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Class has been deleted successfully.",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                } catch (error) {
                    console.error("Error deleting class:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to delete class. Please try again.",
                        confirmButtonColor: "#3085d6",
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your schedule...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  flex flex-col items-center">
              {/* Header Banner */}
                        <div
                            style={{
                                backgroundImage: `url(${printedBg})`,
                                backgroundRepeat: 'repeat',
                                backgroundPosition: 'center',
                            }}
                            className="flex flex-col lg:flex-row justify-between w-full mx-auto shadow-2xl border-4 border-gray-300 rounded-lg overflow-hidden"
                        >
                            <div className="bg-[#92a8d1] text-gray-100 lg:w-1/2 p-8 space-y-4 flex flex-col justify-center">
                                <h1 className="text-2xl font-bold mb-6"> Class Schedule Tracker</h1>
            <p className="text-gray-600 mb-6">Welcome, <span className='font-bold'>{user?.displayName || user?.email}</span>! Here's your personal class schedule.</p>
                                <div className="flex flex-wrap gap-3 mt-4">
                                   
                                   
                                </div>
                            </div>
                            <div className="lg:w-1/2 h-64 lg:h-auto">
                                <img
                                    className="w-full h-full object-cover"
                                    src={bannerImg} 
                                    alt="Budget planning" 
                                />
                            </div>
                        </div>
            

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 w-full max-w-lg my-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject *"
                        value={form.subject}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                    <select
                        name="day"
                        value={form.day}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Day *</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </select>
                    <input
                        type="text"
                        name="instructor"
                        placeholder="Instructor"
                        value={form.instructor}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <div className="flex items-center gap-2">
                        <label>Color:</label>
                        <input
                            type="color"
                            name="color"
                            value={form.color}
                            onChange={handleChange}
                            className="border rounded h-10 w-10"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-slate-500 text-white px-4 py-2 rounded mt-4 hover:bg-slate-600 w-full"
                >
                    {editId ? "Update Class" : "Add Class"}
                </button>
            </form>

            {/* Class Table */}
            <div className="w-full max-w-3xl  shadow-md rounded-lg overflow-hidden">
                {classes.length === 0 ? (
                    <div className="text-center p-6">
                        <p className="text-gray-500 mb-4">No classes added yet.</p>
                        <p className="text-sm text-gray-400">Add your first class using the form above!</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="">
                            <tr>
                                <th className="p-2 text-left">Subject</th>
                                <th className="p-2 text-left">Time</th>
                                <th className="p-2 text-left">Day</th>
                                <th className="p-2 text-left">Instructor</th>
                                <th className="p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((cls, index) => (
                                <tr key={cls._id} style={{ backgroundColor: cls.color + "33" }}>
                                    <td className="p-2 font-semibold" style={{ color: cls.color }}>
                                        {cls.subject}
                                    </td>
                                    <td className="p-2">{cls.time}</td>
                                    <td className="p-2">{cls.day}</td>
                                    <td className="p-2">{cls.instructor || "-"}</td>
                                    <td className="p-2 text-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="bg-yellow-100 px-2 py-1 rounded hover:text-white hover:bg-yellow-500"
                                            title="Edit"
                                        >
                                           <MdModeEditOutline />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="bg-red-100 text-red-500 hover:text-white px-2 py-1 rounded hover:bg-red-500"
                                            title="Delete"
                                        >
                                            <ImCross />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ClassSchedule;
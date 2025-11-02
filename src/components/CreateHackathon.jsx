import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateHackathon = () => {
  const [formData, setFormData] = useState({
    hackathonTitle: "",
    hackathonType: "",
    hackathonDescription: "",
    hackathonDeadline: "",
    teamRequired: "",
    hackathonPostImage: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, hackathonPostImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await axios.post(
        "http://localhost:1001/hackathons/createhackathon",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success("Hackathon created successfully!");
        setFormData({
          hackathonTitle: "",
          hackathonType: "",
          hackathonDescription: "",
          hackathonDeadline: "",
          teamRequired: "",
          hackathonPostImage: null,
        });
        navigate("/hackathons");
      }
    } catch (err) {
      toast.error("Failed to create hackathon");
    
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex justify-center items-center text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-[#252526] p-8 rounded-xl shadow-lg w-full max-w-2xl border border-[#2C2C2C]"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-400">
          Create Hackathon
        </h2>

       
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Hackathon Title
          </label>
          <input
            type="text"
            name="hackathonTitle"
            value={formData.hackathonTitle}
            onChange={handleChange}
            required
            className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

   
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Hackathon Type
          </label>
          <input
            type="text"
            name="hackathonType"
            value={formData.hackathonType}
            onChange={handleChange}
            placeholder="AI, Web Dev, Open Innovation..."
            required
            className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

   
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            name="hackathonDescription"
            value={formData.hackathonDescription}
            onChange={handleChange}
            required
            rows="4"
            className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

     
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Deadline</label>
          <input
            type="date"
            name="hackathonDeadline"
            value={formData.hackathonDeadline}
            onChange={handleChange}
            required
            className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

  
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Team Members Required
          </label>
          <input
            type="number"
            name="teamRequired"
            value={formData.teamRequired}
            onChange={handleChange}
            required
            min="1"
            className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

  
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">
            Upload Hackathon Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-blue-400 text-sm"
          />
        </div>

    
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-md"
        >
          Create Hackathon
        </button>
      </form>
    </div>
  );
};

export default CreateHackathon;

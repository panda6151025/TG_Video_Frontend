import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

function VideoUploader() {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos"); // Replace with your actual API endpoint
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const handleUpload = async () => {
    if (!title || !videoFile) {
      alert("Please provide a title and select a video file.");
      return;
    }
    setTitle("");
    setVideoFile(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      setVideos(videos.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit video with ID:", id);
  };

  return (
    <div className="max-w-4xl p-8 mx-auto">
      <div className="p-6 mb-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Upload Video</h2>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleUpload}
          className="w-full px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Video List</h2>
        <table className="min-w-full bg-gray-100 rounded-lg">
          <thead>
            <tr>
              <th className="px-5 py-3 font-medium text-left text-gray-700 bg-gray-200">
                Title
              </th>
              <th className="px-5 py-3 font-medium text-center text-gray-700 bg-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id} className="border-b border-gray-200">
                <td className="px-5 py-3">{video.title}</td>
                <td className="flex justify-center px-5 py-3 space-x-4">
                  <button
                    onClick={() => handleEdit(video._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VideoUploader;

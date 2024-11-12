import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function VideoUploader() {
  const [title, setTitle] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://tg-video-server.vercel.app/api/video/videoTitle"
        );
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const handleAddVideo = async () => {
    if (!title || !sourceUrl) {
      alert("Please provide a title and a source URL.");
      return;
    }

    try {
      const response = await axios.post(
        "https://tg-video-server.vercel.app/api/video/addVideo",
        { title, source: sourceUrl }
      );
      const newVideo = response.data.video;
      setVideos((prevVideos) => [...prevVideos, newVideo]);
      setTitle("");
      setSourceUrl("");
    } catch (error) {
      console.error("Error adding video:", error);
      alert("There was an error adding the video.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://tg-video-server.vercel.app/api/video/delVideo/${id}`
      );
      setVideos(videos.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("There was an error deleting the video.");
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto">
      <div className="p-6 mb-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Add Video</h2>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="url"
          placeholder="Video Source URL"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddVideo}
          className="w-full px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Add Video
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

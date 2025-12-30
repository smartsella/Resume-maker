import React from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResumeTemplates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Choose Template
            </h1>
            <p className="text-gray-600">Select a resume template</p>
          </div>

          {/* Back to Dashboard */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft />
            Back to Editor
          </button>
        </div>

        {/* STATIC Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Classic Template */}
          <div
            onClick={() => navigate("/abc")}
            className="bg-white rounded-lg shadow-md border-2 border-gray-200 cursor-pointer hover:shadow-lg transition"
          >
            <div className="h-32 bg-blue-600 rounded-t-lg flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Classic</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Classic</h3>
              <p className="text-sm text-gray-600 mt-1">
                Traditional resume format
              </p>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <FaCheck className="text-sm" />
                <span className="text-sm font-medium">Select</span>
              </div>
            </div>
          </div>

          {/* Creative Template */}
          <div
            onClick={() => navigate("/def")}
            className="bg-white rounded-lg shadow-md border-2 border-gray-200 cursor-pointer hover:shadow-lg transition"
          >
            <div className="h-32 bg-purple-500 rounded-t-lg flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Creative</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Creative</h3>
              <p className="text-sm text-gray-600 mt-1">
                Modern creative layout
              </p>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <FaCheck className="text-sm" />
                <span className="text-sm font-medium">Select</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;

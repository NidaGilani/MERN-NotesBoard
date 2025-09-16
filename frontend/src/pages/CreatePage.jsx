import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All Fields are Required");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post("/notes", { title, content });
      toast.success("Note Created Successfully!");
      navigate("/");
    } catch (error) {
      console.log("error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down!. You're creating note too fast.", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create Note.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="lable">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    placeholder="Note Title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="lable">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    value={content}
                    placeholder="Write Your Note Here..."
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea textarea-bordered h-32"
                  ></textarea>
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

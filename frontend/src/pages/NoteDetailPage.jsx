import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("error in fetchNote block", error);
        if (error.response.status === 429) {
          toast.error("Too many requests. Try again after some time.", {
            duration: 4000,
            icon: "💀",
          });
        } else {
          toast.error("Error in fetching the  Note. Try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note Deleted");
      navigate("/");
    } catch (error) {
      console.log("error in handleDelete block");
      toast.error("Failed to Delete note.");
    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add title or content");
      return;
    }
    setSaving(true);
    try {
      await axiosInstance.put(`/notes/${id}`, note);
      toast.success("Note Updated Successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in handleSave block", error);
      toast.error("Failed to Update the Note");
    } finally{
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              type="submit"
              className="btn btn-error btn-outline"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="lable">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  value={note?.title || ""}
                  placeholder="Note Title"
                  onChange={(e) => setNote({...note, title: e.target.value})}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-4">
                <label className="lable">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  value={note?.content || ""}
                  placeholder="Write Your Note Here..."
                  onChange={(e) => setNote({...note, content: e.target.value})}
                  className="textarea textarea-bordered h-32"
                ></textarea>
              </div>
              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

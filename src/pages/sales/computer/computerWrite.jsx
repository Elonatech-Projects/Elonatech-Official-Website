import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./computer.css";
import { toast } from "react-toastify";
import { AiOutlineDashboard } from "react-icons/ai";
import { BASEURL } from '../../../BaseURL/BaseURL';

const ComputerWrite = () => {
  const getInitialState = () => "Computer";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [odd, setOdd] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(getInitialState);
  const [images, setImages] = useState([]);
  const [specs, setSpecs] = useState({
    series: "",
    model: "",
    weight: "",
    dimension: "",
    item: "",
    color: "",
    hardware: "",
    os: "",
    processor: "",
    number: "",
    memory: "",
    ram: "",
    drive: "",
    display: "",
    resolution: "",
    graphics: "",
    voltage: "",
    battery: "",
    wireless: "",
  });

  const navigate = useNavigate();

  // 🔹 Update specs dynamically
  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setSpecs((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle numeric-only input
  const handleChangePrice = (e) => setPrice(e.target.value.replace(/\D/g, ""));
  const handleChangeOdd = (e) => setOdd(e.target.value.replace(/\D/g, ""));
  const handleChangeQuantity = (e) =>
    setQuantity(e.target.value.replace(/\D/g, ""));

  // 🔹 Handle image selection
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // 🔹 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("odd", odd);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("computerProperty", JSON.stringify(specs));

      images.forEach((file) => formData.append("images", file));

      const response = await axios.post(
        `${BASEURL}/api/v1/product/create`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("✅ Product Added Successfully!");
      console.log("Response:", response.data);
      setImages([]);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(error.response?.data?.message || "⚠️ Upload failed");
    }
  };

  return (
    <>
      <div
        className="container-fluid bg-secondary py-5"
        style={{
          height: "500px",
          backgroundImage:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://res.cloudinary.com/elonatech/image/upload/v1726245491/admin_computer_page_fwqmqh.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="py-5 mt-5">
          <h2 className="mt-5 text-white text-center">Computer Editor</h2>
          <h5 className="mt-4 text-white text-center">
            Design and launch new computer products with ease and precision.
          </h5>
          <p className="lead text-white text-center">
            Use our Computer Editor to craft detailed product listings, manage
            specifications, and showcase features effectively.
          </p>
        </div>
      </div>

      <div className="dashboard">
        <Link to="/dashboard" className="btn btn-outline-primary btn-sm me-3 dash">
          <AiOutlineDashboard className="icon" /> Dashboard
        </Link>
      </div>

      <div className="computer-write container my-5 py-5">
        <h4 className="text-center pt-4 fw-bold pb-4">Computer Product Upload</h4>

        {/* BASIC DETAILS */}
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Gadget Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label fw-bold">Brand</label>
            <input
              type="text"
              className="form-control"
              placeholder="Brand Name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mt-2">
            <label className="fw-bold">Price</label>
            <input
              type="text"
              className="form-control"
              value={price}
              onChange={handleChangePrice}
              placeholder="Enter price"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">File</label>
            <input
              onChange={handleImage}
              type="file"
              className="form-control"
              multiple
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Computer">Computer</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mt-2 mb-3">
            <label className="fw-bold">Discount</label>
            <input
              type="text"
              className="form-control"
              value={odd}
              onChange={handleChangeOdd}
              placeholder="Enter discount"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Quantity</label>
            <input
              type="text"
              className="form-control"
              placeholder="Quantity"
              value={quantity}
              onChange={handleChangeQuantity}
            />
          </div>
        </div>

        {/* ===================== SPECS TABLE ===================== */}
        <table className="table table-bordered">
          <tbody>
            {Object.keys(specs).map((key) => (
              <tr key={key}>
                <th className="w-40 text-capitalize">{key}</th>
                <td className="w-60">
                  <input
                    type="text"
                    name={key}
                    value={specs[key]}
                    onChange={handleSpecChange}
                    className="form-control border-0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===================== DESCRIPTION ===================== */}
        <div className="mb-3">
          <label className="form-label fw-bold">Description</label>
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </div>
        </div>

        <div className="col-md-5 mt-3">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default ComputerWrite;

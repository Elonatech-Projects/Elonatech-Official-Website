import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./shopWrite.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { AiOutlineDashboard } from "react-icons/ai";
// import { BASEURL } from '../../../BaseURL/BaseURL'

const ShopWrite = () => {
  const getInitialState = () => "Pos";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [odd, setOdd] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(getInitialState);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  // ✅ Helper function to convert base64 -> File
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // 🔹 Price, Discount, Quantity Handlers
  const handleChangePrice = (e) => setPrice(e.target.value.replace(/\D/g, ""));
  const handleChangeOdd = (e) => setOdd(e.target.value.replace(/\D/g, ""));
  const handleChangeQuantity = (e) => setQuantity(e.target.value.replace(/\D/g, ""));

  // 🔹 Handle image upload
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("odd", odd);
      formData.append("quantity", quantity);
      formData.append("category", category);

      // ✅ Convert base64 images -> File objects
      images.forEach((image, index) => {
        const blob = dataURLtoFile(image, `image_${index}.jpg`);
        formData.append("images", blob);
      });

      console.log("FormData keys:", Array.from(formData.keys()));
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File ->`, value.name, value.size, value.type);
        } else {
          console.log(`${key}:`, value);
        }
      }

      const response = await axios.post(
        `https://backend-api-mbln.onrender.com/api/v1/product/create`,
        formData
      );

      console.log("API Response:", response.data);

      toast.success("✅ Product Added Successfully");
      setName("");
      setDescription("");
      setPrice("");
      setBrand("");
      setOdd("");
      setQuantity("");
      setImages([]);
      navigate("/shop");
    } catch (error) {
      console.error("Error during API call:", error);
      let err = 'error has occur'
      if (isAxiosError(error)) {
        err = error.response.data.message;
      }
    }
  };

  return (
    <>
      <div
        className="container-fluid bg-secondary py-5"
        style={{
          height: "500px",
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://res.cloudinary.com/elonatech/image/upload/v1726158347/Shop-banner-test_wgekev.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="py-5 mt-5">
          <h2 className="mt-5 text-white text-center">Shop Editor</h2>
          <h5 className="mt-4 text-white text-center">
            Effortlessly manage and customize your online store with our Shop Editor.
          </h5>
          <p className="lead text-white text-center">
            Optimize your e-commerce platform with intuitive tools that help you
            streamline operations, enhance user experience, and boost sales.
          </p>
        </div>
      </div>

      <div className="dashboard">
        <Link to="/dashboard" className="btn btn-outline-primary btn-sm me-3 dash">
          <AiOutlineDashboard className="icon" /> Dashboard
        </Link>
      </div>

      <div className="container bg-size py-5" style={{ marginTop: "5rem" }}>
        <h2 className="text-center mb-5 fw-bold">
          Upload Office Equipment, POS System, Printers and Network Devices
        </h2>

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
          <div className="mb-3 mt-2 col-md-4">
            <label className="fw-bold">Price</label>
            <input
              type="text"
              className="form-control"
              value={price}
              onChange={handleChangePrice}
              placeholder="Enter price"
            />
          </div>

          <div className="mb-3 col-md-4">
            <label className="form-label fw-bold">File</label>
            <input
              onChange={handleImage}
              type="file"
              name="image"
              className="form-control"
              multiple
            />
          </div>

          <div className="mb-3 col-md-4">
            <label className="form-label fw-bold">Categories</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Pos System">POS System</option>
              <option value="Office">Office</option>
              <option value="Printer">Printer</option>
              <option value="Network">Network Devices</option>
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

        <div className="mb-3">
          <label className="form-label fw-bold">Description</label>
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              onChange={(value) => setDescription(value)}
              value={description}
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

export default ShopWrite;
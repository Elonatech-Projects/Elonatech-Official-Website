import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./shopUpdate.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../../../BaseURL/BaseURL";
import { toast } from "react-toastify";

const ShopUpdate = () => {
  const getInitialState = () => {
    const value = "Pos";
    return value;
  };

  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [odd, setOdd] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(getInitialState);

  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
  const [weight, setWeight] = useState("");
  const [dimension, setdimension] = useState("");
  const [item, setItem] = useState("");
  const [color, setColor] = useState("");
  const [hardware, setHardware] = useState("");
  const [os, setOs] = useState("");
  const [processor, setProcessor] = useState("");
  const [number, setNumber] = useState("");
  const [memory, setMemory] = useState("");
  const [ram, setRam] = useState("");
  const [drive, setDrive] = useState("");
  const [display, setDisplay] = useState("");
  const [resolution, setResolution] = useState("");
  const [graphics, setGraphics] = useState("");
  const [voltage, setVoltage] = useState("");
  const [battery, setBattery] = useState("");
  const [wireless, setWireless] = useState("");


  const [images, setImages] = useState([]);

  // Handle Price
  const handleChangePrice = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPrice(value);
  };

  // Handle Odd
  const handleChangeOdd = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setOdd(value);
  };
  // Handle Quantity
  const handleChangeQuantity = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setQuantity(value);
  };

  //handle images
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
      };
    });
  };

  const navigate = useNavigate();

  // fetch data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BASEURL}/api/v1/product/${id}`);

        setName(res.data.product.name);
        setDescription(res.data.product.description);
        setPrice(res.data.product.price);
        setOdd(res.data.product.odd);
        setCategory(res.data.product.category);
        setBrand(res.data.product.brand);
        setQuantity(res.data.product.quantity);
        setSeries(res.data.product.computerProperty[0].series);
        setModel(res.data.product.computerProperty[0].model);
        setWeight(res.data.product.computerProperty[0].weight);
        setdimension(res.data.product.computerProperty[0].dimension);
        setItem(res.data.product.computerProperty[0] .item);
        setColor(res.data.product.computerProperty[0].color);
        setHardware(res.data.product.computerProperty[0].hardware);
        setOs(res.data.product.computerProperty[0].os);
        setProcessor(res.data.product.computerProperty[0].processor);
        setNumber(res.data.product.computerProperty[0].number);
        setMemory(res.data.product.computerProperty[0].memory);
        setRam(res.data.product.computerProperty[0].ram);
        setDrive(res.data.product.computerProperty[0].drive);
        setDisplay(res.data.product.computerProperty[0].display);
        setResolution(res.data.product.computerProperty[0].resolution);
        setGraphics(res.data.product.computerProperty[0].graphics);
        setVoltage(res.data.product.computerProperty[0].voltage);
        setBattery(res.data.product.computerProperty[0].battery);
        setWireless(res.data.product.computerProperty[0].wireless);


      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, []);

  //submit the form
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newData = {
        name,
        description,
        price,
        odd,
        brand,
        quantity,
        category,
        series,
        model,
        weight,
        dimension,
        item,
        color,
        hardware,
        os,
        processor,
        number,
        memory,
        ram,
        drive,
        display,
        resolution,
        graphics,
        voltage,
        battery,
        wireless,
        images
      };
      await axios.put(`${BASEURL}/api/v1/product/${id}/update`, newData);
      toast.success("Product Updated Successfully");
      setImages([]);
      navigate(`/product/${id}`)
    } catch (error) {
      toast.warning("Please Fill All Required Fields");
    }
  };

  // image

  const handleSubmitImage = async (e) => {
    try {
      e.preventDefault();
      const newData = {
        name,
        description,
        price,
        odd,
        brand,
        category,
        images
      };

      await axios.put(`${BASEURL}/api/v1/product/${id}/update/image`, newData);
      toast.success("Product Images Updated Successfully");
      setImages([]);
      navigate(`/product/${id}`);
    } catch (error) {
      toast.warning("Added New Product Images");
    }
  };

  return (
    <>
      <div
        class="container-fluid  py-5 "
        style={{
          height: "500px",
          background: "#11253d",
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://res.cloudinary.com/elonatech/image/upload/v1726158347/Shop-banner-test_wgekev.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div class="py-5 mt-5 ">
          <h2 class=" mt-5 text-white text-center">Product Update</h2>
          <h5 class=" mt-4 text-white text-center"></h5>
          <p class="lead text-white text-center"></p>
        </div>
      </div>
      <div
        className=" container bg-size mt-5 mb-5 "
        style={{ marginTop: "0rem" }}
      >
        <h2 className="text-center mb-5 fw-bold">
          Update Office Equipment, POS System, Printers and Network Devices
        </h2>
        <div className="">
          <div className="row">
            <div class="mb-3 col-md-6">
              <label for="exampleInputEmail1" class="form-label fw-bold">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Gadget Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3 col-md-6">
              <label for="exampleInputEmail1" class="form-label fw-bold">
                Brand
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mt-2 mb-3">
              <label for="price" className="fw-bold">
                Price
              </label>
              <input
                type="text"
                id="price"
                class="form-control"
                value={price}
                onChange={handleChangePrice}
                name="price"
                placeholder="Enter price"
              ></input>
            </div>
            <div class="mb-3 col-md-4">
              <label for="formFile" class="form-label fw-bold">
                File
              </label>
              <input
                onChange={handleImage}
                type="file"
                id="formupload"
                name="image"
                className="form-control"
                multiple
              />
            </div>
            <div class="mb-3 col-md-4">
              <label for="exampleInputEmail1" class="form-label fw-bold">
                Categories
              </label>
              <select
                class="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="inputGroupSelect01"
              >
                <option value="Pos System">POS System</option>
                <option value="Computer">Computer</option>
                <option value="Office">Office</option>
                <option value="Printer">Printer</option>
                <option value="Network">Network Devices</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-2 mb-3">
              <label for="price" className="fw-bold">
                Discount
              </label>
              <input
                type="text"
                id="price"
                class="form-control"
                value={odd}
                onChange={handleChangeOdd}
                name="price"
                placeholder="Enter price"
              ></input>
            </div>
            <div class=" col-md-6 mb-3 ">
              <label for="exampleInputEmail1" class="form-label fw-bold">
                Quantity
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Quantity"
                value={quantity}
                onChange={handleChangeQuantity}
                aria-describedby="emailHelp"
              />
            </div>
          </div>

          {/*  */}
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Description
            </label>
            <div className="editorContainer" id="exampleFormControlTextarea1">
              <ReactQuill
                className="editor"
                theme="snow"
                value={description}
                onChange={(value) => setDescription(value)}
              />
            </div>
          </div>

          {/* =====================  Table ===================  */}
          {category === "Computer" ? (
            <>
              <table class="table table-bordered" style={{ width: "100%" }}>
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" style={{ width: "40%" }}>
                      Series
                    </th>
                    <td style={{ width: "60%" }}>
                      {" "}
                      <input
                        type="text"
                        value={series}
                        onChange={(e) => setSeries(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Item model number</th>
                    <td colspan="2">
                      <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Item Weight</th>
                    <td>
                      <input
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Product Dimensions</th>
                    <td>
                      <input
                        type="text"
                        value={dimension}
                        onChange={(e) => setdimension(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Item Dimensions LxWxH</th>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Color</th>
                    <td>
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Hardware Platform</th>
                    <td>
                      <input
                        type="text"
                        value={hardware}
                        onChange={(e) => setHardware(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Operating System</th>
                    <td>
                      <input
                        type="text"
                        value={os}
                        onChange={(e) => setOs(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Processor Brand</th>
                    <td>
                      <input
                        type="text"
                        value={brand}
                        onChange={(e) => setProcessor(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Number of Processors</th>
                    <td>
                      <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Computer Memory Type</th>
                    <td>
                      <input
                        type="text"
                        value={memory}
                        onChange={(e) => setMemory(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">RAM</th>
                    <td>
                      <input
                        type="text"
                        value={ram}
                        onChange={(e) => setRam(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Hard Drive</th>
                    <td>
                      <input
                        type="text"
                        value={drive}
                        onChange={(e) => setDrive(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Screen display size</th>
                    <td>
                      <input
                        type="text"
                        value={display}
                        onChange={(e) => setDisplay(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Screen Resolution</th>
                    <td>
                      <input
                        type="text"
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Graphics Comprocessor</th>
                    <td>
                      <input
                        type="text"
                        value={graphics}
                        onChange={(e) => setGraphics(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Voltage</th>
                    <td>
                      <input
                        type="text"
                        value={voltage}
                        onChange={(e) => setVoltage(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Batteries</th>
                    <td>
                      <input
                        type="text"
                        value={battery}
                        onChange={(e) => setBattery(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Wireless Type</th>
                    <td>
                      <input
                        type="text"
                        value={wireless}
                        onChange={(e) => setWireless(e.target.value)}
                        class="form-control form-controli border-0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <></>
          )}
          {/* ============================================================ */}
          <div className="col-md-5 mt-3 d-flex">
            <button
              type="submit"
              class="btn btn-warning me-3"
              onClick={handleSubmit}
            >
              Update Content
            </button>
            <button
              type="submit"
              class="btn btn-success"
              onClick={handleSubmitImage}
            >
              Update Image
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopUpdate;
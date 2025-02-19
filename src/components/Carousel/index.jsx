import React, { useEffect, useState } from "react";
import APICarousel from "../../services/carousel";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

const Carousel = () => {
  const [formData, setFormData] = useState({
    title_uz: "",
    title_ru: "",
    title_en: "",
    body_uz: "",
    body_ru: "",
    body_en: "",
  });
  const [file, setFile] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // Tahrirlanayotgan element IDsi

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    if (type === "file") setFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataToSend.append(key, value)
    );
    if (file) formDataToSend.append("rasm", file);

    try {
      if (editingId) {
        await APICarousel.patch(editingId, formDataToSend);
      } else {
        await APICarousel.post(formDataToSend);
      }
      alert("Ma'lumot saqlandi!");
      setFormData({
        title_uz: "",
        title_ru: "",
        title_en: "",
        body_uz: "",
        body_ru: "",
        body_en: "",
      });
      setFile(null);
      setEditingId(null); // Tahrirlashni bekor qilish
      getData();
    } catch (err) {
      console.error("Xatolik yuz berdi:", err);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await APICarousel.get();
      setContent(data);
      setError(null);
    } catch (err) {
      setError("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title_uz: item.title_uz,
      title_ru: item.title_ru,
      title_en: item.title_en,
      body_uz: item.body_uz,
      body_ru: item.body_ru,
      body_en: item.body_en,
    });
    setFile(null);
  };

  const handleDelete = async (id) => {
    try {
      await APICarousel.del(id);
      getData();
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-5 text-center">Carousel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sarlavha */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="title_uz"
          >
            <h3>
              Sarlavha <span className="text-red-500">uz</span>
            </h3>
            <input
              type="text"
              id="title_uz"
              name="title_uz"
              value={formData.title_uz}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="title_ru"
          >
            <h3>
              Sarlavha <span className="text-red-500">ru</span>
            </h3>
            <input
              type="text"
              id="title_ru"
              name="title_ru"
              value={formData.title_ru}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="title_en"
          >
            <h3>
              Sarlavha <span className="text-red-500">en</span>
            </h3>
            <input
              type="text"
              id="title_en"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>

        {/* Body */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="body_uz"
          >
            <h3>
              Batafsil <span className="text-red-500">uz</span>
            </h3>
            <input
              type="text"
              id="body_uz"
              name="body_uz"
              value={formData.body_uz}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="body_ru"
          >
            <h3>
              Batafsil <span className="text-red-500">ru</span>
            </h3>
            <input
              type="text"
              id="body_ru"
              name="body_ru"
              value={formData.body_ru}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="body_en"
          >
            <h3>
              Batafsil <span className="text-red-500">en</span>
            </h3>
            <input
              type="text"
              id="body_en"
              name="body_en"
              value={formData.body_en}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>

        {/* Rasm */}
        <div className="grid gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="rasm"
          >
            <h3>
              Carousel <span className="text-red-500">rasmi</span>
            </h3>
            <input
              type="file"
              id="rasm"
              name="rasm"
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-500 flex justify-center items-center gap-1 h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95 "
        >
          {editingId ? "Tahrirlash" : "Saqlash"}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border-collapse border border-gray-300 mt-8 mb-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Rasm</th>
            <th className="border border-gray-300 p-2">Sarlavha</th>
            <th className="border border-gray-300 p-2">Batafsil</th>
            <th className="border border-gray-300 p-2">Tahrirlash/O'chirish</th>
          </tr>
        </thead>
        <tbody>
          {content?.map((item) => (
            <tr key={item.id} className="border border-gray-300">
              <td className="border p-2">
                <img
                  src={item?.rasm}
                  alt="Rasm"
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="border p-2">
                <p>
                  <strong>UZ:</strong> {item?.title_uz}
                </p>
                <p>
                  <strong>RU:</strong> {item?.title_ru}
                </p>
                <p>
                  <strong>EN:</strong> {item?.title_en}
                </p>
              </td>
              <td className="border p-2">
                <p>
                  <strong>UZ:</strong> {item?.body_uz}
                </p>
                <p>
                  <strong>RU:</strong> {item?.body_ru}
                </p>
                <p>
                  <strong>EN:</strong> {item?.body_en}
                </p>
              </td>
              <td className="flex justify-center mt-5">
                <div className="flex justify-center items-center gap-3">
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 flex justify-center items-center p-2 text-white font-bold rounded "
                    onClick={() => handleEdit(item)}
                  >
                    <MdOutlineEdit size={20} />
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 flex justify-center items-center p-2 text-white font-bold rounded "
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Carousel;

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { AppwriteContext } from "../context/AppwriteContext"; // Adjust the path as needed
import { useAppwrite } from "../../appwrite/AppwriteContext";

const AddProductForm = () => {
  const { createDocument, uploadImage } = useAppwrite();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      price: Yup.number().positive("Price must be positive").required("Price is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        let uploadedImage = null;

        // Upload image if selected
        if (imageFile) {
          const response = await uploadImage(imageFile);
          uploadedImage = response ? response.$id : null;
        }

        // Save product data to Appwrite
        const productData = {
          title: values.title,
          price: values.price,
          description: values.description,
          image: uploadedImage,
        };

        await createDocument(productData); // Correct function for adding new products
        alert("Product added successfully!");
        formik.resetForm();
        setImagePreview(null);
      } catch (error) {
        console.error("Error adding product:", error);
      }
      setLoading(false);
    },
  });

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        
        {/* Title Field */}
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded-lg p-2"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          )}
        </div>

        {/* Price Field */}
        <div>
          <label className="block text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded-lg p-2"
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm">{formik.errors.price}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded-lg p-2"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white p-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

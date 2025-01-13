import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Formik, Field, Form } from "formik";
import Layout from "@/components/layout";
import { GoPlus } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import MovieService from "@/services/movieService";
import { put } from "@vercel/blob";
import showToast from "@/components/showtoast";
import { MovieSchema } from "@/validations";

const Movie = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const inputFileRef = useRef();
  const router = useRouter();
  const { query } = router;
  const token = process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN;
  const initialFormValues = {
    title: query.title || "",
    publishingYear: query.year || "",
  };

  useEffect(() => {
    if (query.image) {
      setImageUrl(query.image);
    }
  }, [query.image]);

  // Handle drag-and-drop file selection
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      inputFileRef.current = { files: [file] };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const uploadImage = async (file) => {
    if (!file) {
      throw new Error("Please select an image");
    }
    return await put(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/images/upload",
      token,
    });
  };

  const handleUpdate = async (values) => {
    const { title, publishingYear } = values;
    let blob;

    try {
      if (!imageUrl) {
        const file = inputFileRef.current?.files[0];
        blob = await uploadImage(file);
      } else {
        blob = { url: imageUrl };
      }

      const data = {
        title,
        publishingYear,
        image: blob?.url,
      };

      const response = await MovieService.UpdateMovie(query?.id, data);

      if (response?.movie) {
        showToast("success", "Movie Updated Successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      showToast("error", error.message || "Failed to update movie");
    }
  };

  const handleSubmit = async (values) => {
    const { title, publishingYear } = values;

    try {
      const file = inputFileRef.current?.files[0];
      const newBlob = await uploadImage(file);

      const data = {
        title,
        publishingYear,
        image: newBlob.url,
      };

      const response = await MovieService.create(data);

      if (response?.movie?.title) {
        showToast("success", "Movie Added Successfully");
        router.push("/dashboard");
      } else {
        showToast(
          "error",
          response?.message || "Failed to add the Movie. Please try again."
        );
      }
    } catch (error) {
      console.error("Error adding Movie:", error);
      showToast("error", error.message || "Error adding Movie");
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-screen p-[6rem]">
        <div
          className="flex items-center gap-2 mb-8 cursor-pointer w-fit"
          onClick={() => router.back()}
        >
          <IoMdArrowRoundBack className="text-white" size={26} />
          <h1 className="text-xl font-bold text-white">Go Back</h1>
        </div>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-16">
            {query.title ? "Edit Movie" : "Create a New Movie"}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              {...getRootProps()}
              className={`bg-[#224957] aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragActive ? "border-gray-300" : "border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <GoPlus className="w-8 h-8 mb-2" />
                  <span>
                    {isDragActive
                      ? "Drop the image here"
                      : "Drop an image here"}
                  </span>
                </div>
              )}
            </div>

            {/* Form */}
            <Formik
              initialValues={initialFormValues}
              validationSchema={MovieSchema}
              onSubmit={
                query?.title && query?.image ? handleUpdate : handleSubmit
              }
              enableReinitialize
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <Field
                      name="title"
                      placeholder="Title"
                      className={`block w-full border-[#224957] rounded-md bg-[#003745] px-4 py-2 text-white placeholder-gray-400 
                        border ${
                          errors.title && touched.title
                            ? "border-[#EB5757]"
                            : "border-[#224957]"
                        } 
                        focus:border-[#224957] focus:ring-0 focus:outline-none
                    `}
                    />
                    {errors.title && touched.title && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.title}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Field
                      type="text"
                      name="publishingYear"
                      placeholder="Publishing year"
                      className={`block w-full border-[#224957] rounded-md bg-[#003745] px-4 py-2 text-white placeholder-gray-400 
                        border ${
                          errors.publishingYear && touched.publishingYear
                            ? "border-[#EB5757]"
                            : "border-[#224957]"
                        } 
                        focus:border-[#224957] focus:ring-0 focus:outline-none
                    `}
                    />
                    {errors.publishingYear && touched.publishingYear && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.publishingYear}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      variant="outline"
                      className="border border-white flex-1 px-4 py-3 rounded-md bg-transparent text-white border-white hover:bg-white/10"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 bg-emerald-500 rounded-md text-white hover:bg-emerald-600"
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : initialFormValues.title || initialFormValues.year
                        ? "Update"
                        : "Submit"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Movie;

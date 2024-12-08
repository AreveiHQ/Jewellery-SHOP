"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import {Button,Dialog,DialogHeader,DialogBody,DialogFooter,Input,Select,Option} from "@material-tailwind/react";

const validationSchema = Yup.object().shape({
    slideImage: Yup.mixed().required("Image is required"),
    links: Yup.string()
    .test(
      'is-url-or-path',
      'The field must be a valid URL or path',
      (value) => {
        if (!value) return false;

        // Check if it's a valid URL
        try {
          new URL(value);
          return true;
        } catch (e) {
          // Not a valid URL, so check if it's a valid path format
          const pathRegex = /^(\/[\w\-]+)+$/;
          return pathRegex.test(value);
        }
      }
    )
    .required('This field is required'),
    section: Yup.string().required("Section is required"),
});

export default function UploadPage() {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(null);

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleOpen = () => setOpen(!open);

    const onSubmit = async (data) => {
        try {
            console.log(data)
            const formData = new FormData();
            formData.append("links", data.links);
            formData.append("section", data.section);
            formData.append("slideImage", data.slideImage[0]);


            const response = await axios.post("/admin/slides/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Upload successful:", response.data);
            setOpen(false);  // Close modal on successful upload
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // setValue("images", e.target.files); // Set file for form submission
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Button onClick={handleOpen} color="purple">
                Upload Slide
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Upload Slide</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Input
                                type="file"
                                {...register("slideImage")}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            {errors.slideImage && <p className="text-red-500 text-sm">{errors.slideImage.message}</p>}
                            {preview && <img src={preview} alt="Preview" className="w-full h-48 object-cover mt-2" />}
                        </div>

                        {/* Link Input */}
                        <div>
                            <Input
                                type="text"
                                label="Link"
                                {...register("links")}
                                error={!!errors.links}
                            />
                            {errors.links && <p className="text-red-500 text-sm">{errors.links.message}</p>}
                        </div>

                        {/* Section Select */}
                        <Controller
                            name="section"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Select Section"
                                    {...field}
                                    error={!!errors.section}
                                >
                                    <Option value="Hero Slider">Hero Slider</Option>
                                    <Option value="About Slider">About Slider</Option>
                                </Select>
                            )}
                        />
                        {errors.section && <p className="text-red-500 text-sm">{errors.section.message}</p>}

                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="green"
                            >
                                Upload
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>
        </div>
    );
};


import { CloudUpload } from "@mui/icons-material";
import { Avatar, Button, Typography } from "@mui/joy";
import { Card, CardContent, Divider } from "@mui/joy";
import { useState } from "react";
import toast from "react-hot-toast";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handlePreview = (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setImageUrl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.image.files[0], e.target.image.name);
    fetch("https://g92sth-8080.csb.app/api/photo/new", {
      credentials: "include",
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((msg) => {
        toast.success(msg);
        setImageUrl(null);
      })
      .catch(() => {});
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <Card className="w-full" variant="outlined">
        <Typography
          level="title-lg"
          startDecorator={
            <Avatar>
              <CloudUpload />
            </Avatar>
          }
        >
          Upload an Image
        </Typography>
        <Divider />
        <CardContent>
          <form
            action="https://g92sth-8080.csb.app/api/photo/new"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center justify-center my-6 mx-6 space-y-2">
              <Button variant="outlined" size="lg" component="label">
                Pick {imageUrl ? "another" : "an"} image
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  hidden
                  onChange={handlePreview}
                />
              </Button>
              {imageUrl && <img src={imageUrl} alt="Preview image" />}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="plain" onClick={handleCancel}>
                Cancel
              </Button>
              {imageUrl ? (
                <Button type="submit" variant="solid">
                  Upload
                </Button>
              ) : (
                <Button disabled>Upload</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUpload;

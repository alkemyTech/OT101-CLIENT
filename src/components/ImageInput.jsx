import { useState } from 'react';
import { Box, FormHelperText } from '@material-ui/core';

const ImageInput = ({error, image = null, name = 'image', onChange = e => null }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(image);

  const handleChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
    onChange(e.target.files[0]);
  };

  return (
    <>
      { imageURL && (
        <Box mt={2} textAlign="center">
          <div>Vista previa:</div>
          <img src={imageURL} alt={selectedImage ? selectedImage.name : ''} height="100px" />
        </Box>
      )}
      <input
        id={name}
        name={name}
        accept="image/*"
        type="file"
        onChange={handleChange}
      />
      <FormHelperText id={name} error={Boolean(error)}>
        {error}
      </FormHelperText>
    </>
  );
};

export default ImageInput;
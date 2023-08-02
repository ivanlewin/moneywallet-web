import { Button, useTheme } from "@mui/material";
import { ExternalMemoryIcon } from "components/Icons";
import React, { useRef } from "react";
import { DatabaseSchema } from "schemas";

export default function ImportDatabaseButton() {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const processFile = async (file: File) => {
    async function parseJSON(file: File) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          if (typeof event.target?.result === 'string') {
            resolve(JSON.parse(event.target.result));
          } else {
            reject();
          }
        };
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
      });
    }
    try {
      const data = await parseJSON(file);
      const database = DatabaseSchema.parse(data);
      window.localStorage.setItem('database', JSON.stringify(database));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange: React.ComponentProps<'input'>['onChange'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      processFile(event.target.files[0]);
      event.target.value = '';
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Button
      variant='outlined'
      color='primary'
      onClick={handleButtonClick}
      sx={{
        display: 'flex',
        padding: theme.spacing(1, 2),
        gap: 2,
        textTransform: 'none',
      }}
    >
      Import backup
      <ExternalMemoryIcon />
      <input type="file" hidden />
      <input
        type='file'
        accept='.json'
        ref={inputRef}
        onChange={handleInputChange}
        hidden
      />
    </Button>
  );
};
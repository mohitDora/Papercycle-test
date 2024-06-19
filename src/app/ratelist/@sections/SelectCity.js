"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { RATELIST_OPTIONS } from "../../../../utils/Constant";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SelectCity({ selectCity }) {
  const [selectedOptions, setSelectedOptions] = useState(["Bhubaneswar"]);

  useEffect(() => {
    selectCity(selectedOptions);
  }, [selectedOptions]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes("all")) {
      const allSelectable = RATELIST_OPTIONS.filter(
        (option) => !option.disabled
      ).map((option) => option.value);
      setSelectedOptions(
        selectedOptions.length === allSelectable.length ? [] : allSelectable
      );
      return;
    }

    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };

  const isAllSelected =
    selectedOptions.length ===
    RATELIST_OPTIONS.filter((option) => !option.disabled).length;

  return (
    <>
      <FormControl sx={{ width: {md:300,xs:"100%"} }}>
        <InputLabel id="multiple-select-label">Select Options</InputLabel>
        <Select
          labelId="multiple-select-label"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Select Options" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          <MenuItem
            value="all"
            onClick={() => {
              const allSelectable = RATELIST_OPTIONS.filter(
                (option) => !option.disabled
              ).map((option) => option.value);
              setSelectedOptions(isAllSelected ? [] : allSelectable);
            }}
          >
            <Checkbox checked={isAllSelected} />
            <ListItemText primary="Select All" />
          </MenuItem>
          {RATELIST_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              <Checkbox
                checked={selectedOptions.indexOf(option.value) > -1}
                disabled={option.disabled}
              />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectCity;

import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  SelectChangeEvent,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Button,
} from "@mui/material";
import React, { ChangeEvent, useRef } from "react";
import { City, ListParams } from "../../../models";

export interface LoverFiltersProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function LoverFilters({
  filter,
  onSearchChange,
  onChange,
  cityList,
}: LoverFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (
    e: SelectChangeEvent<{ value: unknown; name?: string }>
  ) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (
    e: SelectChangeEvent<{ name?: string; value: unknown}>
  ) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as string).split(".");
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as "asc" | "desc") || undefined,
    };
    onChange(newFilter);
  };
  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Tìm Kiếm Tên</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Tìm Kiếm Tên"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Tìm Kiếm Thành Phố</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ""}
              label="Tìm Kiếm Thành Phố"
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>Tất Cả</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sắp Xếp</InputLabel>
            <Select
              labelId="sortBy"
              value= {(filter._sort ? `${filter._sort}.${filter._order}` : '') as any}
              onChange={handleSortChange}
              label="Sắp Xếp"
            >
              <MenuItem value="">
                <em>...Chọn</em>
              </MenuItem>

              <MenuItem value="name.asc">Sắp Xếp Tên Tăng Dần</MenuItem>
              <MenuItem value="name.desc">Sắp Xếp Tên Giảm Dần</MenuItem>
              <MenuItem value="mark.asc">Sắp Xếp Điểm Khuôn Mặt Tăng Dần</MenuItem>
              <MenuItem value="mark.desc">Sắp Xếp Điểm Khuôn Mặt Giảm Dần</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleClearFilter}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

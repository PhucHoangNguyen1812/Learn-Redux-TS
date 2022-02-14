import { Box, Button, CircularProgress } from "@mui/material";
import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../app/hooks";
import {
  InputField,
  RadioGroupField,
  SelectField,
} from "../../../components/FormFields";
import { Lover } from "../../../models";
import { selectCityOptions } from "../../city/citySlice";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'


export interface LoverFormProps {
  initialValues?: Lover;
  onSubmit?: (formValue: Lover) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Vui lòng nhập tên!")
    .test('2 từ', 'Vui lòng nhập ít nhất 2 chữ.', (value) => { 
      if(!value)  return true;

      const parts = value?.split(' ') || [];
      return parts.filter((x) => Boolean(x)).length >= 2
    }),
  age: yup
    .number()
    .positive("Vui lòng nhập số dương.")
    .min(18, 'Thấp nhất là 18.')
    .max(60, 'Cao nhất là 60.')
    .integer('Vui lòng nhập số nguyên.')
    .required('Vui lòng nhập tuổi.')
    .typeError('Vui lòng nhập số hợp lệ.'),
  mark: yup
    .number()
    .min(0,'Thấp nhất là 0.')
    .max(10, 'Cao nhất là 10.')
    .required('Vui lòng nhập điểm khuôn mặt.')
    .typeError('Vui lòng nhập số hợp lệ.'),
  gender: yup
    .string()
    .oneOf(['male','female'], 'Vui lòng chọn một trong hai nam hoặc nữ.')
    .required('Vui lòng chọn giới tính.'),
  city: yup.string().required('Vui lòng chọn thành phố')

});

export default function LoverForm({ initialValues, onSubmit }: LoverFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>('');

  const { control, handleSubmit, formState: {isSubmitting}, } = useForm<Lover>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Lover) => {
    
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any ) {
      setError(error.message);
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Họ Tên" />

        <RadioGroupField
          name="gender"
          control={control}
          label="Giới Tính"
          options={[
            { label: "Nam", value: "male" },
            { label: "Nữ", value: "famale" },
          ]}
        />

        <InputField name="age" control={control} label="Tuổi" type="number" />
        <InputField
          name="mark"
          control={control}
          label="Điểm Khuôn Mặt"
          type="number"
        />
        

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
            <SelectField
            name="city"
            control={control}
            label="Thành Phố"
            options={cityOptions}
          />
        )}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size= {16} color="primary"/>}
            &nbsp;Lưu
          </Button>
        </Box>
      </form>
    </Box>
  );
}

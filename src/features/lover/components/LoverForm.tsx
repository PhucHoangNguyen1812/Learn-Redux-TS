import { Box, Button } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import { InputField } from '../../../components/FormFields';
import { Lover } from '../../../models';

export interface LoverFormProps {
  initialValues?: Lover;
  onSubmit?: (formValue: Lover) => void;
}

export default function LoverForm ({initialValues, onSubmit}: LoverFormProps) {
    const {control, handleSubmit} = useForm<Lover> ({
        defaultValues : initialValues,

    });

    const handleFormSubmit = (formValues: Lover) => {
        console.log('Submit:' , formValues);
    }

    return (
        <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Họ Tên" />
        <InputField name="age" control={control} label="Tuổi" type="number" />
        <InputField name="mark" control={control} label="Điểm Khuôn Mặt" type="number" />
        <InputField name="gender" control={control} label="Giới Tính" />
        <InputField name="city" control={control} label="Thành Phố" />

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Lưu
          </Button>
        </Box>
      </form>
    </Box>
     );

}

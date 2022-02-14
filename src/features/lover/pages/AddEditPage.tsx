import React, { useEffect, useState } from 'react';
import {Box , Typography} from '@mui/material';
import { Link, useParams,useHistory } from 'react-router-dom';
import { Lover } from '../../../models';
import LoverApi from '../../../api/loverApi';
import { ChevronLeft } from '@mui/icons-material';
import LoverForm from '../components/LoverForm';
import {toast} from 'react-toastify'

export default function AddEditPage() {
  
  const history = useHistory();
  const {loverId} = useParams<{loverId: string}>();
  const isEdit = Boolean(loverId);
  const [lover, setLover] = useState<Lover>();

  useEffect(() => {
    if(!loverId) return;

    (async () => {

      try {
        const data: Lover = await LoverApi.getById(loverId);
        setLover(data);
      } catch (error) {
        console.log('Lỗi đến từ Lover', error);
      }
    })();
  },[loverId]);

  const handleLoverFormSubmit = async (formValues: Lover ) => {
    if(isEdit) {
      await LoverApi.update(formValues);
    } else {
      await LoverApi.add(formValues);
    }
    toast.success('Lưu thành công');
    history.push('/admin/nguoi-yeu')
  };

  const initialValues: Lover = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...lover,
  } as Lover;

  return (
      <Box>
        <Link to= "/admin/nguoi-yeu">
          <Typography variant="caption" style= {{display: "flex",alignItems: "center"}}>
              <ChevronLeft /> Trở Lại
          </Typography>
        </Link>

        <Typography variant="h4">
          {isEdit? 'Cập Nhật Thông Tin' : "Thêm Mới"}
        </Typography>

        {(!isEdit || Boolean(lover)) && (
          <Box mt={3}>
            <LoverForm initialValues={initialValues} onSubmit={handleLoverFormSubmit} />
          </Box>
        )}
      </Box>
  );
}
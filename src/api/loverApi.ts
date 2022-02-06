
import {ListParams, ListResponse, Lover } from "../models";
import axiosClient from "./axiosClient"

const LoverApi = {
    getAll(params: ListParams): Promise<ListResponse<Lover>> {
        const url = '/students';
        return axiosClient.get(url, { params });
    },
    getById(id: string): Promise<Lover> {
        const url = `/students/${id}`;
        return axiosClient.get(url);
    },
    add(data: Lover): Promise<Lover> {
        const url = '/students'
        return axiosClient.post(url, data);
    },
    update(data: Partial<Lover>): Promise<Lover> {
        const url = `/students/${data.id}`;
        return axiosClient.patch(url, data);
    },
    remove(id: string): Promise<any> {
        const url = `/students/${id}`;
        return axiosClient.delete(url);
    },
};

export default LoverApi;
import { Api } from "../config/interceptor";

const url = "/movie";

const MovieService = {};

MovieService.getAll = async (currentPage, pageSize) =>
  Api.get(`${url}/getAll?page=${currentPage}&limit=${pageSize}`);
MovieService.create = async (data) => Api.post(`${url}/create`, data);
MovieService.UpdateMovie = async (id, data) => Api.patch(`${url}/${id}`, data);

MovieService.DeleteMovie = async (id) => Api.delete(`${url}/${id}`);

export default MovieService;

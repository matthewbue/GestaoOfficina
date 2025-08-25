export interface PaginatedResponse<T> {
  data: T;
  totalPagina: number;
  totalItens?: number;
  paginaAtual?: number;
  itensPorPagina?: number;
}

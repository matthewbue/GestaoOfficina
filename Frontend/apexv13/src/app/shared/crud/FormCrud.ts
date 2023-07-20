export interface Crud<T> {
  save(model: T);
  update(model: T);
  delete(model: T);
}
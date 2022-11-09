export default interface IRepository<T> {
    getById(id:string): Promise<T>;
    create(value: T): Promise<T>;
    delete(value: T): Promise<T>;
    update(value: T): Promise<T>;
    exists(id:string): boolean;
}
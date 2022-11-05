export default interface IRepository<T> {
    load(id:string): Promise<T>;
    save(value: T): Promise<T>;
}
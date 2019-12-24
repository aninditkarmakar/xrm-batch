export interface ICollection<T, S> {
    Add(item: T) : void;

    Remove(item: T) : void;

    Get(key: S) : T | null;

    GetAll(): T[];

    Length: number;
}
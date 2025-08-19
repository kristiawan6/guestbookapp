
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model UserEventAssociation
 * 
 */
export type UserEventAssociation = $Result.DefaultSelection<Prisma.$UserEventAssociationPayload>
/**
 * Model GuestCategory
 * 
 */
export type GuestCategory = $Result.DefaultSelection<Prisma.$GuestCategoryPayload>
/**
 * Model Guest
 * 
 */
export type Guest = $Result.DefaultSelection<Prisma.$GuestPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model BroadcastTemplate
 * 
 */
export type BroadcastTemplate = $Result.DefaultSelection<Prisma.$BroadcastTemplatePayload>
/**
 * Model ClaimableItem
 * 
 */
export type ClaimableItem = $Result.DefaultSelection<Prisma.$ClaimableItemPayload>
/**
 * Model ClaimTransaction
 * 
 */
export type ClaimTransaction = $Result.DefaultSelection<Prisma.$ClaimTransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  SuperAdmin: 'SuperAdmin',
  AdminEvents: 'AdminEvents'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const BroadcastType: {
  WhatsApp: 'WhatsApp',
  Email: 'Email'
};

export type BroadcastType = (typeof BroadcastType)[keyof typeof BroadcastType]


export const GuestStatus: {
  Invited: 'Invited',
  Attended: 'Attended',
  Cancelled: 'Cancelled'
};

export type GuestStatus = (typeof GuestStatus)[keyof typeof GuestStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type BroadcastType = $Enums.BroadcastType

export const BroadcastType: typeof $Enums.BroadcastType

export type GuestStatus = $Enums.GuestStatus

export const GuestStatus: typeof $Enums.GuestStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userEventAssociation`: Exposes CRUD operations for the **UserEventAssociation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserEventAssociations
    * const userEventAssociations = await prisma.userEventAssociation.findMany()
    * ```
    */
  get userEventAssociation(): Prisma.UserEventAssociationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guestCategory`: Exposes CRUD operations for the **GuestCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuestCategories
    * const guestCategories = await prisma.guestCategory.findMany()
    * ```
    */
  get guestCategory(): Prisma.GuestCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guest`: Exposes CRUD operations for the **Guest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guests
    * const guests = await prisma.guest.findMany()
    * ```
    */
  get guest(): Prisma.GuestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.broadcastTemplate`: Exposes CRUD operations for the **BroadcastTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BroadcastTemplates
    * const broadcastTemplates = await prisma.broadcastTemplate.findMany()
    * ```
    */
  get broadcastTemplate(): Prisma.BroadcastTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.claimableItem`: Exposes CRUD operations for the **ClaimableItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClaimableItems
    * const claimableItems = await prisma.claimableItem.findMany()
    * ```
    */
  get claimableItem(): Prisma.ClaimableItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.claimTransaction`: Exposes CRUD operations for the **ClaimTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClaimTransactions
    * const claimTransactions = await prisma.claimTransaction.findMany()
    * ```
    */
  get claimTransaction(): Prisma.ClaimTransactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends bigint
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Event: 'Event',
    UserEventAssociation: 'UserEventAssociation',
    GuestCategory: 'GuestCategory',
    Guest: 'Guest',
    Message: 'Message',
    BroadcastTemplate: 'BroadcastTemplate',
    ClaimableItem: 'ClaimableItem',
    ClaimTransaction: 'ClaimTransaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "event" | "userEventAssociation" | "guestCategory" | "guest" | "message" | "broadcastTemplate" | "claimableItem" | "claimTransaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      UserEventAssociation: {
        payload: Prisma.$UserEventAssociationPayload<ExtArgs>
        fields: Prisma.UserEventAssociationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserEventAssociationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserEventAssociationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload>
          }
          findFirst: {
            args: Prisma.UserEventAssociationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserEventAssociationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload>
          }
          findMany: {
            args: Prisma.UserEventAssociationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload>[]
          }
          create: {
            args: Prisma.UserEventAssociationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload>
          }
          createMany: {
            args: Prisma.UserEventAssociationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserEventAssociationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload>[]
          }
          delete: {
            args: Prisma.UserEventAssociationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload>
          }
          update: {
            args: Prisma.UserEventAssociationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload>
          }
          deleteMany: {
            args: Prisma.UserEventAssociationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserEventAssociationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserEventAssociationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload>[]
          }
          upsert: {
            args: Prisma.UserEventAssociationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventAssociationPayload>
          }
          aggregate: {
            args: Prisma.UserEventAssociationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserEventAssociation>
          }
          groupBy: {
            args: Prisma.UserEventAssociationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserEventAssociationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserEventAssociationCountArgs<ExtArgs>
            result: $Utils.Optional<UserEventAssociationCountAggregateOutputType> | number
          }
        }
      }
      GuestCategory: {
        payload: Prisma.$GuestCategoryPayload<ExtArgs>
        fields: Prisma.GuestCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuestCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuestCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload>
          }
          findFirst: {
            args: Prisma.GuestCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuestCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload>
          }
          findMany: {
            args: Prisma.GuestCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload>[]
          }
          create: {
            args: Prisma.GuestCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload>
          }
          createMany: {
            args: Prisma.GuestCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuestCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload>[]
          }
          delete: {
            args: Prisma.GuestCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload>
          }
          update: {
            args: Prisma.GuestCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload>
          }
          deleteMany: {
            args: Prisma.GuestCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuestCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuestCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload>[]
          }
          upsert: {
            args: Prisma.GuestCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestCategoryPayload>
          }
          aggregate: {
            args: Prisma.GuestCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuestCategory>
          }
          groupBy: {
            args: Prisma.GuestCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuestCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuestCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<GuestCategoryCountAggregateOutputType> | number
          }
        }
      }
      Guest: {
        payload: Prisma.$GuestPayload<ExtArgs>
        fields: Prisma.GuestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findFirst: {
            args: Prisma.GuestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findMany: {
            args: Prisma.GuestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          create: {
            args: Prisma.GuestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          createMany: {
            args: Prisma.GuestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          delete: {
            args: Prisma.GuestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          update: {
            args: Prisma.GuestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          deleteMany: {
            args: Prisma.GuestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          upsert: {
            args: Prisma.GuestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          aggregate: {
            args: Prisma.GuestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuest>
          }
          groupBy: {
            args: Prisma.GuestGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuestGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuestCountArgs<ExtArgs>
            result: $Utils.Optional<GuestCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      BroadcastTemplate: {
        payload: Prisma.$BroadcastTemplatePayload<ExtArgs>
        fields: Prisma.BroadcastTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BroadcastTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BroadcastTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload>
          }
          findFirst: {
            args: Prisma.BroadcastTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BroadcastTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload>
          }
          findMany: {
            args: Prisma.BroadcastTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload>[]
          }
          create: {
            args: Prisma.BroadcastTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload>
          }
          createMany: {
            args: Prisma.BroadcastTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BroadcastTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload>[]
          }
          delete: {
            args: Prisma.BroadcastTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload>
          }
          update: {
            args: Prisma.BroadcastTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload>
          }
          deleteMany: {
            args: Prisma.BroadcastTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BroadcastTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BroadcastTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload>[]
          }
          upsert: {
            args: Prisma.BroadcastTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastTemplatePayload>
          }
          aggregate: {
            args: Prisma.BroadcastTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBroadcastTemplate>
          }
          groupBy: {
            args: Prisma.BroadcastTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<BroadcastTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.BroadcastTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<BroadcastTemplateCountAggregateOutputType> | number
          }
        }
      }
      ClaimableItem: {
        payload: Prisma.$ClaimableItemPayload<ExtArgs>
        fields: Prisma.ClaimableItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimableItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimableItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload>
          }
          findFirst: {
            args: Prisma.ClaimableItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimableItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload>
          }
          findMany: {
            args: Prisma.ClaimableItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload>[]
          }
          create: {
            args: Prisma.ClaimableItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload>
          }
          createMany: {
            args: Prisma.ClaimableItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimableItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload>[]
          }
          delete: {
            args: Prisma.ClaimableItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload>
          }
          update: {
            args: Prisma.ClaimableItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload>
          }
          deleteMany: {
            args: Prisma.ClaimableItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimableItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClaimableItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload>[]
          }
          upsert: {
            args: Prisma.ClaimableItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimableItemPayload>
          }
          aggregate: {
            args: Prisma.ClaimableItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaimableItem>
          }
          groupBy: {
            args: Prisma.ClaimableItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimableItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimableItemCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimableItemCountAggregateOutputType> | number
          }
        }
      }
      ClaimTransaction: {
        payload: Prisma.$ClaimTransactionPayload<ExtArgs>
        fields: Prisma.ClaimTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload>
          }
          findFirst: {
            args: Prisma.ClaimTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload>
          }
          findMany: {
            args: Prisma.ClaimTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload>[]
          }
          create: {
            args: Prisma.ClaimTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload>
          }
          createMany: {
            args: Prisma.ClaimTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload>[]
          }
          delete: {
            args: Prisma.ClaimTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload>
          }
          update: {
            args: Prisma.ClaimTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload>
          }
          deleteMany: {
            args: Prisma.ClaimTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClaimTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload>[]
          }
          upsert: {
            args: Prisma.ClaimTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimTransactionPayload>
          }
          aggregate: {
            args: Prisma.ClaimTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaimTransaction>
          }
          groupBy: {
            args: Prisma.ClaimTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimTransactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    event?: EventOmit
    userEventAssociation?: UserEventAssociationOmit
    guestCategory?: GuestCategoryOmit
    guest?: GuestOmit
    message?: MessageOmit
    broadcastTemplate?: BroadcastTemplateOmit
    claimableItem?: ClaimableItemOmit
    claimTransaction?: ClaimTransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ClaimTransaction: number
    events: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ClaimTransaction?: boolean | UserCountOutputTypeCountClaimTransactionArgs
    events?: boolean | UserCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClaimTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventAssociationWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    broadcastTemplates: number
    claimableItems: number
    guests: number
    guestCategories: number
    messages: number
    users: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    broadcastTemplates?: boolean | EventCountOutputTypeCountBroadcastTemplatesArgs
    claimableItems?: boolean | EventCountOutputTypeCountClaimableItemsArgs
    guests?: boolean | EventCountOutputTypeCountGuestsArgs
    guestCategories?: boolean | EventCountOutputTypeCountGuestCategoriesArgs
    messages?: boolean | EventCountOutputTypeCountMessagesArgs
    users?: boolean | EventCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountBroadcastTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BroadcastTemplateWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountClaimableItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimableItemWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountGuestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountGuestCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestCategoryWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventAssociationWhereInput
  }


  /**
   * Count Type GuestCategoryCountOutputType
   */

  export type GuestCategoryCountOutputType = {
    guests: number
  }

  export type GuestCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guests?: boolean | GuestCategoryCountOutputTypeCountGuestsArgs
  }

  // Custom InputTypes
  /**
   * GuestCategoryCountOutputType without action
   */
  export type GuestCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategoryCountOutputType
     */
    select?: GuestCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuestCategoryCountOutputType without action
   */
  export type GuestCategoryCountOutputTypeCountGuestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestWhereInput
  }


  /**
   * Count Type GuestCountOutputType
   */

  export type GuestCountOutputType = {
    claimTransactions: number
    messages: number
  }

  export type GuestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claimTransactions?: boolean | GuestCountOutputTypeCountClaimTransactionsArgs
    messages?: boolean | GuestCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * GuestCountOutputType without action
   */
  export type GuestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCountOutputType
     */
    select?: GuestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuestCountOutputType without action
   */
  export type GuestCountOutputTypeCountClaimTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimTransactionWhereInput
  }

  /**
   * GuestCountOutputType without action
   */
  export type GuestCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type ClaimableItemCountOutputType
   */

  export type ClaimableItemCountOutputType = {
    claimTransactions: number
  }

  export type ClaimableItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claimTransactions?: boolean | ClaimableItemCountOutputTypeCountClaimTransactionsArgs
  }

  // Custom InputTypes
  /**
   * ClaimableItemCountOutputType without action
   */
  export type ClaimableItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItemCountOutputType
     */
    select?: ClaimableItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClaimableItemCountOutputType without action
   */
  export type ClaimableItemCountOutputTypeCountClaimTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimTransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    role: $Enums.UserRole | null
    email: string | null
    isActive: boolean | null
    otp: string | null
    otpExpires: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    role: $Enums.UserRole | null
    email: string | null
    isActive: boolean | null
    otp: string | null
    otpExpires: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    role: number
    email: number
    isActive: number
    otp: number
    otpExpires: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    email?: true
    isActive?: true
    otp?: true
    otpExpires?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    email?: true
    isActive?: true
    otp?: true
    otpExpires?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    email?: true
    isActive?: true
    otp?: true
    otpExpires?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    role: $Enums.UserRole
    email: string
    isActive: boolean
    otp: string | null
    otpExpires: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    isActive?: boolean
    otp?: boolean
    otpExpires?: boolean
    ClaimTransaction?: boolean | User$ClaimTransactionArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    isActive?: boolean
    otp?: boolean
    otpExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    isActive?: boolean
    otp?: boolean
    otpExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    isActive?: boolean
    otp?: boolean
    otpExpires?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "role" | "email" | "isActive" | "otp" | "otpExpires", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ClaimTransaction?: boolean | User$ClaimTransactionArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      ClaimTransaction: Prisma.$ClaimTransactionPayload<ExtArgs>[]
      events: Prisma.$UserEventAssociationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      role: $Enums.UserRole
      email: string
      isActive: boolean
      otp: string | null
      otpExpires: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ClaimTransaction<T extends User$ClaimTransactionArgs<ExtArgs> = {}>(args?: Subset<T, User$ClaimTransactionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly email: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly otp: FieldRef<"User", 'String'>
    readonly otpExpires: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ClaimTransaction
   */
  export type User$ClaimTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    where?: ClaimTransactionWhereInput
    orderBy?: ClaimTransactionOrderByWithRelationInput | ClaimTransactionOrderByWithRelationInput[]
    cursor?: ClaimTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimTransactionScalarFieldEnum | ClaimTransactionScalarFieldEnum[]
  }

  /**
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    where?: UserEventAssociationWhereInput
    orderBy?: UserEventAssociationOrderByWithRelationInput | UserEventAssociationOrderByWithRelationInput[]
    cursor?: UserEventAssociationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserEventAssociationScalarFieldEnum | UserEventAssociationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isActive: boolean
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    broadcastTemplates?: boolean | Event$broadcastTemplatesArgs<ExtArgs>
    claimableItems?: boolean | Event$claimableItemsArgs<ExtArgs>
    guests?: boolean | Event$guestsArgs<ExtArgs>
    guestCategories?: boolean | Event$guestCategoriesArgs<ExtArgs>
    messages?: boolean | Event$messagesArgs<ExtArgs>
    users?: boolean | Event$usersArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    broadcastTemplates?: boolean | Event$broadcastTemplatesArgs<ExtArgs>
    claimableItems?: boolean | Event$claimableItemsArgs<ExtArgs>
    guests?: boolean | Event$guestsArgs<ExtArgs>
    guestCategories?: boolean | Event$guestCategoriesArgs<ExtArgs>
    messages?: boolean | Event$messagesArgs<ExtArgs>
    users?: boolean | Event$usersArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      broadcastTemplates: Prisma.$BroadcastTemplatePayload<ExtArgs>[]
      claimableItems: Prisma.$ClaimableItemPayload<ExtArgs>[]
      guests: Prisma.$GuestPayload<ExtArgs>[]
      guestCategories: Prisma.$GuestCategoryPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      users: Prisma.$UserEventAssociationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isActive: boolean
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    broadcastTemplates<T extends Event$broadcastTemplatesArgs<ExtArgs> = {}>(args?: Subset<T, Event$broadcastTemplatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    claimableItems<T extends Event$claimableItemsArgs<ExtArgs> = {}>(args?: Subset<T, Event$claimableItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    guests<T extends Event$guestsArgs<ExtArgs> = {}>(args?: Subset<T, Event$guestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    guestCategories<T extends Event$guestCategoriesArgs<ExtArgs> = {}>(args?: Subset<T, Event$guestCategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends Event$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Event$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Event$usersArgs<ExtArgs> = {}>(args?: Subset<T, Event$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly name: FieldRef<"Event", 'String'>
    readonly description: FieldRef<"Event", 'String'>
    readonly isActive: FieldRef<"Event", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.broadcastTemplates
   */
  export type Event$broadcastTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    where?: BroadcastTemplateWhereInput
    orderBy?: BroadcastTemplateOrderByWithRelationInput | BroadcastTemplateOrderByWithRelationInput[]
    cursor?: BroadcastTemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BroadcastTemplateScalarFieldEnum | BroadcastTemplateScalarFieldEnum[]
  }

  /**
   * Event.claimableItems
   */
  export type Event$claimableItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    where?: ClaimableItemWhereInput
    orderBy?: ClaimableItemOrderByWithRelationInput | ClaimableItemOrderByWithRelationInput[]
    cursor?: ClaimableItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimableItemScalarFieldEnum | ClaimableItemScalarFieldEnum[]
  }

  /**
   * Event.guests
   */
  export type Event$guestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    where?: GuestWhereInput
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    cursor?: GuestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Event.guestCategories
   */
  export type Event$guestCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    where?: GuestCategoryWhereInput
    orderBy?: GuestCategoryOrderByWithRelationInput | GuestCategoryOrderByWithRelationInput[]
    cursor?: GuestCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuestCategoryScalarFieldEnum | GuestCategoryScalarFieldEnum[]
  }

  /**
   * Event.messages
   */
  export type Event$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Event.users
   */
  export type Event$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    where?: UserEventAssociationWhereInput
    orderBy?: UserEventAssociationOrderByWithRelationInput | UserEventAssociationOrderByWithRelationInput[]
    cursor?: UserEventAssociationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserEventAssociationScalarFieldEnum | UserEventAssociationScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model UserEventAssociation
   */

  export type AggregateUserEventAssociation = {
    _count: UserEventAssociationCountAggregateOutputType | null
    _min: UserEventAssociationMinAggregateOutputType | null
    _max: UserEventAssociationMaxAggregateOutputType | null
  }

  export type UserEventAssociationMinAggregateOutputType = {
    userId: string | null
    eventId: string | null
  }

  export type UserEventAssociationMaxAggregateOutputType = {
    userId: string | null
    eventId: string | null
  }

  export type UserEventAssociationCountAggregateOutputType = {
    userId: number
    eventId: number
    _all: number
  }


  export type UserEventAssociationMinAggregateInputType = {
    userId?: true
    eventId?: true
  }

  export type UserEventAssociationMaxAggregateInputType = {
    userId?: true
    eventId?: true
  }

  export type UserEventAssociationCountAggregateInputType = {
    userId?: true
    eventId?: true
    _all?: true
  }

  export type UserEventAssociationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEventAssociation to aggregate.
     */
    where?: UserEventAssociationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEventAssociations to fetch.
     */
    orderBy?: UserEventAssociationOrderByWithRelationInput | UserEventAssociationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserEventAssociationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEventAssociations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEventAssociations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserEventAssociations
    **/
    _count?: true | UserEventAssociationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserEventAssociationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserEventAssociationMaxAggregateInputType
  }

  export type GetUserEventAssociationAggregateType<T extends UserEventAssociationAggregateArgs> = {
        [P in keyof T & keyof AggregateUserEventAssociation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserEventAssociation[P]>
      : GetScalarType<T[P], AggregateUserEventAssociation[P]>
  }




  export type UserEventAssociationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventAssociationWhereInput
    orderBy?: UserEventAssociationOrderByWithAggregationInput | UserEventAssociationOrderByWithAggregationInput[]
    by: UserEventAssociationScalarFieldEnum[] | UserEventAssociationScalarFieldEnum
    having?: UserEventAssociationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserEventAssociationCountAggregateInputType | true
    _min?: UserEventAssociationMinAggregateInputType
    _max?: UserEventAssociationMaxAggregateInputType
  }

  export type UserEventAssociationGroupByOutputType = {
    userId: string
    eventId: string
    _count: UserEventAssociationCountAggregateOutputType | null
    _min: UserEventAssociationMinAggregateOutputType | null
    _max: UserEventAssociationMaxAggregateOutputType | null
  }

  type GetUserEventAssociationGroupByPayload<T extends UserEventAssociationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserEventAssociationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserEventAssociationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserEventAssociationGroupByOutputType[P]>
            : GetScalarType<T[P], UserEventAssociationGroupByOutputType[P]>
        }
      >
    >


  export type UserEventAssociationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEventAssociation"]>

  export type UserEventAssociationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEventAssociation"]>

  export type UserEventAssociationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEventAssociation"]>

  export type UserEventAssociationSelectScalar = {
    userId?: boolean
    eventId?: boolean
  }

  export type UserEventAssociationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "eventId", ExtArgs["result"]["userEventAssociation"]>
  export type UserEventAssociationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserEventAssociationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserEventAssociationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserEventAssociationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserEventAssociation"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      eventId: string
    }, ExtArgs["result"]["userEventAssociation"]>
    composites: {}
  }

  type UserEventAssociationGetPayload<S extends boolean | null | undefined | UserEventAssociationDefaultArgs> = $Result.GetResult<Prisma.$UserEventAssociationPayload, S>

  type UserEventAssociationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserEventAssociationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserEventAssociationCountAggregateInputType | true
    }

  export interface UserEventAssociationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserEventAssociation'], meta: { name: 'UserEventAssociation' } }
    /**
     * Find zero or one UserEventAssociation that matches the filter.
     * @param {UserEventAssociationFindUniqueArgs} args - Arguments to find a UserEventAssociation
     * @example
     * // Get one UserEventAssociation
     * const userEventAssociation = await prisma.userEventAssociation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserEventAssociationFindUniqueArgs>(args: SelectSubset<T, UserEventAssociationFindUniqueArgs<ExtArgs>>): Prisma__UserEventAssociationClient<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserEventAssociation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserEventAssociationFindUniqueOrThrowArgs} args - Arguments to find a UserEventAssociation
     * @example
     * // Get one UserEventAssociation
     * const userEventAssociation = await prisma.userEventAssociation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserEventAssociationFindUniqueOrThrowArgs>(args: SelectSubset<T, UserEventAssociationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserEventAssociationClient<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserEventAssociation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventAssociationFindFirstArgs} args - Arguments to find a UserEventAssociation
     * @example
     * // Get one UserEventAssociation
     * const userEventAssociation = await prisma.userEventAssociation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserEventAssociationFindFirstArgs>(args?: SelectSubset<T, UserEventAssociationFindFirstArgs<ExtArgs>>): Prisma__UserEventAssociationClient<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserEventAssociation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventAssociationFindFirstOrThrowArgs} args - Arguments to find a UserEventAssociation
     * @example
     * // Get one UserEventAssociation
     * const userEventAssociation = await prisma.userEventAssociation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserEventAssociationFindFirstOrThrowArgs>(args?: SelectSubset<T, UserEventAssociationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserEventAssociationClient<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserEventAssociations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventAssociationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserEventAssociations
     * const userEventAssociations = await prisma.userEventAssociation.findMany()
     * 
     * // Get first 10 UserEventAssociations
     * const userEventAssociations = await prisma.userEventAssociation.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userEventAssociationWithUserIdOnly = await prisma.userEventAssociation.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserEventAssociationFindManyArgs>(args?: SelectSubset<T, UserEventAssociationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserEventAssociation.
     * @param {UserEventAssociationCreateArgs} args - Arguments to create a UserEventAssociation.
     * @example
     * // Create one UserEventAssociation
     * const UserEventAssociation = await prisma.userEventAssociation.create({
     *   data: {
     *     // ... data to create a UserEventAssociation
     *   }
     * })
     * 
     */
    create<T extends UserEventAssociationCreateArgs>(args: SelectSubset<T, UserEventAssociationCreateArgs<ExtArgs>>): Prisma__UserEventAssociationClient<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserEventAssociations.
     * @param {UserEventAssociationCreateManyArgs} args - Arguments to create many UserEventAssociations.
     * @example
     * // Create many UserEventAssociations
     * const userEventAssociation = await prisma.userEventAssociation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserEventAssociationCreateManyArgs>(args?: SelectSubset<T, UserEventAssociationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserEventAssociations and returns the data saved in the database.
     * @param {UserEventAssociationCreateManyAndReturnArgs} args - Arguments to create many UserEventAssociations.
     * @example
     * // Create many UserEventAssociations
     * const userEventAssociation = await prisma.userEventAssociation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserEventAssociations and only return the `userId`
     * const userEventAssociationWithUserIdOnly = await prisma.userEventAssociation.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserEventAssociationCreateManyAndReturnArgs>(args?: SelectSubset<T, UserEventAssociationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserEventAssociation.
     * @param {UserEventAssociationDeleteArgs} args - Arguments to delete one UserEventAssociation.
     * @example
     * // Delete one UserEventAssociation
     * const UserEventAssociation = await prisma.userEventAssociation.delete({
     *   where: {
     *     // ... filter to delete one UserEventAssociation
     *   }
     * })
     * 
     */
    delete<T extends UserEventAssociationDeleteArgs>(args: SelectSubset<T, UserEventAssociationDeleteArgs<ExtArgs>>): Prisma__UserEventAssociationClient<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserEventAssociation.
     * @param {UserEventAssociationUpdateArgs} args - Arguments to update one UserEventAssociation.
     * @example
     * // Update one UserEventAssociation
     * const userEventAssociation = await prisma.userEventAssociation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserEventAssociationUpdateArgs>(args: SelectSubset<T, UserEventAssociationUpdateArgs<ExtArgs>>): Prisma__UserEventAssociationClient<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserEventAssociations.
     * @param {UserEventAssociationDeleteManyArgs} args - Arguments to filter UserEventAssociations to delete.
     * @example
     * // Delete a few UserEventAssociations
     * const { count } = await prisma.userEventAssociation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserEventAssociationDeleteManyArgs>(args?: SelectSubset<T, UserEventAssociationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserEventAssociations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventAssociationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserEventAssociations
     * const userEventAssociation = await prisma.userEventAssociation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserEventAssociationUpdateManyArgs>(args: SelectSubset<T, UserEventAssociationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserEventAssociations and returns the data updated in the database.
     * @param {UserEventAssociationUpdateManyAndReturnArgs} args - Arguments to update many UserEventAssociations.
     * @example
     * // Update many UserEventAssociations
     * const userEventAssociation = await prisma.userEventAssociation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserEventAssociations and only return the `userId`
     * const userEventAssociationWithUserIdOnly = await prisma.userEventAssociation.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserEventAssociationUpdateManyAndReturnArgs>(args: SelectSubset<T, UserEventAssociationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserEventAssociation.
     * @param {UserEventAssociationUpsertArgs} args - Arguments to update or create a UserEventAssociation.
     * @example
     * // Update or create a UserEventAssociation
     * const userEventAssociation = await prisma.userEventAssociation.upsert({
     *   create: {
     *     // ... data to create a UserEventAssociation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserEventAssociation we want to update
     *   }
     * })
     */
    upsert<T extends UserEventAssociationUpsertArgs>(args: SelectSubset<T, UserEventAssociationUpsertArgs<ExtArgs>>): Prisma__UserEventAssociationClient<$Result.GetResult<Prisma.$UserEventAssociationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserEventAssociations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventAssociationCountArgs} args - Arguments to filter UserEventAssociations to count.
     * @example
     * // Count the number of UserEventAssociations
     * const count = await prisma.userEventAssociation.count({
     *   where: {
     *     // ... the filter for the UserEventAssociations we want to count
     *   }
     * })
    **/
    count<T extends UserEventAssociationCountArgs>(
      args?: Subset<T, UserEventAssociationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserEventAssociationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserEventAssociation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventAssociationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserEventAssociationAggregateArgs>(args: Subset<T, UserEventAssociationAggregateArgs>): Prisma.PrismaPromise<GetUserEventAssociationAggregateType<T>>

    /**
     * Group by UserEventAssociation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventAssociationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserEventAssociationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserEventAssociationGroupByArgs['orderBy'] }
        : { orderBy?: UserEventAssociationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserEventAssociationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserEventAssociationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserEventAssociation model
   */
  readonly fields: UserEventAssociationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserEventAssociation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserEventAssociationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserEventAssociation model
   */
  interface UserEventAssociationFieldRefs {
    readonly userId: FieldRef<"UserEventAssociation", 'String'>
    readonly eventId: FieldRef<"UserEventAssociation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserEventAssociation findUnique
   */
  export type UserEventAssociationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    /**
     * Filter, which UserEventAssociation to fetch.
     */
    where: UserEventAssociationWhereUniqueInput
  }

  /**
   * UserEventAssociation findUniqueOrThrow
   */
  export type UserEventAssociationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    /**
     * Filter, which UserEventAssociation to fetch.
     */
    where: UserEventAssociationWhereUniqueInput
  }

  /**
   * UserEventAssociation findFirst
   */
  export type UserEventAssociationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    /**
     * Filter, which UserEventAssociation to fetch.
     */
    where?: UserEventAssociationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEventAssociations to fetch.
     */
    orderBy?: UserEventAssociationOrderByWithRelationInput | UserEventAssociationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEventAssociations.
     */
    cursor?: UserEventAssociationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEventAssociations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEventAssociations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEventAssociations.
     */
    distinct?: UserEventAssociationScalarFieldEnum | UserEventAssociationScalarFieldEnum[]
  }

  /**
   * UserEventAssociation findFirstOrThrow
   */
  export type UserEventAssociationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    /**
     * Filter, which UserEventAssociation to fetch.
     */
    where?: UserEventAssociationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEventAssociations to fetch.
     */
    orderBy?: UserEventAssociationOrderByWithRelationInput | UserEventAssociationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEventAssociations.
     */
    cursor?: UserEventAssociationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEventAssociations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEventAssociations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEventAssociations.
     */
    distinct?: UserEventAssociationScalarFieldEnum | UserEventAssociationScalarFieldEnum[]
  }

  /**
   * UserEventAssociation findMany
   */
  export type UserEventAssociationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    /**
     * Filter, which UserEventAssociations to fetch.
     */
    where?: UserEventAssociationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEventAssociations to fetch.
     */
    orderBy?: UserEventAssociationOrderByWithRelationInput | UserEventAssociationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserEventAssociations.
     */
    cursor?: UserEventAssociationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEventAssociations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEventAssociations.
     */
    skip?: number
    distinct?: UserEventAssociationScalarFieldEnum | UserEventAssociationScalarFieldEnum[]
  }

  /**
   * UserEventAssociation create
   */
  export type UserEventAssociationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    /**
     * The data needed to create a UserEventAssociation.
     */
    data: XOR<UserEventAssociationCreateInput, UserEventAssociationUncheckedCreateInput>
  }

  /**
   * UserEventAssociation createMany
   */
  export type UserEventAssociationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserEventAssociations.
     */
    data: UserEventAssociationCreateManyInput | UserEventAssociationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserEventAssociation createManyAndReturn
   */
  export type UserEventAssociationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * The data used to create many UserEventAssociations.
     */
    data: UserEventAssociationCreateManyInput | UserEventAssociationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserEventAssociation update
   */
  export type UserEventAssociationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    /**
     * The data needed to update a UserEventAssociation.
     */
    data: XOR<UserEventAssociationUpdateInput, UserEventAssociationUncheckedUpdateInput>
    /**
     * Choose, which UserEventAssociation to update.
     */
    where: UserEventAssociationWhereUniqueInput
  }

  /**
   * UserEventAssociation updateMany
   */
  export type UserEventAssociationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserEventAssociations.
     */
    data: XOR<UserEventAssociationUpdateManyMutationInput, UserEventAssociationUncheckedUpdateManyInput>
    /**
     * Filter which UserEventAssociations to update
     */
    where?: UserEventAssociationWhereInput
    /**
     * Limit how many UserEventAssociations to update.
     */
    limit?: number
  }

  /**
   * UserEventAssociation updateManyAndReturn
   */
  export type UserEventAssociationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * The data used to update UserEventAssociations.
     */
    data: XOR<UserEventAssociationUpdateManyMutationInput, UserEventAssociationUncheckedUpdateManyInput>
    /**
     * Filter which UserEventAssociations to update
     */
    where?: UserEventAssociationWhereInput
    /**
     * Limit how many UserEventAssociations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserEventAssociation upsert
   */
  export type UserEventAssociationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    /**
     * The filter to search for the UserEventAssociation to update in case it exists.
     */
    where: UserEventAssociationWhereUniqueInput
    /**
     * In case the UserEventAssociation found by the `where` argument doesn't exist, create a new UserEventAssociation with this data.
     */
    create: XOR<UserEventAssociationCreateInput, UserEventAssociationUncheckedCreateInput>
    /**
     * In case the UserEventAssociation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserEventAssociationUpdateInput, UserEventAssociationUncheckedUpdateInput>
  }

  /**
   * UserEventAssociation delete
   */
  export type UserEventAssociationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
    /**
     * Filter which UserEventAssociation to delete.
     */
    where: UserEventAssociationWhereUniqueInput
  }

  /**
   * UserEventAssociation deleteMany
   */
  export type UserEventAssociationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEventAssociations to delete
     */
    where?: UserEventAssociationWhereInput
    /**
     * Limit how many UserEventAssociations to delete.
     */
    limit?: number
  }

  /**
   * UserEventAssociation without action
   */
  export type UserEventAssociationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEventAssociation
     */
    select?: UserEventAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEventAssociation
     */
    omit?: UserEventAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventAssociationInclude<ExtArgs> | null
  }


  /**
   * Model GuestCategory
   */

  export type AggregateGuestCategory = {
    _count: GuestCategoryCountAggregateOutputType | null
    _avg: GuestCategoryAvgAggregateOutputType | null
    _sum: GuestCategorySumAggregateOutputType | null
    _min: GuestCategoryMinAggregateOutputType | null
    _max: GuestCategoryMaxAggregateOutputType | null
  }

  export type GuestCategoryAvgAggregateOutputType = {
    quota: number | null
  }

  export type GuestCategorySumAggregateOutputType = {
    quota: number | null
  }

  export type GuestCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    eventId: string | null
    code: string | null
    description: string | null
    isActive: boolean | null
    quota: number | null
  }

  export type GuestCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    eventId: string | null
    code: string | null
    description: string | null
    isActive: boolean | null
    quota: number | null
  }

  export type GuestCategoryCountAggregateOutputType = {
    id: number
    name: number
    eventId: number
    code: number
    description: number
    isActive: number
    quota: number
    _all: number
  }


  export type GuestCategoryAvgAggregateInputType = {
    quota?: true
  }

  export type GuestCategorySumAggregateInputType = {
    quota?: true
  }

  export type GuestCategoryMinAggregateInputType = {
    id?: true
    name?: true
    eventId?: true
    code?: true
    description?: true
    isActive?: true
    quota?: true
  }

  export type GuestCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    eventId?: true
    code?: true
    description?: true
    isActive?: true
    quota?: true
  }

  export type GuestCategoryCountAggregateInputType = {
    id?: true
    name?: true
    eventId?: true
    code?: true
    description?: true
    isActive?: true
    quota?: true
    _all?: true
  }

  export type GuestCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuestCategory to aggregate.
     */
    where?: GuestCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestCategories to fetch.
     */
    orderBy?: GuestCategoryOrderByWithRelationInput | GuestCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuestCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuestCategories
    **/
    _count?: true | GuestCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GuestCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GuestCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuestCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuestCategoryMaxAggregateInputType
  }

  export type GetGuestCategoryAggregateType<T extends GuestCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateGuestCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuestCategory[P]>
      : GetScalarType<T[P], AggregateGuestCategory[P]>
  }




  export type GuestCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestCategoryWhereInput
    orderBy?: GuestCategoryOrderByWithAggregationInput | GuestCategoryOrderByWithAggregationInput[]
    by: GuestCategoryScalarFieldEnum[] | GuestCategoryScalarFieldEnum
    having?: GuestCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuestCategoryCountAggregateInputType | true
    _avg?: GuestCategoryAvgAggregateInputType
    _sum?: GuestCategorySumAggregateInputType
    _min?: GuestCategoryMinAggregateInputType
    _max?: GuestCategoryMaxAggregateInputType
  }

  export type GuestCategoryGroupByOutputType = {
    id: string
    name: string
    eventId: string
    code: string | null
    description: string | null
    isActive: boolean
    quota: number | null
    _count: GuestCategoryCountAggregateOutputType | null
    _avg: GuestCategoryAvgAggregateOutputType | null
    _sum: GuestCategorySumAggregateOutputType | null
    _min: GuestCategoryMinAggregateOutputType | null
    _max: GuestCategoryMaxAggregateOutputType | null
  }

  type GetGuestCategoryGroupByPayload<T extends GuestCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuestCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuestCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuestCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], GuestCategoryGroupByOutputType[P]>
        }
      >
    >


  export type GuestCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventId?: boolean
    code?: boolean
    description?: boolean
    isActive?: boolean
    quota?: boolean
    guests?: boolean | GuestCategory$guestsArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    _count?: boolean | GuestCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guestCategory"]>

  export type GuestCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventId?: boolean
    code?: boolean
    description?: boolean
    isActive?: boolean
    quota?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guestCategory"]>

  export type GuestCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventId?: boolean
    code?: boolean
    description?: boolean
    isActive?: boolean
    quota?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guestCategory"]>

  export type GuestCategorySelectScalar = {
    id?: boolean
    name?: boolean
    eventId?: boolean
    code?: boolean
    description?: boolean
    isActive?: boolean
    quota?: boolean
  }

  export type GuestCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "eventId" | "code" | "description" | "isActive" | "quota", ExtArgs["result"]["guestCategory"]>
  export type GuestCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guests?: boolean | GuestCategory$guestsArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    _count?: boolean | GuestCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GuestCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type GuestCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $GuestCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuestCategory"
    objects: {
      guests: Prisma.$GuestPayload<ExtArgs>[]
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      eventId: string
      code: string | null
      description: string | null
      isActive: boolean
      quota: number | null
    }, ExtArgs["result"]["guestCategory"]>
    composites: {}
  }

  type GuestCategoryGetPayload<S extends boolean | null | undefined | GuestCategoryDefaultArgs> = $Result.GetResult<Prisma.$GuestCategoryPayload, S>

  type GuestCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuestCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuestCategoryCountAggregateInputType | true
    }

  export interface GuestCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuestCategory'], meta: { name: 'GuestCategory' } }
    /**
     * Find zero or one GuestCategory that matches the filter.
     * @param {GuestCategoryFindUniqueArgs} args - Arguments to find a GuestCategory
     * @example
     * // Get one GuestCategory
     * const guestCategory = await prisma.guestCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuestCategoryFindUniqueArgs>(args: SelectSubset<T, GuestCategoryFindUniqueArgs<ExtArgs>>): Prisma__GuestCategoryClient<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GuestCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuestCategoryFindUniqueOrThrowArgs} args - Arguments to find a GuestCategory
     * @example
     * // Get one GuestCategory
     * const guestCategory = await prisma.guestCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuestCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, GuestCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuestCategoryClient<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuestCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCategoryFindFirstArgs} args - Arguments to find a GuestCategory
     * @example
     * // Get one GuestCategory
     * const guestCategory = await prisma.guestCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuestCategoryFindFirstArgs>(args?: SelectSubset<T, GuestCategoryFindFirstArgs<ExtArgs>>): Prisma__GuestCategoryClient<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuestCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCategoryFindFirstOrThrowArgs} args - Arguments to find a GuestCategory
     * @example
     * // Get one GuestCategory
     * const guestCategory = await prisma.guestCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuestCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, GuestCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuestCategoryClient<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GuestCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuestCategories
     * const guestCategories = await prisma.guestCategory.findMany()
     * 
     * // Get first 10 GuestCategories
     * const guestCategories = await prisma.guestCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guestCategoryWithIdOnly = await prisma.guestCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuestCategoryFindManyArgs>(args?: SelectSubset<T, GuestCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GuestCategory.
     * @param {GuestCategoryCreateArgs} args - Arguments to create a GuestCategory.
     * @example
     * // Create one GuestCategory
     * const GuestCategory = await prisma.guestCategory.create({
     *   data: {
     *     // ... data to create a GuestCategory
     *   }
     * })
     * 
     */
    create<T extends GuestCategoryCreateArgs>(args: SelectSubset<T, GuestCategoryCreateArgs<ExtArgs>>): Prisma__GuestCategoryClient<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GuestCategories.
     * @param {GuestCategoryCreateManyArgs} args - Arguments to create many GuestCategories.
     * @example
     * // Create many GuestCategories
     * const guestCategory = await prisma.guestCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuestCategoryCreateManyArgs>(args?: SelectSubset<T, GuestCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GuestCategories and returns the data saved in the database.
     * @param {GuestCategoryCreateManyAndReturnArgs} args - Arguments to create many GuestCategories.
     * @example
     * // Create many GuestCategories
     * const guestCategory = await prisma.guestCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GuestCategories and only return the `id`
     * const guestCategoryWithIdOnly = await prisma.guestCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuestCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, GuestCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GuestCategory.
     * @param {GuestCategoryDeleteArgs} args - Arguments to delete one GuestCategory.
     * @example
     * // Delete one GuestCategory
     * const GuestCategory = await prisma.guestCategory.delete({
     *   where: {
     *     // ... filter to delete one GuestCategory
     *   }
     * })
     * 
     */
    delete<T extends GuestCategoryDeleteArgs>(args: SelectSubset<T, GuestCategoryDeleteArgs<ExtArgs>>): Prisma__GuestCategoryClient<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GuestCategory.
     * @param {GuestCategoryUpdateArgs} args - Arguments to update one GuestCategory.
     * @example
     * // Update one GuestCategory
     * const guestCategory = await prisma.guestCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuestCategoryUpdateArgs>(args: SelectSubset<T, GuestCategoryUpdateArgs<ExtArgs>>): Prisma__GuestCategoryClient<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GuestCategories.
     * @param {GuestCategoryDeleteManyArgs} args - Arguments to filter GuestCategories to delete.
     * @example
     * // Delete a few GuestCategories
     * const { count } = await prisma.guestCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuestCategoryDeleteManyArgs>(args?: SelectSubset<T, GuestCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuestCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuestCategories
     * const guestCategory = await prisma.guestCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuestCategoryUpdateManyArgs>(args: SelectSubset<T, GuestCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuestCategories and returns the data updated in the database.
     * @param {GuestCategoryUpdateManyAndReturnArgs} args - Arguments to update many GuestCategories.
     * @example
     * // Update many GuestCategories
     * const guestCategory = await prisma.guestCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GuestCategories and only return the `id`
     * const guestCategoryWithIdOnly = await prisma.guestCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuestCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, GuestCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GuestCategory.
     * @param {GuestCategoryUpsertArgs} args - Arguments to update or create a GuestCategory.
     * @example
     * // Update or create a GuestCategory
     * const guestCategory = await prisma.guestCategory.upsert({
     *   create: {
     *     // ... data to create a GuestCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuestCategory we want to update
     *   }
     * })
     */
    upsert<T extends GuestCategoryUpsertArgs>(args: SelectSubset<T, GuestCategoryUpsertArgs<ExtArgs>>): Prisma__GuestCategoryClient<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GuestCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCategoryCountArgs} args - Arguments to filter GuestCategories to count.
     * @example
     * // Count the number of GuestCategories
     * const count = await prisma.guestCategory.count({
     *   where: {
     *     // ... the filter for the GuestCategories we want to count
     *   }
     * })
    **/
    count<T extends GuestCategoryCountArgs>(
      args?: Subset<T, GuestCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuestCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuestCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuestCategoryAggregateArgs>(args: Subset<T, GuestCategoryAggregateArgs>): Prisma.PrismaPromise<GetGuestCategoryAggregateType<T>>

    /**
     * Group by GuestCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuestCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuestCategoryGroupByArgs['orderBy'] }
        : { orderBy?: GuestCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuestCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuestCategory model
   */
  readonly fields: GuestCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuestCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuestCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guests<T extends GuestCategory$guestsArgs<ExtArgs> = {}>(args?: Subset<T, GuestCategory$guestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuestCategory model
   */
  interface GuestCategoryFieldRefs {
    readonly id: FieldRef<"GuestCategory", 'String'>
    readonly name: FieldRef<"GuestCategory", 'String'>
    readonly eventId: FieldRef<"GuestCategory", 'String'>
    readonly code: FieldRef<"GuestCategory", 'String'>
    readonly description: FieldRef<"GuestCategory", 'String'>
    readonly isActive: FieldRef<"GuestCategory", 'Boolean'>
    readonly quota: FieldRef<"GuestCategory", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * GuestCategory findUnique
   */
  export type GuestCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GuestCategory to fetch.
     */
    where: GuestCategoryWhereUniqueInput
  }

  /**
   * GuestCategory findUniqueOrThrow
   */
  export type GuestCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GuestCategory to fetch.
     */
    where: GuestCategoryWhereUniqueInput
  }

  /**
   * GuestCategory findFirst
   */
  export type GuestCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GuestCategory to fetch.
     */
    where?: GuestCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestCategories to fetch.
     */
    orderBy?: GuestCategoryOrderByWithRelationInput | GuestCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuestCategories.
     */
    cursor?: GuestCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuestCategories.
     */
    distinct?: GuestCategoryScalarFieldEnum | GuestCategoryScalarFieldEnum[]
  }

  /**
   * GuestCategory findFirstOrThrow
   */
  export type GuestCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GuestCategory to fetch.
     */
    where?: GuestCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestCategories to fetch.
     */
    orderBy?: GuestCategoryOrderByWithRelationInput | GuestCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuestCategories.
     */
    cursor?: GuestCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuestCategories.
     */
    distinct?: GuestCategoryScalarFieldEnum | GuestCategoryScalarFieldEnum[]
  }

  /**
   * GuestCategory findMany
   */
  export type GuestCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GuestCategories to fetch.
     */
    where?: GuestCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestCategories to fetch.
     */
    orderBy?: GuestCategoryOrderByWithRelationInput | GuestCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuestCategories.
     */
    cursor?: GuestCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestCategories.
     */
    skip?: number
    distinct?: GuestCategoryScalarFieldEnum | GuestCategoryScalarFieldEnum[]
  }

  /**
   * GuestCategory create
   */
  export type GuestCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a GuestCategory.
     */
    data: XOR<GuestCategoryCreateInput, GuestCategoryUncheckedCreateInput>
  }

  /**
   * GuestCategory createMany
   */
  export type GuestCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuestCategories.
     */
    data: GuestCategoryCreateManyInput | GuestCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuestCategory createManyAndReturn
   */
  export type GuestCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many GuestCategories.
     */
    data: GuestCategoryCreateManyInput | GuestCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuestCategory update
   */
  export type GuestCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a GuestCategory.
     */
    data: XOR<GuestCategoryUpdateInput, GuestCategoryUncheckedUpdateInput>
    /**
     * Choose, which GuestCategory to update.
     */
    where: GuestCategoryWhereUniqueInput
  }

  /**
   * GuestCategory updateMany
   */
  export type GuestCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuestCategories.
     */
    data: XOR<GuestCategoryUpdateManyMutationInput, GuestCategoryUncheckedUpdateManyInput>
    /**
     * Filter which GuestCategories to update
     */
    where?: GuestCategoryWhereInput
    /**
     * Limit how many GuestCategories to update.
     */
    limit?: number
  }

  /**
   * GuestCategory updateManyAndReturn
   */
  export type GuestCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * The data used to update GuestCategories.
     */
    data: XOR<GuestCategoryUpdateManyMutationInput, GuestCategoryUncheckedUpdateManyInput>
    /**
     * Filter which GuestCategories to update
     */
    where?: GuestCategoryWhereInput
    /**
     * Limit how many GuestCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuestCategory upsert
   */
  export type GuestCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the GuestCategory to update in case it exists.
     */
    where: GuestCategoryWhereUniqueInput
    /**
     * In case the GuestCategory found by the `where` argument doesn't exist, create a new GuestCategory with this data.
     */
    create: XOR<GuestCategoryCreateInput, GuestCategoryUncheckedCreateInput>
    /**
     * In case the GuestCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuestCategoryUpdateInput, GuestCategoryUncheckedUpdateInput>
  }

  /**
   * GuestCategory delete
   */
  export type GuestCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    /**
     * Filter which GuestCategory to delete.
     */
    where: GuestCategoryWhereUniqueInput
  }

  /**
   * GuestCategory deleteMany
   */
  export type GuestCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuestCategories to delete
     */
    where?: GuestCategoryWhereInput
    /**
     * Limit how many GuestCategories to delete.
     */
    limit?: number
  }

  /**
   * GuestCategory.guests
   */
  export type GuestCategory$guestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    where?: GuestWhereInput
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    cursor?: GuestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * GuestCategory without action
   */
  export type GuestCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Guest
   */

  export type AggregateGuest = {
    _count: GuestCountAggregateOutputType | null
    _avg: GuestAvgAggregateOutputType | null
    _sum: GuestSumAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  export type GuestAvgAggregateOutputType = {
    numberOfGuests: number | null
  }

  export type GuestSumAggregateOutputType = {
    numberOfGuests: number | null
  }

  export type GuestMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    eventId: string | null
    guestCategoryId: string | null
    address: string | null
    numberOfGuests: number | null
    session: string | null
    tableNumber: string | null
    notes: string | null
    invitationLink: string | null
    qrCode: string | null
    status: $Enums.GuestStatus | null
    createdAt: Date | null
    isDeleted: boolean | null
    updatedAt: Date | null
  }

  export type GuestMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    eventId: string | null
    guestCategoryId: string | null
    address: string | null
    numberOfGuests: number | null
    session: string | null
    tableNumber: string | null
    notes: string | null
    invitationLink: string | null
    qrCode: string | null
    status: $Enums.GuestStatus | null
    createdAt: Date | null
    isDeleted: boolean | null
    updatedAt: Date | null
  }

  export type GuestCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phoneNumber: number
    eventId: number
    guestCategoryId: number
    address: number
    numberOfGuests: number
    session: number
    tableNumber: number
    notes: number
    invitationLink: number
    qrCode: number
    status: number
    createdAt: number
    isDeleted: number
    updatedAt: number
    _all: number
  }


  export type GuestAvgAggregateInputType = {
    numberOfGuests?: true
  }

  export type GuestSumAggregateInputType = {
    numberOfGuests?: true
  }

  export type GuestMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phoneNumber?: true
    eventId?: true
    guestCategoryId?: true
    address?: true
    numberOfGuests?: true
    session?: true
    tableNumber?: true
    notes?: true
    invitationLink?: true
    qrCode?: true
    status?: true
    createdAt?: true
    isDeleted?: true
    updatedAt?: true
  }

  export type GuestMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phoneNumber?: true
    eventId?: true
    guestCategoryId?: true
    address?: true
    numberOfGuests?: true
    session?: true
    tableNumber?: true
    notes?: true
    invitationLink?: true
    qrCode?: true
    status?: true
    createdAt?: true
    isDeleted?: true
    updatedAt?: true
  }

  export type GuestCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phoneNumber?: true
    eventId?: true
    guestCategoryId?: true
    address?: true
    numberOfGuests?: true
    session?: true
    tableNumber?: true
    notes?: true
    invitationLink?: true
    qrCode?: true
    status?: true
    createdAt?: true
    isDeleted?: true
    updatedAt?: true
    _all?: true
  }

  export type GuestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guest to aggregate.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Guests
    **/
    _count?: true | GuestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GuestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GuestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuestMaxAggregateInputType
  }

  export type GetGuestAggregateType<T extends GuestAggregateArgs> = {
        [P in keyof T & keyof AggregateGuest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuest[P]>
      : GetScalarType<T[P], AggregateGuest[P]>
  }




  export type GuestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestWhereInput
    orderBy?: GuestOrderByWithAggregationInput | GuestOrderByWithAggregationInput[]
    by: GuestScalarFieldEnum[] | GuestScalarFieldEnum
    having?: GuestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuestCountAggregateInputType | true
    _avg?: GuestAvgAggregateInputType
    _sum?: GuestSumAggregateInputType
    _min?: GuestMinAggregateInputType
    _max?: GuestMaxAggregateInputType
  }

  export type GuestGroupByOutputType = {
    id: string
    name: string
    email: string | null
    phoneNumber: string | null
    eventId: string
    guestCategoryId: string | null
    address: string | null
    numberOfGuests: number | null
    session: string | null
    tableNumber: string | null
    notes: string | null
    invitationLink: string | null
    qrCode: string | null
    status: $Enums.GuestStatus
    createdAt: Date
    isDeleted: boolean
    updatedAt: Date
    _count: GuestCountAggregateOutputType | null
    _avg: GuestAvgAggregateOutputType | null
    _sum: GuestSumAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  type GetGuestGroupByPayload<T extends GuestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuestGroupByOutputType[P]>
            : GetScalarType<T[P], GuestGroupByOutputType[P]>
        }
      >
    >


  export type GuestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    eventId?: boolean
    guestCategoryId?: boolean
    address?: boolean
    numberOfGuests?: boolean
    session?: boolean
    tableNumber?: boolean
    notes?: boolean
    invitationLink?: boolean
    qrCode?: boolean
    status?: boolean
    createdAt?: boolean
    isDeleted?: boolean
    updatedAt?: boolean
    claimTransactions?: boolean | Guest$claimTransactionsArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    guestCategory?: boolean | Guest$guestCategoryArgs<ExtArgs>
    messages?: boolean | Guest$messagesArgs<ExtArgs>
    _count?: boolean | GuestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    eventId?: boolean
    guestCategoryId?: boolean
    address?: boolean
    numberOfGuests?: boolean
    session?: boolean
    tableNumber?: boolean
    notes?: boolean
    invitationLink?: boolean
    qrCode?: boolean
    status?: boolean
    createdAt?: boolean
    isDeleted?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    guestCategory?: boolean | Guest$guestCategoryArgs<ExtArgs>
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    eventId?: boolean
    guestCategoryId?: boolean
    address?: boolean
    numberOfGuests?: boolean
    session?: boolean
    tableNumber?: boolean
    notes?: boolean
    invitationLink?: boolean
    qrCode?: boolean
    status?: boolean
    createdAt?: boolean
    isDeleted?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    guestCategory?: boolean | Guest$guestCategoryArgs<ExtArgs>
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    eventId?: boolean
    guestCategoryId?: boolean
    address?: boolean
    numberOfGuests?: boolean
    session?: boolean
    tableNumber?: boolean
    notes?: boolean
    invitationLink?: boolean
    qrCode?: boolean
    status?: boolean
    createdAt?: boolean
    isDeleted?: boolean
    updatedAt?: boolean
  }

  export type GuestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phoneNumber" | "eventId" | "guestCategoryId" | "address" | "numberOfGuests" | "session" | "tableNumber" | "notes" | "invitationLink" | "qrCode" | "status" | "createdAt" | "isDeleted" | "updatedAt", ExtArgs["result"]["guest"]>
  export type GuestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claimTransactions?: boolean | Guest$claimTransactionsArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    guestCategory?: boolean | Guest$guestCategoryArgs<ExtArgs>
    messages?: boolean | Guest$messagesArgs<ExtArgs>
    _count?: boolean | GuestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GuestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    guestCategory?: boolean | Guest$guestCategoryArgs<ExtArgs>
  }
  export type GuestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    guestCategory?: boolean | Guest$guestCategoryArgs<ExtArgs>
  }

  export type $GuestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Guest"
    objects: {
      claimTransactions: Prisma.$ClaimTransactionPayload<ExtArgs>[]
      event: Prisma.$EventPayload<ExtArgs>
      guestCategory: Prisma.$GuestCategoryPayload<ExtArgs> | null
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      phoneNumber: string | null
      eventId: string
      guestCategoryId: string | null
      address: string | null
      numberOfGuests: number | null
      session: string | null
      tableNumber: string | null
      notes: string | null
      invitationLink: string | null
      qrCode: string | null
      status: $Enums.GuestStatus
      createdAt: Date
      isDeleted: boolean
      updatedAt: Date
    }, ExtArgs["result"]["guest"]>
    composites: {}
  }

  type GuestGetPayload<S extends boolean | null | undefined | GuestDefaultArgs> = $Result.GetResult<Prisma.$GuestPayload, S>

  type GuestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuestCountAggregateInputType | true
    }

  export interface GuestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Guest'], meta: { name: 'Guest' } }
    /**
     * Find zero or one Guest that matches the filter.
     * @param {GuestFindUniqueArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuestFindUniqueArgs>(args: SelectSubset<T, GuestFindUniqueArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuestFindUniqueOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuestFindUniqueOrThrowArgs>(args: SelectSubset<T, GuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuestFindFirstArgs>(args?: SelectSubset<T, GuestFindFirstArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuestFindFirstOrThrowArgs>(args?: SelectSubset<T, GuestFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Guests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guests
     * const guests = await prisma.guest.findMany()
     * 
     * // Get first 10 Guests
     * const guests = await prisma.guest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guestWithIdOnly = await prisma.guest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuestFindManyArgs>(args?: SelectSubset<T, GuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guest.
     * @param {GuestCreateArgs} args - Arguments to create a Guest.
     * @example
     * // Create one Guest
     * const Guest = await prisma.guest.create({
     *   data: {
     *     // ... data to create a Guest
     *   }
     * })
     * 
     */
    create<T extends GuestCreateArgs>(args: SelectSubset<T, GuestCreateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Guests.
     * @param {GuestCreateManyArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuestCreateManyArgs>(args?: SelectSubset<T, GuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guests and returns the data saved in the database.
     * @param {GuestCreateManyAndReturnArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guests and only return the `id`
     * const guestWithIdOnly = await prisma.guest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuestCreateManyAndReturnArgs>(args?: SelectSubset<T, GuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Guest.
     * @param {GuestDeleteArgs} args - Arguments to delete one Guest.
     * @example
     * // Delete one Guest
     * const Guest = await prisma.guest.delete({
     *   where: {
     *     // ... filter to delete one Guest
     *   }
     * })
     * 
     */
    delete<T extends GuestDeleteArgs>(args: SelectSubset<T, GuestDeleteArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guest.
     * @param {GuestUpdateArgs} args - Arguments to update one Guest.
     * @example
     * // Update one Guest
     * const guest = await prisma.guest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuestUpdateArgs>(args: SelectSubset<T, GuestUpdateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Guests.
     * @param {GuestDeleteManyArgs} args - Arguments to filter Guests to delete.
     * @example
     * // Delete a few Guests
     * const { count } = await prisma.guest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuestDeleteManyArgs>(args?: SelectSubset<T, GuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guests
     * const guest = await prisma.guest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuestUpdateManyArgs>(args: SelectSubset<T, GuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guests and returns the data updated in the database.
     * @param {GuestUpdateManyAndReturnArgs} args - Arguments to update many Guests.
     * @example
     * // Update many Guests
     * const guest = await prisma.guest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Guests and only return the `id`
     * const guestWithIdOnly = await prisma.guest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuestUpdateManyAndReturnArgs>(args: SelectSubset<T, GuestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Guest.
     * @param {GuestUpsertArgs} args - Arguments to update or create a Guest.
     * @example
     * // Update or create a Guest
     * const guest = await prisma.guest.upsert({
     *   create: {
     *     // ... data to create a Guest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guest we want to update
     *   }
     * })
     */
    upsert<T extends GuestUpsertArgs>(args: SelectSubset<T, GuestUpsertArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCountArgs} args - Arguments to filter Guests to count.
     * @example
     * // Count the number of Guests
     * const count = await prisma.guest.count({
     *   where: {
     *     // ... the filter for the Guests we want to count
     *   }
     * })
    **/
    count<T extends GuestCountArgs>(
      args?: Subset<T, GuestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuestAggregateArgs>(args: Subset<T, GuestAggregateArgs>): Prisma.PrismaPromise<GetGuestAggregateType<T>>

    /**
     * Group by Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuestGroupByArgs['orderBy'] }
        : { orderBy?: GuestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Guest model
   */
  readonly fields: GuestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Guest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    claimTransactions<T extends Guest$claimTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, Guest$claimTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    guestCategory<T extends Guest$guestCategoryArgs<ExtArgs> = {}>(args?: Subset<T, Guest$guestCategoryArgs<ExtArgs>>): Prisma__GuestCategoryClient<$Result.GetResult<Prisma.$GuestCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Guest$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Guest$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Guest model
   */
  interface GuestFieldRefs {
    readonly id: FieldRef<"Guest", 'String'>
    readonly name: FieldRef<"Guest", 'String'>
    readonly email: FieldRef<"Guest", 'String'>
    readonly phoneNumber: FieldRef<"Guest", 'String'>
    readonly eventId: FieldRef<"Guest", 'String'>
    readonly guestCategoryId: FieldRef<"Guest", 'String'>
    readonly address: FieldRef<"Guest", 'String'>
    readonly numberOfGuests: FieldRef<"Guest", 'Int'>
    readonly session: FieldRef<"Guest", 'String'>
    readonly tableNumber: FieldRef<"Guest", 'String'>
    readonly notes: FieldRef<"Guest", 'String'>
    readonly invitationLink: FieldRef<"Guest", 'String'>
    readonly qrCode: FieldRef<"Guest", 'String'>
    readonly status: FieldRef<"Guest", 'GuestStatus'>
    readonly createdAt: FieldRef<"Guest", 'DateTime'>
    readonly isDeleted: FieldRef<"Guest", 'Boolean'>
    readonly updatedAt: FieldRef<"Guest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Guest findUnique
   */
  export type GuestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findUniqueOrThrow
   */
  export type GuestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findFirst
   */
  export type GuestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findFirstOrThrow
   */
  export type GuestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findMany
   */
  export type GuestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guests to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest create
   */
  export type GuestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The data needed to create a Guest.
     */
    data: XOR<GuestCreateInput, GuestUncheckedCreateInput>
  }

  /**
   * Guest createMany
   */
  export type GuestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guest createManyAndReturn
   */
  export type GuestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Guest update
   */
  export type GuestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The data needed to update a Guest.
     */
    data: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
    /**
     * Choose, which Guest to update.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest updateMany
   */
  export type GuestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Guests.
     */
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyInput>
    /**
     * Filter which Guests to update
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to update.
     */
    limit?: number
  }

  /**
   * Guest updateManyAndReturn
   */
  export type GuestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data used to update Guests.
     */
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyInput>
    /**
     * Filter which Guests to update
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Guest upsert
   */
  export type GuestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The filter to search for the Guest to update in case it exists.
     */
    where: GuestWhereUniqueInput
    /**
     * In case the Guest found by the `where` argument doesn't exist, create a new Guest with this data.
     */
    create: XOR<GuestCreateInput, GuestUncheckedCreateInput>
    /**
     * In case the Guest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
  }

  /**
   * Guest delete
   */
  export type GuestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter which Guest to delete.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest deleteMany
   */
  export type GuestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guests to delete
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to delete.
     */
    limit?: number
  }

  /**
   * Guest.claimTransactions
   */
  export type Guest$claimTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    where?: ClaimTransactionWhereInput
    orderBy?: ClaimTransactionOrderByWithRelationInput | ClaimTransactionOrderByWithRelationInput[]
    cursor?: ClaimTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimTransactionScalarFieldEnum | ClaimTransactionScalarFieldEnum[]
  }

  /**
   * Guest.guestCategory
   */
  export type Guest$guestCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCategory
     */
    select?: GuestCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestCategory
     */
    omit?: GuestCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestCategoryInclude<ExtArgs> | null
    where?: GuestCategoryWhereInput
  }

  /**
   * Guest.messages
   */
  export type Guest$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Guest without action
   */
  export type GuestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    content: string | null
    timestamp: Date | null
    approved: boolean | null
    guestId: string | null
    eventId: string | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    content: string | null
    timestamp: Date | null
    approved: boolean | null
    guestId: string | null
    eventId: string | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    content: number
    timestamp: number
    approved: number
    guestId: number
    eventId: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    content?: true
    timestamp?: true
    approved?: true
    guestId?: true
    eventId?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    content?: true
    timestamp?: true
    approved?: true
    guestId?: true
    eventId?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    content?: true
    timestamp?: true
    approved?: true
    guestId?: true
    eventId?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    content: string
    timestamp: Date
    approved: boolean
    guestId: string
    eventId: string
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    timestamp?: boolean
    approved?: boolean
    guestId?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    timestamp?: boolean
    approved?: boolean
    guestId?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    timestamp?: boolean
    approved?: boolean
    guestId?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    content?: boolean
    timestamp?: boolean
    approved?: boolean
    guestId?: boolean
    eventId?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "timestamp" | "approved" | "guestId" | "eventId", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      guest: Prisma.$GuestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      timestamp: Date
      approved: boolean
      guestId: string
      eventId: string
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    guest<T extends GuestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GuestDefaultArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly timestamp: FieldRef<"Message", 'DateTime'>
    readonly approved: FieldRef<"Message", 'Boolean'>
    readonly guestId: FieldRef<"Message", 'String'>
    readonly eventId: FieldRef<"Message", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model BroadcastTemplate
   */

  export type AggregateBroadcastTemplate = {
    _count: BroadcastTemplateCountAggregateOutputType | null
    _min: BroadcastTemplateMinAggregateOutputType | null
    _max: BroadcastTemplateMaxAggregateOutputType | null
  }

  export type BroadcastTemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.BroadcastType | null
    content: string | null
    eventId: string | null
    button: string | null
    footerMessage: string | null
    imageAttachment: string | null
    subject: string | null
    imageAttachmentType: string | null
    coordinateFields: string | null
  }

  export type BroadcastTemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.BroadcastType | null
    content: string | null
    eventId: string | null
    button: string | null
    footerMessage: string | null
    imageAttachment: string | null
    subject: string | null
    imageAttachmentType: string | null
    coordinateFields: string | null
  }

  export type BroadcastTemplateCountAggregateOutputType = {
    id: number
    name: number
    type: number
    content: number
    eventId: number
    button: number
    footerMessage: number
    imageAttachment: number
    subject: number
    imageAttachmentType: number
    coordinateFields: number
    _all: number
  }


  export type BroadcastTemplateMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    content?: true
    eventId?: true
    button?: true
    footerMessage?: true
    imageAttachment?: true
    subject?: true
    imageAttachmentType?: true
    coordinateFields?: true
  }

  export type BroadcastTemplateMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    content?: true
    eventId?: true
    button?: true
    footerMessage?: true
    imageAttachment?: true
    subject?: true
    imageAttachmentType?: true
    coordinateFields?: true
  }

  export type BroadcastTemplateCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    content?: true
    eventId?: true
    button?: true
    footerMessage?: true
    imageAttachment?: true
    subject?: true
    imageAttachmentType?: true
    coordinateFields?: true
    _all?: true
  }

  export type BroadcastTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BroadcastTemplate to aggregate.
     */
    where?: BroadcastTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BroadcastTemplates to fetch.
     */
    orderBy?: BroadcastTemplateOrderByWithRelationInput | BroadcastTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BroadcastTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BroadcastTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BroadcastTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BroadcastTemplates
    **/
    _count?: true | BroadcastTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BroadcastTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BroadcastTemplateMaxAggregateInputType
  }

  export type GetBroadcastTemplateAggregateType<T extends BroadcastTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateBroadcastTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBroadcastTemplate[P]>
      : GetScalarType<T[P], AggregateBroadcastTemplate[P]>
  }




  export type BroadcastTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BroadcastTemplateWhereInput
    orderBy?: BroadcastTemplateOrderByWithAggregationInput | BroadcastTemplateOrderByWithAggregationInput[]
    by: BroadcastTemplateScalarFieldEnum[] | BroadcastTemplateScalarFieldEnum
    having?: BroadcastTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BroadcastTemplateCountAggregateInputType | true
    _min?: BroadcastTemplateMinAggregateInputType
    _max?: BroadcastTemplateMaxAggregateInputType
  }

  export type BroadcastTemplateGroupByOutputType = {
    id: string
    name: string
    type: $Enums.BroadcastType
    content: string
    eventId: string
    button: string | null
    footerMessage: string | null
    imageAttachment: string | null
    subject: string | null
    imageAttachmentType: string | null
    coordinateFields: string | null
    _count: BroadcastTemplateCountAggregateOutputType | null
    _min: BroadcastTemplateMinAggregateOutputType | null
    _max: BroadcastTemplateMaxAggregateOutputType | null
  }

  type GetBroadcastTemplateGroupByPayload<T extends BroadcastTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BroadcastTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BroadcastTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BroadcastTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], BroadcastTemplateGroupByOutputType[P]>
        }
      >
    >


  export type BroadcastTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    content?: boolean
    eventId?: boolean
    button?: boolean
    footerMessage?: boolean
    imageAttachment?: boolean
    subject?: boolean
    imageAttachmentType?: boolean
    coordinateFields?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["broadcastTemplate"]>

  export type BroadcastTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    content?: boolean
    eventId?: boolean
    button?: boolean
    footerMessage?: boolean
    imageAttachment?: boolean
    subject?: boolean
    imageAttachmentType?: boolean
    coordinateFields?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["broadcastTemplate"]>

  export type BroadcastTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    content?: boolean
    eventId?: boolean
    button?: boolean
    footerMessage?: boolean
    imageAttachment?: boolean
    subject?: boolean
    imageAttachmentType?: boolean
    coordinateFields?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["broadcastTemplate"]>

  export type BroadcastTemplateSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    content?: boolean
    eventId?: boolean
    button?: boolean
    footerMessage?: boolean
    imageAttachment?: boolean
    subject?: boolean
    imageAttachmentType?: boolean
    coordinateFields?: boolean
  }

  export type BroadcastTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "content" | "eventId" | "button" | "footerMessage" | "imageAttachment" | "subject" | "imageAttachmentType" | "coordinateFields", ExtArgs["result"]["broadcastTemplate"]>
  export type BroadcastTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type BroadcastTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type BroadcastTemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $BroadcastTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BroadcastTemplate"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.BroadcastType
      content: string
      eventId: string
      button: string | null
      footerMessage: string | null
      imageAttachment: string | null
      subject: string | null
      imageAttachmentType: string | null
      coordinateFields: string | null
    }, ExtArgs["result"]["broadcastTemplate"]>
    composites: {}
  }

  type BroadcastTemplateGetPayload<S extends boolean | null | undefined | BroadcastTemplateDefaultArgs> = $Result.GetResult<Prisma.$BroadcastTemplatePayload, S>

  type BroadcastTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BroadcastTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BroadcastTemplateCountAggregateInputType | true
    }

  export interface BroadcastTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BroadcastTemplate'], meta: { name: 'BroadcastTemplate' } }
    /**
     * Find zero or one BroadcastTemplate that matches the filter.
     * @param {BroadcastTemplateFindUniqueArgs} args - Arguments to find a BroadcastTemplate
     * @example
     * // Get one BroadcastTemplate
     * const broadcastTemplate = await prisma.broadcastTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BroadcastTemplateFindUniqueArgs>(args: SelectSubset<T, BroadcastTemplateFindUniqueArgs<ExtArgs>>): Prisma__BroadcastTemplateClient<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BroadcastTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BroadcastTemplateFindUniqueOrThrowArgs} args - Arguments to find a BroadcastTemplate
     * @example
     * // Get one BroadcastTemplate
     * const broadcastTemplate = await prisma.broadcastTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BroadcastTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, BroadcastTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BroadcastTemplateClient<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BroadcastTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastTemplateFindFirstArgs} args - Arguments to find a BroadcastTemplate
     * @example
     * // Get one BroadcastTemplate
     * const broadcastTemplate = await prisma.broadcastTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BroadcastTemplateFindFirstArgs>(args?: SelectSubset<T, BroadcastTemplateFindFirstArgs<ExtArgs>>): Prisma__BroadcastTemplateClient<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BroadcastTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastTemplateFindFirstOrThrowArgs} args - Arguments to find a BroadcastTemplate
     * @example
     * // Get one BroadcastTemplate
     * const broadcastTemplate = await prisma.broadcastTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BroadcastTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, BroadcastTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__BroadcastTemplateClient<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BroadcastTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BroadcastTemplates
     * const broadcastTemplates = await prisma.broadcastTemplate.findMany()
     * 
     * // Get first 10 BroadcastTemplates
     * const broadcastTemplates = await prisma.broadcastTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const broadcastTemplateWithIdOnly = await prisma.broadcastTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BroadcastTemplateFindManyArgs>(args?: SelectSubset<T, BroadcastTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BroadcastTemplate.
     * @param {BroadcastTemplateCreateArgs} args - Arguments to create a BroadcastTemplate.
     * @example
     * // Create one BroadcastTemplate
     * const BroadcastTemplate = await prisma.broadcastTemplate.create({
     *   data: {
     *     // ... data to create a BroadcastTemplate
     *   }
     * })
     * 
     */
    create<T extends BroadcastTemplateCreateArgs>(args: SelectSubset<T, BroadcastTemplateCreateArgs<ExtArgs>>): Prisma__BroadcastTemplateClient<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BroadcastTemplates.
     * @param {BroadcastTemplateCreateManyArgs} args - Arguments to create many BroadcastTemplates.
     * @example
     * // Create many BroadcastTemplates
     * const broadcastTemplate = await prisma.broadcastTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BroadcastTemplateCreateManyArgs>(args?: SelectSubset<T, BroadcastTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BroadcastTemplates and returns the data saved in the database.
     * @param {BroadcastTemplateCreateManyAndReturnArgs} args - Arguments to create many BroadcastTemplates.
     * @example
     * // Create many BroadcastTemplates
     * const broadcastTemplate = await prisma.broadcastTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BroadcastTemplates and only return the `id`
     * const broadcastTemplateWithIdOnly = await prisma.broadcastTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BroadcastTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, BroadcastTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BroadcastTemplate.
     * @param {BroadcastTemplateDeleteArgs} args - Arguments to delete one BroadcastTemplate.
     * @example
     * // Delete one BroadcastTemplate
     * const BroadcastTemplate = await prisma.broadcastTemplate.delete({
     *   where: {
     *     // ... filter to delete one BroadcastTemplate
     *   }
     * })
     * 
     */
    delete<T extends BroadcastTemplateDeleteArgs>(args: SelectSubset<T, BroadcastTemplateDeleteArgs<ExtArgs>>): Prisma__BroadcastTemplateClient<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BroadcastTemplate.
     * @param {BroadcastTemplateUpdateArgs} args - Arguments to update one BroadcastTemplate.
     * @example
     * // Update one BroadcastTemplate
     * const broadcastTemplate = await prisma.broadcastTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BroadcastTemplateUpdateArgs>(args: SelectSubset<T, BroadcastTemplateUpdateArgs<ExtArgs>>): Prisma__BroadcastTemplateClient<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BroadcastTemplates.
     * @param {BroadcastTemplateDeleteManyArgs} args - Arguments to filter BroadcastTemplates to delete.
     * @example
     * // Delete a few BroadcastTemplates
     * const { count } = await prisma.broadcastTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BroadcastTemplateDeleteManyArgs>(args?: SelectSubset<T, BroadcastTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BroadcastTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BroadcastTemplates
     * const broadcastTemplate = await prisma.broadcastTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BroadcastTemplateUpdateManyArgs>(args: SelectSubset<T, BroadcastTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BroadcastTemplates and returns the data updated in the database.
     * @param {BroadcastTemplateUpdateManyAndReturnArgs} args - Arguments to update many BroadcastTemplates.
     * @example
     * // Update many BroadcastTemplates
     * const broadcastTemplate = await prisma.broadcastTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BroadcastTemplates and only return the `id`
     * const broadcastTemplateWithIdOnly = await prisma.broadcastTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BroadcastTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, BroadcastTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BroadcastTemplate.
     * @param {BroadcastTemplateUpsertArgs} args - Arguments to update or create a BroadcastTemplate.
     * @example
     * // Update or create a BroadcastTemplate
     * const broadcastTemplate = await prisma.broadcastTemplate.upsert({
     *   create: {
     *     // ... data to create a BroadcastTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BroadcastTemplate we want to update
     *   }
     * })
     */
    upsert<T extends BroadcastTemplateUpsertArgs>(args: SelectSubset<T, BroadcastTemplateUpsertArgs<ExtArgs>>): Prisma__BroadcastTemplateClient<$Result.GetResult<Prisma.$BroadcastTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BroadcastTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastTemplateCountArgs} args - Arguments to filter BroadcastTemplates to count.
     * @example
     * // Count the number of BroadcastTemplates
     * const count = await prisma.broadcastTemplate.count({
     *   where: {
     *     // ... the filter for the BroadcastTemplates we want to count
     *   }
     * })
    **/
    count<T extends BroadcastTemplateCountArgs>(
      args?: Subset<T, BroadcastTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BroadcastTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BroadcastTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BroadcastTemplateAggregateArgs>(args: Subset<T, BroadcastTemplateAggregateArgs>): Prisma.PrismaPromise<GetBroadcastTemplateAggregateType<T>>

    /**
     * Group by BroadcastTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BroadcastTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BroadcastTemplateGroupByArgs['orderBy'] }
        : { orderBy?: BroadcastTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BroadcastTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBroadcastTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BroadcastTemplate model
   */
  readonly fields: BroadcastTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BroadcastTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BroadcastTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BroadcastTemplate model
   */
  interface BroadcastTemplateFieldRefs {
    readonly id: FieldRef<"BroadcastTemplate", 'String'>
    readonly name: FieldRef<"BroadcastTemplate", 'String'>
    readonly type: FieldRef<"BroadcastTemplate", 'BroadcastType'>
    readonly content: FieldRef<"BroadcastTemplate", 'String'>
    readonly eventId: FieldRef<"BroadcastTemplate", 'String'>
    readonly button: FieldRef<"BroadcastTemplate", 'String'>
    readonly footerMessage: FieldRef<"BroadcastTemplate", 'String'>
    readonly imageAttachment: FieldRef<"BroadcastTemplate", 'String'>
    readonly subject: FieldRef<"BroadcastTemplate", 'String'>
    readonly imageAttachmentType: FieldRef<"BroadcastTemplate", 'String'>
    readonly coordinateFields: FieldRef<"BroadcastTemplate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BroadcastTemplate findUnique
   */
  export type BroadcastTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BroadcastTemplate to fetch.
     */
    where: BroadcastTemplateWhereUniqueInput
  }

  /**
   * BroadcastTemplate findUniqueOrThrow
   */
  export type BroadcastTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BroadcastTemplate to fetch.
     */
    where: BroadcastTemplateWhereUniqueInput
  }

  /**
   * BroadcastTemplate findFirst
   */
  export type BroadcastTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BroadcastTemplate to fetch.
     */
    where?: BroadcastTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BroadcastTemplates to fetch.
     */
    orderBy?: BroadcastTemplateOrderByWithRelationInput | BroadcastTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BroadcastTemplates.
     */
    cursor?: BroadcastTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BroadcastTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BroadcastTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BroadcastTemplates.
     */
    distinct?: BroadcastTemplateScalarFieldEnum | BroadcastTemplateScalarFieldEnum[]
  }

  /**
   * BroadcastTemplate findFirstOrThrow
   */
  export type BroadcastTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BroadcastTemplate to fetch.
     */
    where?: BroadcastTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BroadcastTemplates to fetch.
     */
    orderBy?: BroadcastTemplateOrderByWithRelationInput | BroadcastTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BroadcastTemplates.
     */
    cursor?: BroadcastTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BroadcastTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BroadcastTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BroadcastTemplates.
     */
    distinct?: BroadcastTemplateScalarFieldEnum | BroadcastTemplateScalarFieldEnum[]
  }

  /**
   * BroadcastTemplate findMany
   */
  export type BroadcastTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BroadcastTemplates to fetch.
     */
    where?: BroadcastTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BroadcastTemplates to fetch.
     */
    orderBy?: BroadcastTemplateOrderByWithRelationInput | BroadcastTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BroadcastTemplates.
     */
    cursor?: BroadcastTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BroadcastTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BroadcastTemplates.
     */
    skip?: number
    distinct?: BroadcastTemplateScalarFieldEnum | BroadcastTemplateScalarFieldEnum[]
  }

  /**
   * BroadcastTemplate create
   */
  export type BroadcastTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a BroadcastTemplate.
     */
    data: XOR<BroadcastTemplateCreateInput, BroadcastTemplateUncheckedCreateInput>
  }

  /**
   * BroadcastTemplate createMany
   */
  export type BroadcastTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BroadcastTemplates.
     */
    data: BroadcastTemplateCreateManyInput | BroadcastTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BroadcastTemplate createManyAndReturn
   */
  export type BroadcastTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many BroadcastTemplates.
     */
    data: BroadcastTemplateCreateManyInput | BroadcastTemplateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BroadcastTemplate update
   */
  export type BroadcastTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a BroadcastTemplate.
     */
    data: XOR<BroadcastTemplateUpdateInput, BroadcastTemplateUncheckedUpdateInput>
    /**
     * Choose, which BroadcastTemplate to update.
     */
    where: BroadcastTemplateWhereUniqueInput
  }

  /**
   * BroadcastTemplate updateMany
   */
  export type BroadcastTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BroadcastTemplates.
     */
    data: XOR<BroadcastTemplateUpdateManyMutationInput, BroadcastTemplateUncheckedUpdateManyInput>
    /**
     * Filter which BroadcastTemplates to update
     */
    where?: BroadcastTemplateWhereInput
    /**
     * Limit how many BroadcastTemplates to update.
     */
    limit?: number
  }

  /**
   * BroadcastTemplate updateManyAndReturn
   */
  export type BroadcastTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * The data used to update BroadcastTemplates.
     */
    data: XOR<BroadcastTemplateUpdateManyMutationInput, BroadcastTemplateUncheckedUpdateManyInput>
    /**
     * Filter which BroadcastTemplates to update
     */
    where?: BroadcastTemplateWhereInput
    /**
     * Limit how many BroadcastTemplates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BroadcastTemplate upsert
   */
  export type BroadcastTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the BroadcastTemplate to update in case it exists.
     */
    where: BroadcastTemplateWhereUniqueInput
    /**
     * In case the BroadcastTemplate found by the `where` argument doesn't exist, create a new BroadcastTemplate with this data.
     */
    create: XOR<BroadcastTemplateCreateInput, BroadcastTemplateUncheckedCreateInput>
    /**
     * In case the BroadcastTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BroadcastTemplateUpdateInput, BroadcastTemplateUncheckedUpdateInput>
  }

  /**
   * BroadcastTemplate delete
   */
  export type BroadcastTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
    /**
     * Filter which BroadcastTemplate to delete.
     */
    where: BroadcastTemplateWhereUniqueInput
  }

  /**
   * BroadcastTemplate deleteMany
   */
  export type BroadcastTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BroadcastTemplates to delete
     */
    where?: BroadcastTemplateWhereInput
    /**
     * Limit how many BroadcastTemplates to delete.
     */
    limit?: number
  }

  /**
   * BroadcastTemplate without action
   */
  export type BroadcastTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastTemplate
     */
    select?: BroadcastTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BroadcastTemplate
     */
    omit?: BroadcastTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BroadcastTemplateInclude<ExtArgs> | null
  }


  /**
   * Model ClaimableItem
   */

  export type AggregateClaimableItem = {
    _count: ClaimableItemCountAggregateOutputType | null
    _avg: ClaimableItemAvgAggregateOutputType | null
    _sum: ClaimableItemSumAggregateOutputType | null
    _min: ClaimableItemMinAggregateOutputType | null
    _max: ClaimableItemMaxAggregateOutputType | null
  }

  export type ClaimableItemAvgAggregateOutputType = {
    totalQuantity: number | null
    remainingQuantity: number | null
  }

  export type ClaimableItemSumAggregateOutputType = {
    totalQuantity: number | null
    remainingQuantity: number | null
  }

  export type ClaimableItemMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    totalQuantity: number | null
    remainingQuantity: number | null
    eventId: string | null
  }

  export type ClaimableItemMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    totalQuantity: number | null
    remainingQuantity: number | null
    eventId: string | null
  }

  export type ClaimableItemCountAggregateOutputType = {
    id: number
    name: number
    description: number
    totalQuantity: number
    remainingQuantity: number
    eventId: number
    _all: number
  }


  export type ClaimableItemAvgAggregateInputType = {
    totalQuantity?: true
    remainingQuantity?: true
  }

  export type ClaimableItemSumAggregateInputType = {
    totalQuantity?: true
    remainingQuantity?: true
  }

  export type ClaimableItemMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    totalQuantity?: true
    remainingQuantity?: true
    eventId?: true
  }

  export type ClaimableItemMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    totalQuantity?: true
    remainingQuantity?: true
    eventId?: true
  }

  export type ClaimableItemCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    totalQuantity?: true
    remainingQuantity?: true
    eventId?: true
    _all?: true
  }

  export type ClaimableItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimableItem to aggregate.
     */
    where?: ClaimableItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimableItems to fetch.
     */
    orderBy?: ClaimableItemOrderByWithRelationInput | ClaimableItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimableItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimableItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimableItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClaimableItems
    **/
    _count?: true | ClaimableItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimableItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimableItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimableItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimableItemMaxAggregateInputType
  }

  export type GetClaimableItemAggregateType<T extends ClaimableItemAggregateArgs> = {
        [P in keyof T & keyof AggregateClaimableItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaimableItem[P]>
      : GetScalarType<T[P], AggregateClaimableItem[P]>
  }




  export type ClaimableItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimableItemWhereInput
    orderBy?: ClaimableItemOrderByWithAggregationInput | ClaimableItemOrderByWithAggregationInput[]
    by: ClaimableItemScalarFieldEnum[] | ClaimableItemScalarFieldEnum
    having?: ClaimableItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimableItemCountAggregateInputType | true
    _avg?: ClaimableItemAvgAggregateInputType
    _sum?: ClaimableItemSumAggregateInputType
    _min?: ClaimableItemMinAggregateInputType
    _max?: ClaimableItemMaxAggregateInputType
  }

  export type ClaimableItemGroupByOutputType = {
    id: string
    name: string
    description: string | null
    totalQuantity: number
    remainingQuantity: number
    eventId: string
    _count: ClaimableItemCountAggregateOutputType | null
    _avg: ClaimableItemAvgAggregateOutputType | null
    _sum: ClaimableItemSumAggregateOutputType | null
    _min: ClaimableItemMinAggregateOutputType | null
    _max: ClaimableItemMaxAggregateOutputType | null
  }

  type GetClaimableItemGroupByPayload<T extends ClaimableItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimableItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimableItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimableItemGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimableItemGroupByOutputType[P]>
        }
      >
    >


  export type ClaimableItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    totalQuantity?: boolean
    remainingQuantity?: boolean
    eventId?: boolean
    claimTransactions?: boolean | ClaimableItem$claimTransactionsArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    _count?: boolean | ClaimableItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimableItem"]>

  export type ClaimableItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    totalQuantity?: boolean
    remainingQuantity?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimableItem"]>

  export type ClaimableItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    totalQuantity?: boolean
    remainingQuantity?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimableItem"]>

  export type ClaimableItemSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    totalQuantity?: boolean
    remainingQuantity?: boolean
    eventId?: boolean
  }

  export type ClaimableItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "totalQuantity" | "remainingQuantity" | "eventId", ExtArgs["result"]["claimableItem"]>
  export type ClaimableItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claimTransactions?: boolean | ClaimableItem$claimTransactionsArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    _count?: boolean | ClaimableItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClaimableItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type ClaimableItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $ClaimableItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClaimableItem"
    objects: {
      claimTransactions: Prisma.$ClaimTransactionPayload<ExtArgs>[]
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      totalQuantity: number
      remainingQuantity: number
      eventId: string
    }, ExtArgs["result"]["claimableItem"]>
    composites: {}
  }

  type ClaimableItemGetPayload<S extends boolean | null | undefined | ClaimableItemDefaultArgs> = $Result.GetResult<Prisma.$ClaimableItemPayload, S>

  type ClaimableItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClaimableItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClaimableItemCountAggregateInputType | true
    }

  export interface ClaimableItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClaimableItem'], meta: { name: 'ClaimableItem' } }
    /**
     * Find zero or one ClaimableItem that matches the filter.
     * @param {ClaimableItemFindUniqueArgs} args - Arguments to find a ClaimableItem
     * @example
     * // Get one ClaimableItem
     * const claimableItem = await prisma.claimableItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimableItemFindUniqueArgs>(args: SelectSubset<T, ClaimableItemFindUniqueArgs<ExtArgs>>): Prisma__ClaimableItemClient<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClaimableItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClaimableItemFindUniqueOrThrowArgs} args - Arguments to find a ClaimableItem
     * @example
     * // Get one ClaimableItem
     * const claimableItem = await prisma.claimableItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimableItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimableItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimableItemClient<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimableItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimableItemFindFirstArgs} args - Arguments to find a ClaimableItem
     * @example
     * // Get one ClaimableItem
     * const claimableItem = await prisma.claimableItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimableItemFindFirstArgs>(args?: SelectSubset<T, ClaimableItemFindFirstArgs<ExtArgs>>): Prisma__ClaimableItemClient<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimableItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimableItemFindFirstOrThrowArgs} args - Arguments to find a ClaimableItem
     * @example
     * // Get one ClaimableItem
     * const claimableItem = await prisma.claimableItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimableItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimableItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimableItemClient<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClaimableItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimableItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClaimableItems
     * const claimableItems = await prisma.claimableItem.findMany()
     * 
     * // Get first 10 ClaimableItems
     * const claimableItems = await prisma.claimableItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimableItemWithIdOnly = await prisma.claimableItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaimableItemFindManyArgs>(args?: SelectSubset<T, ClaimableItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClaimableItem.
     * @param {ClaimableItemCreateArgs} args - Arguments to create a ClaimableItem.
     * @example
     * // Create one ClaimableItem
     * const ClaimableItem = await prisma.claimableItem.create({
     *   data: {
     *     // ... data to create a ClaimableItem
     *   }
     * })
     * 
     */
    create<T extends ClaimableItemCreateArgs>(args: SelectSubset<T, ClaimableItemCreateArgs<ExtArgs>>): Prisma__ClaimableItemClient<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClaimableItems.
     * @param {ClaimableItemCreateManyArgs} args - Arguments to create many ClaimableItems.
     * @example
     * // Create many ClaimableItems
     * const claimableItem = await prisma.claimableItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimableItemCreateManyArgs>(args?: SelectSubset<T, ClaimableItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClaimableItems and returns the data saved in the database.
     * @param {ClaimableItemCreateManyAndReturnArgs} args - Arguments to create many ClaimableItems.
     * @example
     * // Create many ClaimableItems
     * const claimableItem = await prisma.claimableItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClaimableItems and only return the `id`
     * const claimableItemWithIdOnly = await prisma.claimableItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimableItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimableItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClaimableItem.
     * @param {ClaimableItemDeleteArgs} args - Arguments to delete one ClaimableItem.
     * @example
     * // Delete one ClaimableItem
     * const ClaimableItem = await prisma.claimableItem.delete({
     *   where: {
     *     // ... filter to delete one ClaimableItem
     *   }
     * })
     * 
     */
    delete<T extends ClaimableItemDeleteArgs>(args: SelectSubset<T, ClaimableItemDeleteArgs<ExtArgs>>): Prisma__ClaimableItemClient<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClaimableItem.
     * @param {ClaimableItemUpdateArgs} args - Arguments to update one ClaimableItem.
     * @example
     * // Update one ClaimableItem
     * const claimableItem = await prisma.claimableItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimableItemUpdateArgs>(args: SelectSubset<T, ClaimableItemUpdateArgs<ExtArgs>>): Prisma__ClaimableItemClient<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClaimableItems.
     * @param {ClaimableItemDeleteManyArgs} args - Arguments to filter ClaimableItems to delete.
     * @example
     * // Delete a few ClaimableItems
     * const { count } = await prisma.claimableItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimableItemDeleteManyArgs>(args?: SelectSubset<T, ClaimableItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimableItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimableItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClaimableItems
     * const claimableItem = await prisma.claimableItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimableItemUpdateManyArgs>(args: SelectSubset<T, ClaimableItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimableItems and returns the data updated in the database.
     * @param {ClaimableItemUpdateManyAndReturnArgs} args - Arguments to update many ClaimableItems.
     * @example
     * // Update many ClaimableItems
     * const claimableItem = await prisma.claimableItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClaimableItems and only return the `id`
     * const claimableItemWithIdOnly = await prisma.claimableItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClaimableItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ClaimableItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClaimableItem.
     * @param {ClaimableItemUpsertArgs} args - Arguments to update or create a ClaimableItem.
     * @example
     * // Update or create a ClaimableItem
     * const claimableItem = await prisma.claimableItem.upsert({
     *   create: {
     *     // ... data to create a ClaimableItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClaimableItem we want to update
     *   }
     * })
     */
    upsert<T extends ClaimableItemUpsertArgs>(args: SelectSubset<T, ClaimableItemUpsertArgs<ExtArgs>>): Prisma__ClaimableItemClient<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClaimableItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimableItemCountArgs} args - Arguments to filter ClaimableItems to count.
     * @example
     * // Count the number of ClaimableItems
     * const count = await prisma.claimableItem.count({
     *   where: {
     *     // ... the filter for the ClaimableItems we want to count
     *   }
     * })
    **/
    count<T extends ClaimableItemCountArgs>(
      args?: Subset<T, ClaimableItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimableItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClaimableItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimableItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClaimableItemAggregateArgs>(args: Subset<T, ClaimableItemAggregateArgs>): Prisma.PrismaPromise<GetClaimableItemAggregateType<T>>

    /**
     * Group by ClaimableItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimableItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClaimableItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimableItemGroupByArgs['orderBy'] }
        : { orderBy?: ClaimableItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClaimableItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimableItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClaimableItem model
   */
  readonly fields: ClaimableItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClaimableItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimableItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    claimTransactions<T extends ClaimableItem$claimTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, ClaimableItem$claimTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClaimableItem model
   */
  interface ClaimableItemFieldRefs {
    readonly id: FieldRef<"ClaimableItem", 'String'>
    readonly name: FieldRef<"ClaimableItem", 'String'>
    readonly description: FieldRef<"ClaimableItem", 'String'>
    readonly totalQuantity: FieldRef<"ClaimableItem", 'Int'>
    readonly remainingQuantity: FieldRef<"ClaimableItem", 'Int'>
    readonly eventId: FieldRef<"ClaimableItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ClaimableItem findUnique
   */
  export type ClaimableItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    /**
     * Filter, which ClaimableItem to fetch.
     */
    where: ClaimableItemWhereUniqueInput
  }

  /**
   * ClaimableItem findUniqueOrThrow
   */
  export type ClaimableItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    /**
     * Filter, which ClaimableItem to fetch.
     */
    where: ClaimableItemWhereUniqueInput
  }

  /**
   * ClaimableItem findFirst
   */
  export type ClaimableItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    /**
     * Filter, which ClaimableItem to fetch.
     */
    where?: ClaimableItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimableItems to fetch.
     */
    orderBy?: ClaimableItemOrderByWithRelationInput | ClaimableItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimableItems.
     */
    cursor?: ClaimableItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimableItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimableItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimableItems.
     */
    distinct?: ClaimableItemScalarFieldEnum | ClaimableItemScalarFieldEnum[]
  }

  /**
   * ClaimableItem findFirstOrThrow
   */
  export type ClaimableItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    /**
     * Filter, which ClaimableItem to fetch.
     */
    where?: ClaimableItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimableItems to fetch.
     */
    orderBy?: ClaimableItemOrderByWithRelationInput | ClaimableItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimableItems.
     */
    cursor?: ClaimableItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimableItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimableItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimableItems.
     */
    distinct?: ClaimableItemScalarFieldEnum | ClaimableItemScalarFieldEnum[]
  }

  /**
   * ClaimableItem findMany
   */
  export type ClaimableItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    /**
     * Filter, which ClaimableItems to fetch.
     */
    where?: ClaimableItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimableItems to fetch.
     */
    orderBy?: ClaimableItemOrderByWithRelationInput | ClaimableItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClaimableItems.
     */
    cursor?: ClaimableItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimableItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimableItems.
     */
    skip?: number
    distinct?: ClaimableItemScalarFieldEnum | ClaimableItemScalarFieldEnum[]
  }

  /**
   * ClaimableItem create
   */
  export type ClaimableItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ClaimableItem.
     */
    data: XOR<ClaimableItemCreateInput, ClaimableItemUncheckedCreateInput>
  }

  /**
   * ClaimableItem createMany
   */
  export type ClaimableItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClaimableItems.
     */
    data: ClaimableItemCreateManyInput | ClaimableItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClaimableItem createManyAndReturn
   */
  export type ClaimableItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * The data used to create many ClaimableItems.
     */
    data: ClaimableItemCreateManyInput | ClaimableItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimableItem update
   */
  export type ClaimableItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ClaimableItem.
     */
    data: XOR<ClaimableItemUpdateInput, ClaimableItemUncheckedUpdateInput>
    /**
     * Choose, which ClaimableItem to update.
     */
    where: ClaimableItemWhereUniqueInput
  }

  /**
   * ClaimableItem updateMany
   */
  export type ClaimableItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClaimableItems.
     */
    data: XOR<ClaimableItemUpdateManyMutationInput, ClaimableItemUncheckedUpdateManyInput>
    /**
     * Filter which ClaimableItems to update
     */
    where?: ClaimableItemWhereInput
    /**
     * Limit how many ClaimableItems to update.
     */
    limit?: number
  }

  /**
   * ClaimableItem updateManyAndReturn
   */
  export type ClaimableItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * The data used to update ClaimableItems.
     */
    data: XOR<ClaimableItemUpdateManyMutationInput, ClaimableItemUncheckedUpdateManyInput>
    /**
     * Filter which ClaimableItems to update
     */
    where?: ClaimableItemWhereInput
    /**
     * Limit how many ClaimableItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimableItem upsert
   */
  export type ClaimableItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ClaimableItem to update in case it exists.
     */
    where: ClaimableItemWhereUniqueInput
    /**
     * In case the ClaimableItem found by the `where` argument doesn't exist, create a new ClaimableItem with this data.
     */
    create: XOR<ClaimableItemCreateInput, ClaimableItemUncheckedCreateInput>
    /**
     * In case the ClaimableItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimableItemUpdateInput, ClaimableItemUncheckedUpdateInput>
  }

  /**
   * ClaimableItem delete
   */
  export type ClaimableItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
    /**
     * Filter which ClaimableItem to delete.
     */
    where: ClaimableItemWhereUniqueInput
  }

  /**
   * ClaimableItem deleteMany
   */
  export type ClaimableItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimableItems to delete
     */
    where?: ClaimableItemWhereInput
    /**
     * Limit how many ClaimableItems to delete.
     */
    limit?: number
  }

  /**
   * ClaimableItem.claimTransactions
   */
  export type ClaimableItem$claimTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    where?: ClaimTransactionWhereInput
    orderBy?: ClaimTransactionOrderByWithRelationInput | ClaimTransactionOrderByWithRelationInput[]
    cursor?: ClaimTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimTransactionScalarFieldEnum | ClaimTransactionScalarFieldEnum[]
  }

  /**
   * ClaimableItem without action
   */
  export type ClaimableItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimableItem
     */
    select?: ClaimableItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimableItem
     */
    omit?: ClaimableItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimableItemInclude<ExtArgs> | null
  }


  /**
   * Model ClaimTransaction
   */

  export type AggregateClaimTransaction = {
    _count: ClaimTransactionCountAggregateOutputType | null
    _min: ClaimTransactionMinAggregateOutputType | null
    _max: ClaimTransactionMaxAggregateOutputType | null
  }

  export type ClaimTransactionMinAggregateOutputType = {
    id: string | null
    timestamp: Date | null
    guestId: string | null
    claimableItemId: string | null
    adminId: string | null
  }

  export type ClaimTransactionMaxAggregateOutputType = {
    id: string | null
    timestamp: Date | null
    guestId: string | null
    claimableItemId: string | null
    adminId: string | null
  }

  export type ClaimTransactionCountAggregateOutputType = {
    id: number
    timestamp: number
    guestId: number
    claimableItemId: number
    adminId: number
    _all: number
  }


  export type ClaimTransactionMinAggregateInputType = {
    id?: true
    timestamp?: true
    guestId?: true
    claimableItemId?: true
    adminId?: true
  }

  export type ClaimTransactionMaxAggregateInputType = {
    id?: true
    timestamp?: true
    guestId?: true
    claimableItemId?: true
    adminId?: true
  }

  export type ClaimTransactionCountAggregateInputType = {
    id?: true
    timestamp?: true
    guestId?: true
    claimableItemId?: true
    adminId?: true
    _all?: true
  }

  export type ClaimTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimTransaction to aggregate.
     */
    where?: ClaimTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimTransactions to fetch.
     */
    orderBy?: ClaimTransactionOrderByWithRelationInput | ClaimTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClaimTransactions
    **/
    _count?: true | ClaimTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimTransactionMaxAggregateInputType
  }

  export type GetClaimTransactionAggregateType<T extends ClaimTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateClaimTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaimTransaction[P]>
      : GetScalarType<T[P], AggregateClaimTransaction[P]>
  }




  export type ClaimTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimTransactionWhereInput
    orderBy?: ClaimTransactionOrderByWithAggregationInput | ClaimTransactionOrderByWithAggregationInput[]
    by: ClaimTransactionScalarFieldEnum[] | ClaimTransactionScalarFieldEnum
    having?: ClaimTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimTransactionCountAggregateInputType | true
    _min?: ClaimTransactionMinAggregateInputType
    _max?: ClaimTransactionMaxAggregateInputType
  }

  export type ClaimTransactionGroupByOutputType = {
    id: string
    timestamp: Date
    guestId: string
    claimableItemId: string
    adminId: string
    _count: ClaimTransactionCountAggregateOutputType | null
    _min: ClaimTransactionMinAggregateOutputType | null
    _max: ClaimTransactionMaxAggregateOutputType | null
  }

  type GetClaimTransactionGroupByPayload<T extends ClaimTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimTransactionGroupByOutputType[P]>
        }
      >
    >


  export type ClaimTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    guestId?: boolean
    claimableItemId?: boolean
    adminId?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
    claimableItem?: boolean | ClaimableItemDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimTransaction"]>

  export type ClaimTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    guestId?: boolean
    claimableItemId?: boolean
    adminId?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
    claimableItem?: boolean | ClaimableItemDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimTransaction"]>

  export type ClaimTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    guestId?: boolean
    claimableItemId?: boolean
    adminId?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
    claimableItem?: boolean | ClaimableItemDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimTransaction"]>

  export type ClaimTransactionSelectScalar = {
    id?: boolean
    timestamp?: boolean
    guestId?: boolean
    claimableItemId?: boolean
    adminId?: boolean
  }

  export type ClaimTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "timestamp" | "guestId" | "claimableItemId" | "adminId", ExtArgs["result"]["claimTransaction"]>
  export type ClaimTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
    claimableItem?: boolean | ClaimableItemDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }
  export type ClaimTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
    claimableItem?: boolean | ClaimableItemDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }
  export type ClaimTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
    claimableItem?: boolean | ClaimableItemDefaultArgs<ExtArgs>
    guest?: boolean | GuestDefaultArgs<ExtArgs>
  }

  export type $ClaimTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClaimTransaction"
    objects: {
      admin: Prisma.$UserPayload<ExtArgs>
      claimableItem: Prisma.$ClaimableItemPayload<ExtArgs>
      guest: Prisma.$GuestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      timestamp: Date
      guestId: string
      claimableItemId: string
      adminId: string
    }, ExtArgs["result"]["claimTransaction"]>
    composites: {}
  }

  type ClaimTransactionGetPayload<S extends boolean | null | undefined | ClaimTransactionDefaultArgs> = $Result.GetResult<Prisma.$ClaimTransactionPayload, S>

  type ClaimTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClaimTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClaimTransactionCountAggregateInputType | true
    }

  export interface ClaimTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClaimTransaction'], meta: { name: 'ClaimTransaction' } }
    /**
     * Find zero or one ClaimTransaction that matches the filter.
     * @param {ClaimTransactionFindUniqueArgs} args - Arguments to find a ClaimTransaction
     * @example
     * // Get one ClaimTransaction
     * const claimTransaction = await prisma.claimTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimTransactionFindUniqueArgs>(args: SelectSubset<T, ClaimTransactionFindUniqueArgs<ExtArgs>>): Prisma__ClaimTransactionClient<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClaimTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClaimTransactionFindUniqueOrThrowArgs} args - Arguments to find a ClaimTransaction
     * @example
     * // Get one ClaimTransaction
     * const claimTransaction = await prisma.claimTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimTransactionClient<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimTransactionFindFirstArgs} args - Arguments to find a ClaimTransaction
     * @example
     * // Get one ClaimTransaction
     * const claimTransaction = await prisma.claimTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimTransactionFindFirstArgs>(args?: SelectSubset<T, ClaimTransactionFindFirstArgs<ExtArgs>>): Prisma__ClaimTransactionClient<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimTransactionFindFirstOrThrowArgs} args - Arguments to find a ClaimTransaction
     * @example
     * // Get one ClaimTransaction
     * const claimTransaction = await prisma.claimTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimTransactionClient<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClaimTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClaimTransactions
     * const claimTransactions = await prisma.claimTransaction.findMany()
     * 
     * // Get first 10 ClaimTransactions
     * const claimTransactions = await prisma.claimTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimTransactionWithIdOnly = await prisma.claimTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaimTransactionFindManyArgs>(args?: SelectSubset<T, ClaimTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClaimTransaction.
     * @param {ClaimTransactionCreateArgs} args - Arguments to create a ClaimTransaction.
     * @example
     * // Create one ClaimTransaction
     * const ClaimTransaction = await prisma.claimTransaction.create({
     *   data: {
     *     // ... data to create a ClaimTransaction
     *   }
     * })
     * 
     */
    create<T extends ClaimTransactionCreateArgs>(args: SelectSubset<T, ClaimTransactionCreateArgs<ExtArgs>>): Prisma__ClaimTransactionClient<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClaimTransactions.
     * @param {ClaimTransactionCreateManyArgs} args - Arguments to create many ClaimTransactions.
     * @example
     * // Create many ClaimTransactions
     * const claimTransaction = await prisma.claimTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimTransactionCreateManyArgs>(args?: SelectSubset<T, ClaimTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClaimTransactions and returns the data saved in the database.
     * @param {ClaimTransactionCreateManyAndReturnArgs} args - Arguments to create many ClaimTransactions.
     * @example
     * // Create many ClaimTransactions
     * const claimTransaction = await prisma.claimTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClaimTransactions and only return the `id`
     * const claimTransactionWithIdOnly = await prisma.claimTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClaimTransaction.
     * @param {ClaimTransactionDeleteArgs} args - Arguments to delete one ClaimTransaction.
     * @example
     * // Delete one ClaimTransaction
     * const ClaimTransaction = await prisma.claimTransaction.delete({
     *   where: {
     *     // ... filter to delete one ClaimTransaction
     *   }
     * })
     * 
     */
    delete<T extends ClaimTransactionDeleteArgs>(args: SelectSubset<T, ClaimTransactionDeleteArgs<ExtArgs>>): Prisma__ClaimTransactionClient<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClaimTransaction.
     * @param {ClaimTransactionUpdateArgs} args - Arguments to update one ClaimTransaction.
     * @example
     * // Update one ClaimTransaction
     * const claimTransaction = await prisma.claimTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimTransactionUpdateArgs>(args: SelectSubset<T, ClaimTransactionUpdateArgs<ExtArgs>>): Prisma__ClaimTransactionClient<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClaimTransactions.
     * @param {ClaimTransactionDeleteManyArgs} args - Arguments to filter ClaimTransactions to delete.
     * @example
     * // Delete a few ClaimTransactions
     * const { count } = await prisma.claimTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimTransactionDeleteManyArgs>(args?: SelectSubset<T, ClaimTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClaimTransactions
     * const claimTransaction = await prisma.claimTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimTransactionUpdateManyArgs>(args: SelectSubset<T, ClaimTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimTransactions and returns the data updated in the database.
     * @param {ClaimTransactionUpdateManyAndReturnArgs} args - Arguments to update many ClaimTransactions.
     * @example
     * // Update many ClaimTransactions
     * const claimTransaction = await prisma.claimTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClaimTransactions and only return the `id`
     * const claimTransactionWithIdOnly = await prisma.claimTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClaimTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, ClaimTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClaimTransaction.
     * @param {ClaimTransactionUpsertArgs} args - Arguments to update or create a ClaimTransaction.
     * @example
     * // Update or create a ClaimTransaction
     * const claimTransaction = await prisma.claimTransaction.upsert({
     *   create: {
     *     // ... data to create a ClaimTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClaimTransaction we want to update
     *   }
     * })
     */
    upsert<T extends ClaimTransactionUpsertArgs>(args: SelectSubset<T, ClaimTransactionUpsertArgs<ExtArgs>>): Prisma__ClaimTransactionClient<$Result.GetResult<Prisma.$ClaimTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClaimTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimTransactionCountArgs} args - Arguments to filter ClaimTransactions to count.
     * @example
     * // Count the number of ClaimTransactions
     * const count = await prisma.claimTransaction.count({
     *   where: {
     *     // ... the filter for the ClaimTransactions we want to count
     *   }
     * })
    **/
    count<T extends ClaimTransactionCountArgs>(
      args?: Subset<T, ClaimTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClaimTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClaimTransactionAggregateArgs>(args: Subset<T, ClaimTransactionAggregateArgs>): Prisma.PrismaPromise<GetClaimTransactionAggregateType<T>>

    /**
     * Group by ClaimTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClaimTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimTransactionGroupByArgs['orderBy'] }
        : { orderBy?: ClaimTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClaimTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClaimTransaction model
   */
  readonly fields: ClaimTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClaimTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    claimableItem<T extends ClaimableItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClaimableItemDefaultArgs<ExtArgs>>): Prisma__ClaimableItemClient<$Result.GetResult<Prisma.$ClaimableItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    guest<T extends GuestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GuestDefaultArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClaimTransaction model
   */
  interface ClaimTransactionFieldRefs {
    readonly id: FieldRef<"ClaimTransaction", 'String'>
    readonly timestamp: FieldRef<"ClaimTransaction", 'DateTime'>
    readonly guestId: FieldRef<"ClaimTransaction", 'String'>
    readonly claimableItemId: FieldRef<"ClaimTransaction", 'String'>
    readonly adminId: FieldRef<"ClaimTransaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ClaimTransaction findUnique
   */
  export type ClaimTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ClaimTransaction to fetch.
     */
    where: ClaimTransactionWhereUniqueInput
  }

  /**
   * ClaimTransaction findUniqueOrThrow
   */
  export type ClaimTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ClaimTransaction to fetch.
     */
    where: ClaimTransactionWhereUniqueInput
  }

  /**
   * ClaimTransaction findFirst
   */
  export type ClaimTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ClaimTransaction to fetch.
     */
    where?: ClaimTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimTransactions to fetch.
     */
    orderBy?: ClaimTransactionOrderByWithRelationInput | ClaimTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimTransactions.
     */
    cursor?: ClaimTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimTransactions.
     */
    distinct?: ClaimTransactionScalarFieldEnum | ClaimTransactionScalarFieldEnum[]
  }

  /**
   * ClaimTransaction findFirstOrThrow
   */
  export type ClaimTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ClaimTransaction to fetch.
     */
    where?: ClaimTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimTransactions to fetch.
     */
    orderBy?: ClaimTransactionOrderByWithRelationInput | ClaimTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimTransactions.
     */
    cursor?: ClaimTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimTransactions.
     */
    distinct?: ClaimTransactionScalarFieldEnum | ClaimTransactionScalarFieldEnum[]
  }

  /**
   * ClaimTransaction findMany
   */
  export type ClaimTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ClaimTransactions to fetch.
     */
    where?: ClaimTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimTransactions to fetch.
     */
    orderBy?: ClaimTransactionOrderByWithRelationInput | ClaimTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClaimTransactions.
     */
    cursor?: ClaimTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimTransactions.
     */
    skip?: number
    distinct?: ClaimTransactionScalarFieldEnum | ClaimTransactionScalarFieldEnum[]
  }

  /**
   * ClaimTransaction create
   */
  export type ClaimTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a ClaimTransaction.
     */
    data: XOR<ClaimTransactionCreateInput, ClaimTransactionUncheckedCreateInput>
  }

  /**
   * ClaimTransaction createMany
   */
  export type ClaimTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClaimTransactions.
     */
    data: ClaimTransactionCreateManyInput | ClaimTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClaimTransaction createManyAndReturn
   */
  export type ClaimTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many ClaimTransactions.
     */
    data: ClaimTransactionCreateManyInput | ClaimTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimTransaction update
   */
  export type ClaimTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a ClaimTransaction.
     */
    data: XOR<ClaimTransactionUpdateInput, ClaimTransactionUncheckedUpdateInput>
    /**
     * Choose, which ClaimTransaction to update.
     */
    where: ClaimTransactionWhereUniqueInput
  }

  /**
   * ClaimTransaction updateMany
   */
  export type ClaimTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClaimTransactions.
     */
    data: XOR<ClaimTransactionUpdateManyMutationInput, ClaimTransactionUncheckedUpdateManyInput>
    /**
     * Filter which ClaimTransactions to update
     */
    where?: ClaimTransactionWhereInput
    /**
     * Limit how many ClaimTransactions to update.
     */
    limit?: number
  }

  /**
   * ClaimTransaction updateManyAndReturn
   */
  export type ClaimTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * The data used to update ClaimTransactions.
     */
    data: XOR<ClaimTransactionUpdateManyMutationInput, ClaimTransactionUncheckedUpdateManyInput>
    /**
     * Filter which ClaimTransactions to update
     */
    where?: ClaimTransactionWhereInput
    /**
     * Limit how many ClaimTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimTransaction upsert
   */
  export type ClaimTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the ClaimTransaction to update in case it exists.
     */
    where: ClaimTransactionWhereUniqueInput
    /**
     * In case the ClaimTransaction found by the `where` argument doesn't exist, create a new ClaimTransaction with this data.
     */
    create: XOR<ClaimTransactionCreateInput, ClaimTransactionUncheckedCreateInput>
    /**
     * In case the ClaimTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimTransactionUpdateInput, ClaimTransactionUncheckedUpdateInput>
  }

  /**
   * ClaimTransaction delete
   */
  export type ClaimTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
    /**
     * Filter which ClaimTransaction to delete.
     */
    where: ClaimTransactionWhereUniqueInput
  }

  /**
   * ClaimTransaction deleteMany
   */
  export type ClaimTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimTransactions to delete
     */
    where?: ClaimTransactionWhereInput
    /**
     * Limit how many ClaimTransactions to delete.
     */
    limit?: number
  }

  /**
   * ClaimTransaction without action
   */
  export type ClaimTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimTransaction
     */
    select?: ClaimTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimTransaction
     */
    omit?: ClaimTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimTransactionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    role: 'role',
    email: 'email',
    isActive: 'isActive',
    otp: 'otp',
    otpExpires: 'otpExpires'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const UserEventAssociationScalarFieldEnum: {
    userId: 'userId',
    eventId: 'eventId'
  };

  export type UserEventAssociationScalarFieldEnum = (typeof UserEventAssociationScalarFieldEnum)[keyof typeof UserEventAssociationScalarFieldEnum]


  export const GuestCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    eventId: 'eventId',
    code: 'code',
    description: 'description',
    isActive: 'isActive',
    quota: 'quota'
  };

  export type GuestCategoryScalarFieldEnum = (typeof GuestCategoryScalarFieldEnum)[keyof typeof GuestCategoryScalarFieldEnum]


  export const GuestScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phoneNumber: 'phoneNumber',
    eventId: 'eventId',
    guestCategoryId: 'guestCategoryId',
    address: 'address',
    numberOfGuests: 'numberOfGuests',
    session: 'session',
    tableNumber: 'tableNumber',
    notes: 'notes',
    invitationLink: 'invitationLink',
    qrCode: 'qrCode',
    status: 'status',
    createdAt: 'createdAt',
    isDeleted: 'isDeleted',
    updatedAt: 'updatedAt'
  };

  export type GuestScalarFieldEnum = (typeof GuestScalarFieldEnum)[keyof typeof GuestScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    content: 'content',
    timestamp: 'timestamp',
    approved: 'approved',
    guestId: 'guestId',
    eventId: 'eventId'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const BroadcastTemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    content: 'content',
    eventId: 'eventId',
    button: 'button',
    footerMessage: 'footerMessage',
    imageAttachment: 'imageAttachment',
    subject: 'subject',
    imageAttachmentType: 'imageAttachmentType',
    coordinateFields: 'coordinateFields'
  };

  export type BroadcastTemplateScalarFieldEnum = (typeof BroadcastTemplateScalarFieldEnum)[keyof typeof BroadcastTemplateScalarFieldEnum]


  export const ClaimableItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    totalQuantity: 'totalQuantity',
    remainingQuantity: 'remainingQuantity',
    eventId: 'eventId'
  };

  export type ClaimableItemScalarFieldEnum = (typeof ClaimableItemScalarFieldEnum)[keyof typeof ClaimableItemScalarFieldEnum]


  export const ClaimTransactionScalarFieldEnum: {
    id: 'id',
    timestamp: 'timestamp',
    guestId: 'guestId',
    claimableItemId: 'claimableItemId',
    adminId: 'adminId'
  };

  export type ClaimTransactionScalarFieldEnum = (typeof ClaimTransactionScalarFieldEnum)[keyof typeof ClaimTransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'GuestStatus'
   */
  export type EnumGuestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GuestStatus'>
    


  /**
   * Reference to a field of type 'GuestStatus[]'
   */
  export type ListEnumGuestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GuestStatus[]'>
    


  /**
   * Reference to a field of type 'BroadcastType'
   */
  export type EnumBroadcastTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BroadcastType'>
    


  /**
   * Reference to a field of type 'BroadcastType[]'
   */
  export type ListEnumBroadcastTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BroadcastType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    email?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    otp?: StringNullableFilter<"User"> | string | null
    otpExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    ClaimTransaction?: ClaimTransactionListRelationFilter
    events?: UserEventAssociationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    isActive?: SortOrder
    otp?: SortOrderInput | SortOrder
    otpExpires?: SortOrderInput | SortOrder
    ClaimTransaction?: ClaimTransactionOrderByRelationAggregateInput
    events?: UserEventAssociationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    otp?: StringNullableFilter<"User"> | string | null
    otpExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    ClaimTransaction?: ClaimTransactionListRelationFilter
    events?: UserEventAssociationListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    isActive?: SortOrder
    otp?: SortOrderInput | SortOrder
    otpExpires?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    email?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    otp?: StringNullableWithAggregatesFilter<"User"> | string | null
    otpExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    name?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    isActive?: BoolFilter<"Event"> | boolean
    broadcastTemplates?: BroadcastTemplateListRelationFilter
    claimableItems?: ClaimableItemListRelationFilter
    guests?: GuestListRelationFilter
    guestCategories?: GuestCategoryListRelationFilter
    messages?: MessageListRelationFilter
    users?: UserEventAssociationListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    broadcastTemplates?: BroadcastTemplateOrderByRelationAggregateInput
    claimableItems?: ClaimableItemOrderByRelationAggregateInput
    guests?: GuestOrderByRelationAggregateInput
    guestCategories?: GuestCategoryOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    users?: UserEventAssociationOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    name?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    isActive?: BoolFilter<"Event"> | boolean
    broadcastTemplates?: BroadcastTemplateListRelationFilter
    claimableItems?: ClaimableItemListRelationFilter
    guests?: GuestListRelationFilter
    guestCategories?: GuestCategoryListRelationFilter
    messages?: MessageListRelationFilter
    users?: UserEventAssociationListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    name?: StringWithAggregatesFilter<"Event"> | string
    description?: StringNullableWithAggregatesFilter<"Event"> | string | null
    isActive?: BoolWithAggregatesFilter<"Event"> | boolean
  }

  export type UserEventAssociationWhereInput = {
    AND?: UserEventAssociationWhereInput | UserEventAssociationWhereInput[]
    OR?: UserEventAssociationWhereInput[]
    NOT?: UserEventAssociationWhereInput | UserEventAssociationWhereInput[]
    userId?: StringFilter<"UserEventAssociation"> | string
    eventId?: StringFilter<"UserEventAssociation"> | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserEventAssociationOrderByWithRelationInput = {
    userId?: SortOrder
    eventId?: SortOrder
    event?: EventOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserEventAssociationWhereUniqueInput = Prisma.AtLeast<{
    userId_eventId?: UserEventAssociationUserIdEventIdCompoundUniqueInput
    AND?: UserEventAssociationWhereInput | UserEventAssociationWhereInput[]
    OR?: UserEventAssociationWhereInput[]
    NOT?: UserEventAssociationWhereInput | UserEventAssociationWhereInput[]
    userId?: StringFilter<"UserEventAssociation"> | string
    eventId?: StringFilter<"UserEventAssociation"> | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userId_eventId">

  export type UserEventAssociationOrderByWithAggregationInput = {
    userId?: SortOrder
    eventId?: SortOrder
    _count?: UserEventAssociationCountOrderByAggregateInput
    _max?: UserEventAssociationMaxOrderByAggregateInput
    _min?: UserEventAssociationMinOrderByAggregateInput
  }

  export type UserEventAssociationScalarWhereWithAggregatesInput = {
    AND?: UserEventAssociationScalarWhereWithAggregatesInput | UserEventAssociationScalarWhereWithAggregatesInput[]
    OR?: UserEventAssociationScalarWhereWithAggregatesInput[]
    NOT?: UserEventAssociationScalarWhereWithAggregatesInput | UserEventAssociationScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserEventAssociation"> | string
    eventId?: StringWithAggregatesFilter<"UserEventAssociation"> | string
  }

  export type GuestCategoryWhereInput = {
    AND?: GuestCategoryWhereInput | GuestCategoryWhereInput[]
    OR?: GuestCategoryWhereInput[]
    NOT?: GuestCategoryWhereInput | GuestCategoryWhereInput[]
    id?: StringFilter<"GuestCategory"> | string
    name?: StringFilter<"GuestCategory"> | string
    eventId?: StringFilter<"GuestCategory"> | string
    code?: StringNullableFilter<"GuestCategory"> | string | null
    description?: StringNullableFilter<"GuestCategory"> | string | null
    isActive?: BoolFilter<"GuestCategory"> | boolean
    quota?: IntNullableFilter<"GuestCategory"> | number | null
    guests?: GuestListRelationFilter
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type GuestCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    code?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    quota?: SortOrderInput | SortOrder
    guests?: GuestOrderByRelationAggregateInput
    event?: EventOrderByWithRelationInput
  }

  export type GuestCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code_eventId?: GuestCategoryCodeEventIdCompoundUniqueInput
    AND?: GuestCategoryWhereInput | GuestCategoryWhereInput[]
    OR?: GuestCategoryWhereInput[]
    NOT?: GuestCategoryWhereInput | GuestCategoryWhereInput[]
    name?: StringFilter<"GuestCategory"> | string
    eventId?: StringFilter<"GuestCategory"> | string
    code?: StringNullableFilter<"GuestCategory"> | string | null
    description?: StringNullableFilter<"GuestCategory"> | string | null
    isActive?: BoolFilter<"GuestCategory"> | boolean
    quota?: IntNullableFilter<"GuestCategory"> | number | null
    guests?: GuestListRelationFilter
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id" | "code_eventId">

  export type GuestCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    code?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    quota?: SortOrderInput | SortOrder
    _count?: GuestCategoryCountOrderByAggregateInput
    _avg?: GuestCategoryAvgOrderByAggregateInput
    _max?: GuestCategoryMaxOrderByAggregateInput
    _min?: GuestCategoryMinOrderByAggregateInput
    _sum?: GuestCategorySumOrderByAggregateInput
  }

  export type GuestCategoryScalarWhereWithAggregatesInput = {
    AND?: GuestCategoryScalarWhereWithAggregatesInput | GuestCategoryScalarWhereWithAggregatesInput[]
    OR?: GuestCategoryScalarWhereWithAggregatesInput[]
    NOT?: GuestCategoryScalarWhereWithAggregatesInput | GuestCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GuestCategory"> | string
    name?: StringWithAggregatesFilter<"GuestCategory"> | string
    eventId?: StringWithAggregatesFilter<"GuestCategory"> | string
    code?: StringNullableWithAggregatesFilter<"GuestCategory"> | string | null
    description?: StringNullableWithAggregatesFilter<"GuestCategory"> | string | null
    isActive?: BoolWithAggregatesFilter<"GuestCategory"> | boolean
    quota?: IntNullableWithAggregatesFilter<"GuestCategory"> | number | null
  }

  export type GuestWhereInput = {
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    id?: StringFilter<"Guest"> | string
    name?: StringFilter<"Guest"> | string
    email?: StringNullableFilter<"Guest"> | string | null
    phoneNumber?: StringNullableFilter<"Guest"> | string | null
    eventId?: StringFilter<"Guest"> | string
    guestCategoryId?: StringNullableFilter<"Guest"> | string | null
    address?: StringNullableFilter<"Guest"> | string | null
    numberOfGuests?: IntNullableFilter<"Guest"> | number | null
    session?: StringNullableFilter<"Guest"> | string | null
    tableNumber?: StringNullableFilter<"Guest"> | string | null
    notes?: StringNullableFilter<"Guest"> | string | null
    invitationLink?: StringNullableFilter<"Guest"> | string | null
    qrCode?: StringNullableFilter<"Guest"> | string | null
    status?: EnumGuestStatusFilter<"Guest"> | $Enums.GuestStatus
    createdAt?: DateTimeFilter<"Guest"> | Date | string
    isDeleted?: BoolFilter<"Guest"> | boolean
    updatedAt?: DateTimeFilter<"Guest"> | Date | string
    claimTransactions?: ClaimTransactionListRelationFilter
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    guestCategory?: XOR<GuestCategoryNullableScalarRelationFilter, GuestCategoryWhereInput> | null
    messages?: MessageListRelationFilter
  }

  export type GuestOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    eventId?: SortOrder
    guestCategoryId?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    numberOfGuests?: SortOrderInput | SortOrder
    session?: SortOrderInput | SortOrder
    tableNumber?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    invitationLink?: SortOrderInput | SortOrder
    qrCode?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
    updatedAt?: SortOrder
    claimTransactions?: ClaimTransactionOrderByRelationAggregateInput
    event?: EventOrderByWithRelationInput
    guestCategory?: GuestCategoryOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type GuestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    qrCode?: string
    email_eventId?: GuestEmailEventIdCompoundUniqueInput
    phoneNumber_eventId?: GuestPhoneNumberEventIdCompoundUniqueInput
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    name?: StringFilter<"Guest"> | string
    email?: StringNullableFilter<"Guest"> | string | null
    phoneNumber?: StringNullableFilter<"Guest"> | string | null
    eventId?: StringFilter<"Guest"> | string
    guestCategoryId?: StringNullableFilter<"Guest"> | string | null
    address?: StringNullableFilter<"Guest"> | string | null
    numberOfGuests?: IntNullableFilter<"Guest"> | number | null
    session?: StringNullableFilter<"Guest"> | string | null
    tableNumber?: StringNullableFilter<"Guest"> | string | null
    notes?: StringNullableFilter<"Guest"> | string | null
    invitationLink?: StringNullableFilter<"Guest"> | string | null
    status?: EnumGuestStatusFilter<"Guest"> | $Enums.GuestStatus
    createdAt?: DateTimeFilter<"Guest"> | Date | string
    isDeleted?: BoolFilter<"Guest"> | boolean
    updatedAt?: DateTimeFilter<"Guest"> | Date | string
    claimTransactions?: ClaimTransactionListRelationFilter
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    guestCategory?: XOR<GuestCategoryNullableScalarRelationFilter, GuestCategoryWhereInput> | null
    messages?: MessageListRelationFilter
  }, "id" | "qrCode" | "email_eventId" | "phoneNumber_eventId">

  export type GuestOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    eventId?: SortOrder
    guestCategoryId?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    numberOfGuests?: SortOrderInput | SortOrder
    session?: SortOrderInput | SortOrder
    tableNumber?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    invitationLink?: SortOrderInput | SortOrder
    qrCode?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
    updatedAt?: SortOrder
    _count?: GuestCountOrderByAggregateInput
    _avg?: GuestAvgOrderByAggregateInput
    _max?: GuestMaxOrderByAggregateInput
    _min?: GuestMinOrderByAggregateInput
    _sum?: GuestSumOrderByAggregateInput
  }

  export type GuestScalarWhereWithAggregatesInput = {
    AND?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    OR?: GuestScalarWhereWithAggregatesInput[]
    NOT?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Guest"> | string
    name?: StringWithAggregatesFilter<"Guest"> | string
    email?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    eventId?: StringWithAggregatesFilter<"Guest"> | string
    guestCategoryId?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    address?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    numberOfGuests?: IntNullableWithAggregatesFilter<"Guest"> | number | null
    session?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    tableNumber?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    invitationLink?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    qrCode?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    status?: EnumGuestStatusWithAggregatesFilter<"Guest"> | $Enums.GuestStatus
    createdAt?: DateTimeWithAggregatesFilter<"Guest"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"Guest"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"Guest"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    timestamp?: DateTimeFilter<"Message"> | Date | string
    approved?: BoolFilter<"Message"> | boolean
    guestId?: StringFilter<"Message"> | string
    eventId?: StringFilter<"Message"> | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    guest?: XOR<GuestScalarRelationFilter, GuestWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    approved?: SortOrder
    guestId?: SortOrder
    eventId?: SortOrder
    event?: EventOrderByWithRelationInput
    guest?: GuestOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    content?: StringFilter<"Message"> | string
    timestamp?: DateTimeFilter<"Message"> | Date | string
    approved?: BoolFilter<"Message"> | boolean
    guestId?: StringFilter<"Message"> | string
    eventId?: StringFilter<"Message"> | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    guest?: XOR<GuestScalarRelationFilter, GuestWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    approved?: SortOrder
    guestId?: SortOrder
    eventId?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    timestamp?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    approved?: BoolWithAggregatesFilter<"Message"> | boolean
    guestId?: StringWithAggregatesFilter<"Message"> | string
    eventId?: StringWithAggregatesFilter<"Message"> | string
  }

  export type BroadcastTemplateWhereInput = {
    AND?: BroadcastTemplateWhereInput | BroadcastTemplateWhereInput[]
    OR?: BroadcastTemplateWhereInput[]
    NOT?: BroadcastTemplateWhereInput | BroadcastTemplateWhereInput[]
    id?: StringFilter<"BroadcastTemplate"> | string
    name?: StringFilter<"BroadcastTemplate"> | string
    type?: EnumBroadcastTypeFilter<"BroadcastTemplate"> | $Enums.BroadcastType
    content?: StringFilter<"BroadcastTemplate"> | string
    eventId?: StringFilter<"BroadcastTemplate"> | string
    button?: StringNullableFilter<"BroadcastTemplate"> | string | null
    footerMessage?: StringNullableFilter<"BroadcastTemplate"> | string | null
    imageAttachment?: StringNullableFilter<"BroadcastTemplate"> | string | null
    subject?: StringNullableFilter<"BroadcastTemplate"> | string | null
    imageAttachmentType?: StringNullableFilter<"BroadcastTemplate"> | string | null
    coordinateFields?: StringNullableFilter<"BroadcastTemplate"> | string | null
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type BroadcastTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    content?: SortOrder
    eventId?: SortOrder
    button?: SortOrderInput | SortOrder
    footerMessage?: SortOrderInput | SortOrder
    imageAttachment?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    imageAttachmentType?: SortOrderInput | SortOrder
    coordinateFields?: SortOrderInput | SortOrder
    event?: EventOrderByWithRelationInput
  }

  export type BroadcastTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BroadcastTemplateWhereInput | BroadcastTemplateWhereInput[]
    OR?: BroadcastTemplateWhereInput[]
    NOT?: BroadcastTemplateWhereInput | BroadcastTemplateWhereInput[]
    name?: StringFilter<"BroadcastTemplate"> | string
    type?: EnumBroadcastTypeFilter<"BroadcastTemplate"> | $Enums.BroadcastType
    content?: StringFilter<"BroadcastTemplate"> | string
    eventId?: StringFilter<"BroadcastTemplate"> | string
    button?: StringNullableFilter<"BroadcastTemplate"> | string | null
    footerMessage?: StringNullableFilter<"BroadcastTemplate"> | string | null
    imageAttachment?: StringNullableFilter<"BroadcastTemplate"> | string | null
    subject?: StringNullableFilter<"BroadcastTemplate"> | string | null
    imageAttachmentType?: StringNullableFilter<"BroadcastTemplate"> | string | null
    coordinateFields?: StringNullableFilter<"BroadcastTemplate"> | string | null
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id">

  export type BroadcastTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    content?: SortOrder
    eventId?: SortOrder
    button?: SortOrderInput | SortOrder
    footerMessage?: SortOrderInput | SortOrder
    imageAttachment?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    imageAttachmentType?: SortOrderInput | SortOrder
    coordinateFields?: SortOrderInput | SortOrder
    _count?: BroadcastTemplateCountOrderByAggregateInput
    _max?: BroadcastTemplateMaxOrderByAggregateInput
    _min?: BroadcastTemplateMinOrderByAggregateInput
  }

  export type BroadcastTemplateScalarWhereWithAggregatesInput = {
    AND?: BroadcastTemplateScalarWhereWithAggregatesInput | BroadcastTemplateScalarWhereWithAggregatesInput[]
    OR?: BroadcastTemplateScalarWhereWithAggregatesInput[]
    NOT?: BroadcastTemplateScalarWhereWithAggregatesInput | BroadcastTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BroadcastTemplate"> | string
    name?: StringWithAggregatesFilter<"BroadcastTemplate"> | string
    type?: EnumBroadcastTypeWithAggregatesFilter<"BroadcastTemplate"> | $Enums.BroadcastType
    content?: StringWithAggregatesFilter<"BroadcastTemplate"> | string
    eventId?: StringWithAggregatesFilter<"BroadcastTemplate"> | string
    button?: StringNullableWithAggregatesFilter<"BroadcastTemplate"> | string | null
    footerMessage?: StringNullableWithAggregatesFilter<"BroadcastTemplate"> | string | null
    imageAttachment?: StringNullableWithAggregatesFilter<"BroadcastTemplate"> | string | null
    subject?: StringNullableWithAggregatesFilter<"BroadcastTemplate"> | string | null
    imageAttachmentType?: StringNullableWithAggregatesFilter<"BroadcastTemplate"> | string | null
    coordinateFields?: StringNullableWithAggregatesFilter<"BroadcastTemplate"> | string | null
  }

  export type ClaimableItemWhereInput = {
    AND?: ClaimableItemWhereInput | ClaimableItemWhereInput[]
    OR?: ClaimableItemWhereInput[]
    NOT?: ClaimableItemWhereInput | ClaimableItemWhereInput[]
    id?: StringFilter<"ClaimableItem"> | string
    name?: StringFilter<"ClaimableItem"> | string
    description?: StringNullableFilter<"ClaimableItem"> | string | null
    totalQuantity?: IntFilter<"ClaimableItem"> | number
    remainingQuantity?: IntFilter<"ClaimableItem"> | number
    eventId?: StringFilter<"ClaimableItem"> | string
    claimTransactions?: ClaimTransactionListRelationFilter
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type ClaimableItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    totalQuantity?: SortOrder
    remainingQuantity?: SortOrder
    eventId?: SortOrder
    claimTransactions?: ClaimTransactionOrderByRelationAggregateInput
    event?: EventOrderByWithRelationInput
  }

  export type ClaimableItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClaimableItemWhereInput | ClaimableItemWhereInput[]
    OR?: ClaimableItemWhereInput[]
    NOT?: ClaimableItemWhereInput | ClaimableItemWhereInput[]
    name?: StringFilter<"ClaimableItem"> | string
    description?: StringNullableFilter<"ClaimableItem"> | string | null
    totalQuantity?: IntFilter<"ClaimableItem"> | number
    remainingQuantity?: IntFilter<"ClaimableItem"> | number
    eventId?: StringFilter<"ClaimableItem"> | string
    claimTransactions?: ClaimTransactionListRelationFilter
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id">

  export type ClaimableItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    totalQuantity?: SortOrder
    remainingQuantity?: SortOrder
    eventId?: SortOrder
    _count?: ClaimableItemCountOrderByAggregateInput
    _avg?: ClaimableItemAvgOrderByAggregateInput
    _max?: ClaimableItemMaxOrderByAggregateInput
    _min?: ClaimableItemMinOrderByAggregateInput
    _sum?: ClaimableItemSumOrderByAggregateInput
  }

  export type ClaimableItemScalarWhereWithAggregatesInput = {
    AND?: ClaimableItemScalarWhereWithAggregatesInput | ClaimableItemScalarWhereWithAggregatesInput[]
    OR?: ClaimableItemScalarWhereWithAggregatesInput[]
    NOT?: ClaimableItemScalarWhereWithAggregatesInput | ClaimableItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClaimableItem"> | string
    name?: StringWithAggregatesFilter<"ClaimableItem"> | string
    description?: StringNullableWithAggregatesFilter<"ClaimableItem"> | string | null
    totalQuantity?: IntWithAggregatesFilter<"ClaimableItem"> | number
    remainingQuantity?: IntWithAggregatesFilter<"ClaimableItem"> | number
    eventId?: StringWithAggregatesFilter<"ClaimableItem"> | string
  }

  export type ClaimTransactionWhereInput = {
    AND?: ClaimTransactionWhereInput | ClaimTransactionWhereInput[]
    OR?: ClaimTransactionWhereInput[]
    NOT?: ClaimTransactionWhereInput | ClaimTransactionWhereInput[]
    id?: StringFilter<"ClaimTransaction"> | string
    timestamp?: DateTimeFilter<"ClaimTransaction"> | Date | string
    guestId?: StringFilter<"ClaimTransaction"> | string
    claimableItemId?: StringFilter<"ClaimTransaction"> | string
    adminId?: StringFilter<"ClaimTransaction"> | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    claimableItem?: XOR<ClaimableItemScalarRelationFilter, ClaimableItemWhereInput>
    guest?: XOR<GuestScalarRelationFilter, GuestWhereInput>
  }

  export type ClaimTransactionOrderByWithRelationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    guestId?: SortOrder
    claimableItemId?: SortOrder
    adminId?: SortOrder
    admin?: UserOrderByWithRelationInput
    claimableItem?: ClaimableItemOrderByWithRelationInput
    guest?: GuestOrderByWithRelationInput
  }

  export type ClaimTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClaimTransactionWhereInput | ClaimTransactionWhereInput[]
    OR?: ClaimTransactionWhereInput[]
    NOT?: ClaimTransactionWhereInput | ClaimTransactionWhereInput[]
    timestamp?: DateTimeFilter<"ClaimTransaction"> | Date | string
    guestId?: StringFilter<"ClaimTransaction"> | string
    claimableItemId?: StringFilter<"ClaimTransaction"> | string
    adminId?: StringFilter<"ClaimTransaction"> | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    claimableItem?: XOR<ClaimableItemScalarRelationFilter, ClaimableItemWhereInput>
    guest?: XOR<GuestScalarRelationFilter, GuestWhereInput>
  }, "id">

  export type ClaimTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    guestId?: SortOrder
    claimableItemId?: SortOrder
    adminId?: SortOrder
    _count?: ClaimTransactionCountOrderByAggregateInput
    _max?: ClaimTransactionMaxOrderByAggregateInput
    _min?: ClaimTransactionMinOrderByAggregateInput
  }

  export type ClaimTransactionScalarWhereWithAggregatesInput = {
    AND?: ClaimTransactionScalarWhereWithAggregatesInput | ClaimTransactionScalarWhereWithAggregatesInput[]
    OR?: ClaimTransactionScalarWhereWithAggregatesInput[]
    NOT?: ClaimTransactionScalarWhereWithAggregatesInput | ClaimTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClaimTransaction"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ClaimTransaction"> | Date | string
    guestId?: StringWithAggregatesFilter<"ClaimTransaction"> | string
    claimableItemId?: StringWithAggregatesFilter<"ClaimTransaction"> | string
    adminId?: StringWithAggregatesFilter<"ClaimTransaction"> | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email: string
    isActive?: boolean
    otp?: string | null
    otpExpires?: Date | string | null
    ClaimTransaction?: ClaimTransactionCreateNestedManyWithoutAdminInput
    events?: UserEventAssociationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email: string
    isActive?: boolean
    otp?: string | null
    otpExpires?: Date | string | null
    ClaimTransaction?: ClaimTransactionUncheckedCreateNestedManyWithoutAdminInput
    events?: UserEventAssociationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    otpExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ClaimTransaction?: ClaimTransactionUpdateManyWithoutAdminNestedInput
    events?: UserEventAssociationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    otpExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ClaimTransaction?: ClaimTransactionUncheckedUpdateManyWithoutAdminNestedInput
    events?: UserEventAssociationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email: string
    isActive?: boolean
    otp?: string | null
    otpExpires?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    otpExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    otpExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemCreateNestedManyWithoutEventInput
    guests?: GuestCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryCreateNestedManyWithoutEventInput
    messages?: MessageCreateNestedManyWithoutEventInput
    users?: UserEventAssociationCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateUncheckedCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemUncheckedCreateNestedManyWithoutEventInput
    guests?: GuestUncheckedCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryUncheckedCreateNestedManyWithoutEventInput
    messages?: MessageUncheckedCreateNestedManyWithoutEventInput
    users?: UserEventAssociationUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUpdateManyWithoutEventNestedInput
    guests?: GuestUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUpdateManyWithoutEventNestedInput
    messages?: MessageUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUncheckedUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUncheckedUpdateManyWithoutEventNestedInput
    guests?: GuestUncheckedUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUncheckedUpdateManyWithoutEventNestedInput
    messages?: MessageUncheckedUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserEventAssociationCreateInput = {
    event: EventCreateNestedOneWithoutUsersInput
    user: UserCreateNestedOneWithoutEventsInput
  }

  export type UserEventAssociationUncheckedCreateInput = {
    userId: string
    eventId: string
  }

  export type UserEventAssociationUpdateInput = {
    event?: EventUpdateOneRequiredWithoutUsersNestedInput
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
  }

  export type UserEventAssociationUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type UserEventAssociationCreateManyInput = {
    userId: string
    eventId: string
  }

  export type UserEventAssociationUpdateManyMutationInput = {

  }

  export type UserEventAssociationUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type GuestCategoryCreateInput = {
    id?: string
    name: string
    code?: string | null
    description?: string | null
    isActive?: boolean
    quota?: number | null
    guests?: GuestCreateNestedManyWithoutGuestCategoryInput
    event: EventCreateNestedOneWithoutGuestCategoriesInput
  }

  export type GuestCategoryUncheckedCreateInput = {
    id?: string
    name: string
    eventId: string
    code?: string | null
    description?: string | null
    isActive?: boolean
    quota?: number | null
    guests?: GuestUncheckedCreateNestedManyWithoutGuestCategoryInput
  }

  export type GuestCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    quota?: NullableIntFieldUpdateOperationsInput | number | null
    guests?: GuestUpdateManyWithoutGuestCategoryNestedInput
    event?: EventUpdateOneRequiredWithoutGuestCategoriesNestedInput
  }

  export type GuestCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    quota?: NullableIntFieldUpdateOperationsInput | number | null
    guests?: GuestUncheckedUpdateManyWithoutGuestCategoryNestedInput
  }

  export type GuestCategoryCreateManyInput = {
    id?: string
    name: string
    eventId: string
    code?: string | null
    description?: string | null
    isActive?: boolean
    quota?: number | null
  }

  export type GuestCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    quota?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GuestCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    quota?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GuestCreateInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    claimTransactions?: ClaimTransactionCreateNestedManyWithoutGuestInput
    event: EventCreateNestedOneWithoutGuestsInput
    guestCategory?: GuestCategoryCreateNestedOneWithoutGuestsInput
    messages?: MessageCreateNestedManyWithoutGuestInput
  }

  export type GuestUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    eventId: string
    guestCategoryId?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    claimTransactions?: ClaimTransactionUncheckedCreateNestedManyWithoutGuestInput
    messages?: MessageUncheckedCreateNestedManyWithoutGuestInput
  }

  export type GuestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimTransactions?: ClaimTransactionUpdateManyWithoutGuestNestedInput
    event?: EventUpdateOneRequiredWithoutGuestsNestedInput
    guestCategory?: GuestCategoryUpdateOneWithoutGuestsNestedInput
    messages?: MessageUpdateManyWithoutGuestNestedInput
  }

  export type GuestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    guestCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimTransactions?: ClaimTransactionUncheckedUpdateManyWithoutGuestNestedInput
    messages?: MessageUncheckedUpdateManyWithoutGuestNestedInput
  }

  export type GuestCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    eventId: string
    guestCategoryId?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
  }

  export type GuestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    guestCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    timestamp?: Date | string
    approved?: boolean
    event: EventCreateNestedOneWithoutMessagesInput
    guest: GuestCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    content: string
    timestamp?: Date | string
    approved?: boolean
    guestId: string
    eventId: string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
    event?: EventUpdateOneRequiredWithoutMessagesNestedInput
    guest?: GuestUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
    guestId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateManyInput = {
    id?: string
    content: string
    timestamp?: Date | string
    approved?: boolean
    guestId: string
    eventId: string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
    guestId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type BroadcastTemplateCreateInput = {
    id?: string
    name: string
    type: $Enums.BroadcastType
    content: string
    button?: string | null
    footerMessage?: string | null
    imageAttachment?: string | null
    subject?: string | null
    imageAttachmentType?: string | null
    coordinateFields?: string | null
    event: EventCreateNestedOneWithoutBroadcastTemplatesInput
  }

  export type BroadcastTemplateUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.BroadcastType
    content: string
    eventId: string
    button?: string | null
    footerMessage?: string | null
    imageAttachment?: string | null
    subject?: string | null
    imageAttachmentType?: string | null
    coordinateFields?: string | null
  }

  export type BroadcastTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumBroadcastTypeFieldUpdateOperationsInput | $Enums.BroadcastType
    content?: StringFieldUpdateOperationsInput | string
    button?: NullableStringFieldUpdateOperationsInput | string | null
    footerMessage?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachment?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    coordinateFields?: NullableStringFieldUpdateOperationsInput | string | null
    event?: EventUpdateOneRequiredWithoutBroadcastTemplatesNestedInput
  }

  export type BroadcastTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumBroadcastTypeFieldUpdateOperationsInput | $Enums.BroadcastType
    content?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    button?: NullableStringFieldUpdateOperationsInput | string | null
    footerMessage?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachment?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    coordinateFields?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BroadcastTemplateCreateManyInput = {
    id?: string
    name: string
    type: $Enums.BroadcastType
    content: string
    eventId: string
    button?: string | null
    footerMessage?: string | null
    imageAttachment?: string | null
    subject?: string | null
    imageAttachmentType?: string | null
    coordinateFields?: string | null
  }

  export type BroadcastTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumBroadcastTypeFieldUpdateOperationsInput | $Enums.BroadcastType
    content?: StringFieldUpdateOperationsInput | string
    button?: NullableStringFieldUpdateOperationsInput | string | null
    footerMessage?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachment?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    coordinateFields?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BroadcastTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumBroadcastTypeFieldUpdateOperationsInput | $Enums.BroadcastType
    content?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    button?: NullableStringFieldUpdateOperationsInput | string | null
    footerMessage?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachment?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    coordinateFields?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClaimableItemCreateInput = {
    id?: string
    name: string
    description?: string | null
    totalQuantity: number
    remainingQuantity: number
    claimTransactions?: ClaimTransactionCreateNestedManyWithoutClaimableItemInput
    event: EventCreateNestedOneWithoutClaimableItemsInput
  }

  export type ClaimableItemUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    totalQuantity: number
    remainingQuantity: number
    eventId: string
    claimTransactions?: ClaimTransactionUncheckedCreateNestedManyWithoutClaimableItemInput
  }

  export type ClaimableItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: IntFieldUpdateOperationsInput | number
    claimTransactions?: ClaimTransactionUpdateManyWithoutClaimableItemNestedInput
    event?: EventUpdateOneRequiredWithoutClaimableItemsNestedInput
  }

  export type ClaimableItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: IntFieldUpdateOperationsInput | number
    eventId?: StringFieldUpdateOperationsInput | string
    claimTransactions?: ClaimTransactionUncheckedUpdateManyWithoutClaimableItemNestedInput
  }

  export type ClaimableItemCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    totalQuantity: number
    remainingQuantity: number
    eventId: string
  }

  export type ClaimableItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: IntFieldUpdateOperationsInput | number
  }

  export type ClaimableItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: IntFieldUpdateOperationsInput | number
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type ClaimTransactionCreateInput = {
    id?: string
    timestamp?: Date | string
    admin: UserCreateNestedOneWithoutClaimTransactionInput
    claimableItem: ClaimableItemCreateNestedOneWithoutClaimTransactionsInput
    guest: GuestCreateNestedOneWithoutClaimTransactionsInput
  }

  export type ClaimTransactionUncheckedCreateInput = {
    id?: string
    timestamp?: Date | string
    guestId: string
    claimableItemId: string
    adminId: string
  }

  export type ClaimTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutClaimTransactionNestedInput
    claimableItem?: ClaimableItemUpdateOneRequiredWithoutClaimTransactionsNestedInput
    guest?: GuestUpdateOneRequiredWithoutClaimTransactionsNestedInput
  }

  export type ClaimTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    guestId?: StringFieldUpdateOperationsInput | string
    claimableItemId?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
  }

  export type ClaimTransactionCreateManyInput = {
    id?: string
    timestamp?: Date | string
    guestId: string
    claimableItemId: string
    adminId: string
  }

  export type ClaimTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    guestId?: StringFieldUpdateOperationsInput | string
    claimableItemId?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ClaimTransactionListRelationFilter = {
    every?: ClaimTransactionWhereInput
    some?: ClaimTransactionWhereInput
    none?: ClaimTransactionWhereInput
  }

  export type UserEventAssociationListRelationFilter = {
    every?: UserEventAssociationWhereInput
    some?: UserEventAssociationWhereInput
    none?: UserEventAssociationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClaimTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserEventAssociationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    isActive?: SortOrder
    otp?: SortOrder
    otpExpires?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    isActive?: SortOrder
    otp?: SortOrder
    otpExpires?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    isActive?: SortOrder
    otp?: SortOrder
    otpExpires?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BroadcastTemplateListRelationFilter = {
    every?: BroadcastTemplateWhereInput
    some?: BroadcastTemplateWhereInput
    none?: BroadcastTemplateWhereInput
  }

  export type ClaimableItemListRelationFilter = {
    every?: ClaimableItemWhereInput
    some?: ClaimableItemWhereInput
    none?: ClaimableItemWhereInput
  }

  export type GuestListRelationFilter = {
    every?: GuestWhereInput
    some?: GuestWhereInput
    none?: GuestWhereInput
  }

  export type GuestCategoryListRelationFilter = {
    every?: GuestCategoryWhereInput
    some?: GuestCategoryWhereInput
    none?: GuestCategoryWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type BroadcastTemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClaimableItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GuestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GuestCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserEventAssociationUserIdEventIdCompoundUniqueInput = {
    userId: string
    eventId: string
  }

  export type UserEventAssociationCountOrderByAggregateInput = {
    userId?: SortOrder
    eventId?: SortOrder
  }

  export type UserEventAssociationMaxOrderByAggregateInput = {
    userId?: SortOrder
    eventId?: SortOrder
  }

  export type UserEventAssociationMinOrderByAggregateInput = {
    userId?: SortOrder
    eventId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type GuestCategoryCodeEventIdCompoundUniqueInput = {
    code: string
    eventId: string
  }

  export type GuestCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    code?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    quota?: SortOrder
  }

  export type GuestCategoryAvgOrderByAggregateInput = {
    quota?: SortOrder
  }

  export type GuestCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    code?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    quota?: SortOrder
  }

  export type GuestCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    code?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    quota?: SortOrder
  }

  export type GuestCategorySumOrderByAggregateInput = {
    quota?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumGuestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GuestStatus | EnumGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuestStatusFilter<$PrismaModel> | $Enums.GuestStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GuestCategoryNullableScalarRelationFilter = {
    is?: GuestCategoryWhereInput | null
    isNot?: GuestCategoryWhereInput | null
  }

  export type GuestEmailEventIdCompoundUniqueInput = {
    email: string
    eventId: string
  }

  export type GuestPhoneNumberEventIdCompoundUniqueInput = {
    phoneNumber: string
    eventId: string
  }

  export type GuestCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    eventId?: SortOrder
    guestCategoryId?: SortOrder
    address?: SortOrder
    numberOfGuests?: SortOrder
    session?: SortOrder
    tableNumber?: SortOrder
    notes?: SortOrder
    invitationLink?: SortOrder
    qrCode?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestAvgOrderByAggregateInput = {
    numberOfGuests?: SortOrder
  }

  export type GuestMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    eventId?: SortOrder
    guestCategoryId?: SortOrder
    address?: SortOrder
    numberOfGuests?: SortOrder
    session?: SortOrder
    tableNumber?: SortOrder
    notes?: SortOrder
    invitationLink?: SortOrder
    qrCode?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    eventId?: SortOrder
    guestCategoryId?: SortOrder
    address?: SortOrder
    numberOfGuests?: SortOrder
    session?: SortOrder
    tableNumber?: SortOrder
    notes?: SortOrder
    invitationLink?: SortOrder
    qrCode?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    isDeleted?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestSumOrderByAggregateInput = {
    numberOfGuests?: SortOrder
  }

  export type EnumGuestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GuestStatus | EnumGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuestStatusWithAggregatesFilter<$PrismaModel> | $Enums.GuestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGuestStatusFilter<$PrismaModel>
    _max?: NestedEnumGuestStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type GuestScalarRelationFilter = {
    is?: GuestWhereInput
    isNot?: GuestWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    approved?: SortOrder
    guestId?: SortOrder
    eventId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    approved?: SortOrder
    guestId?: SortOrder
    eventId?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    approved?: SortOrder
    guestId?: SortOrder
    eventId?: SortOrder
  }

  export type EnumBroadcastTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastType | EnumBroadcastTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastType[] | ListEnumBroadcastTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastType[] | ListEnumBroadcastTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastTypeFilter<$PrismaModel> | $Enums.BroadcastType
  }

  export type BroadcastTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    content?: SortOrder
    eventId?: SortOrder
    button?: SortOrder
    footerMessage?: SortOrder
    imageAttachment?: SortOrder
    subject?: SortOrder
    imageAttachmentType?: SortOrder
    coordinateFields?: SortOrder
  }

  export type BroadcastTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    content?: SortOrder
    eventId?: SortOrder
    button?: SortOrder
    footerMessage?: SortOrder
    imageAttachment?: SortOrder
    subject?: SortOrder
    imageAttachmentType?: SortOrder
    coordinateFields?: SortOrder
  }

  export type BroadcastTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    content?: SortOrder
    eventId?: SortOrder
    button?: SortOrder
    footerMessage?: SortOrder
    imageAttachment?: SortOrder
    subject?: SortOrder
    imageAttachmentType?: SortOrder
    coordinateFields?: SortOrder
  }

  export type EnumBroadcastTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastType | EnumBroadcastTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastType[] | ListEnumBroadcastTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastType[] | ListEnumBroadcastTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastTypeWithAggregatesFilter<$PrismaModel> | $Enums.BroadcastType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBroadcastTypeFilter<$PrismaModel>
    _max?: NestedEnumBroadcastTypeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ClaimableItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    totalQuantity?: SortOrder
    remainingQuantity?: SortOrder
    eventId?: SortOrder
  }

  export type ClaimableItemAvgOrderByAggregateInput = {
    totalQuantity?: SortOrder
    remainingQuantity?: SortOrder
  }

  export type ClaimableItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    totalQuantity?: SortOrder
    remainingQuantity?: SortOrder
    eventId?: SortOrder
  }

  export type ClaimableItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    totalQuantity?: SortOrder
    remainingQuantity?: SortOrder
    eventId?: SortOrder
  }

  export type ClaimableItemSumOrderByAggregateInput = {
    totalQuantity?: SortOrder
    remainingQuantity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ClaimableItemScalarRelationFilter = {
    is?: ClaimableItemWhereInput
    isNot?: ClaimableItemWhereInput
  }

  export type ClaimTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    guestId?: SortOrder
    claimableItemId?: SortOrder
    adminId?: SortOrder
  }

  export type ClaimTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    guestId?: SortOrder
    claimableItemId?: SortOrder
    adminId?: SortOrder
  }

  export type ClaimTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    guestId?: SortOrder
    claimableItemId?: SortOrder
    adminId?: SortOrder
  }

  export type ClaimTransactionCreateNestedManyWithoutAdminInput = {
    create?: XOR<ClaimTransactionCreateWithoutAdminInput, ClaimTransactionUncheckedCreateWithoutAdminInput> | ClaimTransactionCreateWithoutAdminInput[] | ClaimTransactionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutAdminInput | ClaimTransactionCreateOrConnectWithoutAdminInput[]
    createMany?: ClaimTransactionCreateManyAdminInputEnvelope
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
  }

  export type UserEventAssociationCreateNestedManyWithoutUserInput = {
    create?: XOR<UserEventAssociationCreateWithoutUserInput, UserEventAssociationUncheckedCreateWithoutUserInput> | UserEventAssociationCreateWithoutUserInput[] | UserEventAssociationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventAssociationCreateOrConnectWithoutUserInput | UserEventAssociationCreateOrConnectWithoutUserInput[]
    createMany?: UserEventAssociationCreateManyUserInputEnvelope
    connect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
  }

  export type ClaimTransactionUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<ClaimTransactionCreateWithoutAdminInput, ClaimTransactionUncheckedCreateWithoutAdminInput> | ClaimTransactionCreateWithoutAdminInput[] | ClaimTransactionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutAdminInput | ClaimTransactionCreateOrConnectWithoutAdminInput[]
    createMany?: ClaimTransactionCreateManyAdminInputEnvelope
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
  }

  export type UserEventAssociationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserEventAssociationCreateWithoutUserInput, UserEventAssociationUncheckedCreateWithoutUserInput> | UserEventAssociationCreateWithoutUserInput[] | UserEventAssociationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventAssociationCreateOrConnectWithoutUserInput | UserEventAssociationCreateOrConnectWithoutUserInput[]
    createMany?: UserEventAssociationCreateManyUserInputEnvelope
    connect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ClaimTransactionUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ClaimTransactionCreateWithoutAdminInput, ClaimTransactionUncheckedCreateWithoutAdminInput> | ClaimTransactionCreateWithoutAdminInput[] | ClaimTransactionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutAdminInput | ClaimTransactionCreateOrConnectWithoutAdminInput[]
    upsert?: ClaimTransactionUpsertWithWhereUniqueWithoutAdminInput | ClaimTransactionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ClaimTransactionCreateManyAdminInputEnvelope
    set?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    disconnect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    delete?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    update?: ClaimTransactionUpdateWithWhereUniqueWithoutAdminInput | ClaimTransactionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ClaimTransactionUpdateManyWithWhereWithoutAdminInput | ClaimTransactionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ClaimTransactionScalarWhereInput | ClaimTransactionScalarWhereInput[]
  }

  export type UserEventAssociationUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserEventAssociationCreateWithoutUserInput, UserEventAssociationUncheckedCreateWithoutUserInput> | UserEventAssociationCreateWithoutUserInput[] | UserEventAssociationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventAssociationCreateOrConnectWithoutUserInput | UserEventAssociationCreateOrConnectWithoutUserInput[]
    upsert?: UserEventAssociationUpsertWithWhereUniqueWithoutUserInput | UserEventAssociationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserEventAssociationCreateManyUserInputEnvelope
    set?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    disconnect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    delete?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    connect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    update?: UserEventAssociationUpdateWithWhereUniqueWithoutUserInput | UserEventAssociationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserEventAssociationUpdateManyWithWhereWithoutUserInput | UserEventAssociationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserEventAssociationScalarWhereInput | UserEventAssociationScalarWhereInput[]
  }

  export type ClaimTransactionUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ClaimTransactionCreateWithoutAdminInput, ClaimTransactionUncheckedCreateWithoutAdminInput> | ClaimTransactionCreateWithoutAdminInput[] | ClaimTransactionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutAdminInput | ClaimTransactionCreateOrConnectWithoutAdminInput[]
    upsert?: ClaimTransactionUpsertWithWhereUniqueWithoutAdminInput | ClaimTransactionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ClaimTransactionCreateManyAdminInputEnvelope
    set?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    disconnect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    delete?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    update?: ClaimTransactionUpdateWithWhereUniqueWithoutAdminInput | ClaimTransactionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ClaimTransactionUpdateManyWithWhereWithoutAdminInput | ClaimTransactionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ClaimTransactionScalarWhereInput | ClaimTransactionScalarWhereInput[]
  }

  export type UserEventAssociationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserEventAssociationCreateWithoutUserInput, UserEventAssociationUncheckedCreateWithoutUserInput> | UserEventAssociationCreateWithoutUserInput[] | UserEventAssociationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventAssociationCreateOrConnectWithoutUserInput | UserEventAssociationCreateOrConnectWithoutUserInput[]
    upsert?: UserEventAssociationUpsertWithWhereUniqueWithoutUserInput | UserEventAssociationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserEventAssociationCreateManyUserInputEnvelope
    set?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    disconnect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    delete?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    connect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    update?: UserEventAssociationUpdateWithWhereUniqueWithoutUserInput | UserEventAssociationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserEventAssociationUpdateManyWithWhereWithoutUserInput | UserEventAssociationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserEventAssociationScalarWhereInput | UserEventAssociationScalarWhereInput[]
  }

  export type BroadcastTemplateCreateNestedManyWithoutEventInput = {
    create?: XOR<BroadcastTemplateCreateWithoutEventInput, BroadcastTemplateUncheckedCreateWithoutEventInput> | BroadcastTemplateCreateWithoutEventInput[] | BroadcastTemplateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BroadcastTemplateCreateOrConnectWithoutEventInput | BroadcastTemplateCreateOrConnectWithoutEventInput[]
    createMany?: BroadcastTemplateCreateManyEventInputEnvelope
    connect?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
  }

  export type ClaimableItemCreateNestedManyWithoutEventInput = {
    create?: XOR<ClaimableItemCreateWithoutEventInput, ClaimableItemUncheckedCreateWithoutEventInput> | ClaimableItemCreateWithoutEventInput[] | ClaimableItemUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ClaimableItemCreateOrConnectWithoutEventInput | ClaimableItemCreateOrConnectWithoutEventInput[]
    createMany?: ClaimableItemCreateManyEventInputEnvelope
    connect?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
  }

  export type GuestCreateNestedManyWithoutEventInput = {
    create?: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput> | GuestCreateWithoutEventInput[] | GuestUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutEventInput | GuestCreateOrConnectWithoutEventInput[]
    createMany?: GuestCreateManyEventInputEnvelope
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
  }

  export type GuestCategoryCreateNestedManyWithoutEventInput = {
    create?: XOR<GuestCategoryCreateWithoutEventInput, GuestCategoryUncheckedCreateWithoutEventInput> | GuestCategoryCreateWithoutEventInput[] | GuestCategoryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCategoryCreateOrConnectWithoutEventInput | GuestCategoryCreateOrConnectWithoutEventInput[]
    createMany?: GuestCategoryCreateManyEventInputEnvelope
    connect?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutEventInput = {
    create?: XOR<MessageCreateWithoutEventInput, MessageUncheckedCreateWithoutEventInput> | MessageCreateWithoutEventInput[] | MessageUncheckedCreateWithoutEventInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutEventInput | MessageCreateOrConnectWithoutEventInput[]
    createMany?: MessageCreateManyEventInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UserEventAssociationCreateNestedManyWithoutEventInput = {
    create?: XOR<UserEventAssociationCreateWithoutEventInput, UserEventAssociationUncheckedCreateWithoutEventInput> | UserEventAssociationCreateWithoutEventInput[] | UserEventAssociationUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserEventAssociationCreateOrConnectWithoutEventInput | UserEventAssociationCreateOrConnectWithoutEventInput[]
    createMany?: UserEventAssociationCreateManyEventInputEnvelope
    connect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
  }

  export type BroadcastTemplateUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<BroadcastTemplateCreateWithoutEventInput, BroadcastTemplateUncheckedCreateWithoutEventInput> | BroadcastTemplateCreateWithoutEventInput[] | BroadcastTemplateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BroadcastTemplateCreateOrConnectWithoutEventInput | BroadcastTemplateCreateOrConnectWithoutEventInput[]
    createMany?: BroadcastTemplateCreateManyEventInputEnvelope
    connect?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
  }

  export type ClaimableItemUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<ClaimableItemCreateWithoutEventInput, ClaimableItemUncheckedCreateWithoutEventInput> | ClaimableItemCreateWithoutEventInput[] | ClaimableItemUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ClaimableItemCreateOrConnectWithoutEventInput | ClaimableItemCreateOrConnectWithoutEventInput[]
    createMany?: ClaimableItemCreateManyEventInputEnvelope
    connect?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
  }

  export type GuestUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput> | GuestCreateWithoutEventInput[] | GuestUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutEventInput | GuestCreateOrConnectWithoutEventInput[]
    createMany?: GuestCreateManyEventInputEnvelope
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
  }

  export type GuestCategoryUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<GuestCategoryCreateWithoutEventInput, GuestCategoryUncheckedCreateWithoutEventInput> | GuestCategoryCreateWithoutEventInput[] | GuestCategoryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCategoryCreateOrConnectWithoutEventInput | GuestCategoryCreateOrConnectWithoutEventInput[]
    createMany?: GuestCategoryCreateManyEventInputEnvelope
    connect?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<MessageCreateWithoutEventInput, MessageUncheckedCreateWithoutEventInput> | MessageCreateWithoutEventInput[] | MessageUncheckedCreateWithoutEventInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutEventInput | MessageCreateOrConnectWithoutEventInput[]
    createMany?: MessageCreateManyEventInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UserEventAssociationUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<UserEventAssociationCreateWithoutEventInput, UserEventAssociationUncheckedCreateWithoutEventInput> | UserEventAssociationCreateWithoutEventInput[] | UserEventAssociationUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserEventAssociationCreateOrConnectWithoutEventInput | UserEventAssociationCreateOrConnectWithoutEventInput[]
    createMany?: UserEventAssociationCreateManyEventInputEnvelope
    connect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
  }

  export type BroadcastTemplateUpdateManyWithoutEventNestedInput = {
    create?: XOR<BroadcastTemplateCreateWithoutEventInput, BroadcastTemplateUncheckedCreateWithoutEventInput> | BroadcastTemplateCreateWithoutEventInput[] | BroadcastTemplateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BroadcastTemplateCreateOrConnectWithoutEventInput | BroadcastTemplateCreateOrConnectWithoutEventInput[]
    upsert?: BroadcastTemplateUpsertWithWhereUniqueWithoutEventInput | BroadcastTemplateUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: BroadcastTemplateCreateManyEventInputEnvelope
    set?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
    disconnect?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
    delete?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
    connect?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
    update?: BroadcastTemplateUpdateWithWhereUniqueWithoutEventInput | BroadcastTemplateUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: BroadcastTemplateUpdateManyWithWhereWithoutEventInput | BroadcastTemplateUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: BroadcastTemplateScalarWhereInput | BroadcastTemplateScalarWhereInput[]
  }

  export type ClaimableItemUpdateManyWithoutEventNestedInput = {
    create?: XOR<ClaimableItemCreateWithoutEventInput, ClaimableItemUncheckedCreateWithoutEventInput> | ClaimableItemCreateWithoutEventInput[] | ClaimableItemUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ClaimableItemCreateOrConnectWithoutEventInput | ClaimableItemCreateOrConnectWithoutEventInput[]
    upsert?: ClaimableItemUpsertWithWhereUniqueWithoutEventInput | ClaimableItemUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ClaimableItemCreateManyEventInputEnvelope
    set?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
    disconnect?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
    delete?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
    connect?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
    update?: ClaimableItemUpdateWithWhereUniqueWithoutEventInput | ClaimableItemUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ClaimableItemUpdateManyWithWhereWithoutEventInput | ClaimableItemUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ClaimableItemScalarWhereInput | ClaimableItemScalarWhereInput[]
  }

  export type GuestUpdateManyWithoutEventNestedInput = {
    create?: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput> | GuestCreateWithoutEventInput[] | GuestUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutEventInput | GuestCreateOrConnectWithoutEventInput[]
    upsert?: GuestUpsertWithWhereUniqueWithoutEventInput | GuestUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: GuestCreateManyEventInputEnvelope
    set?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    disconnect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    delete?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    update?: GuestUpdateWithWhereUniqueWithoutEventInput | GuestUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: GuestUpdateManyWithWhereWithoutEventInput | GuestUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: GuestScalarWhereInput | GuestScalarWhereInput[]
  }

  export type GuestCategoryUpdateManyWithoutEventNestedInput = {
    create?: XOR<GuestCategoryCreateWithoutEventInput, GuestCategoryUncheckedCreateWithoutEventInput> | GuestCategoryCreateWithoutEventInput[] | GuestCategoryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCategoryCreateOrConnectWithoutEventInput | GuestCategoryCreateOrConnectWithoutEventInput[]
    upsert?: GuestCategoryUpsertWithWhereUniqueWithoutEventInput | GuestCategoryUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: GuestCategoryCreateManyEventInputEnvelope
    set?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
    disconnect?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
    delete?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
    connect?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
    update?: GuestCategoryUpdateWithWhereUniqueWithoutEventInput | GuestCategoryUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: GuestCategoryUpdateManyWithWhereWithoutEventInput | GuestCategoryUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: GuestCategoryScalarWhereInput | GuestCategoryScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutEventNestedInput = {
    create?: XOR<MessageCreateWithoutEventInput, MessageUncheckedCreateWithoutEventInput> | MessageCreateWithoutEventInput[] | MessageUncheckedCreateWithoutEventInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutEventInput | MessageCreateOrConnectWithoutEventInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutEventInput | MessageUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: MessageCreateManyEventInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutEventInput | MessageUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutEventInput | MessageUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UserEventAssociationUpdateManyWithoutEventNestedInput = {
    create?: XOR<UserEventAssociationCreateWithoutEventInput, UserEventAssociationUncheckedCreateWithoutEventInput> | UserEventAssociationCreateWithoutEventInput[] | UserEventAssociationUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserEventAssociationCreateOrConnectWithoutEventInput | UserEventAssociationCreateOrConnectWithoutEventInput[]
    upsert?: UserEventAssociationUpsertWithWhereUniqueWithoutEventInput | UserEventAssociationUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: UserEventAssociationCreateManyEventInputEnvelope
    set?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    disconnect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    delete?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    connect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    update?: UserEventAssociationUpdateWithWhereUniqueWithoutEventInput | UserEventAssociationUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: UserEventAssociationUpdateManyWithWhereWithoutEventInput | UserEventAssociationUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: UserEventAssociationScalarWhereInput | UserEventAssociationScalarWhereInput[]
  }

  export type BroadcastTemplateUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<BroadcastTemplateCreateWithoutEventInput, BroadcastTemplateUncheckedCreateWithoutEventInput> | BroadcastTemplateCreateWithoutEventInput[] | BroadcastTemplateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BroadcastTemplateCreateOrConnectWithoutEventInput | BroadcastTemplateCreateOrConnectWithoutEventInput[]
    upsert?: BroadcastTemplateUpsertWithWhereUniqueWithoutEventInput | BroadcastTemplateUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: BroadcastTemplateCreateManyEventInputEnvelope
    set?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
    disconnect?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
    delete?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
    connect?: BroadcastTemplateWhereUniqueInput | BroadcastTemplateWhereUniqueInput[]
    update?: BroadcastTemplateUpdateWithWhereUniqueWithoutEventInput | BroadcastTemplateUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: BroadcastTemplateUpdateManyWithWhereWithoutEventInput | BroadcastTemplateUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: BroadcastTemplateScalarWhereInput | BroadcastTemplateScalarWhereInput[]
  }

  export type ClaimableItemUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<ClaimableItemCreateWithoutEventInput, ClaimableItemUncheckedCreateWithoutEventInput> | ClaimableItemCreateWithoutEventInput[] | ClaimableItemUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ClaimableItemCreateOrConnectWithoutEventInput | ClaimableItemCreateOrConnectWithoutEventInput[]
    upsert?: ClaimableItemUpsertWithWhereUniqueWithoutEventInput | ClaimableItemUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ClaimableItemCreateManyEventInputEnvelope
    set?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
    disconnect?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
    delete?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
    connect?: ClaimableItemWhereUniqueInput | ClaimableItemWhereUniqueInput[]
    update?: ClaimableItemUpdateWithWhereUniqueWithoutEventInput | ClaimableItemUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ClaimableItemUpdateManyWithWhereWithoutEventInput | ClaimableItemUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ClaimableItemScalarWhereInput | ClaimableItemScalarWhereInput[]
  }

  export type GuestUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput> | GuestCreateWithoutEventInput[] | GuestUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutEventInput | GuestCreateOrConnectWithoutEventInput[]
    upsert?: GuestUpsertWithWhereUniqueWithoutEventInput | GuestUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: GuestCreateManyEventInputEnvelope
    set?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    disconnect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    delete?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    update?: GuestUpdateWithWhereUniqueWithoutEventInput | GuestUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: GuestUpdateManyWithWhereWithoutEventInput | GuestUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: GuestScalarWhereInput | GuestScalarWhereInput[]
  }

  export type GuestCategoryUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<GuestCategoryCreateWithoutEventInput, GuestCategoryUncheckedCreateWithoutEventInput> | GuestCategoryCreateWithoutEventInput[] | GuestCategoryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCategoryCreateOrConnectWithoutEventInput | GuestCategoryCreateOrConnectWithoutEventInput[]
    upsert?: GuestCategoryUpsertWithWhereUniqueWithoutEventInput | GuestCategoryUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: GuestCategoryCreateManyEventInputEnvelope
    set?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
    disconnect?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
    delete?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
    connect?: GuestCategoryWhereUniqueInput | GuestCategoryWhereUniqueInput[]
    update?: GuestCategoryUpdateWithWhereUniqueWithoutEventInput | GuestCategoryUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: GuestCategoryUpdateManyWithWhereWithoutEventInput | GuestCategoryUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: GuestCategoryScalarWhereInput | GuestCategoryScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<MessageCreateWithoutEventInput, MessageUncheckedCreateWithoutEventInput> | MessageCreateWithoutEventInput[] | MessageUncheckedCreateWithoutEventInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutEventInput | MessageCreateOrConnectWithoutEventInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutEventInput | MessageUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: MessageCreateManyEventInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutEventInput | MessageUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutEventInput | MessageUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UserEventAssociationUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<UserEventAssociationCreateWithoutEventInput, UserEventAssociationUncheckedCreateWithoutEventInput> | UserEventAssociationCreateWithoutEventInput[] | UserEventAssociationUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserEventAssociationCreateOrConnectWithoutEventInput | UserEventAssociationCreateOrConnectWithoutEventInput[]
    upsert?: UserEventAssociationUpsertWithWhereUniqueWithoutEventInput | UserEventAssociationUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: UserEventAssociationCreateManyEventInputEnvelope
    set?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    disconnect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    delete?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    connect?: UserEventAssociationWhereUniqueInput | UserEventAssociationWhereUniqueInput[]
    update?: UserEventAssociationUpdateWithWhereUniqueWithoutEventInput | UserEventAssociationUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: UserEventAssociationUpdateManyWithWhereWithoutEventInput | UserEventAssociationUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: UserEventAssociationScalarWhereInput | UserEventAssociationScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutUsersInput = {
    create?: XOR<EventCreateWithoutUsersInput, EventUncheckedCreateWithoutUsersInput>
    connectOrCreate?: EventCreateOrConnectWithoutUsersInput
    connect?: EventWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<EventCreateWithoutUsersInput, EventUncheckedCreateWithoutUsersInput>
    connectOrCreate?: EventCreateOrConnectWithoutUsersInput
    upsert?: EventUpsertWithoutUsersInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutUsersInput, EventUpdateWithoutUsersInput>, EventUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type GuestCreateNestedManyWithoutGuestCategoryInput = {
    create?: XOR<GuestCreateWithoutGuestCategoryInput, GuestUncheckedCreateWithoutGuestCategoryInput> | GuestCreateWithoutGuestCategoryInput[] | GuestUncheckedCreateWithoutGuestCategoryInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutGuestCategoryInput | GuestCreateOrConnectWithoutGuestCategoryInput[]
    createMany?: GuestCreateManyGuestCategoryInputEnvelope
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
  }

  export type EventCreateNestedOneWithoutGuestCategoriesInput = {
    create?: XOR<EventCreateWithoutGuestCategoriesInput, EventUncheckedCreateWithoutGuestCategoriesInput>
    connectOrCreate?: EventCreateOrConnectWithoutGuestCategoriesInput
    connect?: EventWhereUniqueInput
  }

  export type GuestUncheckedCreateNestedManyWithoutGuestCategoryInput = {
    create?: XOR<GuestCreateWithoutGuestCategoryInput, GuestUncheckedCreateWithoutGuestCategoryInput> | GuestCreateWithoutGuestCategoryInput[] | GuestUncheckedCreateWithoutGuestCategoryInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutGuestCategoryInput | GuestCreateOrConnectWithoutGuestCategoryInput[]
    createMany?: GuestCreateManyGuestCategoryInputEnvelope
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GuestUpdateManyWithoutGuestCategoryNestedInput = {
    create?: XOR<GuestCreateWithoutGuestCategoryInput, GuestUncheckedCreateWithoutGuestCategoryInput> | GuestCreateWithoutGuestCategoryInput[] | GuestUncheckedCreateWithoutGuestCategoryInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutGuestCategoryInput | GuestCreateOrConnectWithoutGuestCategoryInput[]
    upsert?: GuestUpsertWithWhereUniqueWithoutGuestCategoryInput | GuestUpsertWithWhereUniqueWithoutGuestCategoryInput[]
    createMany?: GuestCreateManyGuestCategoryInputEnvelope
    set?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    disconnect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    delete?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    update?: GuestUpdateWithWhereUniqueWithoutGuestCategoryInput | GuestUpdateWithWhereUniqueWithoutGuestCategoryInput[]
    updateMany?: GuestUpdateManyWithWhereWithoutGuestCategoryInput | GuestUpdateManyWithWhereWithoutGuestCategoryInput[]
    deleteMany?: GuestScalarWhereInput | GuestScalarWhereInput[]
  }

  export type EventUpdateOneRequiredWithoutGuestCategoriesNestedInput = {
    create?: XOR<EventCreateWithoutGuestCategoriesInput, EventUncheckedCreateWithoutGuestCategoriesInput>
    connectOrCreate?: EventCreateOrConnectWithoutGuestCategoriesInput
    upsert?: EventUpsertWithoutGuestCategoriesInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutGuestCategoriesInput, EventUpdateWithoutGuestCategoriesInput>, EventUncheckedUpdateWithoutGuestCategoriesInput>
  }

  export type GuestUncheckedUpdateManyWithoutGuestCategoryNestedInput = {
    create?: XOR<GuestCreateWithoutGuestCategoryInput, GuestUncheckedCreateWithoutGuestCategoryInput> | GuestCreateWithoutGuestCategoryInput[] | GuestUncheckedCreateWithoutGuestCategoryInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutGuestCategoryInput | GuestCreateOrConnectWithoutGuestCategoryInput[]
    upsert?: GuestUpsertWithWhereUniqueWithoutGuestCategoryInput | GuestUpsertWithWhereUniqueWithoutGuestCategoryInput[]
    createMany?: GuestCreateManyGuestCategoryInputEnvelope
    set?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    disconnect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    delete?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    update?: GuestUpdateWithWhereUniqueWithoutGuestCategoryInput | GuestUpdateWithWhereUniqueWithoutGuestCategoryInput[]
    updateMany?: GuestUpdateManyWithWhereWithoutGuestCategoryInput | GuestUpdateManyWithWhereWithoutGuestCategoryInput[]
    deleteMany?: GuestScalarWhereInput | GuestScalarWhereInput[]
  }

  export type ClaimTransactionCreateNestedManyWithoutGuestInput = {
    create?: XOR<ClaimTransactionCreateWithoutGuestInput, ClaimTransactionUncheckedCreateWithoutGuestInput> | ClaimTransactionCreateWithoutGuestInput[] | ClaimTransactionUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutGuestInput | ClaimTransactionCreateOrConnectWithoutGuestInput[]
    createMany?: ClaimTransactionCreateManyGuestInputEnvelope
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
  }

  export type EventCreateNestedOneWithoutGuestsInput = {
    create?: XOR<EventCreateWithoutGuestsInput, EventUncheckedCreateWithoutGuestsInput>
    connectOrCreate?: EventCreateOrConnectWithoutGuestsInput
    connect?: EventWhereUniqueInput
  }

  export type GuestCategoryCreateNestedOneWithoutGuestsInput = {
    create?: XOR<GuestCategoryCreateWithoutGuestsInput, GuestCategoryUncheckedCreateWithoutGuestsInput>
    connectOrCreate?: GuestCategoryCreateOrConnectWithoutGuestsInput
    connect?: GuestCategoryWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutGuestInput = {
    create?: XOR<MessageCreateWithoutGuestInput, MessageUncheckedCreateWithoutGuestInput> | MessageCreateWithoutGuestInput[] | MessageUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutGuestInput | MessageCreateOrConnectWithoutGuestInput[]
    createMany?: MessageCreateManyGuestInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ClaimTransactionUncheckedCreateNestedManyWithoutGuestInput = {
    create?: XOR<ClaimTransactionCreateWithoutGuestInput, ClaimTransactionUncheckedCreateWithoutGuestInput> | ClaimTransactionCreateWithoutGuestInput[] | ClaimTransactionUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutGuestInput | ClaimTransactionCreateOrConnectWithoutGuestInput[]
    createMany?: ClaimTransactionCreateManyGuestInputEnvelope
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutGuestInput = {
    create?: XOR<MessageCreateWithoutGuestInput, MessageUncheckedCreateWithoutGuestInput> | MessageCreateWithoutGuestInput[] | MessageUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutGuestInput | MessageCreateOrConnectWithoutGuestInput[]
    createMany?: MessageCreateManyGuestInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type EnumGuestStatusFieldUpdateOperationsInput = {
    set?: $Enums.GuestStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClaimTransactionUpdateManyWithoutGuestNestedInput = {
    create?: XOR<ClaimTransactionCreateWithoutGuestInput, ClaimTransactionUncheckedCreateWithoutGuestInput> | ClaimTransactionCreateWithoutGuestInput[] | ClaimTransactionUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutGuestInput | ClaimTransactionCreateOrConnectWithoutGuestInput[]
    upsert?: ClaimTransactionUpsertWithWhereUniqueWithoutGuestInput | ClaimTransactionUpsertWithWhereUniqueWithoutGuestInput[]
    createMany?: ClaimTransactionCreateManyGuestInputEnvelope
    set?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    disconnect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    delete?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    update?: ClaimTransactionUpdateWithWhereUniqueWithoutGuestInput | ClaimTransactionUpdateWithWhereUniqueWithoutGuestInput[]
    updateMany?: ClaimTransactionUpdateManyWithWhereWithoutGuestInput | ClaimTransactionUpdateManyWithWhereWithoutGuestInput[]
    deleteMany?: ClaimTransactionScalarWhereInput | ClaimTransactionScalarWhereInput[]
  }

  export type EventUpdateOneRequiredWithoutGuestsNestedInput = {
    create?: XOR<EventCreateWithoutGuestsInput, EventUncheckedCreateWithoutGuestsInput>
    connectOrCreate?: EventCreateOrConnectWithoutGuestsInput
    upsert?: EventUpsertWithoutGuestsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutGuestsInput, EventUpdateWithoutGuestsInput>, EventUncheckedUpdateWithoutGuestsInput>
  }

  export type GuestCategoryUpdateOneWithoutGuestsNestedInput = {
    create?: XOR<GuestCategoryCreateWithoutGuestsInput, GuestCategoryUncheckedCreateWithoutGuestsInput>
    connectOrCreate?: GuestCategoryCreateOrConnectWithoutGuestsInput
    upsert?: GuestCategoryUpsertWithoutGuestsInput
    disconnect?: GuestCategoryWhereInput | boolean
    delete?: GuestCategoryWhereInput | boolean
    connect?: GuestCategoryWhereUniqueInput
    update?: XOR<XOR<GuestCategoryUpdateToOneWithWhereWithoutGuestsInput, GuestCategoryUpdateWithoutGuestsInput>, GuestCategoryUncheckedUpdateWithoutGuestsInput>
  }

  export type MessageUpdateManyWithoutGuestNestedInput = {
    create?: XOR<MessageCreateWithoutGuestInput, MessageUncheckedCreateWithoutGuestInput> | MessageCreateWithoutGuestInput[] | MessageUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutGuestInput | MessageCreateOrConnectWithoutGuestInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutGuestInput | MessageUpsertWithWhereUniqueWithoutGuestInput[]
    createMany?: MessageCreateManyGuestInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutGuestInput | MessageUpdateWithWhereUniqueWithoutGuestInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutGuestInput | MessageUpdateManyWithWhereWithoutGuestInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ClaimTransactionUncheckedUpdateManyWithoutGuestNestedInput = {
    create?: XOR<ClaimTransactionCreateWithoutGuestInput, ClaimTransactionUncheckedCreateWithoutGuestInput> | ClaimTransactionCreateWithoutGuestInput[] | ClaimTransactionUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutGuestInput | ClaimTransactionCreateOrConnectWithoutGuestInput[]
    upsert?: ClaimTransactionUpsertWithWhereUniqueWithoutGuestInput | ClaimTransactionUpsertWithWhereUniqueWithoutGuestInput[]
    createMany?: ClaimTransactionCreateManyGuestInputEnvelope
    set?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    disconnect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    delete?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    update?: ClaimTransactionUpdateWithWhereUniqueWithoutGuestInput | ClaimTransactionUpdateWithWhereUniqueWithoutGuestInput[]
    updateMany?: ClaimTransactionUpdateManyWithWhereWithoutGuestInput | ClaimTransactionUpdateManyWithWhereWithoutGuestInput[]
    deleteMany?: ClaimTransactionScalarWhereInput | ClaimTransactionScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutGuestNestedInput = {
    create?: XOR<MessageCreateWithoutGuestInput, MessageUncheckedCreateWithoutGuestInput> | MessageCreateWithoutGuestInput[] | MessageUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutGuestInput | MessageCreateOrConnectWithoutGuestInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutGuestInput | MessageUpsertWithWhereUniqueWithoutGuestInput[]
    createMany?: MessageCreateManyGuestInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutGuestInput | MessageUpdateWithWhereUniqueWithoutGuestInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutGuestInput | MessageUpdateManyWithWhereWithoutGuestInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutMessagesInput = {
    create?: XOR<EventCreateWithoutMessagesInput, EventUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: EventCreateOrConnectWithoutMessagesInput
    connect?: EventWhereUniqueInput
  }

  export type GuestCreateNestedOneWithoutMessagesInput = {
    create?: XOR<GuestCreateWithoutMessagesInput, GuestUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: GuestCreateOrConnectWithoutMessagesInput
    connect?: GuestWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<EventCreateWithoutMessagesInput, EventUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: EventCreateOrConnectWithoutMessagesInput
    upsert?: EventUpsertWithoutMessagesInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutMessagesInput, EventUpdateWithoutMessagesInput>, EventUncheckedUpdateWithoutMessagesInput>
  }

  export type GuestUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<GuestCreateWithoutMessagesInput, GuestUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: GuestCreateOrConnectWithoutMessagesInput
    upsert?: GuestUpsertWithoutMessagesInput
    connect?: GuestWhereUniqueInput
    update?: XOR<XOR<GuestUpdateToOneWithWhereWithoutMessagesInput, GuestUpdateWithoutMessagesInput>, GuestUncheckedUpdateWithoutMessagesInput>
  }

  export type EventCreateNestedOneWithoutBroadcastTemplatesInput = {
    create?: XOR<EventCreateWithoutBroadcastTemplatesInput, EventUncheckedCreateWithoutBroadcastTemplatesInput>
    connectOrCreate?: EventCreateOrConnectWithoutBroadcastTemplatesInput
    connect?: EventWhereUniqueInput
  }

  export type EnumBroadcastTypeFieldUpdateOperationsInput = {
    set?: $Enums.BroadcastType
  }

  export type EventUpdateOneRequiredWithoutBroadcastTemplatesNestedInput = {
    create?: XOR<EventCreateWithoutBroadcastTemplatesInput, EventUncheckedCreateWithoutBroadcastTemplatesInput>
    connectOrCreate?: EventCreateOrConnectWithoutBroadcastTemplatesInput
    upsert?: EventUpsertWithoutBroadcastTemplatesInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutBroadcastTemplatesInput, EventUpdateWithoutBroadcastTemplatesInput>, EventUncheckedUpdateWithoutBroadcastTemplatesInput>
  }

  export type ClaimTransactionCreateNestedManyWithoutClaimableItemInput = {
    create?: XOR<ClaimTransactionCreateWithoutClaimableItemInput, ClaimTransactionUncheckedCreateWithoutClaimableItemInput> | ClaimTransactionCreateWithoutClaimableItemInput[] | ClaimTransactionUncheckedCreateWithoutClaimableItemInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutClaimableItemInput | ClaimTransactionCreateOrConnectWithoutClaimableItemInput[]
    createMany?: ClaimTransactionCreateManyClaimableItemInputEnvelope
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
  }

  export type EventCreateNestedOneWithoutClaimableItemsInput = {
    create?: XOR<EventCreateWithoutClaimableItemsInput, EventUncheckedCreateWithoutClaimableItemsInput>
    connectOrCreate?: EventCreateOrConnectWithoutClaimableItemsInput
    connect?: EventWhereUniqueInput
  }

  export type ClaimTransactionUncheckedCreateNestedManyWithoutClaimableItemInput = {
    create?: XOR<ClaimTransactionCreateWithoutClaimableItemInput, ClaimTransactionUncheckedCreateWithoutClaimableItemInput> | ClaimTransactionCreateWithoutClaimableItemInput[] | ClaimTransactionUncheckedCreateWithoutClaimableItemInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutClaimableItemInput | ClaimTransactionCreateOrConnectWithoutClaimableItemInput[]
    createMany?: ClaimTransactionCreateManyClaimableItemInputEnvelope
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClaimTransactionUpdateManyWithoutClaimableItemNestedInput = {
    create?: XOR<ClaimTransactionCreateWithoutClaimableItemInput, ClaimTransactionUncheckedCreateWithoutClaimableItemInput> | ClaimTransactionCreateWithoutClaimableItemInput[] | ClaimTransactionUncheckedCreateWithoutClaimableItemInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutClaimableItemInput | ClaimTransactionCreateOrConnectWithoutClaimableItemInput[]
    upsert?: ClaimTransactionUpsertWithWhereUniqueWithoutClaimableItemInput | ClaimTransactionUpsertWithWhereUniqueWithoutClaimableItemInput[]
    createMany?: ClaimTransactionCreateManyClaimableItemInputEnvelope
    set?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    disconnect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    delete?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    update?: ClaimTransactionUpdateWithWhereUniqueWithoutClaimableItemInput | ClaimTransactionUpdateWithWhereUniqueWithoutClaimableItemInput[]
    updateMany?: ClaimTransactionUpdateManyWithWhereWithoutClaimableItemInput | ClaimTransactionUpdateManyWithWhereWithoutClaimableItemInput[]
    deleteMany?: ClaimTransactionScalarWhereInput | ClaimTransactionScalarWhereInput[]
  }

  export type EventUpdateOneRequiredWithoutClaimableItemsNestedInput = {
    create?: XOR<EventCreateWithoutClaimableItemsInput, EventUncheckedCreateWithoutClaimableItemsInput>
    connectOrCreate?: EventCreateOrConnectWithoutClaimableItemsInput
    upsert?: EventUpsertWithoutClaimableItemsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutClaimableItemsInput, EventUpdateWithoutClaimableItemsInput>, EventUncheckedUpdateWithoutClaimableItemsInput>
  }

  export type ClaimTransactionUncheckedUpdateManyWithoutClaimableItemNestedInput = {
    create?: XOR<ClaimTransactionCreateWithoutClaimableItemInput, ClaimTransactionUncheckedCreateWithoutClaimableItemInput> | ClaimTransactionCreateWithoutClaimableItemInput[] | ClaimTransactionUncheckedCreateWithoutClaimableItemInput[]
    connectOrCreate?: ClaimTransactionCreateOrConnectWithoutClaimableItemInput | ClaimTransactionCreateOrConnectWithoutClaimableItemInput[]
    upsert?: ClaimTransactionUpsertWithWhereUniqueWithoutClaimableItemInput | ClaimTransactionUpsertWithWhereUniqueWithoutClaimableItemInput[]
    createMany?: ClaimTransactionCreateManyClaimableItemInputEnvelope
    set?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    disconnect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    delete?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    connect?: ClaimTransactionWhereUniqueInput | ClaimTransactionWhereUniqueInput[]
    update?: ClaimTransactionUpdateWithWhereUniqueWithoutClaimableItemInput | ClaimTransactionUpdateWithWhereUniqueWithoutClaimableItemInput[]
    updateMany?: ClaimTransactionUpdateManyWithWhereWithoutClaimableItemInput | ClaimTransactionUpdateManyWithWhereWithoutClaimableItemInput[]
    deleteMany?: ClaimTransactionScalarWhereInput | ClaimTransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutClaimTransactionInput = {
    create?: XOR<UserCreateWithoutClaimTransactionInput, UserUncheckedCreateWithoutClaimTransactionInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimTransactionInput
    connect?: UserWhereUniqueInput
  }

  export type ClaimableItemCreateNestedOneWithoutClaimTransactionsInput = {
    create?: XOR<ClaimableItemCreateWithoutClaimTransactionsInput, ClaimableItemUncheckedCreateWithoutClaimTransactionsInput>
    connectOrCreate?: ClaimableItemCreateOrConnectWithoutClaimTransactionsInput
    connect?: ClaimableItemWhereUniqueInput
  }

  export type GuestCreateNestedOneWithoutClaimTransactionsInput = {
    create?: XOR<GuestCreateWithoutClaimTransactionsInput, GuestUncheckedCreateWithoutClaimTransactionsInput>
    connectOrCreate?: GuestCreateOrConnectWithoutClaimTransactionsInput
    connect?: GuestWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutClaimTransactionNestedInput = {
    create?: XOR<UserCreateWithoutClaimTransactionInput, UserUncheckedCreateWithoutClaimTransactionInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimTransactionInput
    upsert?: UserUpsertWithoutClaimTransactionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClaimTransactionInput, UserUpdateWithoutClaimTransactionInput>, UserUncheckedUpdateWithoutClaimTransactionInput>
  }

  export type ClaimableItemUpdateOneRequiredWithoutClaimTransactionsNestedInput = {
    create?: XOR<ClaimableItemCreateWithoutClaimTransactionsInput, ClaimableItemUncheckedCreateWithoutClaimTransactionsInput>
    connectOrCreate?: ClaimableItemCreateOrConnectWithoutClaimTransactionsInput
    upsert?: ClaimableItemUpsertWithoutClaimTransactionsInput
    connect?: ClaimableItemWhereUniqueInput
    update?: XOR<XOR<ClaimableItemUpdateToOneWithWhereWithoutClaimTransactionsInput, ClaimableItemUpdateWithoutClaimTransactionsInput>, ClaimableItemUncheckedUpdateWithoutClaimTransactionsInput>
  }

  export type GuestUpdateOneRequiredWithoutClaimTransactionsNestedInput = {
    create?: XOR<GuestCreateWithoutClaimTransactionsInput, GuestUncheckedCreateWithoutClaimTransactionsInput>
    connectOrCreate?: GuestCreateOrConnectWithoutClaimTransactionsInput
    upsert?: GuestUpsertWithoutClaimTransactionsInput
    connect?: GuestWhereUniqueInput
    update?: XOR<XOR<GuestUpdateToOneWithWhereWithoutClaimTransactionsInput, GuestUpdateWithoutClaimTransactionsInput>, GuestUncheckedUpdateWithoutClaimTransactionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGuestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GuestStatus | EnumGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuestStatusFilter<$PrismaModel> | $Enums.GuestStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumGuestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GuestStatus | EnumGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuestStatusWithAggregatesFilter<$PrismaModel> | $Enums.GuestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGuestStatusFilter<$PrismaModel>
    _max?: NestedEnumGuestStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumBroadcastTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastType | EnumBroadcastTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastType[] | ListEnumBroadcastTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastType[] | ListEnumBroadcastTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastTypeFilter<$PrismaModel> | $Enums.BroadcastType
  }

  export type NestedEnumBroadcastTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastType | EnumBroadcastTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastType[] | ListEnumBroadcastTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastType[] | ListEnumBroadcastTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastTypeWithAggregatesFilter<$PrismaModel> | $Enums.BroadcastType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBroadcastTypeFilter<$PrismaModel>
    _max?: NestedEnumBroadcastTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ClaimTransactionCreateWithoutAdminInput = {
    id?: string
    timestamp?: Date | string
    claimableItem: ClaimableItemCreateNestedOneWithoutClaimTransactionsInput
    guest: GuestCreateNestedOneWithoutClaimTransactionsInput
  }

  export type ClaimTransactionUncheckedCreateWithoutAdminInput = {
    id?: string
    timestamp?: Date | string
    guestId: string
    claimableItemId: string
  }

  export type ClaimTransactionCreateOrConnectWithoutAdminInput = {
    where: ClaimTransactionWhereUniqueInput
    create: XOR<ClaimTransactionCreateWithoutAdminInput, ClaimTransactionUncheckedCreateWithoutAdminInput>
  }

  export type ClaimTransactionCreateManyAdminInputEnvelope = {
    data: ClaimTransactionCreateManyAdminInput | ClaimTransactionCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type UserEventAssociationCreateWithoutUserInput = {
    event: EventCreateNestedOneWithoutUsersInput
  }

  export type UserEventAssociationUncheckedCreateWithoutUserInput = {
    eventId: string
  }

  export type UserEventAssociationCreateOrConnectWithoutUserInput = {
    where: UserEventAssociationWhereUniqueInput
    create: XOR<UserEventAssociationCreateWithoutUserInput, UserEventAssociationUncheckedCreateWithoutUserInput>
  }

  export type UserEventAssociationCreateManyUserInputEnvelope = {
    data: UserEventAssociationCreateManyUserInput | UserEventAssociationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ClaimTransactionUpsertWithWhereUniqueWithoutAdminInput = {
    where: ClaimTransactionWhereUniqueInput
    update: XOR<ClaimTransactionUpdateWithoutAdminInput, ClaimTransactionUncheckedUpdateWithoutAdminInput>
    create: XOR<ClaimTransactionCreateWithoutAdminInput, ClaimTransactionUncheckedCreateWithoutAdminInput>
  }

  export type ClaimTransactionUpdateWithWhereUniqueWithoutAdminInput = {
    where: ClaimTransactionWhereUniqueInput
    data: XOR<ClaimTransactionUpdateWithoutAdminInput, ClaimTransactionUncheckedUpdateWithoutAdminInput>
  }

  export type ClaimTransactionUpdateManyWithWhereWithoutAdminInput = {
    where: ClaimTransactionScalarWhereInput
    data: XOR<ClaimTransactionUpdateManyMutationInput, ClaimTransactionUncheckedUpdateManyWithoutAdminInput>
  }

  export type ClaimTransactionScalarWhereInput = {
    AND?: ClaimTransactionScalarWhereInput | ClaimTransactionScalarWhereInput[]
    OR?: ClaimTransactionScalarWhereInput[]
    NOT?: ClaimTransactionScalarWhereInput | ClaimTransactionScalarWhereInput[]
    id?: StringFilter<"ClaimTransaction"> | string
    timestamp?: DateTimeFilter<"ClaimTransaction"> | Date | string
    guestId?: StringFilter<"ClaimTransaction"> | string
    claimableItemId?: StringFilter<"ClaimTransaction"> | string
    adminId?: StringFilter<"ClaimTransaction"> | string
  }

  export type UserEventAssociationUpsertWithWhereUniqueWithoutUserInput = {
    where: UserEventAssociationWhereUniqueInput
    update: XOR<UserEventAssociationUpdateWithoutUserInput, UserEventAssociationUncheckedUpdateWithoutUserInput>
    create: XOR<UserEventAssociationCreateWithoutUserInput, UserEventAssociationUncheckedCreateWithoutUserInput>
  }

  export type UserEventAssociationUpdateWithWhereUniqueWithoutUserInput = {
    where: UserEventAssociationWhereUniqueInput
    data: XOR<UserEventAssociationUpdateWithoutUserInput, UserEventAssociationUncheckedUpdateWithoutUserInput>
  }

  export type UserEventAssociationUpdateManyWithWhereWithoutUserInput = {
    where: UserEventAssociationScalarWhereInput
    data: XOR<UserEventAssociationUpdateManyMutationInput, UserEventAssociationUncheckedUpdateManyWithoutUserInput>
  }

  export type UserEventAssociationScalarWhereInput = {
    AND?: UserEventAssociationScalarWhereInput | UserEventAssociationScalarWhereInput[]
    OR?: UserEventAssociationScalarWhereInput[]
    NOT?: UserEventAssociationScalarWhereInput | UserEventAssociationScalarWhereInput[]
    userId?: StringFilter<"UserEventAssociation"> | string
    eventId?: StringFilter<"UserEventAssociation"> | string
  }

  export type BroadcastTemplateCreateWithoutEventInput = {
    id?: string
    name: string
    type: $Enums.BroadcastType
    content: string
    button?: string | null
    footerMessage?: string | null
    imageAttachment?: string | null
    subject?: string | null
    imageAttachmentType?: string | null
    coordinateFields?: string | null
  }

  export type BroadcastTemplateUncheckedCreateWithoutEventInput = {
    id?: string
    name: string
    type: $Enums.BroadcastType
    content: string
    button?: string | null
    footerMessage?: string | null
    imageAttachment?: string | null
    subject?: string | null
    imageAttachmentType?: string | null
    coordinateFields?: string | null
  }

  export type BroadcastTemplateCreateOrConnectWithoutEventInput = {
    where: BroadcastTemplateWhereUniqueInput
    create: XOR<BroadcastTemplateCreateWithoutEventInput, BroadcastTemplateUncheckedCreateWithoutEventInput>
  }

  export type BroadcastTemplateCreateManyEventInputEnvelope = {
    data: BroadcastTemplateCreateManyEventInput | BroadcastTemplateCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type ClaimableItemCreateWithoutEventInput = {
    id?: string
    name: string
    description?: string | null
    totalQuantity: number
    remainingQuantity: number
    claimTransactions?: ClaimTransactionCreateNestedManyWithoutClaimableItemInput
  }

  export type ClaimableItemUncheckedCreateWithoutEventInput = {
    id?: string
    name: string
    description?: string | null
    totalQuantity: number
    remainingQuantity: number
    claimTransactions?: ClaimTransactionUncheckedCreateNestedManyWithoutClaimableItemInput
  }

  export type ClaimableItemCreateOrConnectWithoutEventInput = {
    where: ClaimableItemWhereUniqueInput
    create: XOR<ClaimableItemCreateWithoutEventInput, ClaimableItemUncheckedCreateWithoutEventInput>
  }

  export type ClaimableItemCreateManyEventInputEnvelope = {
    data: ClaimableItemCreateManyEventInput | ClaimableItemCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type GuestCreateWithoutEventInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    claimTransactions?: ClaimTransactionCreateNestedManyWithoutGuestInput
    guestCategory?: GuestCategoryCreateNestedOneWithoutGuestsInput
    messages?: MessageCreateNestedManyWithoutGuestInput
  }

  export type GuestUncheckedCreateWithoutEventInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    guestCategoryId?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    claimTransactions?: ClaimTransactionUncheckedCreateNestedManyWithoutGuestInput
    messages?: MessageUncheckedCreateNestedManyWithoutGuestInput
  }

  export type GuestCreateOrConnectWithoutEventInput = {
    where: GuestWhereUniqueInput
    create: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput>
  }

  export type GuestCreateManyEventInputEnvelope = {
    data: GuestCreateManyEventInput | GuestCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type GuestCategoryCreateWithoutEventInput = {
    id?: string
    name: string
    code?: string | null
    description?: string | null
    isActive?: boolean
    quota?: number | null
    guests?: GuestCreateNestedManyWithoutGuestCategoryInput
  }

  export type GuestCategoryUncheckedCreateWithoutEventInput = {
    id?: string
    name: string
    code?: string | null
    description?: string | null
    isActive?: boolean
    quota?: number | null
    guests?: GuestUncheckedCreateNestedManyWithoutGuestCategoryInput
  }

  export type GuestCategoryCreateOrConnectWithoutEventInput = {
    where: GuestCategoryWhereUniqueInput
    create: XOR<GuestCategoryCreateWithoutEventInput, GuestCategoryUncheckedCreateWithoutEventInput>
  }

  export type GuestCategoryCreateManyEventInputEnvelope = {
    data: GuestCategoryCreateManyEventInput | GuestCategoryCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutEventInput = {
    id?: string
    content: string
    timestamp?: Date | string
    approved?: boolean
    guest: GuestCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutEventInput = {
    id?: string
    content: string
    timestamp?: Date | string
    approved?: boolean
    guestId: string
  }

  export type MessageCreateOrConnectWithoutEventInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutEventInput, MessageUncheckedCreateWithoutEventInput>
  }

  export type MessageCreateManyEventInputEnvelope = {
    data: MessageCreateManyEventInput | MessageCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type UserEventAssociationCreateWithoutEventInput = {
    user: UserCreateNestedOneWithoutEventsInput
  }

  export type UserEventAssociationUncheckedCreateWithoutEventInput = {
    userId: string
  }

  export type UserEventAssociationCreateOrConnectWithoutEventInput = {
    where: UserEventAssociationWhereUniqueInput
    create: XOR<UserEventAssociationCreateWithoutEventInput, UserEventAssociationUncheckedCreateWithoutEventInput>
  }

  export type UserEventAssociationCreateManyEventInputEnvelope = {
    data: UserEventAssociationCreateManyEventInput | UserEventAssociationCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type BroadcastTemplateUpsertWithWhereUniqueWithoutEventInput = {
    where: BroadcastTemplateWhereUniqueInput
    update: XOR<BroadcastTemplateUpdateWithoutEventInput, BroadcastTemplateUncheckedUpdateWithoutEventInput>
    create: XOR<BroadcastTemplateCreateWithoutEventInput, BroadcastTemplateUncheckedCreateWithoutEventInput>
  }

  export type BroadcastTemplateUpdateWithWhereUniqueWithoutEventInput = {
    where: BroadcastTemplateWhereUniqueInput
    data: XOR<BroadcastTemplateUpdateWithoutEventInput, BroadcastTemplateUncheckedUpdateWithoutEventInput>
  }

  export type BroadcastTemplateUpdateManyWithWhereWithoutEventInput = {
    where: BroadcastTemplateScalarWhereInput
    data: XOR<BroadcastTemplateUpdateManyMutationInput, BroadcastTemplateUncheckedUpdateManyWithoutEventInput>
  }

  export type BroadcastTemplateScalarWhereInput = {
    AND?: BroadcastTemplateScalarWhereInput | BroadcastTemplateScalarWhereInput[]
    OR?: BroadcastTemplateScalarWhereInput[]
    NOT?: BroadcastTemplateScalarWhereInput | BroadcastTemplateScalarWhereInput[]
    id?: StringFilter<"BroadcastTemplate"> | string
    name?: StringFilter<"BroadcastTemplate"> | string
    type?: EnumBroadcastTypeFilter<"BroadcastTemplate"> | $Enums.BroadcastType
    content?: StringFilter<"BroadcastTemplate"> | string
    eventId?: StringFilter<"BroadcastTemplate"> | string
    button?: StringNullableFilter<"BroadcastTemplate"> | string | null
    footerMessage?: StringNullableFilter<"BroadcastTemplate"> | string | null
    imageAttachment?: StringNullableFilter<"BroadcastTemplate"> | string | null
    subject?: StringNullableFilter<"BroadcastTemplate"> | string | null
    imageAttachmentType?: StringNullableFilter<"BroadcastTemplate"> | string | null
    coordinateFields?: StringNullableFilter<"BroadcastTemplate"> | string | null
  }

  export type ClaimableItemUpsertWithWhereUniqueWithoutEventInput = {
    where: ClaimableItemWhereUniqueInput
    update: XOR<ClaimableItemUpdateWithoutEventInput, ClaimableItemUncheckedUpdateWithoutEventInput>
    create: XOR<ClaimableItemCreateWithoutEventInput, ClaimableItemUncheckedCreateWithoutEventInput>
  }

  export type ClaimableItemUpdateWithWhereUniqueWithoutEventInput = {
    where: ClaimableItemWhereUniqueInput
    data: XOR<ClaimableItemUpdateWithoutEventInput, ClaimableItemUncheckedUpdateWithoutEventInput>
  }

  export type ClaimableItemUpdateManyWithWhereWithoutEventInput = {
    where: ClaimableItemScalarWhereInput
    data: XOR<ClaimableItemUpdateManyMutationInput, ClaimableItemUncheckedUpdateManyWithoutEventInput>
  }

  export type ClaimableItemScalarWhereInput = {
    AND?: ClaimableItemScalarWhereInput | ClaimableItemScalarWhereInput[]
    OR?: ClaimableItemScalarWhereInput[]
    NOT?: ClaimableItemScalarWhereInput | ClaimableItemScalarWhereInput[]
    id?: StringFilter<"ClaimableItem"> | string
    name?: StringFilter<"ClaimableItem"> | string
    description?: StringNullableFilter<"ClaimableItem"> | string | null
    totalQuantity?: IntFilter<"ClaimableItem"> | number
    remainingQuantity?: IntFilter<"ClaimableItem"> | number
    eventId?: StringFilter<"ClaimableItem"> | string
  }

  export type GuestUpsertWithWhereUniqueWithoutEventInput = {
    where: GuestWhereUniqueInput
    update: XOR<GuestUpdateWithoutEventInput, GuestUncheckedUpdateWithoutEventInput>
    create: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput>
  }

  export type GuestUpdateWithWhereUniqueWithoutEventInput = {
    where: GuestWhereUniqueInput
    data: XOR<GuestUpdateWithoutEventInput, GuestUncheckedUpdateWithoutEventInput>
  }

  export type GuestUpdateManyWithWhereWithoutEventInput = {
    where: GuestScalarWhereInput
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyWithoutEventInput>
  }

  export type GuestScalarWhereInput = {
    AND?: GuestScalarWhereInput | GuestScalarWhereInput[]
    OR?: GuestScalarWhereInput[]
    NOT?: GuestScalarWhereInput | GuestScalarWhereInput[]
    id?: StringFilter<"Guest"> | string
    name?: StringFilter<"Guest"> | string
    email?: StringNullableFilter<"Guest"> | string | null
    phoneNumber?: StringNullableFilter<"Guest"> | string | null
    eventId?: StringFilter<"Guest"> | string
    guestCategoryId?: StringNullableFilter<"Guest"> | string | null
    address?: StringNullableFilter<"Guest"> | string | null
    numberOfGuests?: IntNullableFilter<"Guest"> | number | null
    session?: StringNullableFilter<"Guest"> | string | null
    tableNumber?: StringNullableFilter<"Guest"> | string | null
    notes?: StringNullableFilter<"Guest"> | string | null
    invitationLink?: StringNullableFilter<"Guest"> | string | null
    qrCode?: StringNullableFilter<"Guest"> | string | null
    status?: EnumGuestStatusFilter<"Guest"> | $Enums.GuestStatus
    createdAt?: DateTimeFilter<"Guest"> | Date | string
    isDeleted?: BoolFilter<"Guest"> | boolean
    updatedAt?: DateTimeFilter<"Guest"> | Date | string
  }

  export type GuestCategoryUpsertWithWhereUniqueWithoutEventInput = {
    where: GuestCategoryWhereUniqueInput
    update: XOR<GuestCategoryUpdateWithoutEventInput, GuestCategoryUncheckedUpdateWithoutEventInput>
    create: XOR<GuestCategoryCreateWithoutEventInput, GuestCategoryUncheckedCreateWithoutEventInput>
  }

  export type GuestCategoryUpdateWithWhereUniqueWithoutEventInput = {
    where: GuestCategoryWhereUniqueInput
    data: XOR<GuestCategoryUpdateWithoutEventInput, GuestCategoryUncheckedUpdateWithoutEventInput>
  }

  export type GuestCategoryUpdateManyWithWhereWithoutEventInput = {
    where: GuestCategoryScalarWhereInput
    data: XOR<GuestCategoryUpdateManyMutationInput, GuestCategoryUncheckedUpdateManyWithoutEventInput>
  }

  export type GuestCategoryScalarWhereInput = {
    AND?: GuestCategoryScalarWhereInput | GuestCategoryScalarWhereInput[]
    OR?: GuestCategoryScalarWhereInput[]
    NOT?: GuestCategoryScalarWhereInput | GuestCategoryScalarWhereInput[]
    id?: StringFilter<"GuestCategory"> | string
    name?: StringFilter<"GuestCategory"> | string
    eventId?: StringFilter<"GuestCategory"> | string
    code?: StringNullableFilter<"GuestCategory"> | string | null
    description?: StringNullableFilter<"GuestCategory"> | string | null
    isActive?: BoolFilter<"GuestCategory"> | boolean
    quota?: IntNullableFilter<"GuestCategory"> | number | null
  }

  export type MessageUpsertWithWhereUniqueWithoutEventInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutEventInput, MessageUncheckedUpdateWithoutEventInput>
    create: XOR<MessageCreateWithoutEventInput, MessageUncheckedCreateWithoutEventInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutEventInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutEventInput, MessageUncheckedUpdateWithoutEventInput>
  }

  export type MessageUpdateManyWithWhereWithoutEventInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutEventInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    timestamp?: DateTimeFilter<"Message"> | Date | string
    approved?: BoolFilter<"Message"> | boolean
    guestId?: StringFilter<"Message"> | string
    eventId?: StringFilter<"Message"> | string
  }

  export type UserEventAssociationUpsertWithWhereUniqueWithoutEventInput = {
    where: UserEventAssociationWhereUniqueInput
    update: XOR<UserEventAssociationUpdateWithoutEventInput, UserEventAssociationUncheckedUpdateWithoutEventInput>
    create: XOR<UserEventAssociationCreateWithoutEventInput, UserEventAssociationUncheckedCreateWithoutEventInput>
  }

  export type UserEventAssociationUpdateWithWhereUniqueWithoutEventInput = {
    where: UserEventAssociationWhereUniqueInput
    data: XOR<UserEventAssociationUpdateWithoutEventInput, UserEventAssociationUncheckedUpdateWithoutEventInput>
  }

  export type UserEventAssociationUpdateManyWithWhereWithoutEventInput = {
    where: UserEventAssociationScalarWhereInput
    data: XOR<UserEventAssociationUpdateManyMutationInput, UserEventAssociationUncheckedUpdateManyWithoutEventInput>
  }

  export type EventCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemCreateNestedManyWithoutEventInput
    guests?: GuestCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryCreateNestedManyWithoutEventInput
    messages?: MessageCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateUncheckedCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemUncheckedCreateNestedManyWithoutEventInput
    guests?: GuestUncheckedCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryUncheckedCreateNestedManyWithoutEventInput
    messages?: MessageUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutUsersInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutUsersInput, EventUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email: string
    isActive?: boolean
    otp?: string | null
    otpExpires?: Date | string | null
    ClaimTransaction?: ClaimTransactionCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email: string
    isActive?: boolean
    otp?: string | null
    otpExpires?: Date | string | null
    ClaimTransaction?: ClaimTransactionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type EventUpsertWithoutUsersInput = {
    update: XOR<EventUpdateWithoutUsersInput, EventUncheckedUpdateWithoutUsersInput>
    create: XOR<EventCreateWithoutUsersInput, EventUncheckedCreateWithoutUsersInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutUsersInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutUsersInput, EventUncheckedUpdateWithoutUsersInput>
  }

  export type EventUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUpdateManyWithoutEventNestedInput
    guests?: GuestUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUpdateManyWithoutEventNestedInput
    messages?: MessageUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUncheckedUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUncheckedUpdateManyWithoutEventNestedInput
    guests?: GuestUncheckedUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUncheckedUpdateManyWithoutEventNestedInput
    messages?: MessageUncheckedUpdateManyWithoutEventNestedInput
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    otpExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ClaimTransaction?: ClaimTransactionUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    otpExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ClaimTransaction?: ClaimTransactionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type GuestCreateWithoutGuestCategoryInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    claimTransactions?: ClaimTransactionCreateNestedManyWithoutGuestInput
    event: EventCreateNestedOneWithoutGuestsInput
    messages?: MessageCreateNestedManyWithoutGuestInput
  }

  export type GuestUncheckedCreateWithoutGuestCategoryInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    eventId: string
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    claimTransactions?: ClaimTransactionUncheckedCreateNestedManyWithoutGuestInput
    messages?: MessageUncheckedCreateNestedManyWithoutGuestInput
  }

  export type GuestCreateOrConnectWithoutGuestCategoryInput = {
    where: GuestWhereUniqueInput
    create: XOR<GuestCreateWithoutGuestCategoryInput, GuestUncheckedCreateWithoutGuestCategoryInput>
  }

  export type GuestCreateManyGuestCategoryInputEnvelope = {
    data: GuestCreateManyGuestCategoryInput | GuestCreateManyGuestCategoryInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutGuestCategoriesInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemCreateNestedManyWithoutEventInput
    guests?: GuestCreateNestedManyWithoutEventInput
    messages?: MessageCreateNestedManyWithoutEventInput
    users?: UserEventAssociationCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutGuestCategoriesInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateUncheckedCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemUncheckedCreateNestedManyWithoutEventInput
    guests?: GuestUncheckedCreateNestedManyWithoutEventInput
    messages?: MessageUncheckedCreateNestedManyWithoutEventInput
    users?: UserEventAssociationUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutGuestCategoriesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutGuestCategoriesInput, EventUncheckedCreateWithoutGuestCategoriesInput>
  }

  export type GuestUpsertWithWhereUniqueWithoutGuestCategoryInput = {
    where: GuestWhereUniqueInput
    update: XOR<GuestUpdateWithoutGuestCategoryInput, GuestUncheckedUpdateWithoutGuestCategoryInput>
    create: XOR<GuestCreateWithoutGuestCategoryInput, GuestUncheckedCreateWithoutGuestCategoryInput>
  }

  export type GuestUpdateWithWhereUniqueWithoutGuestCategoryInput = {
    where: GuestWhereUniqueInput
    data: XOR<GuestUpdateWithoutGuestCategoryInput, GuestUncheckedUpdateWithoutGuestCategoryInput>
  }

  export type GuestUpdateManyWithWhereWithoutGuestCategoryInput = {
    where: GuestScalarWhereInput
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyWithoutGuestCategoryInput>
  }

  export type EventUpsertWithoutGuestCategoriesInput = {
    update: XOR<EventUpdateWithoutGuestCategoriesInput, EventUncheckedUpdateWithoutGuestCategoriesInput>
    create: XOR<EventCreateWithoutGuestCategoriesInput, EventUncheckedCreateWithoutGuestCategoriesInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutGuestCategoriesInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutGuestCategoriesInput, EventUncheckedUpdateWithoutGuestCategoriesInput>
  }

  export type EventUpdateWithoutGuestCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUpdateManyWithoutEventNestedInput
    guests?: GuestUpdateManyWithoutEventNestedInput
    messages?: MessageUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutGuestCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUncheckedUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUncheckedUpdateManyWithoutEventNestedInput
    guests?: GuestUncheckedUpdateManyWithoutEventNestedInput
    messages?: MessageUncheckedUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUncheckedUpdateManyWithoutEventNestedInput
  }

  export type ClaimTransactionCreateWithoutGuestInput = {
    id?: string
    timestamp?: Date | string
    admin: UserCreateNestedOneWithoutClaimTransactionInput
    claimableItem: ClaimableItemCreateNestedOneWithoutClaimTransactionsInput
  }

  export type ClaimTransactionUncheckedCreateWithoutGuestInput = {
    id?: string
    timestamp?: Date | string
    claimableItemId: string
    adminId: string
  }

  export type ClaimTransactionCreateOrConnectWithoutGuestInput = {
    where: ClaimTransactionWhereUniqueInput
    create: XOR<ClaimTransactionCreateWithoutGuestInput, ClaimTransactionUncheckedCreateWithoutGuestInput>
  }

  export type ClaimTransactionCreateManyGuestInputEnvelope = {
    data: ClaimTransactionCreateManyGuestInput | ClaimTransactionCreateManyGuestInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutGuestsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryCreateNestedManyWithoutEventInput
    messages?: MessageCreateNestedManyWithoutEventInput
    users?: UserEventAssociationCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutGuestsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateUncheckedCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemUncheckedCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryUncheckedCreateNestedManyWithoutEventInput
    messages?: MessageUncheckedCreateNestedManyWithoutEventInput
    users?: UserEventAssociationUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutGuestsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutGuestsInput, EventUncheckedCreateWithoutGuestsInput>
  }

  export type GuestCategoryCreateWithoutGuestsInput = {
    id?: string
    name: string
    code?: string | null
    description?: string | null
    isActive?: boolean
    quota?: number | null
    event: EventCreateNestedOneWithoutGuestCategoriesInput
  }

  export type GuestCategoryUncheckedCreateWithoutGuestsInput = {
    id?: string
    name: string
    eventId: string
    code?: string | null
    description?: string | null
    isActive?: boolean
    quota?: number | null
  }

  export type GuestCategoryCreateOrConnectWithoutGuestsInput = {
    where: GuestCategoryWhereUniqueInput
    create: XOR<GuestCategoryCreateWithoutGuestsInput, GuestCategoryUncheckedCreateWithoutGuestsInput>
  }

  export type MessageCreateWithoutGuestInput = {
    id?: string
    content: string
    timestamp?: Date | string
    approved?: boolean
    event: EventCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutGuestInput = {
    id?: string
    content: string
    timestamp?: Date | string
    approved?: boolean
    eventId: string
  }

  export type MessageCreateOrConnectWithoutGuestInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutGuestInput, MessageUncheckedCreateWithoutGuestInput>
  }

  export type MessageCreateManyGuestInputEnvelope = {
    data: MessageCreateManyGuestInput | MessageCreateManyGuestInput[]
    skipDuplicates?: boolean
  }

  export type ClaimTransactionUpsertWithWhereUniqueWithoutGuestInput = {
    where: ClaimTransactionWhereUniqueInput
    update: XOR<ClaimTransactionUpdateWithoutGuestInput, ClaimTransactionUncheckedUpdateWithoutGuestInput>
    create: XOR<ClaimTransactionCreateWithoutGuestInput, ClaimTransactionUncheckedCreateWithoutGuestInput>
  }

  export type ClaimTransactionUpdateWithWhereUniqueWithoutGuestInput = {
    where: ClaimTransactionWhereUniqueInput
    data: XOR<ClaimTransactionUpdateWithoutGuestInput, ClaimTransactionUncheckedUpdateWithoutGuestInput>
  }

  export type ClaimTransactionUpdateManyWithWhereWithoutGuestInput = {
    where: ClaimTransactionScalarWhereInput
    data: XOR<ClaimTransactionUpdateManyMutationInput, ClaimTransactionUncheckedUpdateManyWithoutGuestInput>
  }

  export type EventUpsertWithoutGuestsInput = {
    update: XOR<EventUpdateWithoutGuestsInput, EventUncheckedUpdateWithoutGuestsInput>
    create: XOR<EventCreateWithoutGuestsInput, EventUncheckedCreateWithoutGuestsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutGuestsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutGuestsInput, EventUncheckedUpdateWithoutGuestsInput>
  }

  export type EventUpdateWithoutGuestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUpdateManyWithoutEventNestedInput
    messages?: MessageUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutGuestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUncheckedUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUncheckedUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUncheckedUpdateManyWithoutEventNestedInput
    messages?: MessageUncheckedUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUncheckedUpdateManyWithoutEventNestedInput
  }

  export type GuestCategoryUpsertWithoutGuestsInput = {
    update: XOR<GuestCategoryUpdateWithoutGuestsInput, GuestCategoryUncheckedUpdateWithoutGuestsInput>
    create: XOR<GuestCategoryCreateWithoutGuestsInput, GuestCategoryUncheckedCreateWithoutGuestsInput>
    where?: GuestCategoryWhereInput
  }

  export type GuestCategoryUpdateToOneWithWhereWithoutGuestsInput = {
    where?: GuestCategoryWhereInput
    data: XOR<GuestCategoryUpdateWithoutGuestsInput, GuestCategoryUncheckedUpdateWithoutGuestsInput>
  }

  export type GuestCategoryUpdateWithoutGuestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    quota?: NullableIntFieldUpdateOperationsInput | number | null
    event?: EventUpdateOneRequiredWithoutGuestCategoriesNestedInput
  }

  export type GuestCategoryUncheckedUpdateWithoutGuestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    quota?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MessageUpsertWithWhereUniqueWithoutGuestInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutGuestInput, MessageUncheckedUpdateWithoutGuestInput>
    create: XOR<MessageCreateWithoutGuestInput, MessageUncheckedCreateWithoutGuestInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutGuestInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutGuestInput, MessageUncheckedUpdateWithoutGuestInput>
  }

  export type MessageUpdateManyWithWhereWithoutGuestInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutGuestInput>
  }

  export type EventCreateWithoutMessagesInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemCreateNestedManyWithoutEventInput
    guests?: GuestCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryCreateNestedManyWithoutEventInput
    users?: UserEventAssociationCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateUncheckedCreateNestedManyWithoutEventInput
    claimableItems?: ClaimableItemUncheckedCreateNestedManyWithoutEventInput
    guests?: GuestUncheckedCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryUncheckedCreateNestedManyWithoutEventInput
    users?: UserEventAssociationUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutMessagesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutMessagesInput, EventUncheckedCreateWithoutMessagesInput>
  }

  export type GuestCreateWithoutMessagesInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    claimTransactions?: ClaimTransactionCreateNestedManyWithoutGuestInput
    event: EventCreateNestedOneWithoutGuestsInput
    guestCategory?: GuestCategoryCreateNestedOneWithoutGuestsInput
  }

  export type GuestUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    eventId: string
    guestCategoryId?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    claimTransactions?: ClaimTransactionUncheckedCreateNestedManyWithoutGuestInput
  }

  export type GuestCreateOrConnectWithoutMessagesInput = {
    where: GuestWhereUniqueInput
    create: XOR<GuestCreateWithoutMessagesInput, GuestUncheckedCreateWithoutMessagesInput>
  }

  export type EventUpsertWithoutMessagesInput = {
    update: XOR<EventUpdateWithoutMessagesInput, EventUncheckedUpdateWithoutMessagesInput>
    create: XOR<EventCreateWithoutMessagesInput, EventUncheckedCreateWithoutMessagesInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutMessagesInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutMessagesInput, EventUncheckedUpdateWithoutMessagesInput>
  }

  export type EventUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUpdateManyWithoutEventNestedInput
    guests?: GuestUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUncheckedUpdateManyWithoutEventNestedInput
    claimableItems?: ClaimableItemUncheckedUpdateManyWithoutEventNestedInput
    guests?: GuestUncheckedUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUncheckedUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUncheckedUpdateManyWithoutEventNestedInput
  }

  export type GuestUpsertWithoutMessagesInput = {
    update: XOR<GuestUpdateWithoutMessagesInput, GuestUncheckedUpdateWithoutMessagesInput>
    create: XOR<GuestCreateWithoutMessagesInput, GuestUncheckedCreateWithoutMessagesInput>
    where?: GuestWhereInput
  }

  export type GuestUpdateToOneWithWhereWithoutMessagesInput = {
    where?: GuestWhereInput
    data: XOR<GuestUpdateWithoutMessagesInput, GuestUncheckedUpdateWithoutMessagesInput>
  }

  export type GuestUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimTransactions?: ClaimTransactionUpdateManyWithoutGuestNestedInput
    event?: EventUpdateOneRequiredWithoutGuestsNestedInput
    guestCategory?: GuestCategoryUpdateOneWithoutGuestsNestedInput
  }

  export type GuestUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    guestCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimTransactions?: ClaimTransactionUncheckedUpdateManyWithoutGuestNestedInput
  }

  export type EventCreateWithoutBroadcastTemplatesInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    claimableItems?: ClaimableItemCreateNestedManyWithoutEventInput
    guests?: GuestCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryCreateNestedManyWithoutEventInput
    messages?: MessageCreateNestedManyWithoutEventInput
    users?: UserEventAssociationCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutBroadcastTemplatesInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    claimableItems?: ClaimableItemUncheckedCreateNestedManyWithoutEventInput
    guests?: GuestUncheckedCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryUncheckedCreateNestedManyWithoutEventInput
    messages?: MessageUncheckedCreateNestedManyWithoutEventInput
    users?: UserEventAssociationUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutBroadcastTemplatesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutBroadcastTemplatesInput, EventUncheckedCreateWithoutBroadcastTemplatesInput>
  }

  export type EventUpsertWithoutBroadcastTemplatesInput = {
    update: XOR<EventUpdateWithoutBroadcastTemplatesInput, EventUncheckedUpdateWithoutBroadcastTemplatesInput>
    create: XOR<EventCreateWithoutBroadcastTemplatesInput, EventUncheckedCreateWithoutBroadcastTemplatesInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutBroadcastTemplatesInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutBroadcastTemplatesInput, EventUncheckedUpdateWithoutBroadcastTemplatesInput>
  }

  export type EventUpdateWithoutBroadcastTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    claimableItems?: ClaimableItemUpdateManyWithoutEventNestedInput
    guests?: GuestUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUpdateManyWithoutEventNestedInput
    messages?: MessageUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutBroadcastTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    claimableItems?: ClaimableItemUncheckedUpdateManyWithoutEventNestedInput
    guests?: GuestUncheckedUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUncheckedUpdateManyWithoutEventNestedInput
    messages?: MessageUncheckedUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUncheckedUpdateManyWithoutEventNestedInput
  }

  export type ClaimTransactionCreateWithoutClaimableItemInput = {
    id?: string
    timestamp?: Date | string
    admin: UserCreateNestedOneWithoutClaimTransactionInput
    guest: GuestCreateNestedOneWithoutClaimTransactionsInput
  }

  export type ClaimTransactionUncheckedCreateWithoutClaimableItemInput = {
    id?: string
    timestamp?: Date | string
    guestId: string
    adminId: string
  }

  export type ClaimTransactionCreateOrConnectWithoutClaimableItemInput = {
    where: ClaimTransactionWhereUniqueInput
    create: XOR<ClaimTransactionCreateWithoutClaimableItemInput, ClaimTransactionUncheckedCreateWithoutClaimableItemInput>
  }

  export type ClaimTransactionCreateManyClaimableItemInputEnvelope = {
    data: ClaimTransactionCreateManyClaimableItemInput | ClaimTransactionCreateManyClaimableItemInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutClaimableItemsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateCreateNestedManyWithoutEventInput
    guests?: GuestCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryCreateNestedManyWithoutEventInput
    messages?: MessageCreateNestedManyWithoutEventInput
    users?: UserEventAssociationCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutClaimableItemsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    broadcastTemplates?: BroadcastTemplateUncheckedCreateNestedManyWithoutEventInput
    guests?: GuestUncheckedCreateNestedManyWithoutEventInput
    guestCategories?: GuestCategoryUncheckedCreateNestedManyWithoutEventInput
    messages?: MessageUncheckedCreateNestedManyWithoutEventInput
    users?: UserEventAssociationUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutClaimableItemsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutClaimableItemsInput, EventUncheckedCreateWithoutClaimableItemsInput>
  }

  export type ClaimTransactionUpsertWithWhereUniqueWithoutClaimableItemInput = {
    where: ClaimTransactionWhereUniqueInput
    update: XOR<ClaimTransactionUpdateWithoutClaimableItemInput, ClaimTransactionUncheckedUpdateWithoutClaimableItemInput>
    create: XOR<ClaimTransactionCreateWithoutClaimableItemInput, ClaimTransactionUncheckedCreateWithoutClaimableItemInput>
  }

  export type ClaimTransactionUpdateWithWhereUniqueWithoutClaimableItemInput = {
    where: ClaimTransactionWhereUniqueInput
    data: XOR<ClaimTransactionUpdateWithoutClaimableItemInput, ClaimTransactionUncheckedUpdateWithoutClaimableItemInput>
  }

  export type ClaimTransactionUpdateManyWithWhereWithoutClaimableItemInput = {
    where: ClaimTransactionScalarWhereInput
    data: XOR<ClaimTransactionUpdateManyMutationInput, ClaimTransactionUncheckedUpdateManyWithoutClaimableItemInput>
  }

  export type EventUpsertWithoutClaimableItemsInput = {
    update: XOR<EventUpdateWithoutClaimableItemsInput, EventUncheckedUpdateWithoutClaimableItemsInput>
    create: XOR<EventCreateWithoutClaimableItemsInput, EventUncheckedCreateWithoutClaimableItemsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutClaimableItemsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutClaimableItemsInput, EventUncheckedUpdateWithoutClaimableItemsInput>
  }

  export type EventUpdateWithoutClaimableItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUpdateManyWithoutEventNestedInput
    guests?: GuestUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUpdateManyWithoutEventNestedInput
    messages?: MessageUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutClaimableItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    broadcastTemplates?: BroadcastTemplateUncheckedUpdateManyWithoutEventNestedInput
    guests?: GuestUncheckedUpdateManyWithoutEventNestedInput
    guestCategories?: GuestCategoryUncheckedUpdateManyWithoutEventNestedInput
    messages?: MessageUncheckedUpdateManyWithoutEventNestedInput
    users?: UserEventAssociationUncheckedUpdateManyWithoutEventNestedInput
  }

  export type UserCreateWithoutClaimTransactionInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email: string
    isActive?: boolean
    otp?: string | null
    otpExpires?: Date | string | null
    events?: UserEventAssociationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClaimTransactionInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email: string
    isActive?: boolean
    otp?: string | null
    otpExpires?: Date | string | null
    events?: UserEventAssociationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClaimTransactionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClaimTransactionInput, UserUncheckedCreateWithoutClaimTransactionInput>
  }

  export type ClaimableItemCreateWithoutClaimTransactionsInput = {
    id?: string
    name: string
    description?: string | null
    totalQuantity: number
    remainingQuantity: number
    event: EventCreateNestedOneWithoutClaimableItemsInput
  }

  export type ClaimableItemUncheckedCreateWithoutClaimTransactionsInput = {
    id?: string
    name: string
    description?: string | null
    totalQuantity: number
    remainingQuantity: number
    eventId: string
  }

  export type ClaimableItemCreateOrConnectWithoutClaimTransactionsInput = {
    where: ClaimableItemWhereUniqueInput
    create: XOR<ClaimableItemCreateWithoutClaimTransactionsInput, ClaimableItemUncheckedCreateWithoutClaimTransactionsInput>
  }

  export type GuestCreateWithoutClaimTransactionsInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutGuestsInput
    guestCategory?: GuestCategoryCreateNestedOneWithoutGuestsInput
    messages?: MessageCreateNestedManyWithoutGuestInput
  }

  export type GuestUncheckedCreateWithoutClaimTransactionsInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    eventId: string
    guestCategoryId?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutGuestInput
  }

  export type GuestCreateOrConnectWithoutClaimTransactionsInput = {
    where: GuestWhereUniqueInput
    create: XOR<GuestCreateWithoutClaimTransactionsInput, GuestUncheckedCreateWithoutClaimTransactionsInput>
  }

  export type UserUpsertWithoutClaimTransactionInput = {
    update: XOR<UserUpdateWithoutClaimTransactionInput, UserUncheckedUpdateWithoutClaimTransactionInput>
    create: XOR<UserCreateWithoutClaimTransactionInput, UserUncheckedCreateWithoutClaimTransactionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClaimTransactionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClaimTransactionInput, UserUncheckedUpdateWithoutClaimTransactionInput>
  }

  export type UserUpdateWithoutClaimTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    otpExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: UserEventAssociationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClaimTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    otpExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: UserEventAssociationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClaimableItemUpsertWithoutClaimTransactionsInput = {
    update: XOR<ClaimableItemUpdateWithoutClaimTransactionsInput, ClaimableItemUncheckedUpdateWithoutClaimTransactionsInput>
    create: XOR<ClaimableItemCreateWithoutClaimTransactionsInput, ClaimableItemUncheckedCreateWithoutClaimTransactionsInput>
    where?: ClaimableItemWhereInput
  }

  export type ClaimableItemUpdateToOneWithWhereWithoutClaimTransactionsInput = {
    where?: ClaimableItemWhereInput
    data: XOR<ClaimableItemUpdateWithoutClaimTransactionsInput, ClaimableItemUncheckedUpdateWithoutClaimTransactionsInput>
  }

  export type ClaimableItemUpdateWithoutClaimTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: IntFieldUpdateOperationsInput | number
    event?: EventUpdateOneRequiredWithoutClaimableItemsNestedInput
  }

  export type ClaimableItemUncheckedUpdateWithoutClaimTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: IntFieldUpdateOperationsInput | number
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type GuestUpsertWithoutClaimTransactionsInput = {
    update: XOR<GuestUpdateWithoutClaimTransactionsInput, GuestUncheckedUpdateWithoutClaimTransactionsInput>
    create: XOR<GuestCreateWithoutClaimTransactionsInput, GuestUncheckedCreateWithoutClaimTransactionsInput>
    where?: GuestWhereInput
  }

  export type GuestUpdateToOneWithWhereWithoutClaimTransactionsInput = {
    where?: GuestWhereInput
    data: XOR<GuestUpdateWithoutClaimTransactionsInput, GuestUncheckedUpdateWithoutClaimTransactionsInput>
  }

  export type GuestUpdateWithoutClaimTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutGuestsNestedInput
    guestCategory?: GuestCategoryUpdateOneWithoutGuestsNestedInput
    messages?: MessageUpdateManyWithoutGuestNestedInput
  }

  export type GuestUncheckedUpdateWithoutClaimTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    guestCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutGuestNestedInput
  }

  export type ClaimTransactionCreateManyAdminInput = {
    id?: string
    timestamp?: Date | string
    guestId: string
    claimableItemId: string
  }

  export type UserEventAssociationCreateManyUserInput = {
    eventId: string
  }

  export type ClaimTransactionUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    claimableItem?: ClaimableItemUpdateOneRequiredWithoutClaimTransactionsNestedInput
    guest?: GuestUpdateOneRequiredWithoutClaimTransactionsNestedInput
  }

  export type ClaimTransactionUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    guestId?: StringFieldUpdateOperationsInput | string
    claimableItemId?: StringFieldUpdateOperationsInput | string
  }

  export type ClaimTransactionUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    guestId?: StringFieldUpdateOperationsInput | string
    claimableItemId?: StringFieldUpdateOperationsInput | string
  }

  export type UserEventAssociationUpdateWithoutUserInput = {
    event?: EventUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserEventAssociationUncheckedUpdateWithoutUserInput = {
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type UserEventAssociationUncheckedUpdateManyWithoutUserInput = {
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type BroadcastTemplateCreateManyEventInput = {
    id?: string
    name: string
    type: $Enums.BroadcastType
    content: string
    button?: string | null
    footerMessage?: string | null
    imageAttachment?: string | null
    subject?: string | null
    imageAttachmentType?: string | null
    coordinateFields?: string | null
  }

  export type ClaimableItemCreateManyEventInput = {
    id?: string
    name: string
    description?: string | null
    totalQuantity: number
    remainingQuantity: number
  }

  export type GuestCreateManyEventInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    guestCategoryId?: string | null
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
  }

  export type GuestCategoryCreateManyEventInput = {
    id?: string
    name: string
    code?: string | null
    description?: string | null
    isActive?: boolean
    quota?: number | null
  }

  export type MessageCreateManyEventInput = {
    id?: string
    content: string
    timestamp?: Date | string
    approved?: boolean
    guestId: string
  }

  export type UserEventAssociationCreateManyEventInput = {
    userId: string
  }

  export type BroadcastTemplateUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumBroadcastTypeFieldUpdateOperationsInput | $Enums.BroadcastType
    content?: StringFieldUpdateOperationsInput | string
    button?: NullableStringFieldUpdateOperationsInput | string | null
    footerMessage?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachment?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    coordinateFields?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BroadcastTemplateUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumBroadcastTypeFieldUpdateOperationsInput | $Enums.BroadcastType
    content?: StringFieldUpdateOperationsInput | string
    button?: NullableStringFieldUpdateOperationsInput | string | null
    footerMessage?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachment?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    coordinateFields?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BroadcastTemplateUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumBroadcastTypeFieldUpdateOperationsInput | $Enums.BroadcastType
    content?: StringFieldUpdateOperationsInput | string
    button?: NullableStringFieldUpdateOperationsInput | string | null
    footerMessage?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachment?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    imageAttachmentType?: NullableStringFieldUpdateOperationsInput | string | null
    coordinateFields?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClaimableItemUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: IntFieldUpdateOperationsInput | number
    claimTransactions?: ClaimTransactionUpdateManyWithoutClaimableItemNestedInput
  }

  export type ClaimableItemUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: IntFieldUpdateOperationsInput | number
    claimTransactions?: ClaimTransactionUncheckedUpdateManyWithoutClaimableItemNestedInput
  }

  export type ClaimableItemUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    remainingQuantity?: IntFieldUpdateOperationsInput | number
  }

  export type GuestUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimTransactions?: ClaimTransactionUpdateManyWithoutGuestNestedInput
    guestCategory?: GuestCategoryUpdateOneWithoutGuestsNestedInput
    messages?: MessageUpdateManyWithoutGuestNestedInput
  }

  export type GuestUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    guestCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimTransactions?: ClaimTransactionUncheckedUpdateManyWithoutGuestNestedInput
    messages?: MessageUncheckedUpdateManyWithoutGuestNestedInput
  }

  export type GuestUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    guestCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestCategoryUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    quota?: NullableIntFieldUpdateOperationsInput | number | null
    guests?: GuestUpdateManyWithoutGuestCategoryNestedInput
  }

  export type GuestCategoryUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    quota?: NullableIntFieldUpdateOperationsInput | number | null
    guests?: GuestUncheckedUpdateManyWithoutGuestCategoryNestedInput
  }

  export type GuestCategoryUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    quota?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MessageUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
    guest?: GuestUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
    guestId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
    guestId?: StringFieldUpdateOperationsInput | string
  }

  export type UserEventAssociationUpdateWithoutEventInput = {
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
  }

  export type UserEventAssociationUncheckedUpdateWithoutEventInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserEventAssociationUncheckedUpdateManyWithoutEventInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type GuestCreateManyGuestCategoryInput = {
    id?: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    eventId: string
    address?: string | null
    numberOfGuests?: number | null
    session?: string | null
    tableNumber?: string | null
    notes?: string | null
    invitationLink?: string | null
    qrCode?: string | null
    status?: $Enums.GuestStatus
    createdAt?: Date | string
    isDeleted?: boolean
    updatedAt?: Date | string
  }

  export type GuestUpdateWithoutGuestCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimTransactions?: ClaimTransactionUpdateManyWithoutGuestNestedInput
    event?: EventUpdateOneRequiredWithoutGuestsNestedInput
    messages?: MessageUpdateManyWithoutGuestNestedInput
  }

  export type GuestUncheckedUpdateWithoutGuestCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimTransactions?: ClaimTransactionUncheckedUpdateManyWithoutGuestNestedInput
    messages?: MessageUncheckedUpdateManyWithoutGuestNestedInput
  }

  export type GuestUncheckedUpdateManyWithoutGuestCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfGuests?: NullableIntFieldUpdateOperationsInput | number | null
    session?: NullableStringFieldUpdateOperationsInput | string | null
    tableNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    invitationLink?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimTransactionCreateManyGuestInput = {
    id?: string
    timestamp?: Date | string
    claimableItemId: string
    adminId: string
  }

  export type MessageCreateManyGuestInput = {
    id?: string
    content: string
    timestamp?: Date | string
    approved?: boolean
    eventId: string
  }

  export type ClaimTransactionUpdateWithoutGuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutClaimTransactionNestedInput
    claimableItem?: ClaimableItemUpdateOneRequiredWithoutClaimTransactionsNestedInput
  }

  export type ClaimTransactionUncheckedUpdateWithoutGuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    claimableItemId?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
  }

  export type ClaimTransactionUncheckedUpdateManyWithoutGuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    claimableItemId?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUpdateWithoutGuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
    event?: EventUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutGuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUncheckedUpdateManyWithoutGuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    approved?: BoolFieldUpdateOperationsInput | boolean
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type ClaimTransactionCreateManyClaimableItemInput = {
    id?: string
    timestamp?: Date | string
    guestId: string
    adminId: string
  }

  export type ClaimTransactionUpdateWithoutClaimableItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutClaimTransactionNestedInput
    guest?: GuestUpdateOneRequiredWithoutClaimTransactionsNestedInput
  }

  export type ClaimTransactionUncheckedUpdateWithoutClaimableItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    guestId?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
  }

  export type ClaimTransactionUncheckedUpdateManyWithoutClaimableItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    guestId?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
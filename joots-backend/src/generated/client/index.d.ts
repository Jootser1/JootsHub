
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
 * Model Auth
 * 
 */
export type Auth = $Result.DefaultSelection<Prisma.$AuthPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserContact
 * 
 */
export type UserContact = $Result.DefaultSelection<Prisma.$UserContactPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model ConversationParticipant
 * 
 */
export type ConversationParticipant = $Result.DefaultSelection<Prisma.$ConversationParticipantPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model QuestionGroup
 * 
 */
export type QuestionGroup = $Result.DefaultSelection<Prisma.$QuestionGroupPayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model QuestionOption
 * 
 */
export type QuestionOption = $Result.DefaultSelection<Prisma.$QuestionOptionPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model CategoryTranslation
 * 
 */
export type CategoryTranslation = $Result.DefaultSelection<Prisma.$CategoryTranslationPayload>
/**
 * Model QuestionGroupCategory
 * 
 */
export type QuestionGroupCategory = $Result.DefaultSelection<Prisma.$QuestionGroupCategoryPayload>
/**
 * Model UserQuestionPreference
 * 
 */
export type UserQuestionPreference = $Result.DefaultSelection<Prisma.$UserQuestionPreferencePayload>
/**
 * Model UserAnswer
 * 
 */
export type UserAnswer = $Result.DefaultSelection<Prisma.$UserAnswerPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Auths
 * const auths = await prisma.auth.findMany()
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
   * // Fetch zero or more Auths
   * const auths = await prisma.auth.findMany()
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
   * `prisma.auth`: Exposes CRUD operations for the **Auth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Auths
    * const auths = await prisma.auth.findMany()
    * ```
    */
  get auth(): Prisma.AuthDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.userContact`: Exposes CRUD operations for the **UserContact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserContacts
    * const userContacts = await prisma.userContact.findMany()
    * ```
    */
  get userContact(): Prisma.UserContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversationParticipant`: Exposes CRUD operations for the **ConversationParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConversationParticipants
    * const conversationParticipants = await prisma.conversationParticipant.findMany()
    * ```
    */
  get conversationParticipant(): Prisma.ConversationParticipantDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.questionGroup`: Exposes CRUD operations for the **QuestionGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionGroups
    * const questionGroups = await prisma.questionGroup.findMany()
    * ```
    */
  get questionGroup(): Prisma.QuestionGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.questionOption`: Exposes CRUD operations for the **QuestionOption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionOptions
    * const questionOptions = await prisma.questionOption.findMany()
    * ```
    */
  get questionOption(): Prisma.QuestionOptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoryTranslation`: Exposes CRUD operations for the **CategoryTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategoryTranslations
    * const categoryTranslations = await prisma.categoryTranslation.findMany()
    * ```
    */
  get categoryTranslation(): Prisma.CategoryTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.questionGroupCategory`: Exposes CRUD operations for the **QuestionGroupCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionGroupCategories
    * const questionGroupCategories = await prisma.questionGroupCategory.findMany()
    * ```
    */
  get questionGroupCategory(): Prisma.QuestionGroupCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userQuestionPreference`: Exposes CRUD operations for the **UserQuestionPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserQuestionPreferences
    * const userQuestionPreferences = await prisma.userQuestionPreference.findMany()
    * ```
    */
  get userQuestionPreference(): Prisma.UserQuestionPreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAnswer`: Exposes CRUD operations for the **UserAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAnswers
    * const userAnswers = await prisma.userAnswer.findMany()
    * ```
    */
  get userAnswer(): Prisma.UserAnswerDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
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
  : T extends BigInt
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
    Auth: 'Auth',
    User: 'User',
    UserContact: 'UserContact',
    Conversation: 'Conversation',
    ConversationParticipant: 'ConversationParticipant',
    Message: 'Message',
    QuestionGroup: 'QuestionGroup',
    Question: 'Question',
    QuestionOption: 'QuestionOption',
    Category: 'Category',
    CategoryTranslation: 'CategoryTranslation',
    QuestionGroupCategory: 'QuestionGroupCategory',
    UserQuestionPreference: 'UserQuestionPreference',
    UserAnswer: 'UserAnswer'
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
      modelProps: "auth" | "user" | "userContact" | "conversation" | "conversationParticipant" | "message" | "questionGroup" | "question" | "questionOption" | "category" | "categoryTranslation" | "questionGroupCategory" | "userQuestionPreference" | "userAnswer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Auth: {
        payload: Prisma.$AuthPayload<ExtArgs>
        fields: Prisma.AuthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload>
          }
          findFirst: {
            args: Prisma.AuthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload>
          }
          findMany: {
            args: Prisma.AuthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload>[]
          }
          create: {
            args: Prisma.AuthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload>
          }
          createMany: {
            args: Prisma.AuthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload>[]
          }
          delete: {
            args: Prisma.AuthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload>
          }
          update: {
            args: Prisma.AuthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload>
          }
          deleteMany: {
            args: Prisma.AuthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload>[]
          }
          upsert: {
            args: Prisma.AuthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthPayload>
          }
          aggregate: {
            args: Prisma.AuthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuth>
          }
          groupBy: {
            args: Prisma.AuthGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthCountArgs<ExtArgs>
            result: $Utils.Optional<AuthCountAggregateOutputType> | number
          }
        }
      }
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
      UserContact: {
        payload: Prisma.$UserContactPayload<ExtArgs>
        fields: Prisma.UserContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload>
          }
          findFirst: {
            args: Prisma.UserContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload>
          }
          findMany: {
            args: Prisma.UserContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload>[]
          }
          create: {
            args: Prisma.UserContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload>
          }
          createMany: {
            args: Prisma.UserContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload>[]
          }
          delete: {
            args: Prisma.UserContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload>
          }
          update: {
            args: Prisma.UserContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload>
          }
          deleteMany: {
            args: Prisma.UserContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload>[]
          }
          upsert: {
            args: Prisma.UserContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserContactPayload>
          }
          aggregate: {
            args: Prisma.UserContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserContact>
          }
          groupBy: {
            args: Prisma.UserContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserContactCountArgs<ExtArgs>
            result: $Utils.Optional<UserContactCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      ConversationParticipant: {
        payload: Prisma.$ConversationParticipantPayload<ExtArgs>
        fields: Prisma.ConversationParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>
          }
          findFirst: {
            args: Prisma.ConversationParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>
          }
          findMany: {
            args: Prisma.ConversationParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>[]
          }
          create: {
            args: Prisma.ConversationParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>
          }
          createMany: {
            args: Prisma.ConversationParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>[]
          }
          delete: {
            args: Prisma.ConversationParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>
          }
          update: {
            args: Prisma.ConversationParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>
          }
          deleteMany: {
            args: Prisma.ConversationParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationParticipantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>[]
          }
          upsert: {
            args: Prisma.ConversationParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>
          }
          aggregate: {
            args: Prisma.ConversationParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversationParticipant>
          }
          groupBy: {
            args: Prisma.ConversationParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationParticipantCountAggregateOutputType> | number
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
      QuestionGroup: {
        payload: Prisma.$QuestionGroupPayload<ExtArgs>
        fields: Prisma.QuestionGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload>
          }
          findFirst: {
            args: Prisma.QuestionGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload>
          }
          findMany: {
            args: Prisma.QuestionGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload>[]
          }
          create: {
            args: Prisma.QuestionGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload>
          }
          createMany: {
            args: Prisma.QuestionGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload>[]
          }
          delete: {
            args: Prisma.QuestionGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload>
          }
          update: {
            args: Prisma.QuestionGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload>
          }
          deleteMany: {
            args: Prisma.QuestionGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload>[]
          }
          upsert: {
            args: Prisma.QuestionGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupPayload>
          }
          aggregate: {
            args: Prisma.QuestionGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionGroup>
          }
          groupBy: {
            args: Prisma.QuestionGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionGroupCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      QuestionOption: {
        payload: Prisma.$QuestionOptionPayload<ExtArgs>
        fields: Prisma.QuestionOptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionOptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionOptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          findFirst: {
            args: Prisma.QuestionOptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionOptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          findMany: {
            args: Prisma.QuestionOptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[]
          }
          create: {
            args: Prisma.QuestionOptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          createMany: {
            args: Prisma.QuestionOptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionOptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[]
          }
          delete: {
            args: Prisma.QuestionOptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          update: {
            args: Prisma.QuestionOptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionOptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionOptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionOptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[]
          }
          upsert: {
            args: Prisma.QuestionOptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          aggregate: {
            args: Prisma.QuestionOptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionOption>
          }
          groupBy: {
            args: Prisma.QuestionOptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionOptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionOptionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionOptionCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      CategoryTranslation: {
        payload: Prisma.$CategoryTranslationPayload<ExtArgs>
        fields: Prisma.CategoryTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          findFirst: {
            args: Prisma.CategoryTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          findMany: {
            args: Prisma.CategoryTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>[]
          }
          create: {
            args: Prisma.CategoryTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          createMany: {
            args: Prisma.CategoryTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>[]
          }
          delete: {
            args: Prisma.CategoryTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          update: {
            args: Prisma.CategoryTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          deleteMany: {
            args: Prisma.CategoryTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>[]
          }
          upsert: {
            args: Prisma.CategoryTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          aggregate: {
            args: Prisma.CategoryTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoryTranslation>
          }
          groupBy: {
            args: Prisma.CategoryTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryTranslationCountAggregateOutputType> | number
          }
        }
      }
      QuestionGroupCategory: {
        payload: Prisma.$QuestionGroupCategoryPayload<ExtArgs>
        fields: Prisma.QuestionGroupCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionGroupCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionGroupCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload>
          }
          findFirst: {
            args: Prisma.QuestionGroupCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionGroupCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload>
          }
          findMany: {
            args: Prisma.QuestionGroupCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload>[]
          }
          create: {
            args: Prisma.QuestionGroupCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload>
          }
          createMany: {
            args: Prisma.QuestionGroupCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionGroupCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload>[]
          }
          delete: {
            args: Prisma.QuestionGroupCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload>
          }
          update: {
            args: Prisma.QuestionGroupCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload>
          }
          deleteMany: {
            args: Prisma.QuestionGroupCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionGroupCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionGroupCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload>[]
          }
          upsert: {
            args: Prisma.QuestionGroupCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionGroupCategoryPayload>
          }
          aggregate: {
            args: Prisma.QuestionGroupCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionGroupCategory>
          }
          groupBy: {
            args: Prisma.QuestionGroupCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionGroupCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupCategoryCountAggregateOutputType> | number
          }
        }
      }
      UserQuestionPreference: {
        payload: Prisma.$UserQuestionPreferencePayload<ExtArgs>
        fields: Prisma.UserQuestionPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserQuestionPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserQuestionPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload>
          }
          findFirst: {
            args: Prisma.UserQuestionPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserQuestionPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload>
          }
          findMany: {
            args: Prisma.UserQuestionPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload>[]
          }
          create: {
            args: Prisma.UserQuestionPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload>
          }
          createMany: {
            args: Prisma.UserQuestionPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserQuestionPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload>[]
          }
          delete: {
            args: Prisma.UserQuestionPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload>
          }
          update: {
            args: Prisma.UserQuestionPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload>
          }
          deleteMany: {
            args: Prisma.UserQuestionPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserQuestionPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserQuestionPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload>[]
          }
          upsert: {
            args: Prisma.UserQuestionPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPreferencePayload>
          }
          aggregate: {
            args: Prisma.UserQuestionPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserQuestionPreference>
          }
          groupBy: {
            args: Prisma.UserQuestionPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserQuestionPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserQuestionPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<UserQuestionPreferenceCountAggregateOutputType> | number
          }
        }
      }
      UserAnswer: {
        payload: Prisma.$UserAnswerPayload<ExtArgs>
        fields: Prisma.UserAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          findFirst: {
            args: Prisma.UserAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          findMany: {
            args: Prisma.UserAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>[]
          }
          create: {
            args: Prisma.UserAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          createMany: {
            args: Prisma.UserAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>[]
          }
          delete: {
            args: Prisma.UserAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          update: {
            args: Prisma.UserAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          deleteMany: {
            args: Prisma.UserAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserAnswerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>[]
          }
          upsert: {
            args: Prisma.UserAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          aggregate: {
            args: Prisma.UserAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAnswer>
          }
          groupBy: {
            args: Prisma.UserAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<UserAnswerCountAggregateOutputType> | number
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
    auth?: AuthOmit
    user?: UserOmit
    userContact?: UserContactOmit
    conversation?: ConversationOmit
    conversationParticipant?: ConversationParticipantOmit
    message?: MessageOmit
    questionGroup?: QuestionGroupOmit
    question?: QuestionOmit
    questionOption?: QuestionOptionOmit
    category?: CategoryOmit
    categoryTranslation?: CategoryTranslationOmit
    questionGroupCategory?: QuestionGroupCategoryOmit
    userQuestionPreference?: UserQuestionPreferenceOmit
    userAnswer?: UserAnswerOmit
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
    questionGroups: number
    sentMessages: number
    conversations: number
    contacts: number
    contactOf: number
    questionPreferences: number
    answers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questionGroups?: boolean | UserCountOutputTypeCountQuestionGroupsArgs
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
    contacts?: boolean | UserCountOutputTypeCountContactsArgs
    contactOf?: boolean | UserCountOutputTypeCountContactOfArgs
    questionPreferences?: boolean | UserCountOutputTypeCountQuestionPreferencesArgs
    answers?: boolean | UserCountOutputTypeCountAnswersArgs
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
  export type UserCountOutputTypeCountQuestionGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionGroupWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationParticipantWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserContactWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountContactOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserContactWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQuestionPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserQuestionPreferenceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
    participants: number
    UserAnswer: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
    participants?: boolean | ConversationCountOutputTypeCountParticipantsArgs
    UserAnswer?: boolean | ConversationCountOutputTypeCountUserAnswerArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationParticipantWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountUserAnswerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
  }


  /**
   * Count Type QuestionGroupCountOutputType
   */

  export type QuestionGroupCountOutputType = {
    questions: number
    options: number
    categories: number
    answers: number
  }

  export type QuestionGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | QuestionGroupCountOutputTypeCountQuestionsArgs
    options?: boolean | QuestionGroupCountOutputTypeCountOptionsArgs
    categories?: boolean | QuestionGroupCountOutputTypeCountCategoriesArgs
    answers?: boolean | QuestionGroupCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuestionGroupCountOutputType without action
   */
  export type QuestionGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCountOutputType
     */
    select?: QuestionGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionGroupCountOutputType without action
   */
  export type QuestionGroupCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * QuestionGroupCountOutputType without action
   */
  export type QuestionGroupCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionOptionWhereInput
  }

  /**
   * QuestionGroupCountOutputType without action
   */
  export type QuestionGroupCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionGroupCategoryWhereInput
  }

  /**
   * QuestionGroupCountOutputType without action
   */
  export type QuestionGroupCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
  }


  /**
   * Count Type QuestionOptionCountOutputType
   */

  export type QuestionOptionCountOutputType = {
    answers: number
  }

  export type QuestionOptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuestionOptionCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuestionOptionCountOutputType without action
   */
  export type QuestionOptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOptionCountOutputType
     */
    select?: QuestionOptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionOptionCountOutputType without action
   */
  export type QuestionOptionCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    translations: number
    groupLinks: number
    userPreferences: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | CategoryCountOutputTypeCountTranslationsArgs
    groupLinks?: boolean | CategoryCountOutputTypeCountGroupLinksArgs
    userPreferences?: boolean | CategoryCountOutputTypeCountUserPreferencesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryTranslationWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountGroupLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionGroupCategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountUserPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserQuestionPreferenceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Auth
   */

  export type AggregateAuth = {
    _count: AuthCountAggregateOutputType | null
    _min: AuthMinAggregateOutputType | null
    _max: AuthMaxAggregateOutputType | null
  }

  export type AuthMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    accessToken: string | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AuthMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    accessToken: string | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AuthCountAggregateOutputType = {
    id: number
    email: number
    password: number
    accessToken: number
    refreshToken: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type AuthMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    accessToken?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AuthMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    accessToken?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AuthCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    accessToken?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type AuthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Auth to aggregate.
     */
    where?: AuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Auths to fetch.
     */
    orderBy?: AuthOrderByWithRelationInput | AuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Auths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Auths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Auths
    **/
    _count?: true | AuthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthMaxAggregateInputType
  }

  export type GetAuthAggregateType<T extends AuthAggregateArgs> = {
        [P in keyof T & keyof AggregateAuth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuth[P]>
      : GetScalarType<T[P], AggregateAuth[P]>
  }




  export type AuthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthWhereInput
    orderBy?: AuthOrderByWithAggregationInput | AuthOrderByWithAggregationInput[]
    by: AuthScalarFieldEnum[] | AuthScalarFieldEnum
    having?: AuthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthCountAggregateInputType | true
    _min?: AuthMinAggregateInputType
    _max?: AuthMaxAggregateInputType
  }

  export type AuthGroupByOutputType = {
    id: string
    email: string
    password: string
    accessToken: string | null
    refreshToken: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: AuthCountAggregateOutputType | null
    _min: AuthMinAggregateOutputType | null
    _max: AuthMaxAggregateOutputType | null
  }

  type GetAuthGroupByPayload<T extends AuthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthGroupByOutputType[P]>
            : GetScalarType<T[P], AuthGroupByOutputType[P]>
        }
      >
    >


  export type AuthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auth"]>

  export type AuthSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auth"]>

  export type AuthSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auth"]>

  export type AuthSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type AuthOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "accessToken" | "refreshToken" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["auth"]>
  export type AuthInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Auth"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      accessToken: string | null
      refreshToken: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["auth"]>
    composites: {}
  }

  type AuthGetPayload<S extends boolean | null | undefined | AuthDefaultArgs> = $Result.GetResult<Prisma.$AuthPayload, S>

  type AuthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthCountAggregateInputType | true
    }

  export interface AuthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Auth'], meta: { name: 'Auth' } }
    /**
     * Find zero or one Auth that matches the filter.
     * @param {AuthFindUniqueArgs} args - Arguments to find a Auth
     * @example
     * // Get one Auth
     * const auth = await prisma.auth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthFindUniqueArgs>(args: SelectSubset<T, AuthFindUniqueArgs<ExtArgs>>): Prisma__AuthClient<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Auth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthFindUniqueOrThrowArgs} args - Arguments to find a Auth
     * @example
     * // Get one Auth
     * const auth = await prisma.auth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthClient<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthFindFirstArgs} args - Arguments to find a Auth
     * @example
     * // Get one Auth
     * const auth = await prisma.auth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthFindFirstArgs>(args?: SelectSubset<T, AuthFindFirstArgs<ExtArgs>>): Prisma__AuthClient<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthFindFirstOrThrowArgs} args - Arguments to find a Auth
     * @example
     * // Get one Auth
     * const auth = await prisma.auth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthClient<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Auths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Auths
     * const auths = await prisma.auth.findMany()
     * 
     * // Get first 10 Auths
     * const auths = await prisma.auth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authWithIdOnly = await prisma.auth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthFindManyArgs>(args?: SelectSubset<T, AuthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Auth.
     * @param {AuthCreateArgs} args - Arguments to create a Auth.
     * @example
     * // Create one Auth
     * const Auth = await prisma.auth.create({
     *   data: {
     *     // ... data to create a Auth
     *   }
     * })
     * 
     */
    create<T extends AuthCreateArgs>(args: SelectSubset<T, AuthCreateArgs<ExtArgs>>): Prisma__AuthClient<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Auths.
     * @param {AuthCreateManyArgs} args - Arguments to create many Auths.
     * @example
     * // Create many Auths
     * const auth = await prisma.auth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthCreateManyArgs>(args?: SelectSubset<T, AuthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Auths and returns the data saved in the database.
     * @param {AuthCreateManyAndReturnArgs} args - Arguments to create many Auths.
     * @example
     * // Create many Auths
     * const auth = await prisma.auth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Auths and only return the `id`
     * const authWithIdOnly = await prisma.auth.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Auth.
     * @param {AuthDeleteArgs} args - Arguments to delete one Auth.
     * @example
     * // Delete one Auth
     * const Auth = await prisma.auth.delete({
     *   where: {
     *     // ... filter to delete one Auth
     *   }
     * })
     * 
     */
    delete<T extends AuthDeleteArgs>(args: SelectSubset<T, AuthDeleteArgs<ExtArgs>>): Prisma__AuthClient<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Auth.
     * @param {AuthUpdateArgs} args - Arguments to update one Auth.
     * @example
     * // Update one Auth
     * const auth = await prisma.auth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthUpdateArgs>(args: SelectSubset<T, AuthUpdateArgs<ExtArgs>>): Prisma__AuthClient<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Auths.
     * @param {AuthDeleteManyArgs} args - Arguments to filter Auths to delete.
     * @example
     * // Delete a few Auths
     * const { count } = await prisma.auth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthDeleteManyArgs>(args?: SelectSubset<T, AuthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Auths
     * const auth = await prisma.auth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthUpdateManyArgs>(args: SelectSubset<T, AuthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auths and returns the data updated in the database.
     * @param {AuthUpdateManyAndReturnArgs} args - Arguments to update many Auths.
     * @example
     * // Update many Auths
     * const auth = await prisma.auth.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Auths and only return the `id`
     * const authWithIdOnly = await prisma.auth.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuthUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Auth.
     * @param {AuthUpsertArgs} args - Arguments to update or create a Auth.
     * @example
     * // Update or create a Auth
     * const auth = await prisma.auth.upsert({
     *   create: {
     *     // ... data to create a Auth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Auth we want to update
     *   }
     * })
     */
    upsert<T extends AuthUpsertArgs>(args: SelectSubset<T, AuthUpsertArgs<ExtArgs>>): Prisma__AuthClient<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Auths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthCountArgs} args - Arguments to filter Auths to count.
     * @example
     * // Count the number of Auths
     * const count = await prisma.auth.count({
     *   where: {
     *     // ... the filter for the Auths we want to count
     *   }
     * })
    **/
    count<T extends AuthCountArgs>(
      args?: Subset<T, AuthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Auth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuthAggregateArgs>(args: Subset<T, AuthAggregateArgs>): Prisma.PrismaPromise<GetAuthAggregateType<T>>

    /**
     * Group by Auth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthGroupByArgs} args - Group by arguments.
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
      T extends AuthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthGroupByArgs['orderBy'] }
        : { orderBy?: AuthGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Auth model
   */
  readonly fields: AuthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Auth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Auth model
   */
  interface AuthFieldRefs {
    readonly id: FieldRef<"Auth", 'String'>
    readonly email: FieldRef<"Auth", 'String'>
    readonly password: FieldRef<"Auth", 'String'>
    readonly accessToken: FieldRef<"Auth", 'String'>
    readonly refreshToken: FieldRef<"Auth", 'String'>
    readonly createdAt: FieldRef<"Auth", 'DateTime'>
    readonly updatedAt: FieldRef<"Auth", 'DateTime'>
    readonly userId: FieldRef<"Auth", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Auth findUnique
   */
  export type AuthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    /**
     * Filter, which Auth to fetch.
     */
    where: AuthWhereUniqueInput
  }

  /**
   * Auth findUniqueOrThrow
   */
  export type AuthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    /**
     * Filter, which Auth to fetch.
     */
    where: AuthWhereUniqueInput
  }

  /**
   * Auth findFirst
   */
  export type AuthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    /**
     * Filter, which Auth to fetch.
     */
    where?: AuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Auths to fetch.
     */
    orderBy?: AuthOrderByWithRelationInput | AuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Auths.
     */
    cursor?: AuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Auths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Auths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Auths.
     */
    distinct?: AuthScalarFieldEnum | AuthScalarFieldEnum[]
  }

  /**
   * Auth findFirstOrThrow
   */
  export type AuthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    /**
     * Filter, which Auth to fetch.
     */
    where?: AuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Auths to fetch.
     */
    orderBy?: AuthOrderByWithRelationInput | AuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Auths.
     */
    cursor?: AuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Auths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Auths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Auths.
     */
    distinct?: AuthScalarFieldEnum | AuthScalarFieldEnum[]
  }

  /**
   * Auth findMany
   */
  export type AuthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    /**
     * Filter, which Auths to fetch.
     */
    where?: AuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Auths to fetch.
     */
    orderBy?: AuthOrderByWithRelationInput | AuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Auths.
     */
    cursor?: AuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Auths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Auths.
     */
    skip?: number
    distinct?: AuthScalarFieldEnum | AuthScalarFieldEnum[]
  }

  /**
   * Auth create
   */
  export type AuthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    /**
     * The data needed to create a Auth.
     */
    data: XOR<AuthCreateInput, AuthUncheckedCreateInput>
  }

  /**
   * Auth createMany
   */
  export type AuthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Auths.
     */
    data: AuthCreateManyInput | AuthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Auth createManyAndReturn
   */
  export type AuthCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * The data used to create many Auths.
     */
    data: AuthCreateManyInput | AuthCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Auth update
   */
  export type AuthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    /**
     * The data needed to update a Auth.
     */
    data: XOR<AuthUpdateInput, AuthUncheckedUpdateInput>
    /**
     * Choose, which Auth to update.
     */
    where: AuthWhereUniqueInput
  }

  /**
   * Auth updateMany
   */
  export type AuthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Auths.
     */
    data: XOR<AuthUpdateManyMutationInput, AuthUncheckedUpdateManyInput>
    /**
     * Filter which Auths to update
     */
    where?: AuthWhereInput
    /**
     * Limit how many Auths to update.
     */
    limit?: number
  }

  /**
   * Auth updateManyAndReturn
   */
  export type AuthUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * The data used to update Auths.
     */
    data: XOR<AuthUpdateManyMutationInput, AuthUncheckedUpdateManyInput>
    /**
     * Filter which Auths to update
     */
    where?: AuthWhereInput
    /**
     * Limit how many Auths to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Auth upsert
   */
  export type AuthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    /**
     * The filter to search for the Auth to update in case it exists.
     */
    where: AuthWhereUniqueInput
    /**
     * In case the Auth found by the `where` argument doesn't exist, create a new Auth with this data.
     */
    create: XOR<AuthCreateInput, AuthUncheckedCreateInput>
    /**
     * In case the Auth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthUpdateInput, AuthUncheckedUpdateInput>
  }

  /**
   * Auth delete
   */
  export type AuthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    /**
     * Filter which Auth to delete.
     */
    where: AuthWhereUniqueInput
  }

  /**
   * Auth deleteMany
   */
  export type AuthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Auths to delete
     */
    where?: AuthWhereInput
    /**
     * Limit how many Auths to delete.
     */
    limit?: number
  }

  /**
   * Auth without action
   */
  export type AuthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    userNumber: number | null
  }

  export type UserSumAggregateOutputType = {
    userNumber: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    avatar: string | null
    bio: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userNumber: number | null
    username: string | null
    isOnline: boolean | null
    isAvailableForChat: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    avatar: string | null
    bio: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userNumber: number | null
    username: string | null
    isOnline: boolean | null
    isAvailableForChat: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    avatar: number
    bio: number
    createdAt: number
    updatedAt: number
    userNumber: number
    username: number
    isOnline: number
    isAvailableForChat: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    userNumber?: true
  }

  export type UserSumAggregateInputType = {
    userNumber?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    avatar?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
    userNumber?: true
    username?: true
    isOnline?: true
    isAvailableForChat?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    avatar?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
    userNumber?: true
    username?: true
    isOnline?: true
    isAvailableForChat?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    avatar?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
    userNumber?: true
    username?: true
    isOnline?: true
    isAvailableForChat?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    avatar: string | null
    bio: string | null
    createdAt: Date
    updatedAt: Date
    userNumber: number
    username: string
    isOnline: boolean
    isAvailableForChat: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    avatar?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userNumber?: boolean
    username?: boolean
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: boolean | User$authArgs<ExtArgs>
    questionGroups?: boolean | User$questionGroupsArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    contacts?: boolean | User$contactsArgs<ExtArgs>
    contactOf?: boolean | User$contactOfArgs<ExtArgs>
    questionPreferences?: boolean | User$questionPreferencesArgs<ExtArgs>
    answers?: boolean | User$answersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    avatar?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userNumber?: boolean
    username?: boolean
    isOnline?: boolean
    isAvailableForChat?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    avatar?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userNumber?: boolean
    username?: boolean
    isOnline?: boolean
    isAvailableForChat?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    avatar?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userNumber?: boolean
    username?: boolean
    isOnline?: boolean
    isAvailableForChat?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "avatar" | "bio" | "createdAt" | "updatedAt" | "userNumber" | "username" | "isOnline" | "isAvailableForChat", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auth?: boolean | User$authArgs<ExtArgs>
    questionGroups?: boolean | User$questionGroupsArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    contacts?: boolean | User$contactsArgs<ExtArgs>
    contactOf?: boolean | User$contactOfArgs<ExtArgs>
    questionPreferences?: boolean | User$questionPreferencesArgs<ExtArgs>
    answers?: boolean | User$answersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      auth: Prisma.$AuthPayload<ExtArgs> | null
      questionGroups: Prisma.$QuestionGroupPayload<ExtArgs>[]
      sentMessages: Prisma.$MessagePayload<ExtArgs>[]
      conversations: Prisma.$ConversationParticipantPayload<ExtArgs>[]
      contacts: Prisma.$UserContactPayload<ExtArgs>[]
      contactOf: Prisma.$UserContactPayload<ExtArgs>[]
      questionPreferences: Prisma.$UserQuestionPreferencePayload<ExtArgs>[]
      answers: Prisma.$UserAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      avatar: string | null
      bio: string | null
      createdAt: Date
      updatedAt: Date
      userNumber: number
      username: string
      isOnline: boolean
      isAvailableForChat: boolean
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
    auth<T extends User$authArgs<ExtArgs> = {}>(args?: Subset<T, User$authArgs<ExtArgs>>): Prisma__AuthClient<$Result.GetResult<Prisma.$AuthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    questionGroups<T extends User$questionGroupsArgs<ExtArgs> = {}>(args?: Subset<T, User$questionGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contacts<T extends User$contactsArgs<ExtArgs> = {}>(args?: Subset<T, User$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contactOf<T extends User$contactOfArgs<ExtArgs> = {}>(args?: Subset<T, User$contactOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    questionPreferences<T extends User$questionPreferencesArgs<ExtArgs> = {}>(args?: Subset<T, User$questionPreferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    answers<T extends User$answersArgs<ExtArgs> = {}>(args?: Subset<T, User$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly avatar: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly userNumber: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly isOnline: FieldRef<"User", 'Boolean'>
    readonly isAvailableForChat: FieldRef<"User", 'Boolean'>
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
   * User.auth
   */
  export type User$authArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth
     */
    select?: AuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Auth
     */
    omit?: AuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthInclude<ExtArgs> | null
    where?: AuthWhereInput
  }

  /**
   * User.questionGroups
   */
  export type User$questionGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    where?: QuestionGroupWhereInput
    orderBy?: QuestionGroupOrderByWithRelationInput | QuestionGroupOrderByWithRelationInput[]
    cursor?: QuestionGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionGroupScalarFieldEnum | QuestionGroupScalarFieldEnum[]
  }

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    where?: ConversationParticipantWhereInput
    orderBy?: ConversationParticipantOrderByWithRelationInput | ConversationParticipantOrderByWithRelationInput[]
    cursor?: ConversationParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationParticipantScalarFieldEnum | ConversationParticipantScalarFieldEnum[]
  }

  /**
   * User.contacts
   */
  export type User$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    where?: UserContactWhereInput
    orderBy?: UserContactOrderByWithRelationInput | UserContactOrderByWithRelationInput[]
    cursor?: UserContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserContactScalarFieldEnum | UserContactScalarFieldEnum[]
  }

  /**
   * User.contactOf
   */
  export type User$contactOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    where?: UserContactWhereInput
    orderBy?: UserContactOrderByWithRelationInput | UserContactOrderByWithRelationInput[]
    cursor?: UserContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserContactScalarFieldEnum | UserContactScalarFieldEnum[]
  }

  /**
   * User.questionPreferences
   */
  export type User$questionPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    where?: UserQuestionPreferenceWhereInput
    orderBy?: UserQuestionPreferenceOrderByWithRelationInput | UserQuestionPreferenceOrderByWithRelationInput[]
    cursor?: UserQuestionPreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserQuestionPreferenceScalarFieldEnum | UserQuestionPreferenceScalarFieldEnum[]
  }

  /**
   * User.answers
   */
  export type User$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    cursor?: UserAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
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
   * Model UserContact
   */

  export type AggregateUserContact = {
    _count: UserContactCountAggregateOutputType | null
    _min: UserContactMinAggregateOutputType | null
    _max: UserContactMaxAggregateOutputType | null
  }

  export type UserContactMinAggregateOutputType = {
    userId: string | null
    contactId: string | null
    createdAt: Date | null
  }

  export type UserContactMaxAggregateOutputType = {
    userId: string | null
    contactId: string | null
    createdAt: Date | null
  }

  export type UserContactCountAggregateOutputType = {
    userId: number
    contactId: number
    createdAt: number
    _all: number
  }


  export type UserContactMinAggregateInputType = {
    userId?: true
    contactId?: true
    createdAt?: true
  }

  export type UserContactMaxAggregateInputType = {
    userId?: true
    contactId?: true
    createdAt?: true
  }

  export type UserContactCountAggregateInputType = {
    userId?: true
    contactId?: true
    createdAt?: true
    _all?: true
  }

  export type UserContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserContact to aggregate.
     */
    where?: UserContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserContacts to fetch.
     */
    orderBy?: UserContactOrderByWithRelationInput | UserContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserContacts
    **/
    _count?: true | UserContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserContactMaxAggregateInputType
  }

  export type GetUserContactAggregateType<T extends UserContactAggregateArgs> = {
        [P in keyof T & keyof AggregateUserContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserContact[P]>
      : GetScalarType<T[P], AggregateUserContact[P]>
  }




  export type UserContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserContactWhereInput
    orderBy?: UserContactOrderByWithAggregationInput | UserContactOrderByWithAggregationInput[]
    by: UserContactScalarFieldEnum[] | UserContactScalarFieldEnum
    having?: UserContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserContactCountAggregateInputType | true
    _min?: UserContactMinAggregateInputType
    _max?: UserContactMaxAggregateInputType
  }

  export type UserContactGroupByOutputType = {
    userId: string
    contactId: string
    createdAt: Date
    _count: UserContactCountAggregateOutputType | null
    _min: UserContactMinAggregateOutputType | null
    _max: UserContactMaxAggregateOutputType | null
  }

  type GetUserContactGroupByPayload<T extends UserContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserContactGroupByOutputType[P]>
            : GetScalarType<T[P], UserContactGroupByOutputType[P]>
        }
      >
    >


  export type UserContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    contactId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    contact?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userContact"]>

  export type UserContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    contactId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    contact?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userContact"]>

  export type UserContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    contactId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    contact?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userContact"]>

  export type UserContactSelectScalar = {
    userId?: boolean
    contactId?: boolean
    createdAt?: boolean
  }

  export type UserContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "contactId" | "createdAt", ExtArgs["result"]["userContact"]>
  export type UserContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    contact?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    contact?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    contact?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserContact"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      contact: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      contactId: string
      createdAt: Date
    }, ExtArgs["result"]["userContact"]>
    composites: {}
  }

  type UserContactGetPayload<S extends boolean | null | undefined | UserContactDefaultArgs> = $Result.GetResult<Prisma.$UserContactPayload, S>

  type UserContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserContactCountAggregateInputType | true
    }

  export interface UserContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserContact'], meta: { name: 'UserContact' } }
    /**
     * Find zero or one UserContact that matches the filter.
     * @param {UserContactFindUniqueArgs} args - Arguments to find a UserContact
     * @example
     * // Get one UserContact
     * const userContact = await prisma.userContact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserContactFindUniqueArgs>(args: SelectSubset<T, UserContactFindUniqueArgs<ExtArgs>>): Prisma__UserContactClient<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserContact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserContactFindUniqueOrThrowArgs} args - Arguments to find a UserContact
     * @example
     * // Get one UserContact
     * const userContact = await prisma.userContact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserContactFindUniqueOrThrowArgs>(args: SelectSubset<T, UserContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserContactClient<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserContact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserContactFindFirstArgs} args - Arguments to find a UserContact
     * @example
     * // Get one UserContact
     * const userContact = await prisma.userContact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserContactFindFirstArgs>(args?: SelectSubset<T, UserContactFindFirstArgs<ExtArgs>>): Prisma__UserContactClient<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserContact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserContactFindFirstOrThrowArgs} args - Arguments to find a UserContact
     * @example
     * // Get one UserContact
     * const userContact = await prisma.userContact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserContactFindFirstOrThrowArgs>(args?: SelectSubset<T, UserContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserContactClient<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserContacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserContacts
     * const userContacts = await prisma.userContact.findMany()
     * 
     * // Get first 10 UserContacts
     * const userContacts = await prisma.userContact.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userContactWithUserIdOnly = await prisma.userContact.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserContactFindManyArgs>(args?: SelectSubset<T, UserContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserContact.
     * @param {UserContactCreateArgs} args - Arguments to create a UserContact.
     * @example
     * // Create one UserContact
     * const UserContact = await prisma.userContact.create({
     *   data: {
     *     // ... data to create a UserContact
     *   }
     * })
     * 
     */
    create<T extends UserContactCreateArgs>(args: SelectSubset<T, UserContactCreateArgs<ExtArgs>>): Prisma__UserContactClient<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserContacts.
     * @param {UserContactCreateManyArgs} args - Arguments to create many UserContacts.
     * @example
     * // Create many UserContacts
     * const userContact = await prisma.userContact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserContactCreateManyArgs>(args?: SelectSubset<T, UserContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserContacts and returns the data saved in the database.
     * @param {UserContactCreateManyAndReturnArgs} args - Arguments to create many UserContacts.
     * @example
     * // Create many UserContacts
     * const userContact = await prisma.userContact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserContacts and only return the `userId`
     * const userContactWithUserIdOnly = await prisma.userContact.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserContactCreateManyAndReturnArgs>(args?: SelectSubset<T, UserContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserContact.
     * @param {UserContactDeleteArgs} args - Arguments to delete one UserContact.
     * @example
     * // Delete one UserContact
     * const UserContact = await prisma.userContact.delete({
     *   where: {
     *     // ... filter to delete one UserContact
     *   }
     * })
     * 
     */
    delete<T extends UserContactDeleteArgs>(args: SelectSubset<T, UserContactDeleteArgs<ExtArgs>>): Prisma__UserContactClient<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserContact.
     * @param {UserContactUpdateArgs} args - Arguments to update one UserContact.
     * @example
     * // Update one UserContact
     * const userContact = await prisma.userContact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserContactUpdateArgs>(args: SelectSubset<T, UserContactUpdateArgs<ExtArgs>>): Prisma__UserContactClient<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserContacts.
     * @param {UserContactDeleteManyArgs} args - Arguments to filter UserContacts to delete.
     * @example
     * // Delete a few UserContacts
     * const { count } = await prisma.userContact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserContactDeleteManyArgs>(args?: SelectSubset<T, UserContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserContacts
     * const userContact = await prisma.userContact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserContactUpdateManyArgs>(args: SelectSubset<T, UserContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserContacts and returns the data updated in the database.
     * @param {UserContactUpdateManyAndReturnArgs} args - Arguments to update many UserContacts.
     * @example
     * // Update many UserContacts
     * const userContact = await prisma.userContact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserContacts and only return the `userId`
     * const userContactWithUserIdOnly = await prisma.userContact.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserContactUpdateManyAndReturnArgs>(args: SelectSubset<T, UserContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserContact.
     * @param {UserContactUpsertArgs} args - Arguments to update or create a UserContact.
     * @example
     * // Update or create a UserContact
     * const userContact = await prisma.userContact.upsert({
     *   create: {
     *     // ... data to create a UserContact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserContact we want to update
     *   }
     * })
     */
    upsert<T extends UserContactUpsertArgs>(args: SelectSubset<T, UserContactUpsertArgs<ExtArgs>>): Prisma__UserContactClient<$Result.GetResult<Prisma.$UserContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserContactCountArgs} args - Arguments to filter UserContacts to count.
     * @example
     * // Count the number of UserContacts
     * const count = await prisma.userContact.count({
     *   where: {
     *     // ... the filter for the UserContacts we want to count
     *   }
     * })
    **/
    count<T extends UserContactCountArgs>(
      args?: Subset<T, UserContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserContactAggregateArgs>(args: Subset<T, UserContactAggregateArgs>): Prisma.PrismaPromise<GetUserContactAggregateType<T>>

    /**
     * Group by UserContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserContactGroupByArgs} args - Group by arguments.
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
      T extends UserContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserContactGroupByArgs['orderBy'] }
        : { orderBy?: UserContactGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserContact model
   */
  readonly fields: UserContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserContact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    contact<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserContact model
   */
  interface UserContactFieldRefs {
    readonly userId: FieldRef<"UserContact", 'String'>
    readonly contactId: FieldRef<"UserContact", 'String'>
    readonly createdAt: FieldRef<"UserContact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserContact findUnique
   */
  export type UserContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    /**
     * Filter, which UserContact to fetch.
     */
    where: UserContactWhereUniqueInput
  }

  /**
   * UserContact findUniqueOrThrow
   */
  export type UserContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    /**
     * Filter, which UserContact to fetch.
     */
    where: UserContactWhereUniqueInput
  }

  /**
   * UserContact findFirst
   */
  export type UserContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    /**
     * Filter, which UserContact to fetch.
     */
    where?: UserContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserContacts to fetch.
     */
    orderBy?: UserContactOrderByWithRelationInput | UserContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserContacts.
     */
    cursor?: UserContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserContacts.
     */
    distinct?: UserContactScalarFieldEnum | UserContactScalarFieldEnum[]
  }

  /**
   * UserContact findFirstOrThrow
   */
  export type UserContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    /**
     * Filter, which UserContact to fetch.
     */
    where?: UserContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserContacts to fetch.
     */
    orderBy?: UserContactOrderByWithRelationInput | UserContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserContacts.
     */
    cursor?: UserContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserContacts.
     */
    distinct?: UserContactScalarFieldEnum | UserContactScalarFieldEnum[]
  }

  /**
   * UserContact findMany
   */
  export type UserContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    /**
     * Filter, which UserContacts to fetch.
     */
    where?: UserContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserContacts to fetch.
     */
    orderBy?: UserContactOrderByWithRelationInput | UserContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserContacts.
     */
    cursor?: UserContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserContacts.
     */
    skip?: number
    distinct?: UserContactScalarFieldEnum | UserContactScalarFieldEnum[]
  }

  /**
   * UserContact create
   */
  export type UserContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    /**
     * The data needed to create a UserContact.
     */
    data: XOR<UserContactCreateInput, UserContactUncheckedCreateInput>
  }

  /**
   * UserContact createMany
   */
  export type UserContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserContacts.
     */
    data: UserContactCreateManyInput | UserContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserContact createManyAndReturn
   */
  export type UserContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * The data used to create many UserContacts.
     */
    data: UserContactCreateManyInput | UserContactCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserContact update
   */
  export type UserContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    /**
     * The data needed to update a UserContact.
     */
    data: XOR<UserContactUpdateInput, UserContactUncheckedUpdateInput>
    /**
     * Choose, which UserContact to update.
     */
    where: UserContactWhereUniqueInput
  }

  /**
   * UserContact updateMany
   */
  export type UserContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserContacts.
     */
    data: XOR<UserContactUpdateManyMutationInput, UserContactUncheckedUpdateManyInput>
    /**
     * Filter which UserContacts to update
     */
    where?: UserContactWhereInput
    /**
     * Limit how many UserContacts to update.
     */
    limit?: number
  }

  /**
   * UserContact updateManyAndReturn
   */
  export type UserContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * The data used to update UserContacts.
     */
    data: XOR<UserContactUpdateManyMutationInput, UserContactUncheckedUpdateManyInput>
    /**
     * Filter which UserContacts to update
     */
    where?: UserContactWhereInput
    /**
     * Limit how many UserContacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserContact upsert
   */
  export type UserContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    /**
     * The filter to search for the UserContact to update in case it exists.
     */
    where: UserContactWhereUniqueInput
    /**
     * In case the UserContact found by the `where` argument doesn't exist, create a new UserContact with this data.
     */
    create: XOR<UserContactCreateInput, UserContactUncheckedCreateInput>
    /**
     * In case the UserContact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserContactUpdateInput, UserContactUncheckedUpdateInput>
  }

  /**
   * UserContact delete
   */
  export type UserContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
    /**
     * Filter which UserContact to delete.
     */
    where: UserContactWhereUniqueInput
  }

  /**
   * UserContact deleteMany
   */
  export type UserContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserContacts to delete
     */
    where?: UserContactWhereInput
    /**
     * Limit how many UserContacts to delete.
     */
    limit?: number
  }

  /**
   * UserContact without action
   */
  export type UserContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserContact
     */
    select?: UserContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserContact
     */
    omit?: UserContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserContactInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    participants?: boolean | Conversation$participantsArgs<ExtArgs>
    UserAnswer?: boolean | Conversation$UserAnswerArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    participants?: boolean | Conversation$participantsArgs<ExtArgs>
    UserAnswer?: boolean | Conversation$UserAnswerArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
      participants: Prisma.$ConversationParticipantPayload<ExtArgs>[]
      UserAnswer: Prisma.$UserAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
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
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    participants<T extends Conversation$participantsArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    UserAnswer<T extends Conversation$UserAnswerArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$UserAnswerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Conversation.participants
   */
  export type Conversation$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    where?: ConversationParticipantWhereInput
    orderBy?: ConversationParticipantOrderByWithRelationInput | ConversationParticipantOrderByWithRelationInput[]
    cursor?: ConversationParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationParticipantScalarFieldEnum | ConversationParticipantScalarFieldEnum[]
  }

  /**
   * Conversation.UserAnswer
   */
  export type Conversation$UserAnswerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    cursor?: UserAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model ConversationParticipant
   */

  export type AggregateConversationParticipant = {
    _count: ConversationParticipantCountAggregateOutputType | null
    _min: ConversationParticipantMinAggregateOutputType | null
    _max: ConversationParticipantMaxAggregateOutputType | null
  }

  export type ConversationParticipantMinAggregateOutputType = {
    conversationId: string | null
    userId: string | null
    isIcebreakerReady: boolean | null
    hasGivenAnswer: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationParticipantMaxAggregateOutputType = {
    conversationId: string | null
    userId: string | null
    isIcebreakerReady: boolean | null
    hasGivenAnswer: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationParticipantCountAggregateOutputType = {
    conversationId: number
    userId: number
    isIcebreakerReady: number
    hasGivenAnswer: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationParticipantMinAggregateInputType = {
    conversationId?: true
    userId?: true
    isIcebreakerReady?: true
    hasGivenAnswer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationParticipantMaxAggregateInputType = {
    conversationId?: true
    userId?: true
    isIcebreakerReady?: true
    hasGivenAnswer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationParticipantCountAggregateInputType = {
    conversationId?: true
    userId?: true
    isIcebreakerReady?: true
    hasGivenAnswer?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversationParticipant to aggregate.
     */
    where?: ConversationParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationParticipants to fetch.
     */
    orderBy?: ConversationParticipantOrderByWithRelationInput | ConversationParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConversationParticipants
    **/
    _count?: true | ConversationParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationParticipantMaxAggregateInputType
  }

  export type GetConversationParticipantAggregateType<T extends ConversationParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateConversationParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversationParticipant[P]>
      : GetScalarType<T[P], AggregateConversationParticipant[P]>
  }




  export type ConversationParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationParticipantWhereInput
    orderBy?: ConversationParticipantOrderByWithAggregationInput | ConversationParticipantOrderByWithAggregationInput[]
    by: ConversationParticipantScalarFieldEnum[] | ConversationParticipantScalarFieldEnum
    having?: ConversationParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationParticipantCountAggregateInputType | true
    _min?: ConversationParticipantMinAggregateInputType
    _max?: ConversationParticipantMaxAggregateInputType
  }

  export type ConversationParticipantGroupByOutputType = {
    conversationId: string
    userId: string
    isIcebreakerReady: boolean
    hasGivenAnswer: boolean
    createdAt: Date
    updatedAt: Date
    _count: ConversationParticipantCountAggregateOutputType | null
    _min: ConversationParticipantMinAggregateOutputType | null
    _max: ConversationParticipantMaxAggregateOutputType | null
  }

  type GetConversationParticipantGroupByPayload<T extends ConversationParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationParticipantGroupByOutputType[P]>
        }
      >
    >


  export type ConversationParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    conversationId?: boolean
    userId?: boolean
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversationParticipant"]>

  export type ConversationParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    conversationId?: boolean
    userId?: boolean
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversationParticipant"]>

  export type ConversationParticipantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    conversationId?: boolean
    userId?: boolean
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversationParticipant"]>

  export type ConversationParticipantSelectScalar = {
    conversationId?: boolean
    userId?: boolean
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationParticipantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"conversationId" | "userId" | "isIcebreakerReady" | "hasGivenAnswer" | "createdAt" | "updatedAt", ExtArgs["result"]["conversationParticipant"]>
  export type ConversationParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConversationParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConversationParticipantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConversationParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConversationParticipant"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      conversationId: string
      userId: string
      isIcebreakerReady: boolean
      hasGivenAnswer: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversationParticipant"]>
    composites: {}
  }

  type ConversationParticipantGetPayload<S extends boolean | null | undefined | ConversationParticipantDefaultArgs> = $Result.GetResult<Prisma.$ConversationParticipantPayload, S>

  type ConversationParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationParticipantCountAggregateInputType | true
    }

  export interface ConversationParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConversationParticipant'], meta: { name: 'ConversationParticipant' } }
    /**
     * Find zero or one ConversationParticipant that matches the filter.
     * @param {ConversationParticipantFindUniqueArgs} args - Arguments to find a ConversationParticipant
     * @example
     * // Get one ConversationParticipant
     * const conversationParticipant = await prisma.conversationParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationParticipantFindUniqueArgs>(args: SelectSubset<T, ConversationParticipantFindUniqueArgs<ExtArgs>>): Prisma__ConversationParticipantClient<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConversationParticipant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationParticipantFindUniqueOrThrowArgs} args - Arguments to find a ConversationParticipant
     * @example
     * // Get one ConversationParticipant
     * const conversationParticipant = await prisma.conversationParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationParticipantClient<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversationParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationParticipantFindFirstArgs} args - Arguments to find a ConversationParticipant
     * @example
     * // Get one ConversationParticipant
     * const conversationParticipant = await prisma.conversationParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationParticipantFindFirstArgs>(args?: SelectSubset<T, ConversationParticipantFindFirstArgs<ExtArgs>>): Prisma__ConversationParticipantClient<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversationParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationParticipantFindFirstOrThrowArgs} args - Arguments to find a ConversationParticipant
     * @example
     * // Get one ConversationParticipant
     * const conversationParticipant = await prisma.conversationParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationParticipantClient<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConversationParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConversationParticipants
     * const conversationParticipants = await prisma.conversationParticipant.findMany()
     * 
     * // Get first 10 ConversationParticipants
     * const conversationParticipants = await prisma.conversationParticipant.findMany({ take: 10 })
     * 
     * // Only select the `conversationId`
     * const conversationParticipantWithConversationIdOnly = await prisma.conversationParticipant.findMany({ select: { conversationId: true } })
     * 
     */
    findMany<T extends ConversationParticipantFindManyArgs>(args?: SelectSubset<T, ConversationParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConversationParticipant.
     * @param {ConversationParticipantCreateArgs} args - Arguments to create a ConversationParticipant.
     * @example
     * // Create one ConversationParticipant
     * const ConversationParticipant = await prisma.conversationParticipant.create({
     *   data: {
     *     // ... data to create a ConversationParticipant
     *   }
     * })
     * 
     */
    create<T extends ConversationParticipantCreateArgs>(args: SelectSubset<T, ConversationParticipantCreateArgs<ExtArgs>>): Prisma__ConversationParticipantClient<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConversationParticipants.
     * @param {ConversationParticipantCreateManyArgs} args - Arguments to create many ConversationParticipants.
     * @example
     * // Create many ConversationParticipants
     * const conversationParticipant = await prisma.conversationParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationParticipantCreateManyArgs>(args?: SelectSubset<T, ConversationParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConversationParticipants and returns the data saved in the database.
     * @param {ConversationParticipantCreateManyAndReturnArgs} args - Arguments to create many ConversationParticipants.
     * @example
     * // Create many ConversationParticipants
     * const conversationParticipant = await prisma.conversationParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConversationParticipants and only return the `conversationId`
     * const conversationParticipantWithConversationIdOnly = await prisma.conversationParticipant.createManyAndReturn({
     *   select: { conversationId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConversationParticipant.
     * @param {ConversationParticipantDeleteArgs} args - Arguments to delete one ConversationParticipant.
     * @example
     * // Delete one ConversationParticipant
     * const ConversationParticipant = await prisma.conversationParticipant.delete({
     *   where: {
     *     // ... filter to delete one ConversationParticipant
     *   }
     * })
     * 
     */
    delete<T extends ConversationParticipantDeleteArgs>(args: SelectSubset<T, ConversationParticipantDeleteArgs<ExtArgs>>): Prisma__ConversationParticipantClient<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConversationParticipant.
     * @param {ConversationParticipantUpdateArgs} args - Arguments to update one ConversationParticipant.
     * @example
     * // Update one ConversationParticipant
     * const conversationParticipant = await prisma.conversationParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationParticipantUpdateArgs>(args: SelectSubset<T, ConversationParticipantUpdateArgs<ExtArgs>>): Prisma__ConversationParticipantClient<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConversationParticipants.
     * @param {ConversationParticipantDeleteManyArgs} args - Arguments to filter ConversationParticipants to delete.
     * @example
     * // Delete a few ConversationParticipants
     * const { count } = await prisma.conversationParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationParticipantDeleteManyArgs>(args?: SelectSubset<T, ConversationParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversationParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConversationParticipants
     * const conversationParticipant = await prisma.conversationParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationParticipantUpdateManyArgs>(args: SelectSubset<T, ConversationParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversationParticipants and returns the data updated in the database.
     * @param {ConversationParticipantUpdateManyAndReturnArgs} args - Arguments to update many ConversationParticipants.
     * @example
     * // Update many ConversationParticipants
     * const conversationParticipant = await prisma.conversationParticipant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConversationParticipants and only return the `conversationId`
     * const conversationParticipantWithConversationIdOnly = await prisma.conversationParticipant.updateManyAndReturn({
     *   select: { conversationId: true },
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
    updateManyAndReturn<T extends ConversationParticipantUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConversationParticipant.
     * @param {ConversationParticipantUpsertArgs} args - Arguments to update or create a ConversationParticipant.
     * @example
     * // Update or create a ConversationParticipant
     * const conversationParticipant = await prisma.conversationParticipant.upsert({
     *   create: {
     *     // ... data to create a ConversationParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConversationParticipant we want to update
     *   }
     * })
     */
    upsert<T extends ConversationParticipantUpsertArgs>(args: SelectSubset<T, ConversationParticipantUpsertArgs<ExtArgs>>): Prisma__ConversationParticipantClient<$Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConversationParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationParticipantCountArgs} args - Arguments to filter ConversationParticipants to count.
     * @example
     * // Count the number of ConversationParticipants
     * const count = await prisma.conversationParticipant.count({
     *   where: {
     *     // ... the filter for the ConversationParticipants we want to count
     *   }
     * })
    **/
    count<T extends ConversationParticipantCountArgs>(
      args?: Subset<T, ConversationParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConversationParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConversationParticipantAggregateArgs>(args: Subset<T, ConversationParticipantAggregateArgs>): Prisma.PrismaPromise<GetConversationParticipantAggregateType<T>>

    /**
     * Group by ConversationParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationParticipantGroupByArgs} args - Group by arguments.
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
      T extends ConversationParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationParticipantGroupByArgs['orderBy'] }
        : { orderBy?: ConversationParticipantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConversationParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConversationParticipant model
   */
  readonly fields: ConversationParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConversationParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ConversationParticipant model
   */
  interface ConversationParticipantFieldRefs {
    readonly conversationId: FieldRef<"ConversationParticipant", 'String'>
    readonly userId: FieldRef<"ConversationParticipant", 'String'>
    readonly isIcebreakerReady: FieldRef<"ConversationParticipant", 'Boolean'>
    readonly hasGivenAnswer: FieldRef<"ConversationParticipant", 'Boolean'>
    readonly createdAt: FieldRef<"ConversationParticipant", 'DateTime'>
    readonly updatedAt: FieldRef<"ConversationParticipant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConversationParticipant findUnique
   */
  export type ConversationParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ConversationParticipant to fetch.
     */
    where: ConversationParticipantWhereUniqueInput
  }

  /**
   * ConversationParticipant findUniqueOrThrow
   */
  export type ConversationParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ConversationParticipant to fetch.
     */
    where: ConversationParticipantWhereUniqueInput
  }

  /**
   * ConversationParticipant findFirst
   */
  export type ConversationParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ConversationParticipant to fetch.
     */
    where?: ConversationParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationParticipants to fetch.
     */
    orderBy?: ConversationParticipantOrderByWithRelationInput | ConversationParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversationParticipants.
     */
    cursor?: ConversationParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationParticipants.
     */
    distinct?: ConversationParticipantScalarFieldEnum | ConversationParticipantScalarFieldEnum[]
  }

  /**
   * ConversationParticipant findFirstOrThrow
   */
  export type ConversationParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ConversationParticipant to fetch.
     */
    where?: ConversationParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationParticipants to fetch.
     */
    orderBy?: ConversationParticipantOrderByWithRelationInput | ConversationParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversationParticipants.
     */
    cursor?: ConversationParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationParticipants.
     */
    distinct?: ConversationParticipantScalarFieldEnum | ConversationParticipantScalarFieldEnum[]
  }

  /**
   * ConversationParticipant findMany
   */
  export type ConversationParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ConversationParticipants to fetch.
     */
    where?: ConversationParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationParticipants to fetch.
     */
    orderBy?: ConversationParticipantOrderByWithRelationInput | ConversationParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConversationParticipants.
     */
    cursor?: ConversationParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationParticipants.
     */
    skip?: number
    distinct?: ConversationParticipantScalarFieldEnum | ConversationParticipantScalarFieldEnum[]
  }

  /**
   * ConversationParticipant create
   */
  export type ConversationParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a ConversationParticipant.
     */
    data: XOR<ConversationParticipantCreateInput, ConversationParticipantUncheckedCreateInput>
  }

  /**
   * ConversationParticipant createMany
   */
  export type ConversationParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConversationParticipants.
     */
    data: ConversationParticipantCreateManyInput | ConversationParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConversationParticipant createManyAndReturn
   */
  export type ConversationParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * The data used to create many ConversationParticipants.
     */
    data: ConversationParticipantCreateManyInput | ConversationParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConversationParticipant update
   */
  export type ConversationParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a ConversationParticipant.
     */
    data: XOR<ConversationParticipantUpdateInput, ConversationParticipantUncheckedUpdateInput>
    /**
     * Choose, which ConversationParticipant to update.
     */
    where: ConversationParticipantWhereUniqueInput
  }

  /**
   * ConversationParticipant updateMany
   */
  export type ConversationParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConversationParticipants.
     */
    data: XOR<ConversationParticipantUpdateManyMutationInput, ConversationParticipantUncheckedUpdateManyInput>
    /**
     * Filter which ConversationParticipants to update
     */
    where?: ConversationParticipantWhereInput
    /**
     * Limit how many ConversationParticipants to update.
     */
    limit?: number
  }

  /**
   * ConversationParticipant updateManyAndReturn
   */
  export type ConversationParticipantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * The data used to update ConversationParticipants.
     */
    data: XOR<ConversationParticipantUpdateManyMutationInput, ConversationParticipantUncheckedUpdateManyInput>
    /**
     * Filter which ConversationParticipants to update
     */
    where?: ConversationParticipantWhereInput
    /**
     * Limit how many ConversationParticipants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConversationParticipant upsert
   */
  export type ConversationParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the ConversationParticipant to update in case it exists.
     */
    where: ConversationParticipantWhereUniqueInput
    /**
     * In case the ConversationParticipant found by the `where` argument doesn't exist, create a new ConversationParticipant with this data.
     */
    create: XOR<ConversationParticipantCreateInput, ConversationParticipantUncheckedCreateInput>
    /**
     * In case the ConversationParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationParticipantUpdateInput, ConversationParticipantUncheckedUpdateInput>
  }

  /**
   * ConversationParticipant delete
   */
  export type ConversationParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
    /**
     * Filter which ConversationParticipant to delete.
     */
    where: ConversationParticipantWhereUniqueInput
  }

  /**
   * ConversationParticipant deleteMany
   */
  export type ConversationParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversationParticipants to delete
     */
    where?: ConversationParticipantWhereInput
    /**
     * Limit how many ConversationParticipants to delete.
     */
    limit?: number
  }

  /**
   * ConversationParticipant without action
   */
  export type ConversationParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationParticipant
     */
    select?: ConversationParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationParticipant
     */
    omit?: ConversationParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationParticipantInclude<ExtArgs> | null
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
    senderId: string | null
    content: string | null
    createdAt: Date | null
    editedAt: Date | null
    isRead: boolean | null
    isDeleted: boolean | null
    conversationId: string | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    senderId: string | null
    content: string | null
    createdAt: Date | null
    editedAt: Date | null
    isRead: boolean | null
    isDeleted: boolean | null
    conversationId: string | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    senderId: number
    content: number
    createdAt: number
    editedAt: number
    isRead: number
    isDeleted: number
    conversationId: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    senderId?: true
    content?: true
    createdAt?: true
    editedAt?: true
    isRead?: true
    isDeleted?: true
    conversationId?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    senderId?: true
    content?: true
    createdAt?: true
    editedAt?: true
    isRead?: true
    isDeleted?: true
    conversationId?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    senderId?: true
    content?: true
    createdAt?: true
    editedAt?: true
    isRead?: true
    isDeleted?: true
    conversationId?: true
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
    senderId: string
    content: string
    createdAt: Date
    editedAt: Date | null
    isRead: boolean
    isDeleted: boolean
    conversationId: string
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
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    editedAt?: boolean
    isRead?: boolean
    isDeleted?: boolean
    conversationId?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    editedAt?: boolean
    isRead?: boolean
    isDeleted?: boolean
    conversationId?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    editedAt?: boolean
    isRead?: boolean
    isDeleted?: boolean
    conversationId?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    editedAt?: boolean
    isRead?: boolean
    isDeleted?: boolean
    conversationId?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "senderId" | "content" | "createdAt" | "editedAt" | "isRead" | "isDeleted" | "conversationId", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      senderId: string
      content: string
      createdAt: Date
      editedAt: Date | null
      isRead: boolean
      isDeleted: boolean
      conversationId: string
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
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly senderId: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly editedAt: FieldRef<"Message", 'DateTime'>
    readonly isRead: FieldRef<"Message", 'Boolean'>
    readonly isDeleted: FieldRef<"Message", 'Boolean'>
    readonly conversationId: FieldRef<"Message", 'String'>
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
   * Model QuestionGroup
   */

  export type AggregateQuestionGroup = {
    _count: QuestionGroupCountAggregateOutputType | null
    _avg: QuestionGroupAvgAggregateOutputType | null
    _sum: QuestionGroupSumAggregateOutputType | null
    _min: QuestionGroupMinAggregateOutputType | null
    _max: QuestionGroupMaxAggregateOutputType | null
  }

  export type QuestionGroupAvgAggregateOutputType = {
    type: number | null
  }

  export type QuestionGroupSumAggregateOutputType = {
    type: number | null
  }

  export type QuestionGroupMinAggregateOutputType = {
    id: string | null
    type: number | null
    authorId: string | null
    createdAt: Date | null
    isModerated: boolean | null
    moderatedAt: Date | null
    pinned: boolean | null
    enabled: boolean | null
  }

  export type QuestionGroupMaxAggregateOutputType = {
    id: string | null
    type: number | null
    authorId: string | null
    createdAt: Date | null
    isModerated: boolean | null
    moderatedAt: Date | null
    pinned: boolean | null
    enabled: boolean | null
  }

  export type QuestionGroupCountAggregateOutputType = {
    id: number
    type: number
    authorId: number
    createdAt: number
    isModerated: number
    moderatedAt: number
    pinned: number
    enabled: number
    _all: number
  }


  export type QuestionGroupAvgAggregateInputType = {
    type?: true
  }

  export type QuestionGroupSumAggregateInputType = {
    type?: true
  }

  export type QuestionGroupMinAggregateInputType = {
    id?: true
    type?: true
    authorId?: true
    createdAt?: true
    isModerated?: true
    moderatedAt?: true
    pinned?: true
    enabled?: true
  }

  export type QuestionGroupMaxAggregateInputType = {
    id?: true
    type?: true
    authorId?: true
    createdAt?: true
    isModerated?: true
    moderatedAt?: true
    pinned?: true
    enabled?: true
  }

  export type QuestionGroupCountAggregateInputType = {
    id?: true
    type?: true
    authorId?: true
    createdAt?: true
    isModerated?: true
    moderatedAt?: true
    pinned?: true
    enabled?: true
    _all?: true
  }

  export type QuestionGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionGroup to aggregate.
     */
    where?: QuestionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionGroups to fetch.
     */
    orderBy?: QuestionGroupOrderByWithRelationInput | QuestionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionGroups
    **/
    _count?: true | QuestionGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionGroupMaxAggregateInputType
  }

  export type GetQuestionGroupAggregateType<T extends QuestionGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionGroup[P]>
      : GetScalarType<T[P], AggregateQuestionGroup[P]>
  }




  export type QuestionGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionGroupWhereInput
    orderBy?: QuestionGroupOrderByWithAggregationInput | QuestionGroupOrderByWithAggregationInput[]
    by: QuestionGroupScalarFieldEnum[] | QuestionGroupScalarFieldEnum
    having?: QuestionGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionGroupCountAggregateInputType | true
    _avg?: QuestionGroupAvgAggregateInputType
    _sum?: QuestionGroupSumAggregateInputType
    _min?: QuestionGroupMinAggregateInputType
    _max?: QuestionGroupMaxAggregateInputType
  }

  export type QuestionGroupGroupByOutputType = {
    id: string
    type: number
    authorId: string
    createdAt: Date
    isModerated: boolean
    moderatedAt: Date | null
    pinned: boolean
    enabled: boolean
    _count: QuestionGroupCountAggregateOutputType | null
    _avg: QuestionGroupAvgAggregateOutputType | null
    _sum: QuestionGroupSumAggregateOutputType | null
    _min: QuestionGroupMinAggregateOutputType | null
    _max: QuestionGroupMaxAggregateOutputType | null
  }

  type GetQuestionGroupGroupByPayload<T extends QuestionGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupGroupByOutputType[P]>
        }
      >
    >


  export type QuestionGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    authorId?: boolean
    createdAt?: boolean
    isModerated?: boolean
    moderatedAt?: boolean
    pinned?: boolean
    enabled?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | QuestionGroup$questionsArgs<ExtArgs>
    options?: boolean | QuestionGroup$optionsArgs<ExtArgs>
    categories?: boolean | QuestionGroup$categoriesArgs<ExtArgs>
    answers?: boolean | QuestionGroup$answersArgs<ExtArgs>
    _count?: boolean | QuestionGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionGroup"]>

  export type QuestionGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    authorId?: boolean
    createdAt?: boolean
    isModerated?: boolean
    moderatedAt?: boolean
    pinned?: boolean
    enabled?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionGroup"]>

  export type QuestionGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    authorId?: boolean
    createdAt?: boolean
    isModerated?: boolean
    moderatedAt?: boolean
    pinned?: boolean
    enabled?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionGroup"]>

  export type QuestionGroupSelectScalar = {
    id?: boolean
    type?: boolean
    authorId?: boolean
    createdAt?: boolean
    isModerated?: boolean
    moderatedAt?: boolean
    pinned?: boolean
    enabled?: boolean
  }

  export type QuestionGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "authorId" | "createdAt" | "isModerated" | "moderatedAt" | "pinned" | "enabled", ExtArgs["result"]["questionGroup"]>
  export type QuestionGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | QuestionGroup$questionsArgs<ExtArgs>
    options?: boolean | QuestionGroup$optionsArgs<ExtArgs>
    categories?: boolean | QuestionGroup$categoriesArgs<ExtArgs>
    answers?: boolean | QuestionGroup$answersArgs<ExtArgs>
    _count?: boolean | QuestionGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QuestionGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QuestionGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionGroup"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      options: Prisma.$QuestionOptionPayload<ExtArgs>[]
      categories: Prisma.$QuestionGroupCategoryPayload<ExtArgs>[]
      answers: Prisma.$UserAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: number
      authorId: string
      createdAt: Date
      isModerated: boolean
      moderatedAt: Date | null
      pinned: boolean
      enabled: boolean
    }, ExtArgs["result"]["questionGroup"]>
    composites: {}
  }

  type QuestionGroupGetPayload<S extends boolean | null | undefined | QuestionGroupDefaultArgs> = $Result.GetResult<Prisma.$QuestionGroupPayload, S>

  type QuestionGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionGroupCountAggregateInputType | true
    }

  export interface QuestionGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionGroup'], meta: { name: 'QuestionGroup' } }
    /**
     * Find zero or one QuestionGroup that matches the filter.
     * @param {QuestionGroupFindUniqueArgs} args - Arguments to find a QuestionGroup
     * @example
     * // Get one QuestionGroup
     * const questionGroup = await prisma.questionGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionGroupFindUniqueArgs>(args: SelectSubset<T, QuestionGroupFindUniqueArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuestionGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionGroupFindUniqueOrThrowArgs} args - Arguments to find a QuestionGroup
     * @example
     * // Get one QuestionGroup
     * const questionGroup = await prisma.questionGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupFindFirstArgs} args - Arguments to find a QuestionGroup
     * @example
     * // Get one QuestionGroup
     * const questionGroup = await prisma.questionGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionGroupFindFirstArgs>(args?: SelectSubset<T, QuestionGroupFindFirstArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupFindFirstOrThrowArgs} args - Arguments to find a QuestionGroup
     * @example
     * // Get one QuestionGroup
     * const questionGroup = await prisma.questionGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuestionGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionGroups
     * const questionGroups = await prisma.questionGroup.findMany()
     * 
     * // Get first 10 QuestionGroups
     * const questionGroups = await prisma.questionGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionGroupWithIdOnly = await prisma.questionGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionGroupFindManyArgs>(args?: SelectSubset<T, QuestionGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuestionGroup.
     * @param {QuestionGroupCreateArgs} args - Arguments to create a QuestionGroup.
     * @example
     * // Create one QuestionGroup
     * const QuestionGroup = await prisma.questionGroup.create({
     *   data: {
     *     // ... data to create a QuestionGroup
     *   }
     * })
     * 
     */
    create<T extends QuestionGroupCreateArgs>(args: SelectSubset<T, QuestionGroupCreateArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuestionGroups.
     * @param {QuestionGroupCreateManyArgs} args - Arguments to create many QuestionGroups.
     * @example
     * // Create many QuestionGroups
     * const questionGroup = await prisma.questionGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionGroupCreateManyArgs>(args?: SelectSubset<T, QuestionGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuestionGroups and returns the data saved in the database.
     * @param {QuestionGroupCreateManyAndReturnArgs} args - Arguments to create many QuestionGroups.
     * @example
     * // Create many QuestionGroups
     * const questionGroup = await prisma.questionGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuestionGroups and only return the `id`
     * const questionGroupWithIdOnly = await prisma.questionGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuestionGroup.
     * @param {QuestionGroupDeleteArgs} args - Arguments to delete one QuestionGroup.
     * @example
     * // Delete one QuestionGroup
     * const QuestionGroup = await prisma.questionGroup.delete({
     *   where: {
     *     // ... filter to delete one QuestionGroup
     *   }
     * })
     * 
     */
    delete<T extends QuestionGroupDeleteArgs>(args: SelectSubset<T, QuestionGroupDeleteArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuestionGroup.
     * @param {QuestionGroupUpdateArgs} args - Arguments to update one QuestionGroup.
     * @example
     * // Update one QuestionGroup
     * const questionGroup = await prisma.questionGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionGroupUpdateArgs>(args: SelectSubset<T, QuestionGroupUpdateArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuestionGroups.
     * @param {QuestionGroupDeleteManyArgs} args - Arguments to filter QuestionGroups to delete.
     * @example
     * // Delete a few QuestionGroups
     * const { count } = await prisma.questionGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionGroupDeleteManyArgs>(args?: SelectSubset<T, QuestionGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionGroups
     * const questionGroup = await prisma.questionGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionGroupUpdateManyArgs>(args: SelectSubset<T, QuestionGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionGroups and returns the data updated in the database.
     * @param {QuestionGroupUpdateManyAndReturnArgs} args - Arguments to update many QuestionGroups.
     * @example
     * // Update many QuestionGroups
     * const questionGroup = await prisma.questionGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuestionGroups and only return the `id`
     * const questionGroupWithIdOnly = await prisma.questionGroup.updateManyAndReturn({
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
    updateManyAndReturn<T extends QuestionGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuestionGroup.
     * @param {QuestionGroupUpsertArgs} args - Arguments to update or create a QuestionGroup.
     * @example
     * // Update or create a QuestionGroup
     * const questionGroup = await prisma.questionGroup.upsert({
     *   create: {
     *     // ... data to create a QuestionGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionGroup we want to update
     *   }
     * })
     */
    upsert<T extends QuestionGroupUpsertArgs>(args: SelectSubset<T, QuestionGroupUpsertArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuestionGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupCountArgs} args - Arguments to filter QuestionGroups to count.
     * @example
     * // Count the number of QuestionGroups
     * const count = await prisma.questionGroup.count({
     *   where: {
     *     // ... the filter for the QuestionGroups we want to count
     *   }
     * })
    **/
    count<T extends QuestionGroupCountArgs>(
      args?: Subset<T, QuestionGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuestionGroupAggregateArgs>(args: Subset<T, QuestionGroupAggregateArgs>): Prisma.PrismaPromise<GetQuestionGroupAggregateType<T>>

    /**
     * Group by QuestionGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupGroupByArgs} args - Group by arguments.
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
      T extends QuestionGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuestionGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionGroup model
   */
  readonly fields: QuestionGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questions<T extends QuestionGroup$questionsArgs<ExtArgs> = {}>(args?: Subset<T, QuestionGroup$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    options<T extends QuestionGroup$optionsArgs<ExtArgs> = {}>(args?: Subset<T, QuestionGroup$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends QuestionGroup$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, QuestionGroup$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    answers<T extends QuestionGroup$answersArgs<ExtArgs> = {}>(args?: Subset<T, QuestionGroup$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the QuestionGroup model
   */
  interface QuestionGroupFieldRefs {
    readonly id: FieldRef<"QuestionGroup", 'String'>
    readonly type: FieldRef<"QuestionGroup", 'Int'>
    readonly authorId: FieldRef<"QuestionGroup", 'String'>
    readonly createdAt: FieldRef<"QuestionGroup", 'DateTime'>
    readonly isModerated: FieldRef<"QuestionGroup", 'Boolean'>
    readonly moderatedAt: FieldRef<"QuestionGroup", 'DateTime'>
    readonly pinned: FieldRef<"QuestionGroup", 'Boolean'>
    readonly enabled: FieldRef<"QuestionGroup", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * QuestionGroup findUnique
   */
  export type QuestionGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroup to fetch.
     */
    where: QuestionGroupWhereUniqueInput
  }

  /**
   * QuestionGroup findUniqueOrThrow
   */
  export type QuestionGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroup to fetch.
     */
    where: QuestionGroupWhereUniqueInput
  }

  /**
   * QuestionGroup findFirst
   */
  export type QuestionGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroup to fetch.
     */
    where?: QuestionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionGroups to fetch.
     */
    orderBy?: QuestionGroupOrderByWithRelationInput | QuestionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionGroups.
     */
    cursor?: QuestionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionGroups.
     */
    distinct?: QuestionGroupScalarFieldEnum | QuestionGroupScalarFieldEnum[]
  }

  /**
   * QuestionGroup findFirstOrThrow
   */
  export type QuestionGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroup to fetch.
     */
    where?: QuestionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionGroups to fetch.
     */
    orderBy?: QuestionGroupOrderByWithRelationInput | QuestionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionGroups.
     */
    cursor?: QuestionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionGroups.
     */
    distinct?: QuestionGroupScalarFieldEnum | QuestionGroupScalarFieldEnum[]
  }

  /**
   * QuestionGroup findMany
   */
  export type QuestionGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroups to fetch.
     */
    where?: QuestionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionGroups to fetch.
     */
    orderBy?: QuestionGroupOrderByWithRelationInput | QuestionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionGroups.
     */
    cursor?: QuestionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionGroups.
     */
    skip?: number
    distinct?: QuestionGroupScalarFieldEnum | QuestionGroupScalarFieldEnum[]
  }

  /**
   * QuestionGroup create
   */
  export type QuestionGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestionGroup.
     */
    data: XOR<QuestionGroupCreateInput, QuestionGroupUncheckedCreateInput>
  }

  /**
   * QuestionGroup createMany
   */
  export type QuestionGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionGroups.
     */
    data: QuestionGroupCreateManyInput | QuestionGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestionGroup createManyAndReturn
   */
  export type QuestionGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * The data used to create many QuestionGroups.
     */
    data: QuestionGroupCreateManyInput | QuestionGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionGroup update
   */
  export type QuestionGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestionGroup.
     */
    data: XOR<QuestionGroupUpdateInput, QuestionGroupUncheckedUpdateInput>
    /**
     * Choose, which QuestionGroup to update.
     */
    where: QuestionGroupWhereUniqueInput
  }

  /**
   * QuestionGroup updateMany
   */
  export type QuestionGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionGroups.
     */
    data: XOR<QuestionGroupUpdateManyMutationInput, QuestionGroupUncheckedUpdateManyInput>
    /**
     * Filter which QuestionGroups to update
     */
    where?: QuestionGroupWhereInput
    /**
     * Limit how many QuestionGroups to update.
     */
    limit?: number
  }

  /**
   * QuestionGroup updateManyAndReturn
   */
  export type QuestionGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * The data used to update QuestionGroups.
     */
    data: XOR<QuestionGroupUpdateManyMutationInput, QuestionGroupUncheckedUpdateManyInput>
    /**
     * Filter which QuestionGroups to update
     */
    where?: QuestionGroupWhereInput
    /**
     * Limit how many QuestionGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionGroup upsert
   */
  export type QuestionGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestionGroup to update in case it exists.
     */
    where: QuestionGroupWhereUniqueInput
    /**
     * In case the QuestionGroup found by the `where` argument doesn't exist, create a new QuestionGroup with this data.
     */
    create: XOR<QuestionGroupCreateInput, QuestionGroupUncheckedCreateInput>
    /**
     * In case the QuestionGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionGroupUpdateInput, QuestionGroupUncheckedUpdateInput>
  }

  /**
   * QuestionGroup delete
   */
  export type QuestionGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
    /**
     * Filter which QuestionGroup to delete.
     */
    where: QuestionGroupWhereUniqueInput
  }

  /**
   * QuestionGroup deleteMany
   */
  export type QuestionGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionGroups to delete
     */
    where?: QuestionGroupWhereInput
    /**
     * Limit how many QuestionGroups to delete.
     */
    limit?: number
  }

  /**
   * QuestionGroup.questions
   */
  export type QuestionGroup$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * QuestionGroup.options
   */
  export type QuestionGroup$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    where?: QuestionOptionWhereInput
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    cursor?: QuestionOptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionGroup.categories
   */
  export type QuestionGroup$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    where?: QuestionGroupCategoryWhereInput
    orderBy?: QuestionGroupCategoryOrderByWithRelationInput | QuestionGroupCategoryOrderByWithRelationInput[]
    cursor?: QuestionGroupCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionGroupCategoryScalarFieldEnum | QuestionGroupCategoryScalarFieldEnum[]
  }

  /**
   * QuestionGroup.answers
   */
  export type QuestionGroup$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    cursor?: UserAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * QuestionGroup without action
   */
  export type QuestionGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroup
     */
    select?: QuestionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroup
     */
    omit?: QuestionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    groupId: string | null
    locale: string | null
    question: string | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    groupId: string | null
    locale: string | null
    question: string | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    groupId: number
    locale: number
    question: number
    _all: number
  }


  export type QuestionMinAggregateInputType = {
    id?: true
    groupId?: true
    locale?: true
    question?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    groupId?: true
    locale?: true
    question?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    groupId?: true
    locale?: true
    question?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    groupId: string
    locale: string
    question: string
    _count: QuestionCountAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    locale?: boolean
    question?: boolean
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    locale?: boolean
    question?: boolean
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    locale?: boolean
    question?: boolean
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    groupId?: boolean
    locale?: boolean
    question?: boolean
  }

  export type QuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "groupId" | "locale" | "question", ExtArgs["result"]["question"]>
  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      group: Prisma.$QuestionGroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      groupId: string
      locale: string
      question: string
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions and returns the data updated in the database.
     * @param {QuestionUpdateManyAndReturnArgs} args - Arguments to update many Questions.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.updateManyAndReturn({
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
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
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
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends QuestionGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionGroupDefaultArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Question model
   */
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly groupId: FieldRef<"Question", 'String'>
    readonly locale: FieldRef<"Question", 'String'>
    readonly question: FieldRef<"Question", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
  }

  /**
   * Question updateManyAndReturn
   */
  export type QuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to delete.
     */
    limit?: number
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model QuestionOption
   */

  export type AggregateQuestionOption = {
    _count: QuestionOptionCountAggregateOutputType | null
    _avg: QuestionOptionAvgAggregateOutputType | null
    _sum: QuestionOptionSumAggregateOutputType | null
    _min: QuestionOptionMinAggregateOutputType | null
    _max: QuestionOptionMaxAggregateOutputType | null
  }

  export type QuestionOptionAvgAggregateOutputType = {
    order: number | null
  }

  export type QuestionOptionSumAggregateOutputType = {
    order: number | null
  }

  export type QuestionOptionMinAggregateOutputType = {
    id: string | null
    groupId: string | null
    locale: string | null
    label: string | null
    order: number | null
  }

  export type QuestionOptionMaxAggregateOutputType = {
    id: string | null
    groupId: string | null
    locale: string | null
    label: string | null
    order: number | null
  }

  export type QuestionOptionCountAggregateOutputType = {
    id: number
    groupId: number
    locale: number
    label: number
    order: number
    _all: number
  }


  export type QuestionOptionAvgAggregateInputType = {
    order?: true
  }

  export type QuestionOptionSumAggregateInputType = {
    order?: true
  }

  export type QuestionOptionMinAggregateInputType = {
    id?: true
    groupId?: true
    locale?: true
    label?: true
    order?: true
  }

  export type QuestionOptionMaxAggregateInputType = {
    id?: true
    groupId?: true
    locale?: true
    label?: true
    order?: true
  }

  export type QuestionOptionCountAggregateInputType = {
    id?: true
    groupId?: true
    locale?: true
    label?: true
    order?: true
    _all?: true
  }

  export type QuestionOptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionOption to aggregate.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionOptions
    **/
    _count?: true | QuestionOptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionOptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionOptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionOptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionOptionMaxAggregateInputType
  }

  export type GetQuestionOptionAggregateType<T extends QuestionOptionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionOption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionOption[P]>
      : GetScalarType<T[P], AggregateQuestionOption[P]>
  }




  export type QuestionOptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionOptionWhereInput
    orderBy?: QuestionOptionOrderByWithAggregationInput | QuestionOptionOrderByWithAggregationInput[]
    by: QuestionOptionScalarFieldEnum[] | QuestionOptionScalarFieldEnum
    having?: QuestionOptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionOptionCountAggregateInputType | true
    _avg?: QuestionOptionAvgAggregateInputType
    _sum?: QuestionOptionSumAggregateInputType
    _min?: QuestionOptionMinAggregateInputType
    _max?: QuestionOptionMaxAggregateInputType
  }

  export type QuestionOptionGroupByOutputType = {
    id: string
    groupId: string
    locale: string
    label: string
    order: number
    _count: QuestionOptionCountAggregateOutputType | null
    _avg: QuestionOptionAvgAggregateOutputType | null
    _sum: QuestionOptionSumAggregateOutputType | null
    _min: QuestionOptionMinAggregateOutputType | null
    _max: QuestionOptionMaxAggregateOutputType | null
  }

  type GetQuestionOptionGroupByPayload<T extends QuestionOptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionOptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionOptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionOptionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionOptionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionOptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    locale?: boolean
    label?: boolean
    order?: boolean
    answers?: boolean | QuestionOption$answersArgs<ExtArgs>
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    _count?: boolean | QuestionOptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionOption"]>

  export type QuestionOptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    locale?: boolean
    label?: boolean
    order?: boolean
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionOption"]>

  export type QuestionOptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    locale?: boolean
    label?: boolean
    order?: boolean
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionOption"]>

  export type QuestionOptionSelectScalar = {
    id?: boolean
    groupId?: boolean
    locale?: boolean
    label?: boolean
    order?: boolean
  }

  export type QuestionOptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "groupId" | "locale" | "label" | "order", ExtArgs["result"]["questionOption"]>
  export type QuestionOptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuestionOption$answersArgs<ExtArgs>
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    _count?: boolean | QuestionOptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionOptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }
  export type QuestionOptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | QuestionGroupDefaultArgs<ExtArgs>
  }

  export type $QuestionOptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionOption"
    objects: {
      answers: Prisma.$UserAnswerPayload<ExtArgs>[]
      group: Prisma.$QuestionGroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      groupId: string
      locale: string
      label: string
      order: number
    }, ExtArgs["result"]["questionOption"]>
    composites: {}
  }

  type QuestionOptionGetPayload<S extends boolean | null | undefined | QuestionOptionDefaultArgs> = $Result.GetResult<Prisma.$QuestionOptionPayload, S>

  type QuestionOptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionOptionCountAggregateInputType | true
    }

  export interface QuestionOptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionOption'], meta: { name: 'QuestionOption' } }
    /**
     * Find zero or one QuestionOption that matches the filter.
     * @param {QuestionOptionFindUniqueArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionOptionFindUniqueArgs>(args: SelectSubset<T, QuestionOptionFindUniqueArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuestionOption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionOptionFindUniqueOrThrowArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionOptionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionOption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionFindFirstArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionOptionFindFirstArgs>(args?: SelectSubset<T, QuestionOptionFindFirstArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionOption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionFindFirstOrThrowArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionOptionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuestionOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionOptions
     * const questionOptions = await prisma.questionOption.findMany()
     * 
     * // Get first 10 QuestionOptions
     * const questionOptions = await prisma.questionOption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionOptionWithIdOnly = await prisma.questionOption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionOptionFindManyArgs>(args?: SelectSubset<T, QuestionOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuestionOption.
     * @param {QuestionOptionCreateArgs} args - Arguments to create a QuestionOption.
     * @example
     * // Create one QuestionOption
     * const QuestionOption = await prisma.questionOption.create({
     *   data: {
     *     // ... data to create a QuestionOption
     *   }
     * })
     * 
     */
    create<T extends QuestionOptionCreateArgs>(args: SelectSubset<T, QuestionOptionCreateArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuestionOptions.
     * @param {QuestionOptionCreateManyArgs} args - Arguments to create many QuestionOptions.
     * @example
     * // Create many QuestionOptions
     * const questionOption = await prisma.questionOption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionOptionCreateManyArgs>(args?: SelectSubset<T, QuestionOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuestionOptions and returns the data saved in the database.
     * @param {QuestionOptionCreateManyAndReturnArgs} args - Arguments to create many QuestionOptions.
     * @example
     * // Create many QuestionOptions
     * const questionOption = await prisma.questionOption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuestionOptions and only return the `id`
     * const questionOptionWithIdOnly = await prisma.questionOption.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionOptionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuestionOption.
     * @param {QuestionOptionDeleteArgs} args - Arguments to delete one QuestionOption.
     * @example
     * // Delete one QuestionOption
     * const QuestionOption = await prisma.questionOption.delete({
     *   where: {
     *     // ... filter to delete one QuestionOption
     *   }
     * })
     * 
     */
    delete<T extends QuestionOptionDeleteArgs>(args: SelectSubset<T, QuestionOptionDeleteArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuestionOption.
     * @param {QuestionOptionUpdateArgs} args - Arguments to update one QuestionOption.
     * @example
     * // Update one QuestionOption
     * const questionOption = await prisma.questionOption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionOptionUpdateArgs>(args: SelectSubset<T, QuestionOptionUpdateArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuestionOptions.
     * @param {QuestionOptionDeleteManyArgs} args - Arguments to filter QuestionOptions to delete.
     * @example
     * // Delete a few QuestionOptions
     * const { count } = await prisma.questionOption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionOptionDeleteManyArgs>(args?: SelectSubset<T, QuestionOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionOptions
     * const questionOption = await prisma.questionOption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionOptionUpdateManyArgs>(args: SelectSubset<T, QuestionOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionOptions and returns the data updated in the database.
     * @param {QuestionOptionUpdateManyAndReturnArgs} args - Arguments to update many QuestionOptions.
     * @example
     * // Update many QuestionOptions
     * const questionOption = await prisma.questionOption.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuestionOptions and only return the `id`
     * const questionOptionWithIdOnly = await prisma.questionOption.updateManyAndReturn({
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
    updateManyAndReturn<T extends QuestionOptionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuestionOption.
     * @param {QuestionOptionUpsertArgs} args - Arguments to update or create a QuestionOption.
     * @example
     * // Update or create a QuestionOption
     * const questionOption = await prisma.questionOption.upsert({
     *   create: {
     *     // ... data to create a QuestionOption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionOption we want to update
     *   }
     * })
     */
    upsert<T extends QuestionOptionUpsertArgs>(args: SelectSubset<T, QuestionOptionUpsertArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuestionOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionCountArgs} args - Arguments to filter QuestionOptions to count.
     * @example
     * // Count the number of QuestionOptions
     * const count = await prisma.questionOption.count({
     *   where: {
     *     // ... the filter for the QuestionOptions we want to count
     *   }
     * })
    **/
    count<T extends QuestionOptionCountArgs>(
      args?: Subset<T, QuestionOptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionOptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuestionOptionAggregateArgs>(args: Subset<T, QuestionOptionAggregateArgs>): Prisma.PrismaPromise<GetQuestionOptionAggregateType<T>>

    /**
     * Group by QuestionOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionGroupByArgs} args - Group by arguments.
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
      T extends QuestionOptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionOptionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionOptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuestionOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionOption model
   */
  readonly fields: QuestionOptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionOption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionOptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    answers<T extends QuestionOption$answersArgs<ExtArgs> = {}>(args?: Subset<T, QuestionOption$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    group<T extends QuestionGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionGroupDefaultArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the QuestionOption model
   */
  interface QuestionOptionFieldRefs {
    readonly id: FieldRef<"QuestionOption", 'String'>
    readonly groupId: FieldRef<"QuestionOption", 'String'>
    readonly locale: FieldRef<"QuestionOption", 'String'>
    readonly label: FieldRef<"QuestionOption", 'String'>
    readonly order: FieldRef<"QuestionOption", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * QuestionOption findUnique
   */
  export type QuestionOptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption findUniqueOrThrow
   */
  export type QuestionOptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption findFirst
   */
  export type QuestionOptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionOptions.
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionOptions.
     */
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionOption findFirstOrThrow
   */
  export type QuestionOptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionOptions.
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionOptions.
     */
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionOption findMany
   */
  export type QuestionOptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOptions to fetch.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionOptions.
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionOption create
   */
  export type QuestionOptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestionOption.
     */
    data: XOR<QuestionOptionCreateInput, QuestionOptionUncheckedCreateInput>
  }

  /**
   * QuestionOption createMany
   */
  export type QuestionOptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionOptions.
     */
    data: QuestionOptionCreateManyInput | QuestionOptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestionOption createManyAndReturn
   */
  export type QuestionOptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * The data used to create many QuestionOptions.
     */
    data: QuestionOptionCreateManyInput | QuestionOptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionOption update
   */
  export type QuestionOptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestionOption.
     */
    data: XOR<QuestionOptionUpdateInput, QuestionOptionUncheckedUpdateInput>
    /**
     * Choose, which QuestionOption to update.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption updateMany
   */
  export type QuestionOptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionOptions.
     */
    data: XOR<QuestionOptionUpdateManyMutationInput, QuestionOptionUncheckedUpdateManyInput>
    /**
     * Filter which QuestionOptions to update
     */
    where?: QuestionOptionWhereInput
    /**
     * Limit how many QuestionOptions to update.
     */
    limit?: number
  }

  /**
   * QuestionOption updateManyAndReturn
   */
  export type QuestionOptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * The data used to update QuestionOptions.
     */
    data: XOR<QuestionOptionUpdateManyMutationInput, QuestionOptionUncheckedUpdateManyInput>
    /**
     * Filter which QuestionOptions to update
     */
    where?: QuestionOptionWhereInput
    /**
     * Limit how many QuestionOptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionOption upsert
   */
  export type QuestionOptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestionOption to update in case it exists.
     */
    where: QuestionOptionWhereUniqueInput
    /**
     * In case the QuestionOption found by the `where` argument doesn't exist, create a new QuestionOption with this data.
     */
    create: XOR<QuestionOptionCreateInput, QuestionOptionUncheckedCreateInput>
    /**
     * In case the QuestionOption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionOptionUpdateInput, QuestionOptionUncheckedUpdateInput>
  }

  /**
   * QuestionOption delete
   */
  export type QuestionOptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter which QuestionOption to delete.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption deleteMany
   */
  export type QuestionOptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionOptions to delete
     */
    where?: QuestionOptionWhereInput
    /**
     * Limit how many QuestionOptions to delete.
     */
    limit?: number
  }

  /**
   * QuestionOption.answers
   */
  export type QuestionOption$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    cursor?: UserAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * QuestionOption without action
   */
  export type QuestionOptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    translations?: boolean | Category$translationsArgs<ExtArgs>
    groupLinks?: boolean | Category$groupLinksArgs<ExtArgs>
    userPreferences?: boolean | Category$userPreferencesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | Category$translationsArgs<ExtArgs>
    groupLinks?: boolean | Category$groupLinksArgs<ExtArgs>
    userPreferences?: boolean | Category$userPreferencesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      translations: Prisma.$CategoryTranslationPayload<ExtArgs>[]
      groupLinks: Prisma.$QuestionGroupCategoryPayload<ExtArgs>[]
      userPreferences: Prisma.$UserQuestionPreferencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
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
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    translations<T extends Category$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Category$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupLinks<T extends Category$groupLinksArgs<ExtArgs> = {}>(args?: Subset<T, Category$groupLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userPreferences<T extends Category$userPreferencesArgs<ExtArgs> = {}>(args?: Subset<T, Category$userPreferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.translations
   */
  export type Category$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    where?: CategoryTranslationWhereInput
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    cursor?: CategoryTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryTranslationScalarFieldEnum | CategoryTranslationScalarFieldEnum[]
  }

  /**
   * Category.groupLinks
   */
  export type Category$groupLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    where?: QuestionGroupCategoryWhereInput
    orderBy?: QuestionGroupCategoryOrderByWithRelationInput | QuestionGroupCategoryOrderByWithRelationInput[]
    cursor?: QuestionGroupCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionGroupCategoryScalarFieldEnum | QuestionGroupCategoryScalarFieldEnum[]
  }

  /**
   * Category.userPreferences
   */
  export type Category$userPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    where?: UserQuestionPreferenceWhereInput
    orderBy?: UserQuestionPreferenceOrderByWithRelationInput | UserQuestionPreferenceOrderByWithRelationInput[]
    cursor?: UserQuestionPreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserQuestionPreferenceScalarFieldEnum | UserQuestionPreferenceScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model CategoryTranslation
   */

  export type AggregateCategoryTranslation = {
    _count: CategoryTranslationCountAggregateOutputType | null
    _avg: CategoryTranslationAvgAggregateOutputType | null
    _sum: CategoryTranslationSumAggregateOutputType | null
    _min: CategoryTranslationMinAggregateOutputType | null
    _max: CategoryTranslationMaxAggregateOutputType | null
  }

  export type CategoryTranslationAvgAggregateOutputType = {
    categoryId: number | null
  }

  export type CategoryTranslationSumAggregateOutputType = {
    categoryId: number | null
  }

  export type CategoryTranslationMinAggregateOutputType = {
    categoryId: number | null
    locale: string | null
    label: string | null
  }

  export type CategoryTranslationMaxAggregateOutputType = {
    categoryId: number | null
    locale: string | null
    label: string | null
  }

  export type CategoryTranslationCountAggregateOutputType = {
    categoryId: number
    locale: number
    label: number
    _all: number
  }


  export type CategoryTranslationAvgAggregateInputType = {
    categoryId?: true
  }

  export type CategoryTranslationSumAggregateInputType = {
    categoryId?: true
  }

  export type CategoryTranslationMinAggregateInputType = {
    categoryId?: true
    locale?: true
    label?: true
  }

  export type CategoryTranslationMaxAggregateInputType = {
    categoryId?: true
    locale?: true
    label?: true
  }

  export type CategoryTranslationCountAggregateInputType = {
    categoryId?: true
    locale?: true
    label?: true
    _all?: true
  }

  export type CategoryTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryTranslation to aggregate.
     */
    where?: CategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryTranslations to fetch.
     */
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategoryTranslations
    **/
    _count?: true | CategoryTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryTranslationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoryTranslationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryTranslationMaxAggregateInputType
  }

  export type GetCategoryTranslationAggregateType<T extends CategoryTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoryTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoryTranslation[P]>
      : GetScalarType<T[P], AggregateCategoryTranslation[P]>
  }




  export type CategoryTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryTranslationWhereInput
    orderBy?: CategoryTranslationOrderByWithAggregationInput | CategoryTranslationOrderByWithAggregationInput[]
    by: CategoryTranslationScalarFieldEnum[] | CategoryTranslationScalarFieldEnum
    having?: CategoryTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryTranslationCountAggregateInputType | true
    _avg?: CategoryTranslationAvgAggregateInputType
    _sum?: CategoryTranslationSumAggregateInputType
    _min?: CategoryTranslationMinAggregateInputType
    _max?: CategoryTranslationMaxAggregateInputType
  }

  export type CategoryTranslationGroupByOutputType = {
    categoryId: number
    locale: string
    label: string
    _count: CategoryTranslationCountAggregateOutputType | null
    _avg: CategoryTranslationAvgAggregateOutputType | null
    _sum: CategoryTranslationSumAggregateOutputType | null
    _min: CategoryTranslationMinAggregateOutputType | null
    _max: CategoryTranslationMaxAggregateOutputType | null
  }

  type GetCategoryTranslationGroupByPayload<T extends CategoryTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryTranslationGroupByOutputType[P]>
        }
      >
    >


  export type CategoryTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    categoryId?: boolean
    locale?: boolean
    label?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryTranslation"]>

  export type CategoryTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    categoryId?: boolean
    locale?: boolean
    label?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryTranslation"]>

  export type CategoryTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    categoryId?: boolean
    locale?: boolean
    label?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryTranslation"]>

  export type CategoryTranslationSelectScalar = {
    categoryId?: boolean
    locale?: boolean
    label?: boolean
  }

  export type CategoryTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"categoryId" | "locale" | "label", ExtArgs["result"]["categoryTranslation"]>
  export type CategoryTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type CategoryTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type CategoryTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $CategoryTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CategoryTranslation"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      categoryId: number
      locale: string
      label: string
    }, ExtArgs["result"]["categoryTranslation"]>
    composites: {}
  }

  type CategoryTranslationGetPayload<S extends boolean | null | undefined | CategoryTranslationDefaultArgs> = $Result.GetResult<Prisma.$CategoryTranslationPayload, S>

  type CategoryTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryTranslationCountAggregateInputType | true
    }

  export interface CategoryTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CategoryTranslation'], meta: { name: 'CategoryTranslation' } }
    /**
     * Find zero or one CategoryTranslation that matches the filter.
     * @param {CategoryTranslationFindUniqueArgs} args - Arguments to find a CategoryTranslation
     * @example
     * // Get one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryTranslationFindUniqueArgs>(args: SelectSubset<T, CategoryTranslationFindUniqueArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CategoryTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryTranslationFindUniqueOrThrowArgs} args - Arguments to find a CategoryTranslation
     * @example
     * // Get one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationFindFirstArgs} args - Arguments to find a CategoryTranslation
     * @example
     * // Get one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryTranslationFindFirstArgs>(args?: SelectSubset<T, CategoryTranslationFindFirstArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationFindFirstOrThrowArgs} args - Arguments to find a CategoryTranslation
     * @example
     * // Get one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CategoryTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoryTranslations
     * const categoryTranslations = await prisma.categoryTranslation.findMany()
     * 
     * // Get first 10 CategoryTranslations
     * const categoryTranslations = await prisma.categoryTranslation.findMany({ take: 10 })
     * 
     * // Only select the `categoryId`
     * const categoryTranslationWithCategoryIdOnly = await prisma.categoryTranslation.findMany({ select: { categoryId: true } })
     * 
     */
    findMany<T extends CategoryTranslationFindManyArgs>(args?: SelectSubset<T, CategoryTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CategoryTranslation.
     * @param {CategoryTranslationCreateArgs} args - Arguments to create a CategoryTranslation.
     * @example
     * // Create one CategoryTranslation
     * const CategoryTranslation = await prisma.categoryTranslation.create({
     *   data: {
     *     // ... data to create a CategoryTranslation
     *   }
     * })
     * 
     */
    create<T extends CategoryTranslationCreateArgs>(args: SelectSubset<T, CategoryTranslationCreateArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CategoryTranslations.
     * @param {CategoryTranslationCreateManyArgs} args - Arguments to create many CategoryTranslations.
     * @example
     * // Create many CategoryTranslations
     * const categoryTranslation = await prisma.categoryTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryTranslationCreateManyArgs>(args?: SelectSubset<T, CategoryTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CategoryTranslations and returns the data saved in the database.
     * @param {CategoryTranslationCreateManyAndReturnArgs} args - Arguments to create many CategoryTranslations.
     * @example
     * // Create many CategoryTranslations
     * const categoryTranslation = await prisma.categoryTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CategoryTranslations and only return the `categoryId`
     * const categoryTranslationWithCategoryIdOnly = await prisma.categoryTranslation.createManyAndReturn({
     *   select: { categoryId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CategoryTranslation.
     * @param {CategoryTranslationDeleteArgs} args - Arguments to delete one CategoryTranslation.
     * @example
     * // Delete one CategoryTranslation
     * const CategoryTranslation = await prisma.categoryTranslation.delete({
     *   where: {
     *     // ... filter to delete one CategoryTranslation
     *   }
     * })
     * 
     */
    delete<T extends CategoryTranslationDeleteArgs>(args: SelectSubset<T, CategoryTranslationDeleteArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CategoryTranslation.
     * @param {CategoryTranslationUpdateArgs} args - Arguments to update one CategoryTranslation.
     * @example
     * // Update one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryTranslationUpdateArgs>(args: SelectSubset<T, CategoryTranslationUpdateArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CategoryTranslations.
     * @param {CategoryTranslationDeleteManyArgs} args - Arguments to filter CategoryTranslations to delete.
     * @example
     * // Delete a few CategoryTranslations
     * const { count } = await prisma.categoryTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryTranslationDeleteManyArgs>(args?: SelectSubset<T, CategoryTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoryTranslations
     * const categoryTranslation = await prisma.categoryTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryTranslationUpdateManyArgs>(args: SelectSubset<T, CategoryTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryTranslations and returns the data updated in the database.
     * @param {CategoryTranslationUpdateManyAndReturnArgs} args - Arguments to update many CategoryTranslations.
     * @example
     * // Update many CategoryTranslations
     * const categoryTranslation = await prisma.categoryTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CategoryTranslations and only return the `categoryId`
     * const categoryTranslationWithCategoryIdOnly = await prisma.categoryTranslation.updateManyAndReturn({
     *   select: { categoryId: true },
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
    updateManyAndReturn<T extends CategoryTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CategoryTranslation.
     * @param {CategoryTranslationUpsertArgs} args - Arguments to update or create a CategoryTranslation.
     * @example
     * // Update or create a CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.upsert({
     *   create: {
     *     // ... data to create a CategoryTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoryTranslation we want to update
     *   }
     * })
     */
    upsert<T extends CategoryTranslationUpsertArgs>(args: SelectSubset<T, CategoryTranslationUpsertArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CategoryTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationCountArgs} args - Arguments to filter CategoryTranslations to count.
     * @example
     * // Count the number of CategoryTranslations
     * const count = await prisma.categoryTranslation.count({
     *   where: {
     *     // ... the filter for the CategoryTranslations we want to count
     *   }
     * })
    **/
    count<T extends CategoryTranslationCountArgs>(
      args?: Subset<T, CategoryTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CategoryTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryTranslationAggregateArgs>(args: Subset<T, CategoryTranslationAggregateArgs>): Prisma.PrismaPromise<GetCategoryTranslationAggregateType<T>>

    /**
     * Group by CategoryTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationGroupByArgs} args - Group by arguments.
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
      T extends CategoryTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryTranslationGroupByArgs['orderBy'] }
        : { orderBy?: CategoryTranslationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CategoryTranslation model
   */
  readonly fields: CategoryTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CategoryTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CategoryTranslation model
   */
  interface CategoryTranslationFieldRefs {
    readonly categoryId: FieldRef<"CategoryTranslation", 'Int'>
    readonly locale: FieldRef<"CategoryTranslation", 'String'>
    readonly label: FieldRef<"CategoryTranslation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CategoryTranslation findUnique
   */
  export type CategoryTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslation to fetch.
     */
    where: CategoryTranslationWhereUniqueInput
  }

  /**
   * CategoryTranslation findUniqueOrThrow
   */
  export type CategoryTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslation to fetch.
     */
    where: CategoryTranslationWhereUniqueInput
  }

  /**
   * CategoryTranslation findFirst
   */
  export type CategoryTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslation to fetch.
     */
    where?: CategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryTranslations to fetch.
     */
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryTranslations.
     */
    cursor?: CategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryTranslations.
     */
    distinct?: CategoryTranslationScalarFieldEnum | CategoryTranslationScalarFieldEnum[]
  }

  /**
   * CategoryTranslation findFirstOrThrow
   */
  export type CategoryTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslation to fetch.
     */
    where?: CategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryTranslations to fetch.
     */
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryTranslations.
     */
    cursor?: CategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryTranslations.
     */
    distinct?: CategoryTranslationScalarFieldEnum | CategoryTranslationScalarFieldEnum[]
  }

  /**
   * CategoryTranslation findMany
   */
  export type CategoryTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslations to fetch.
     */
    where?: CategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryTranslations to fetch.
     */
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategoryTranslations.
     */
    cursor?: CategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryTranslations.
     */
    skip?: number
    distinct?: CategoryTranslationScalarFieldEnum | CategoryTranslationScalarFieldEnum[]
  }

  /**
   * CategoryTranslation create
   */
  export type CategoryTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a CategoryTranslation.
     */
    data: XOR<CategoryTranslationCreateInput, CategoryTranslationUncheckedCreateInput>
  }

  /**
   * CategoryTranslation createMany
   */
  export type CategoryTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategoryTranslations.
     */
    data: CategoryTranslationCreateManyInput | CategoryTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CategoryTranslation createManyAndReturn
   */
  export type CategoryTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many CategoryTranslations.
     */
    data: CategoryTranslationCreateManyInput | CategoryTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CategoryTranslation update
   */
  export type CategoryTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a CategoryTranslation.
     */
    data: XOR<CategoryTranslationUpdateInput, CategoryTranslationUncheckedUpdateInput>
    /**
     * Choose, which CategoryTranslation to update.
     */
    where: CategoryTranslationWhereUniqueInput
  }

  /**
   * CategoryTranslation updateMany
   */
  export type CategoryTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CategoryTranslations.
     */
    data: XOR<CategoryTranslationUpdateManyMutationInput, CategoryTranslationUncheckedUpdateManyInput>
    /**
     * Filter which CategoryTranslations to update
     */
    where?: CategoryTranslationWhereInput
    /**
     * Limit how many CategoryTranslations to update.
     */
    limit?: number
  }

  /**
   * CategoryTranslation updateManyAndReturn
   */
  export type CategoryTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * The data used to update CategoryTranslations.
     */
    data: XOR<CategoryTranslationUpdateManyMutationInput, CategoryTranslationUncheckedUpdateManyInput>
    /**
     * Filter which CategoryTranslations to update
     */
    where?: CategoryTranslationWhereInput
    /**
     * Limit how many CategoryTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CategoryTranslation upsert
   */
  export type CategoryTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the CategoryTranslation to update in case it exists.
     */
    where: CategoryTranslationWhereUniqueInput
    /**
     * In case the CategoryTranslation found by the `where` argument doesn't exist, create a new CategoryTranslation with this data.
     */
    create: XOR<CategoryTranslationCreateInput, CategoryTranslationUncheckedCreateInput>
    /**
     * In case the CategoryTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryTranslationUpdateInput, CategoryTranslationUncheckedUpdateInput>
  }

  /**
   * CategoryTranslation delete
   */
  export type CategoryTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter which CategoryTranslation to delete.
     */
    where: CategoryTranslationWhereUniqueInput
  }

  /**
   * CategoryTranslation deleteMany
   */
  export type CategoryTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryTranslations to delete
     */
    where?: CategoryTranslationWhereInput
    /**
     * Limit how many CategoryTranslations to delete.
     */
    limit?: number
  }

  /**
   * CategoryTranslation without action
   */
  export type CategoryTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
  }


  /**
   * Model QuestionGroupCategory
   */

  export type AggregateQuestionGroupCategory = {
    _count: QuestionGroupCategoryCountAggregateOutputType | null
    _avg: QuestionGroupCategoryAvgAggregateOutputType | null
    _sum: QuestionGroupCategorySumAggregateOutputType | null
    _min: QuestionGroupCategoryMinAggregateOutputType | null
    _max: QuestionGroupCategoryMaxAggregateOutputType | null
  }

  export type QuestionGroupCategoryAvgAggregateOutputType = {
    categoryId: number | null
  }

  export type QuestionGroupCategorySumAggregateOutputType = {
    categoryId: number | null
  }

  export type QuestionGroupCategoryMinAggregateOutputType = {
    questionGroupId: string | null
    categoryId: number | null
  }

  export type QuestionGroupCategoryMaxAggregateOutputType = {
    questionGroupId: string | null
    categoryId: number | null
  }

  export type QuestionGroupCategoryCountAggregateOutputType = {
    questionGroupId: number
    categoryId: number
    _all: number
  }


  export type QuestionGroupCategoryAvgAggregateInputType = {
    categoryId?: true
  }

  export type QuestionGroupCategorySumAggregateInputType = {
    categoryId?: true
  }

  export type QuestionGroupCategoryMinAggregateInputType = {
    questionGroupId?: true
    categoryId?: true
  }

  export type QuestionGroupCategoryMaxAggregateInputType = {
    questionGroupId?: true
    categoryId?: true
  }

  export type QuestionGroupCategoryCountAggregateInputType = {
    questionGroupId?: true
    categoryId?: true
    _all?: true
  }

  export type QuestionGroupCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionGroupCategory to aggregate.
     */
    where?: QuestionGroupCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionGroupCategories to fetch.
     */
    orderBy?: QuestionGroupCategoryOrderByWithRelationInput | QuestionGroupCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionGroupCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionGroupCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionGroupCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionGroupCategories
    **/
    _count?: true | QuestionGroupCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionGroupCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionGroupCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionGroupCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionGroupCategoryMaxAggregateInputType
  }

  export type GetQuestionGroupCategoryAggregateType<T extends QuestionGroupCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionGroupCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionGroupCategory[P]>
      : GetScalarType<T[P], AggregateQuestionGroupCategory[P]>
  }




  export type QuestionGroupCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionGroupCategoryWhereInput
    orderBy?: QuestionGroupCategoryOrderByWithAggregationInput | QuestionGroupCategoryOrderByWithAggregationInput[]
    by: QuestionGroupCategoryScalarFieldEnum[] | QuestionGroupCategoryScalarFieldEnum
    having?: QuestionGroupCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionGroupCategoryCountAggregateInputType | true
    _avg?: QuestionGroupCategoryAvgAggregateInputType
    _sum?: QuestionGroupCategorySumAggregateInputType
    _min?: QuestionGroupCategoryMinAggregateInputType
    _max?: QuestionGroupCategoryMaxAggregateInputType
  }

  export type QuestionGroupCategoryGroupByOutputType = {
    questionGroupId: string
    categoryId: number
    _count: QuestionGroupCategoryCountAggregateOutputType | null
    _avg: QuestionGroupCategoryAvgAggregateOutputType | null
    _sum: QuestionGroupCategorySumAggregateOutputType | null
    _min: QuestionGroupCategoryMinAggregateOutputType | null
    _max: QuestionGroupCategoryMaxAggregateOutputType | null
  }

  type GetQuestionGroupCategoryGroupByPayload<T extends QuestionGroupCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupCategoryGroupByOutputType[P]>
        }
      >
    >


  export type QuestionGroupCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    questionGroupId?: boolean
    categoryId?: boolean
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionGroupCategory"]>

  export type QuestionGroupCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    questionGroupId?: boolean
    categoryId?: boolean
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionGroupCategory"]>

  export type QuestionGroupCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    questionGroupId?: boolean
    categoryId?: boolean
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionGroupCategory"]>

  export type QuestionGroupCategorySelectScalar = {
    questionGroupId?: boolean
    categoryId?: boolean
  }

  export type QuestionGroupCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"questionGroupId" | "categoryId", ExtArgs["result"]["questionGroupCategory"]>
  export type QuestionGroupCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type QuestionGroupCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type QuestionGroupCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $QuestionGroupCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionGroupCategory"
    objects: {
      questionGroup: Prisma.$QuestionGroupPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      questionGroupId: string
      categoryId: number
    }, ExtArgs["result"]["questionGroupCategory"]>
    composites: {}
  }

  type QuestionGroupCategoryGetPayload<S extends boolean | null | undefined | QuestionGroupCategoryDefaultArgs> = $Result.GetResult<Prisma.$QuestionGroupCategoryPayload, S>

  type QuestionGroupCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionGroupCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionGroupCategoryCountAggregateInputType | true
    }

  export interface QuestionGroupCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionGroupCategory'], meta: { name: 'QuestionGroupCategory' } }
    /**
     * Find zero or one QuestionGroupCategory that matches the filter.
     * @param {QuestionGroupCategoryFindUniqueArgs} args - Arguments to find a QuestionGroupCategory
     * @example
     * // Get one QuestionGroupCategory
     * const questionGroupCategory = await prisma.questionGroupCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionGroupCategoryFindUniqueArgs>(args: SelectSubset<T, QuestionGroupCategoryFindUniqueArgs<ExtArgs>>): Prisma__QuestionGroupCategoryClient<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuestionGroupCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionGroupCategoryFindUniqueOrThrowArgs} args - Arguments to find a QuestionGroupCategory
     * @example
     * // Get one QuestionGroupCategory
     * const questionGroupCategory = await prisma.questionGroupCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionGroupCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionGroupCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionGroupCategoryClient<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionGroupCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupCategoryFindFirstArgs} args - Arguments to find a QuestionGroupCategory
     * @example
     * // Get one QuestionGroupCategory
     * const questionGroupCategory = await prisma.questionGroupCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionGroupCategoryFindFirstArgs>(args?: SelectSubset<T, QuestionGroupCategoryFindFirstArgs<ExtArgs>>): Prisma__QuestionGroupCategoryClient<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionGroupCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupCategoryFindFirstOrThrowArgs} args - Arguments to find a QuestionGroupCategory
     * @example
     * // Get one QuestionGroupCategory
     * const questionGroupCategory = await prisma.questionGroupCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionGroupCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionGroupCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionGroupCategoryClient<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuestionGroupCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionGroupCategories
     * const questionGroupCategories = await prisma.questionGroupCategory.findMany()
     * 
     * // Get first 10 QuestionGroupCategories
     * const questionGroupCategories = await prisma.questionGroupCategory.findMany({ take: 10 })
     * 
     * // Only select the `questionGroupId`
     * const questionGroupCategoryWithQuestionGroupIdOnly = await prisma.questionGroupCategory.findMany({ select: { questionGroupId: true } })
     * 
     */
    findMany<T extends QuestionGroupCategoryFindManyArgs>(args?: SelectSubset<T, QuestionGroupCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuestionGroupCategory.
     * @param {QuestionGroupCategoryCreateArgs} args - Arguments to create a QuestionGroupCategory.
     * @example
     * // Create one QuestionGroupCategory
     * const QuestionGroupCategory = await prisma.questionGroupCategory.create({
     *   data: {
     *     // ... data to create a QuestionGroupCategory
     *   }
     * })
     * 
     */
    create<T extends QuestionGroupCategoryCreateArgs>(args: SelectSubset<T, QuestionGroupCategoryCreateArgs<ExtArgs>>): Prisma__QuestionGroupCategoryClient<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuestionGroupCategories.
     * @param {QuestionGroupCategoryCreateManyArgs} args - Arguments to create many QuestionGroupCategories.
     * @example
     * // Create many QuestionGroupCategories
     * const questionGroupCategory = await prisma.questionGroupCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionGroupCategoryCreateManyArgs>(args?: SelectSubset<T, QuestionGroupCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuestionGroupCategories and returns the data saved in the database.
     * @param {QuestionGroupCategoryCreateManyAndReturnArgs} args - Arguments to create many QuestionGroupCategories.
     * @example
     * // Create many QuestionGroupCategories
     * const questionGroupCategory = await prisma.questionGroupCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuestionGroupCategories and only return the `questionGroupId`
     * const questionGroupCategoryWithQuestionGroupIdOnly = await prisma.questionGroupCategory.createManyAndReturn({
     *   select: { questionGroupId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionGroupCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionGroupCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuestionGroupCategory.
     * @param {QuestionGroupCategoryDeleteArgs} args - Arguments to delete one QuestionGroupCategory.
     * @example
     * // Delete one QuestionGroupCategory
     * const QuestionGroupCategory = await prisma.questionGroupCategory.delete({
     *   where: {
     *     // ... filter to delete one QuestionGroupCategory
     *   }
     * })
     * 
     */
    delete<T extends QuestionGroupCategoryDeleteArgs>(args: SelectSubset<T, QuestionGroupCategoryDeleteArgs<ExtArgs>>): Prisma__QuestionGroupCategoryClient<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuestionGroupCategory.
     * @param {QuestionGroupCategoryUpdateArgs} args - Arguments to update one QuestionGroupCategory.
     * @example
     * // Update one QuestionGroupCategory
     * const questionGroupCategory = await prisma.questionGroupCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionGroupCategoryUpdateArgs>(args: SelectSubset<T, QuestionGroupCategoryUpdateArgs<ExtArgs>>): Prisma__QuestionGroupCategoryClient<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuestionGroupCategories.
     * @param {QuestionGroupCategoryDeleteManyArgs} args - Arguments to filter QuestionGroupCategories to delete.
     * @example
     * // Delete a few QuestionGroupCategories
     * const { count } = await prisma.questionGroupCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionGroupCategoryDeleteManyArgs>(args?: SelectSubset<T, QuestionGroupCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionGroupCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionGroupCategories
     * const questionGroupCategory = await prisma.questionGroupCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionGroupCategoryUpdateManyArgs>(args: SelectSubset<T, QuestionGroupCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionGroupCategories and returns the data updated in the database.
     * @param {QuestionGroupCategoryUpdateManyAndReturnArgs} args - Arguments to update many QuestionGroupCategories.
     * @example
     * // Update many QuestionGroupCategories
     * const questionGroupCategory = await prisma.questionGroupCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuestionGroupCategories and only return the `questionGroupId`
     * const questionGroupCategoryWithQuestionGroupIdOnly = await prisma.questionGroupCategory.updateManyAndReturn({
     *   select: { questionGroupId: true },
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
    updateManyAndReturn<T extends QuestionGroupCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionGroupCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuestionGroupCategory.
     * @param {QuestionGroupCategoryUpsertArgs} args - Arguments to update or create a QuestionGroupCategory.
     * @example
     * // Update or create a QuestionGroupCategory
     * const questionGroupCategory = await prisma.questionGroupCategory.upsert({
     *   create: {
     *     // ... data to create a QuestionGroupCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionGroupCategory we want to update
     *   }
     * })
     */
    upsert<T extends QuestionGroupCategoryUpsertArgs>(args: SelectSubset<T, QuestionGroupCategoryUpsertArgs<ExtArgs>>): Prisma__QuestionGroupCategoryClient<$Result.GetResult<Prisma.$QuestionGroupCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuestionGroupCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupCategoryCountArgs} args - Arguments to filter QuestionGroupCategories to count.
     * @example
     * // Count the number of QuestionGroupCategories
     * const count = await prisma.questionGroupCategory.count({
     *   where: {
     *     // ... the filter for the QuestionGroupCategories we want to count
     *   }
     * })
    **/
    count<T extends QuestionGroupCategoryCountArgs>(
      args?: Subset<T, QuestionGroupCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionGroupCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionGroupCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuestionGroupCategoryAggregateArgs>(args: Subset<T, QuestionGroupCategoryAggregateArgs>): Prisma.PrismaPromise<GetQuestionGroupCategoryAggregateType<T>>

    /**
     * Group by QuestionGroupCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupCategoryGroupByArgs} args - Group by arguments.
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
      T extends QuestionGroupCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupCategoryGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupCategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuestionGroupCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionGroupCategory model
   */
  readonly fields: QuestionGroupCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionGroupCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionGroupCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questionGroup<T extends QuestionGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionGroupDefaultArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the QuestionGroupCategory model
   */
  interface QuestionGroupCategoryFieldRefs {
    readonly questionGroupId: FieldRef<"QuestionGroupCategory", 'String'>
    readonly categoryId: FieldRef<"QuestionGroupCategory", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * QuestionGroupCategory findUnique
   */
  export type QuestionGroupCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroupCategory to fetch.
     */
    where: QuestionGroupCategoryWhereUniqueInput
  }

  /**
   * QuestionGroupCategory findUniqueOrThrow
   */
  export type QuestionGroupCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroupCategory to fetch.
     */
    where: QuestionGroupCategoryWhereUniqueInput
  }

  /**
   * QuestionGroupCategory findFirst
   */
  export type QuestionGroupCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroupCategory to fetch.
     */
    where?: QuestionGroupCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionGroupCategories to fetch.
     */
    orderBy?: QuestionGroupCategoryOrderByWithRelationInput | QuestionGroupCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionGroupCategories.
     */
    cursor?: QuestionGroupCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionGroupCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionGroupCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionGroupCategories.
     */
    distinct?: QuestionGroupCategoryScalarFieldEnum | QuestionGroupCategoryScalarFieldEnum[]
  }

  /**
   * QuestionGroupCategory findFirstOrThrow
   */
  export type QuestionGroupCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroupCategory to fetch.
     */
    where?: QuestionGroupCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionGroupCategories to fetch.
     */
    orderBy?: QuestionGroupCategoryOrderByWithRelationInput | QuestionGroupCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionGroupCategories.
     */
    cursor?: QuestionGroupCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionGroupCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionGroupCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionGroupCategories.
     */
    distinct?: QuestionGroupCategoryScalarFieldEnum | QuestionGroupCategoryScalarFieldEnum[]
  }

  /**
   * QuestionGroupCategory findMany
   */
  export type QuestionGroupCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    /**
     * Filter, which QuestionGroupCategories to fetch.
     */
    where?: QuestionGroupCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionGroupCategories to fetch.
     */
    orderBy?: QuestionGroupCategoryOrderByWithRelationInput | QuestionGroupCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionGroupCategories.
     */
    cursor?: QuestionGroupCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionGroupCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionGroupCategories.
     */
    skip?: number
    distinct?: QuestionGroupCategoryScalarFieldEnum | QuestionGroupCategoryScalarFieldEnum[]
  }

  /**
   * QuestionGroupCategory create
   */
  export type QuestionGroupCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestionGroupCategory.
     */
    data: XOR<QuestionGroupCategoryCreateInput, QuestionGroupCategoryUncheckedCreateInput>
  }

  /**
   * QuestionGroupCategory createMany
   */
  export type QuestionGroupCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionGroupCategories.
     */
    data: QuestionGroupCategoryCreateManyInput | QuestionGroupCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestionGroupCategory createManyAndReturn
   */
  export type QuestionGroupCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many QuestionGroupCategories.
     */
    data: QuestionGroupCategoryCreateManyInput | QuestionGroupCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionGroupCategory update
   */
  export type QuestionGroupCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestionGroupCategory.
     */
    data: XOR<QuestionGroupCategoryUpdateInput, QuestionGroupCategoryUncheckedUpdateInput>
    /**
     * Choose, which QuestionGroupCategory to update.
     */
    where: QuestionGroupCategoryWhereUniqueInput
  }

  /**
   * QuestionGroupCategory updateMany
   */
  export type QuestionGroupCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionGroupCategories.
     */
    data: XOR<QuestionGroupCategoryUpdateManyMutationInput, QuestionGroupCategoryUncheckedUpdateManyInput>
    /**
     * Filter which QuestionGroupCategories to update
     */
    where?: QuestionGroupCategoryWhereInput
    /**
     * Limit how many QuestionGroupCategories to update.
     */
    limit?: number
  }

  /**
   * QuestionGroupCategory updateManyAndReturn
   */
  export type QuestionGroupCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * The data used to update QuestionGroupCategories.
     */
    data: XOR<QuestionGroupCategoryUpdateManyMutationInput, QuestionGroupCategoryUncheckedUpdateManyInput>
    /**
     * Filter which QuestionGroupCategories to update
     */
    where?: QuestionGroupCategoryWhereInput
    /**
     * Limit how many QuestionGroupCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionGroupCategory upsert
   */
  export type QuestionGroupCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestionGroupCategory to update in case it exists.
     */
    where: QuestionGroupCategoryWhereUniqueInput
    /**
     * In case the QuestionGroupCategory found by the `where` argument doesn't exist, create a new QuestionGroupCategory with this data.
     */
    create: XOR<QuestionGroupCategoryCreateInput, QuestionGroupCategoryUncheckedCreateInput>
    /**
     * In case the QuestionGroupCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionGroupCategoryUpdateInput, QuestionGroupCategoryUncheckedUpdateInput>
  }

  /**
   * QuestionGroupCategory delete
   */
  export type QuestionGroupCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
    /**
     * Filter which QuestionGroupCategory to delete.
     */
    where: QuestionGroupCategoryWhereUniqueInput
  }

  /**
   * QuestionGroupCategory deleteMany
   */
  export type QuestionGroupCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionGroupCategories to delete
     */
    where?: QuestionGroupCategoryWhereInput
    /**
     * Limit how many QuestionGroupCategories to delete.
     */
    limit?: number
  }

  /**
   * QuestionGroupCategory without action
   */
  export type QuestionGroupCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionGroupCategory
     */
    select?: QuestionGroupCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionGroupCategory
     */
    omit?: QuestionGroupCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionGroupCategoryInclude<ExtArgs> | null
  }


  /**
   * Model UserQuestionPreference
   */

  export type AggregateUserQuestionPreference = {
    _count: UserQuestionPreferenceCountAggregateOutputType | null
    _avg: UserQuestionPreferenceAvgAggregateOutputType | null
    _sum: UserQuestionPreferenceSumAggregateOutputType | null
    _min: UserQuestionPreferenceMinAggregateOutputType | null
    _max: UserQuestionPreferenceMaxAggregateOutputType | null
  }

  export type UserQuestionPreferenceAvgAggregateOutputType = {
    categoryId: number | null
  }

  export type UserQuestionPreferenceSumAggregateOutputType = {
    categoryId: number | null
  }

  export type UserQuestionPreferenceMinAggregateOutputType = {
    userId: string | null
    categoryId: number | null
    enabled: boolean | null
    updatedAt: Date | null
  }

  export type UserQuestionPreferenceMaxAggregateOutputType = {
    userId: string | null
    categoryId: number | null
    enabled: boolean | null
    updatedAt: Date | null
  }

  export type UserQuestionPreferenceCountAggregateOutputType = {
    userId: number
    categoryId: number
    enabled: number
    updatedAt: number
    _all: number
  }


  export type UserQuestionPreferenceAvgAggregateInputType = {
    categoryId?: true
  }

  export type UserQuestionPreferenceSumAggregateInputType = {
    categoryId?: true
  }

  export type UserQuestionPreferenceMinAggregateInputType = {
    userId?: true
    categoryId?: true
    enabled?: true
    updatedAt?: true
  }

  export type UserQuestionPreferenceMaxAggregateInputType = {
    userId?: true
    categoryId?: true
    enabled?: true
    updatedAt?: true
  }

  export type UserQuestionPreferenceCountAggregateInputType = {
    userId?: true
    categoryId?: true
    enabled?: true
    updatedAt?: true
    _all?: true
  }

  export type UserQuestionPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserQuestionPreference to aggregate.
     */
    where?: UserQuestionPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuestionPreferences to fetch.
     */
    orderBy?: UserQuestionPreferenceOrderByWithRelationInput | UserQuestionPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserQuestionPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuestionPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuestionPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserQuestionPreferences
    **/
    _count?: true | UserQuestionPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserQuestionPreferenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserQuestionPreferenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserQuestionPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserQuestionPreferenceMaxAggregateInputType
  }

  export type GetUserQuestionPreferenceAggregateType<T extends UserQuestionPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserQuestionPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserQuestionPreference[P]>
      : GetScalarType<T[P], AggregateUserQuestionPreference[P]>
  }




  export type UserQuestionPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserQuestionPreferenceWhereInput
    orderBy?: UserQuestionPreferenceOrderByWithAggregationInput | UserQuestionPreferenceOrderByWithAggregationInput[]
    by: UserQuestionPreferenceScalarFieldEnum[] | UserQuestionPreferenceScalarFieldEnum
    having?: UserQuestionPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserQuestionPreferenceCountAggregateInputType | true
    _avg?: UserQuestionPreferenceAvgAggregateInputType
    _sum?: UserQuestionPreferenceSumAggregateInputType
    _min?: UserQuestionPreferenceMinAggregateInputType
    _max?: UserQuestionPreferenceMaxAggregateInputType
  }

  export type UserQuestionPreferenceGroupByOutputType = {
    userId: string
    categoryId: number
    enabled: boolean
    updatedAt: Date
    _count: UserQuestionPreferenceCountAggregateOutputType | null
    _avg: UserQuestionPreferenceAvgAggregateOutputType | null
    _sum: UserQuestionPreferenceSumAggregateOutputType | null
    _min: UserQuestionPreferenceMinAggregateOutputType | null
    _max: UserQuestionPreferenceMaxAggregateOutputType | null
  }

  type GetUserQuestionPreferenceGroupByPayload<T extends UserQuestionPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserQuestionPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserQuestionPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserQuestionPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], UserQuestionPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type UserQuestionPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    categoryId?: boolean
    enabled?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userQuestionPreference"]>

  export type UserQuestionPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    categoryId?: boolean
    enabled?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userQuestionPreference"]>

  export type UserQuestionPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    categoryId?: boolean
    enabled?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userQuestionPreference"]>

  export type UserQuestionPreferenceSelectScalar = {
    userId?: boolean
    categoryId?: boolean
    enabled?: boolean
    updatedAt?: boolean
  }

  export type UserQuestionPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "categoryId" | "enabled" | "updatedAt", ExtArgs["result"]["userQuestionPreference"]>
  export type UserQuestionPreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type UserQuestionPreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type UserQuestionPreferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $UserQuestionPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserQuestionPreference"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      categoryId: number
      enabled: boolean
      updatedAt: Date
    }, ExtArgs["result"]["userQuestionPreference"]>
    composites: {}
  }

  type UserQuestionPreferenceGetPayload<S extends boolean | null | undefined | UserQuestionPreferenceDefaultArgs> = $Result.GetResult<Prisma.$UserQuestionPreferencePayload, S>

  type UserQuestionPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserQuestionPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserQuestionPreferenceCountAggregateInputType | true
    }

  export interface UserQuestionPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserQuestionPreference'], meta: { name: 'UserQuestionPreference' } }
    /**
     * Find zero or one UserQuestionPreference that matches the filter.
     * @param {UserQuestionPreferenceFindUniqueArgs} args - Arguments to find a UserQuestionPreference
     * @example
     * // Get one UserQuestionPreference
     * const userQuestionPreference = await prisma.userQuestionPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserQuestionPreferenceFindUniqueArgs>(args: SelectSubset<T, UserQuestionPreferenceFindUniqueArgs<ExtArgs>>): Prisma__UserQuestionPreferenceClient<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserQuestionPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserQuestionPreferenceFindUniqueOrThrowArgs} args - Arguments to find a UserQuestionPreference
     * @example
     * // Get one UserQuestionPreference
     * const userQuestionPreference = await prisma.userQuestionPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserQuestionPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserQuestionPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserQuestionPreferenceClient<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserQuestionPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionPreferenceFindFirstArgs} args - Arguments to find a UserQuestionPreference
     * @example
     * // Get one UserQuestionPreference
     * const userQuestionPreference = await prisma.userQuestionPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserQuestionPreferenceFindFirstArgs>(args?: SelectSubset<T, UserQuestionPreferenceFindFirstArgs<ExtArgs>>): Prisma__UserQuestionPreferenceClient<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserQuestionPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionPreferenceFindFirstOrThrowArgs} args - Arguments to find a UserQuestionPreference
     * @example
     * // Get one UserQuestionPreference
     * const userQuestionPreference = await prisma.userQuestionPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserQuestionPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserQuestionPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserQuestionPreferenceClient<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserQuestionPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserQuestionPreferences
     * const userQuestionPreferences = await prisma.userQuestionPreference.findMany()
     * 
     * // Get first 10 UserQuestionPreferences
     * const userQuestionPreferences = await prisma.userQuestionPreference.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userQuestionPreferenceWithUserIdOnly = await prisma.userQuestionPreference.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserQuestionPreferenceFindManyArgs>(args?: SelectSubset<T, UserQuestionPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserQuestionPreference.
     * @param {UserQuestionPreferenceCreateArgs} args - Arguments to create a UserQuestionPreference.
     * @example
     * // Create one UserQuestionPreference
     * const UserQuestionPreference = await prisma.userQuestionPreference.create({
     *   data: {
     *     // ... data to create a UserQuestionPreference
     *   }
     * })
     * 
     */
    create<T extends UserQuestionPreferenceCreateArgs>(args: SelectSubset<T, UserQuestionPreferenceCreateArgs<ExtArgs>>): Prisma__UserQuestionPreferenceClient<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserQuestionPreferences.
     * @param {UserQuestionPreferenceCreateManyArgs} args - Arguments to create many UserQuestionPreferences.
     * @example
     * // Create many UserQuestionPreferences
     * const userQuestionPreference = await prisma.userQuestionPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserQuestionPreferenceCreateManyArgs>(args?: SelectSubset<T, UserQuestionPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserQuestionPreferences and returns the data saved in the database.
     * @param {UserQuestionPreferenceCreateManyAndReturnArgs} args - Arguments to create many UserQuestionPreferences.
     * @example
     * // Create many UserQuestionPreferences
     * const userQuestionPreference = await prisma.userQuestionPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserQuestionPreferences and only return the `userId`
     * const userQuestionPreferenceWithUserIdOnly = await prisma.userQuestionPreference.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserQuestionPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, UserQuestionPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserQuestionPreference.
     * @param {UserQuestionPreferenceDeleteArgs} args - Arguments to delete one UserQuestionPreference.
     * @example
     * // Delete one UserQuestionPreference
     * const UserQuestionPreference = await prisma.userQuestionPreference.delete({
     *   where: {
     *     // ... filter to delete one UserQuestionPreference
     *   }
     * })
     * 
     */
    delete<T extends UserQuestionPreferenceDeleteArgs>(args: SelectSubset<T, UserQuestionPreferenceDeleteArgs<ExtArgs>>): Prisma__UserQuestionPreferenceClient<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserQuestionPreference.
     * @param {UserQuestionPreferenceUpdateArgs} args - Arguments to update one UserQuestionPreference.
     * @example
     * // Update one UserQuestionPreference
     * const userQuestionPreference = await prisma.userQuestionPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserQuestionPreferenceUpdateArgs>(args: SelectSubset<T, UserQuestionPreferenceUpdateArgs<ExtArgs>>): Prisma__UserQuestionPreferenceClient<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserQuestionPreferences.
     * @param {UserQuestionPreferenceDeleteManyArgs} args - Arguments to filter UserQuestionPreferences to delete.
     * @example
     * // Delete a few UserQuestionPreferences
     * const { count } = await prisma.userQuestionPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserQuestionPreferenceDeleteManyArgs>(args?: SelectSubset<T, UserQuestionPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserQuestionPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserQuestionPreferences
     * const userQuestionPreference = await prisma.userQuestionPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserQuestionPreferenceUpdateManyArgs>(args: SelectSubset<T, UserQuestionPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserQuestionPreferences and returns the data updated in the database.
     * @param {UserQuestionPreferenceUpdateManyAndReturnArgs} args - Arguments to update many UserQuestionPreferences.
     * @example
     * // Update many UserQuestionPreferences
     * const userQuestionPreference = await prisma.userQuestionPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserQuestionPreferences and only return the `userId`
     * const userQuestionPreferenceWithUserIdOnly = await prisma.userQuestionPreference.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserQuestionPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, UserQuestionPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserQuestionPreference.
     * @param {UserQuestionPreferenceUpsertArgs} args - Arguments to update or create a UserQuestionPreference.
     * @example
     * // Update or create a UserQuestionPreference
     * const userQuestionPreference = await prisma.userQuestionPreference.upsert({
     *   create: {
     *     // ... data to create a UserQuestionPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserQuestionPreference we want to update
     *   }
     * })
     */
    upsert<T extends UserQuestionPreferenceUpsertArgs>(args: SelectSubset<T, UserQuestionPreferenceUpsertArgs<ExtArgs>>): Prisma__UserQuestionPreferenceClient<$Result.GetResult<Prisma.$UserQuestionPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserQuestionPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionPreferenceCountArgs} args - Arguments to filter UserQuestionPreferences to count.
     * @example
     * // Count the number of UserQuestionPreferences
     * const count = await prisma.userQuestionPreference.count({
     *   where: {
     *     // ... the filter for the UserQuestionPreferences we want to count
     *   }
     * })
    **/
    count<T extends UserQuestionPreferenceCountArgs>(
      args?: Subset<T, UserQuestionPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserQuestionPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserQuestionPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserQuestionPreferenceAggregateArgs>(args: Subset<T, UserQuestionPreferenceAggregateArgs>): Prisma.PrismaPromise<GetUserQuestionPreferenceAggregateType<T>>

    /**
     * Group by UserQuestionPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionPreferenceGroupByArgs} args - Group by arguments.
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
      T extends UserQuestionPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserQuestionPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: UserQuestionPreferenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserQuestionPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserQuestionPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserQuestionPreference model
   */
  readonly fields: UserQuestionPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserQuestionPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserQuestionPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserQuestionPreference model
   */
  interface UserQuestionPreferenceFieldRefs {
    readonly userId: FieldRef<"UserQuestionPreference", 'String'>
    readonly categoryId: FieldRef<"UserQuestionPreference", 'Int'>
    readonly enabled: FieldRef<"UserQuestionPreference", 'Boolean'>
    readonly updatedAt: FieldRef<"UserQuestionPreference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserQuestionPreference findUnique
   */
  export type UserQuestionPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestionPreference to fetch.
     */
    where: UserQuestionPreferenceWhereUniqueInput
  }

  /**
   * UserQuestionPreference findUniqueOrThrow
   */
  export type UserQuestionPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestionPreference to fetch.
     */
    where: UserQuestionPreferenceWhereUniqueInput
  }

  /**
   * UserQuestionPreference findFirst
   */
  export type UserQuestionPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestionPreference to fetch.
     */
    where?: UserQuestionPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuestionPreferences to fetch.
     */
    orderBy?: UserQuestionPreferenceOrderByWithRelationInput | UserQuestionPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserQuestionPreferences.
     */
    cursor?: UserQuestionPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuestionPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuestionPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserQuestionPreferences.
     */
    distinct?: UserQuestionPreferenceScalarFieldEnum | UserQuestionPreferenceScalarFieldEnum[]
  }

  /**
   * UserQuestionPreference findFirstOrThrow
   */
  export type UserQuestionPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestionPreference to fetch.
     */
    where?: UserQuestionPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuestionPreferences to fetch.
     */
    orderBy?: UserQuestionPreferenceOrderByWithRelationInput | UserQuestionPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserQuestionPreferences.
     */
    cursor?: UserQuestionPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuestionPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuestionPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserQuestionPreferences.
     */
    distinct?: UserQuestionPreferenceScalarFieldEnum | UserQuestionPreferenceScalarFieldEnum[]
  }

  /**
   * UserQuestionPreference findMany
   */
  export type UserQuestionPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestionPreferences to fetch.
     */
    where?: UserQuestionPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuestionPreferences to fetch.
     */
    orderBy?: UserQuestionPreferenceOrderByWithRelationInput | UserQuestionPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserQuestionPreferences.
     */
    cursor?: UserQuestionPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuestionPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuestionPreferences.
     */
    skip?: number
    distinct?: UserQuestionPreferenceScalarFieldEnum | UserQuestionPreferenceScalarFieldEnum[]
  }

  /**
   * UserQuestionPreference create
   */
  export type UserQuestionPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a UserQuestionPreference.
     */
    data: XOR<UserQuestionPreferenceCreateInput, UserQuestionPreferenceUncheckedCreateInput>
  }

  /**
   * UserQuestionPreference createMany
   */
  export type UserQuestionPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserQuestionPreferences.
     */
    data: UserQuestionPreferenceCreateManyInput | UserQuestionPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserQuestionPreference createManyAndReturn
   */
  export type UserQuestionPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many UserQuestionPreferences.
     */
    data: UserQuestionPreferenceCreateManyInput | UserQuestionPreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserQuestionPreference update
   */
  export type UserQuestionPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a UserQuestionPreference.
     */
    data: XOR<UserQuestionPreferenceUpdateInput, UserQuestionPreferenceUncheckedUpdateInput>
    /**
     * Choose, which UserQuestionPreference to update.
     */
    where: UserQuestionPreferenceWhereUniqueInput
  }

  /**
   * UserQuestionPreference updateMany
   */
  export type UserQuestionPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserQuestionPreferences.
     */
    data: XOR<UserQuestionPreferenceUpdateManyMutationInput, UserQuestionPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserQuestionPreferences to update
     */
    where?: UserQuestionPreferenceWhereInput
    /**
     * Limit how many UserQuestionPreferences to update.
     */
    limit?: number
  }

  /**
   * UserQuestionPreference updateManyAndReturn
   */
  export type UserQuestionPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update UserQuestionPreferences.
     */
    data: XOR<UserQuestionPreferenceUpdateManyMutationInput, UserQuestionPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserQuestionPreferences to update
     */
    where?: UserQuestionPreferenceWhereInput
    /**
     * Limit how many UserQuestionPreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserQuestionPreference upsert
   */
  export type UserQuestionPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the UserQuestionPreference to update in case it exists.
     */
    where: UserQuestionPreferenceWhereUniqueInput
    /**
     * In case the UserQuestionPreference found by the `where` argument doesn't exist, create a new UserQuestionPreference with this data.
     */
    create: XOR<UserQuestionPreferenceCreateInput, UserQuestionPreferenceUncheckedCreateInput>
    /**
     * In case the UserQuestionPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserQuestionPreferenceUpdateInput, UserQuestionPreferenceUncheckedUpdateInput>
  }

  /**
   * UserQuestionPreference delete
   */
  export type UserQuestionPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
    /**
     * Filter which UserQuestionPreference to delete.
     */
    where: UserQuestionPreferenceWhereUniqueInput
  }

  /**
   * UserQuestionPreference deleteMany
   */
  export type UserQuestionPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserQuestionPreferences to delete
     */
    where?: UserQuestionPreferenceWhereInput
    /**
     * Limit how many UserQuestionPreferences to delete.
     */
    limit?: number
  }

  /**
   * UserQuestionPreference without action
   */
  export type UserQuestionPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestionPreference
     */
    select?: UserQuestionPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestionPreference
     */
    omit?: UserQuestionPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionPreferenceInclude<ExtArgs> | null
  }


  /**
   * Model UserAnswer
   */

  export type AggregateUserAnswer = {
    _count: UserAnswerCountAggregateOutputType | null
    _min: UserAnswerMinAggregateOutputType | null
    _max: UserAnswerMaxAggregateOutputType | null
  }

  export type UserAnswerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    questionGroupId: string | null
    questionOptionId: string | null
    conversationId: string | null
    answeredAt: Date | null
    updatedAt: Date | null
    note: string | null
    isFlagged: boolean | null
  }

  export type UserAnswerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    questionGroupId: string | null
    questionOptionId: string | null
    conversationId: string | null
    answeredAt: Date | null
    updatedAt: Date | null
    note: string | null
    isFlagged: boolean | null
  }

  export type UserAnswerCountAggregateOutputType = {
    id: number
    userId: number
    questionGroupId: number
    questionOptionId: number
    conversationId: number
    answeredAt: number
    updatedAt: number
    note: number
    isFlagged: number
    _all: number
  }


  export type UserAnswerMinAggregateInputType = {
    id?: true
    userId?: true
    questionGroupId?: true
    questionOptionId?: true
    conversationId?: true
    answeredAt?: true
    updatedAt?: true
    note?: true
    isFlagged?: true
  }

  export type UserAnswerMaxAggregateInputType = {
    id?: true
    userId?: true
    questionGroupId?: true
    questionOptionId?: true
    conversationId?: true
    answeredAt?: true
    updatedAt?: true
    note?: true
    isFlagged?: true
  }

  export type UserAnswerCountAggregateInputType = {
    id?: true
    userId?: true
    questionGroupId?: true
    questionOptionId?: true
    conversationId?: true
    answeredAt?: true
    updatedAt?: true
    note?: true
    isFlagged?: true
    _all?: true
  }

  export type UserAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAnswer to aggregate.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAnswers
    **/
    _count?: true | UserAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAnswerMaxAggregateInputType
  }

  export type GetUserAnswerAggregateType<T extends UserAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAnswer[P]>
      : GetScalarType<T[P], AggregateUserAnswer[P]>
  }




  export type UserAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithAggregationInput | UserAnswerOrderByWithAggregationInput[]
    by: UserAnswerScalarFieldEnum[] | UserAnswerScalarFieldEnum
    having?: UserAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAnswerCountAggregateInputType | true
    _min?: UserAnswerMinAggregateInputType
    _max?: UserAnswerMaxAggregateInputType
  }

  export type UserAnswerGroupByOutputType = {
    id: string
    userId: string
    questionGroupId: string
    questionOptionId: string
    conversationId: string | null
    answeredAt: Date
    updatedAt: Date
    note: string | null
    isFlagged: boolean
    _count: UserAnswerCountAggregateOutputType | null
    _min: UserAnswerMinAggregateOutputType | null
    _max: UserAnswerMaxAggregateOutputType | null
  }

  type GetUserAnswerGroupByPayload<T extends UserAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], UserAnswerGroupByOutputType[P]>
        }
      >
    >


  export type UserAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    questionGroupId?: boolean
    questionOptionId?: boolean
    conversationId?: boolean
    answeredAt?: boolean
    updatedAt?: boolean
    note?: boolean
    isFlagged?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    questionOption?: boolean | QuestionOptionDefaultArgs<ExtArgs>
    conversation?: boolean | UserAnswer$conversationArgs<ExtArgs>
  }, ExtArgs["result"]["userAnswer"]>

  export type UserAnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    questionGroupId?: boolean
    questionOptionId?: boolean
    conversationId?: boolean
    answeredAt?: boolean
    updatedAt?: boolean
    note?: boolean
    isFlagged?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    questionOption?: boolean | QuestionOptionDefaultArgs<ExtArgs>
    conversation?: boolean | UserAnswer$conversationArgs<ExtArgs>
  }, ExtArgs["result"]["userAnswer"]>

  export type UserAnswerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    questionGroupId?: boolean
    questionOptionId?: boolean
    conversationId?: boolean
    answeredAt?: boolean
    updatedAt?: boolean
    note?: boolean
    isFlagged?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    questionOption?: boolean | QuestionOptionDefaultArgs<ExtArgs>
    conversation?: boolean | UserAnswer$conversationArgs<ExtArgs>
  }, ExtArgs["result"]["userAnswer"]>

  export type UserAnswerSelectScalar = {
    id?: boolean
    userId?: boolean
    questionGroupId?: boolean
    questionOptionId?: boolean
    conversationId?: boolean
    answeredAt?: boolean
    updatedAt?: boolean
    note?: boolean
    isFlagged?: boolean
  }

  export type UserAnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "questionGroupId" | "questionOptionId" | "conversationId" | "answeredAt" | "updatedAt" | "note" | "isFlagged", ExtArgs["result"]["userAnswer"]>
  export type UserAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    questionOption?: boolean | QuestionOptionDefaultArgs<ExtArgs>
    conversation?: boolean | UserAnswer$conversationArgs<ExtArgs>
  }
  export type UserAnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    questionOption?: boolean | QuestionOptionDefaultArgs<ExtArgs>
    conversation?: boolean | UserAnswer$conversationArgs<ExtArgs>
  }
  export type UserAnswerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    questionGroup?: boolean | QuestionGroupDefaultArgs<ExtArgs>
    questionOption?: boolean | QuestionOptionDefaultArgs<ExtArgs>
    conversation?: boolean | UserAnswer$conversationArgs<ExtArgs>
  }

  export type $UserAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAnswer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      questionGroup: Prisma.$QuestionGroupPayload<ExtArgs>
      questionOption: Prisma.$QuestionOptionPayload<ExtArgs>
      conversation: Prisma.$ConversationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      questionGroupId: string
      questionOptionId: string
      conversationId: string | null
      answeredAt: Date
      updatedAt: Date
      note: string | null
      isFlagged: boolean
    }, ExtArgs["result"]["userAnswer"]>
    composites: {}
  }

  type UserAnswerGetPayload<S extends boolean | null | undefined | UserAnswerDefaultArgs> = $Result.GetResult<Prisma.$UserAnswerPayload, S>

  type UserAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAnswerCountAggregateInputType | true
    }

  export interface UserAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAnswer'], meta: { name: 'UserAnswer' } }
    /**
     * Find zero or one UserAnswer that matches the filter.
     * @param {UserAnswerFindUniqueArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAnswerFindUniqueArgs>(args: SelectSubset<T, UserAnswerFindUniqueArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAnswer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAnswerFindUniqueOrThrowArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerFindFirstArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAnswerFindFirstArgs>(args?: SelectSubset<T, UserAnswerFindFirstArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerFindFirstOrThrowArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAnswers
     * const userAnswers = await prisma.userAnswer.findMany()
     * 
     * // Get first 10 UserAnswers
     * const userAnswers = await prisma.userAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAnswerWithIdOnly = await prisma.userAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAnswerFindManyArgs>(args?: SelectSubset<T, UserAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAnswer.
     * @param {UserAnswerCreateArgs} args - Arguments to create a UserAnswer.
     * @example
     * // Create one UserAnswer
     * const UserAnswer = await prisma.userAnswer.create({
     *   data: {
     *     // ... data to create a UserAnswer
     *   }
     * })
     * 
     */
    create<T extends UserAnswerCreateArgs>(args: SelectSubset<T, UserAnswerCreateArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserAnswers.
     * @param {UserAnswerCreateManyArgs} args - Arguments to create many UserAnswers.
     * @example
     * // Create many UserAnswers
     * const userAnswer = await prisma.userAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAnswerCreateManyArgs>(args?: SelectSubset<T, UserAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAnswers and returns the data saved in the database.
     * @param {UserAnswerCreateManyAndReturnArgs} args - Arguments to create many UserAnswers.
     * @example
     * // Create many UserAnswers
     * const userAnswer = await prisma.userAnswer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAnswers and only return the `id`
     * const userAnswerWithIdOnly = await prisma.userAnswer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserAnswer.
     * @param {UserAnswerDeleteArgs} args - Arguments to delete one UserAnswer.
     * @example
     * // Delete one UserAnswer
     * const UserAnswer = await prisma.userAnswer.delete({
     *   where: {
     *     // ... filter to delete one UserAnswer
     *   }
     * })
     * 
     */
    delete<T extends UserAnswerDeleteArgs>(args: SelectSubset<T, UserAnswerDeleteArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAnswer.
     * @param {UserAnswerUpdateArgs} args - Arguments to update one UserAnswer.
     * @example
     * // Update one UserAnswer
     * const userAnswer = await prisma.userAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAnswerUpdateArgs>(args: SelectSubset<T, UserAnswerUpdateArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserAnswers.
     * @param {UserAnswerDeleteManyArgs} args - Arguments to filter UserAnswers to delete.
     * @example
     * // Delete a few UserAnswers
     * const { count } = await prisma.userAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAnswerDeleteManyArgs>(args?: SelectSubset<T, UserAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAnswers
     * const userAnswer = await prisma.userAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAnswerUpdateManyArgs>(args: SelectSubset<T, UserAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAnswers and returns the data updated in the database.
     * @param {UserAnswerUpdateManyAndReturnArgs} args - Arguments to update many UserAnswers.
     * @example
     * // Update many UserAnswers
     * const userAnswer = await prisma.userAnswer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserAnswers and only return the `id`
     * const userAnswerWithIdOnly = await prisma.userAnswer.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserAnswerUpdateManyAndReturnArgs>(args: SelectSubset<T, UserAnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserAnswer.
     * @param {UserAnswerUpsertArgs} args - Arguments to update or create a UserAnswer.
     * @example
     * // Update or create a UserAnswer
     * const userAnswer = await prisma.userAnswer.upsert({
     *   create: {
     *     // ... data to create a UserAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAnswer we want to update
     *   }
     * })
     */
    upsert<T extends UserAnswerUpsertArgs>(args: SelectSubset<T, UserAnswerUpsertArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerCountArgs} args - Arguments to filter UserAnswers to count.
     * @example
     * // Count the number of UserAnswers
     * const count = await prisma.userAnswer.count({
     *   where: {
     *     // ... the filter for the UserAnswers we want to count
     *   }
     * })
    **/
    count<T extends UserAnswerCountArgs>(
      args?: Subset<T, UserAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAnswerAggregateArgs>(args: Subset<T, UserAnswerAggregateArgs>): Prisma.PrismaPromise<GetUserAnswerAggregateType<T>>

    /**
     * Group by UserAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerGroupByArgs} args - Group by arguments.
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
      T extends UserAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAnswerGroupByArgs['orderBy'] }
        : { orderBy?: UserAnswerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAnswer model
   */
  readonly fields: UserAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questionGroup<T extends QuestionGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionGroupDefaultArgs<ExtArgs>>): Prisma__QuestionGroupClient<$Result.GetResult<Prisma.$QuestionGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questionOption<T extends QuestionOptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionOptionDefaultArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conversation<T extends UserAnswer$conversationArgs<ExtArgs> = {}>(args?: Subset<T, UserAnswer$conversationArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserAnswer model
   */
  interface UserAnswerFieldRefs {
    readonly id: FieldRef<"UserAnswer", 'String'>
    readonly userId: FieldRef<"UserAnswer", 'String'>
    readonly questionGroupId: FieldRef<"UserAnswer", 'String'>
    readonly questionOptionId: FieldRef<"UserAnswer", 'String'>
    readonly conversationId: FieldRef<"UserAnswer", 'String'>
    readonly answeredAt: FieldRef<"UserAnswer", 'DateTime'>
    readonly updatedAt: FieldRef<"UserAnswer", 'DateTime'>
    readonly note: FieldRef<"UserAnswer", 'String'>
    readonly isFlagged: FieldRef<"UserAnswer", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * UserAnswer findUnique
   */
  export type UserAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer findUniqueOrThrow
   */
  export type UserAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer findFirst
   */
  export type UserAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAnswers.
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAnswers.
     */
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * UserAnswer findFirstOrThrow
   */
  export type UserAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAnswers.
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAnswers.
     */
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * UserAnswer findMany
   */
  export type UserAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswers to fetch.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAnswers.
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * UserAnswer create
   */
  export type UserAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAnswer.
     */
    data: XOR<UserAnswerCreateInput, UserAnswerUncheckedCreateInput>
  }

  /**
   * UserAnswer createMany
   */
  export type UserAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAnswers.
     */
    data: UserAnswerCreateManyInput | UserAnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAnswer createManyAndReturn
   */
  export type UserAnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * The data used to create many UserAnswers.
     */
    data: UserAnswerCreateManyInput | UserAnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAnswer update
   */
  export type UserAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAnswer.
     */
    data: XOR<UserAnswerUpdateInput, UserAnswerUncheckedUpdateInput>
    /**
     * Choose, which UserAnswer to update.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer updateMany
   */
  export type UserAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAnswers.
     */
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyInput>
    /**
     * Filter which UserAnswers to update
     */
    where?: UserAnswerWhereInput
    /**
     * Limit how many UserAnswers to update.
     */
    limit?: number
  }

  /**
   * UserAnswer updateManyAndReturn
   */
  export type UserAnswerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * The data used to update UserAnswers.
     */
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyInput>
    /**
     * Filter which UserAnswers to update
     */
    where?: UserAnswerWhereInput
    /**
     * Limit how many UserAnswers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAnswer upsert
   */
  export type UserAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAnswer to update in case it exists.
     */
    where: UserAnswerWhereUniqueInput
    /**
     * In case the UserAnswer found by the `where` argument doesn't exist, create a new UserAnswer with this data.
     */
    create: XOR<UserAnswerCreateInput, UserAnswerUncheckedCreateInput>
    /**
     * In case the UserAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAnswerUpdateInput, UserAnswerUncheckedUpdateInput>
  }

  /**
   * UserAnswer delete
   */
  export type UserAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter which UserAnswer to delete.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer deleteMany
   */
  export type UserAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAnswers to delete
     */
    where?: UserAnswerWhereInput
    /**
     * Limit how many UserAnswers to delete.
     */
    limit?: number
  }

  /**
   * UserAnswer.conversation
   */
  export type UserAnswer$conversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
  }

  /**
   * UserAnswer without action
   */
  export type UserAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
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


  export const AuthScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type AuthScalarFieldEnum = (typeof AuthScalarFieldEnum)[keyof typeof AuthScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    avatar: 'avatar',
    bio: 'bio',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userNumber: 'userNumber',
    username: 'username',
    isOnline: 'isOnline',
    isAvailableForChat: 'isAvailableForChat'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserContactScalarFieldEnum: {
    userId: 'userId',
    contactId: 'contactId',
    createdAt: 'createdAt'
  };

  export type UserContactScalarFieldEnum = (typeof UserContactScalarFieldEnum)[keyof typeof UserContactScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const ConversationParticipantScalarFieldEnum: {
    conversationId: 'conversationId',
    userId: 'userId',
    isIcebreakerReady: 'isIcebreakerReady',
    hasGivenAnswer: 'hasGivenAnswer',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationParticipantScalarFieldEnum = (typeof ConversationParticipantScalarFieldEnum)[keyof typeof ConversationParticipantScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    content: 'content',
    createdAt: 'createdAt',
    editedAt: 'editedAt',
    isRead: 'isRead',
    isDeleted: 'isDeleted',
    conversationId: 'conversationId'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const QuestionGroupScalarFieldEnum: {
    id: 'id',
    type: 'type',
    authorId: 'authorId',
    createdAt: 'createdAt',
    isModerated: 'isModerated',
    moderatedAt: 'moderatedAt',
    pinned: 'pinned',
    enabled: 'enabled'
  };

  export type QuestionGroupScalarFieldEnum = (typeof QuestionGroupScalarFieldEnum)[keyof typeof QuestionGroupScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    groupId: 'groupId',
    locale: 'locale',
    question: 'question'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const QuestionOptionScalarFieldEnum: {
    id: 'id',
    groupId: 'groupId',
    locale: 'locale',
    label: 'label',
    order: 'order'
  };

  export type QuestionOptionScalarFieldEnum = (typeof QuestionOptionScalarFieldEnum)[keyof typeof QuestionOptionScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const CategoryTranslationScalarFieldEnum: {
    categoryId: 'categoryId',
    locale: 'locale',
    label: 'label'
  };

  export type CategoryTranslationScalarFieldEnum = (typeof CategoryTranslationScalarFieldEnum)[keyof typeof CategoryTranslationScalarFieldEnum]


  export const QuestionGroupCategoryScalarFieldEnum: {
    questionGroupId: 'questionGroupId',
    categoryId: 'categoryId'
  };

  export type QuestionGroupCategoryScalarFieldEnum = (typeof QuestionGroupCategoryScalarFieldEnum)[keyof typeof QuestionGroupCategoryScalarFieldEnum]


  export const UserQuestionPreferenceScalarFieldEnum: {
    userId: 'userId',
    categoryId: 'categoryId',
    enabled: 'enabled',
    updatedAt: 'updatedAt'
  };

  export type UserQuestionPreferenceScalarFieldEnum = (typeof UserQuestionPreferenceScalarFieldEnum)[keyof typeof UserQuestionPreferenceScalarFieldEnum]


  export const UserAnswerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    questionGroupId: 'questionGroupId',
    questionOptionId: 'questionOptionId',
    conversationId: 'conversationId',
    answeredAt: 'answeredAt',
    updatedAt: 'updatedAt',
    note: 'note',
    isFlagged: 'isFlagged'
  };

  export type UserAnswerScalarFieldEnum = (typeof UserAnswerScalarFieldEnum)[keyof typeof UserAnswerScalarFieldEnum]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type AuthWhereInput = {
    AND?: AuthWhereInput | AuthWhereInput[]
    OR?: AuthWhereInput[]
    NOT?: AuthWhereInput | AuthWhereInput[]
    id?: StringFilter<"Auth"> | string
    email?: StringFilter<"Auth"> | string
    password?: StringFilter<"Auth"> | string
    accessToken?: StringNullableFilter<"Auth"> | string | null
    refreshToken?: StringNullableFilter<"Auth"> | string | null
    createdAt?: DateTimeFilter<"Auth"> | Date | string
    updatedAt?: DateTimeFilter<"Auth"> | Date | string
    userId?: StringFilter<"Auth"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuthOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    userId?: string
    AND?: AuthWhereInput | AuthWhereInput[]
    OR?: AuthWhereInput[]
    NOT?: AuthWhereInput | AuthWhereInput[]
    password?: StringFilter<"Auth"> | string
    accessToken?: StringNullableFilter<"Auth"> | string | null
    refreshToken?: StringNullableFilter<"Auth"> | string | null
    createdAt?: DateTimeFilter<"Auth"> | Date | string
    updatedAt?: DateTimeFilter<"Auth"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "email" | "userId">

  export type AuthOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: AuthCountOrderByAggregateInput
    _max?: AuthMaxOrderByAggregateInput
    _min?: AuthMinOrderByAggregateInput
  }

  export type AuthScalarWhereWithAggregatesInput = {
    AND?: AuthScalarWhereWithAggregatesInput | AuthScalarWhereWithAggregatesInput[]
    OR?: AuthScalarWhereWithAggregatesInput[]
    NOT?: AuthScalarWhereWithAggregatesInput | AuthScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Auth"> | string
    email?: StringWithAggregatesFilter<"Auth"> | string
    password?: StringWithAggregatesFilter<"Auth"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Auth"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Auth"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Auth"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Auth"> | Date | string
    userId?: StringWithAggregatesFilter<"Auth"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    userNumber?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    isOnline?: BoolFilter<"User"> | boolean
    isAvailableForChat?: BoolFilter<"User"> | boolean
    auth?: XOR<AuthNullableScalarRelationFilter, AuthWhereInput> | null
    questionGroups?: QuestionGroupListRelationFilter
    sentMessages?: MessageListRelationFilter
    conversations?: ConversationParticipantListRelationFilter
    contacts?: UserContactListRelationFilter
    contactOf?: UserContactListRelationFilter
    questionPreferences?: UserQuestionPreferenceListRelationFilter
    answers?: UserAnswerListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userNumber?: SortOrder
    username?: SortOrder
    isOnline?: SortOrder
    isAvailableForChat?: SortOrder
    auth?: AuthOrderByWithRelationInput
    questionGroups?: QuestionGroupOrderByRelationAggregateInput
    sentMessages?: MessageOrderByRelationAggregateInput
    conversations?: ConversationParticipantOrderByRelationAggregateInput
    contacts?: UserContactOrderByRelationAggregateInput
    contactOf?: UserContactOrderByRelationAggregateInput
    questionPreferences?: UserQuestionPreferenceOrderByRelationAggregateInput
    answers?: UserAnswerOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userNumber?: number
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isOnline?: BoolFilter<"User"> | boolean
    isAvailableForChat?: BoolFilter<"User"> | boolean
    auth?: XOR<AuthNullableScalarRelationFilter, AuthWhereInput> | null
    questionGroups?: QuestionGroupListRelationFilter
    sentMessages?: MessageListRelationFilter
    conversations?: ConversationParticipantListRelationFilter
    contacts?: UserContactListRelationFilter
    contactOf?: UserContactListRelationFilter
    questionPreferences?: UserQuestionPreferenceListRelationFilter
    answers?: UserAnswerListRelationFilter
  }, "id" | "userNumber" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userNumber?: SortOrder
    username?: SortOrder
    isOnline?: SortOrder
    isAvailableForChat?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    userNumber?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    isOnline?: BoolWithAggregatesFilter<"User"> | boolean
    isAvailableForChat?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type UserContactWhereInput = {
    AND?: UserContactWhereInput | UserContactWhereInput[]
    OR?: UserContactWhereInput[]
    NOT?: UserContactWhereInput | UserContactWhereInput[]
    userId?: StringFilter<"UserContact"> | string
    contactId?: StringFilter<"UserContact"> | string
    createdAt?: DateTimeFilter<"UserContact"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    contact?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserContactOrderByWithRelationInput = {
    userId?: SortOrder
    contactId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    contact?: UserOrderByWithRelationInput
  }

  export type UserContactWhereUniqueInput = Prisma.AtLeast<{
    userId_contactId?: UserContactUserIdContactIdCompoundUniqueInput
    AND?: UserContactWhereInput | UserContactWhereInput[]
    OR?: UserContactWhereInput[]
    NOT?: UserContactWhereInput | UserContactWhereInput[]
    userId?: StringFilter<"UserContact"> | string
    contactId?: StringFilter<"UserContact"> | string
    createdAt?: DateTimeFilter<"UserContact"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    contact?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userId_contactId">

  export type UserContactOrderByWithAggregationInput = {
    userId?: SortOrder
    contactId?: SortOrder
    createdAt?: SortOrder
    _count?: UserContactCountOrderByAggregateInput
    _max?: UserContactMaxOrderByAggregateInput
    _min?: UserContactMinOrderByAggregateInput
  }

  export type UserContactScalarWhereWithAggregatesInput = {
    AND?: UserContactScalarWhereWithAggregatesInput | UserContactScalarWhereWithAggregatesInput[]
    OR?: UserContactScalarWhereWithAggregatesInput[]
    NOT?: UserContactScalarWhereWithAggregatesInput | UserContactScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserContact"> | string
    contactId?: StringWithAggregatesFilter<"UserContact"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserContact"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messages?: MessageListRelationFilter
    participants?: ConversationParticipantListRelationFilter
    UserAnswer?: UserAnswerListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: MessageOrderByRelationAggregateInput
    participants?: ConversationParticipantOrderByRelationAggregateInput
    UserAnswer?: UserAnswerOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messages?: MessageListRelationFilter
    participants?: ConversationParticipantListRelationFilter
    UserAnswer?: UserAnswerListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type ConversationParticipantWhereInput = {
    AND?: ConversationParticipantWhereInput | ConversationParticipantWhereInput[]
    OR?: ConversationParticipantWhereInput[]
    NOT?: ConversationParticipantWhereInput | ConversationParticipantWhereInput[]
    conversationId?: StringFilter<"ConversationParticipant"> | string
    userId?: StringFilter<"ConversationParticipant"> | string
    isIcebreakerReady?: BoolFilter<"ConversationParticipant"> | boolean
    hasGivenAnswer?: BoolFilter<"ConversationParticipant"> | boolean
    createdAt?: DateTimeFilter<"ConversationParticipant"> | Date | string
    updatedAt?: DateTimeFilter<"ConversationParticipant"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ConversationParticipantOrderByWithRelationInput = {
    conversationId?: SortOrder
    userId?: SortOrder
    isIcebreakerReady?: SortOrder
    hasGivenAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ConversationParticipantWhereUniqueInput = Prisma.AtLeast<{
    conversationId_userId?: ConversationParticipantConversationIdUserIdCompoundUniqueInput
    AND?: ConversationParticipantWhereInput | ConversationParticipantWhereInput[]
    OR?: ConversationParticipantWhereInput[]
    NOT?: ConversationParticipantWhereInput | ConversationParticipantWhereInput[]
    conversationId?: StringFilter<"ConversationParticipant"> | string
    userId?: StringFilter<"ConversationParticipant"> | string
    isIcebreakerReady?: BoolFilter<"ConversationParticipant"> | boolean
    hasGivenAnswer?: BoolFilter<"ConversationParticipant"> | boolean
    createdAt?: DateTimeFilter<"ConversationParticipant"> | Date | string
    updatedAt?: DateTimeFilter<"ConversationParticipant"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "conversationId_userId" | "conversationId_userId">

  export type ConversationParticipantOrderByWithAggregationInput = {
    conversationId?: SortOrder
    userId?: SortOrder
    isIcebreakerReady?: SortOrder
    hasGivenAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationParticipantCountOrderByAggregateInput
    _max?: ConversationParticipantMaxOrderByAggregateInput
    _min?: ConversationParticipantMinOrderByAggregateInput
  }

  export type ConversationParticipantScalarWhereWithAggregatesInput = {
    AND?: ConversationParticipantScalarWhereWithAggregatesInput | ConversationParticipantScalarWhereWithAggregatesInput[]
    OR?: ConversationParticipantScalarWhereWithAggregatesInput[]
    NOT?: ConversationParticipantScalarWhereWithAggregatesInput | ConversationParticipantScalarWhereWithAggregatesInput[]
    conversationId?: StringWithAggregatesFilter<"ConversationParticipant"> | string
    userId?: StringWithAggregatesFilter<"ConversationParticipant"> | string
    isIcebreakerReady?: BoolWithAggregatesFilter<"ConversationParticipant"> | boolean
    hasGivenAnswer?: BoolWithAggregatesFilter<"ConversationParticipant"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ConversationParticipant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ConversationParticipant"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    isRead?: BoolFilter<"Message"> | boolean
    isDeleted?: BoolFilter<"Message"> | boolean
    conversationId?: StringFilter<"Message"> | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrderInput | SortOrder
    isRead?: SortOrder
    isDeleted?: SortOrder
    conversationId?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    isRead?: BoolFilter<"Message"> | boolean
    isDeleted?: BoolFilter<"Message"> | boolean
    conversationId?: StringFilter<"Message"> | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrderInput | SortOrder
    isRead?: SortOrder
    isDeleted?: SortOrder
    conversationId?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    senderId?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
    isRead?: BoolWithAggregatesFilter<"Message"> | boolean
    isDeleted?: BoolWithAggregatesFilter<"Message"> | boolean
    conversationId?: StringWithAggregatesFilter<"Message"> | string
  }

  export type QuestionGroupWhereInput = {
    AND?: QuestionGroupWhereInput | QuestionGroupWhereInput[]
    OR?: QuestionGroupWhereInput[]
    NOT?: QuestionGroupWhereInput | QuestionGroupWhereInput[]
    id?: StringFilter<"QuestionGroup"> | string
    type?: IntFilter<"QuestionGroup"> | number
    authorId?: StringFilter<"QuestionGroup"> | string
    createdAt?: DateTimeFilter<"QuestionGroup"> | Date | string
    isModerated?: BoolFilter<"QuestionGroup"> | boolean
    moderatedAt?: DateTimeNullableFilter<"QuestionGroup"> | Date | string | null
    pinned?: BoolFilter<"QuestionGroup"> | boolean
    enabled?: BoolFilter<"QuestionGroup"> | boolean
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    options?: QuestionOptionListRelationFilter
    categories?: QuestionGroupCategoryListRelationFilter
    answers?: UserAnswerListRelationFilter
  }

  export type QuestionGroupOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isModerated?: SortOrder
    moderatedAt?: SortOrderInput | SortOrder
    pinned?: SortOrder
    enabled?: SortOrder
    author?: UserOrderByWithRelationInput
    questions?: QuestionOrderByRelationAggregateInput
    options?: QuestionOptionOrderByRelationAggregateInput
    categories?: QuestionGroupCategoryOrderByRelationAggregateInput
    answers?: UserAnswerOrderByRelationAggregateInput
  }

  export type QuestionGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionGroupWhereInput | QuestionGroupWhereInput[]
    OR?: QuestionGroupWhereInput[]
    NOT?: QuestionGroupWhereInput | QuestionGroupWhereInput[]
    type?: IntFilter<"QuestionGroup"> | number
    authorId?: StringFilter<"QuestionGroup"> | string
    createdAt?: DateTimeFilter<"QuestionGroup"> | Date | string
    isModerated?: BoolFilter<"QuestionGroup"> | boolean
    moderatedAt?: DateTimeNullableFilter<"QuestionGroup"> | Date | string | null
    pinned?: BoolFilter<"QuestionGroup"> | boolean
    enabled?: BoolFilter<"QuestionGroup"> | boolean
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    options?: QuestionOptionListRelationFilter
    categories?: QuestionGroupCategoryListRelationFilter
    answers?: UserAnswerListRelationFilter
  }, "id">

  export type QuestionGroupOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isModerated?: SortOrder
    moderatedAt?: SortOrderInput | SortOrder
    pinned?: SortOrder
    enabled?: SortOrder
    _count?: QuestionGroupCountOrderByAggregateInput
    _avg?: QuestionGroupAvgOrderByAggregateInput
    _max?: QuestionGroupMaxOrderByAggregateInput
    _min?: QuestionGroupMinOrderByAggregateInput
    _sum?: QuestionGroupSumOrderByAggregateInput
  }

  export type QuestionGroupScalarWhereWithAggregatesInput = {
    AND?: QuestionGroupScalarWhereWithAggregatesInput | QuestionGroupScalarWhereWithAggregatesInput[]
    OR?: QuestionGroupScalarWhereWithAggregatesInput[]
    NOT?: QuestionGroupScalarWhereWithAggregatesInput | QuestionGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuestionGroup"> | string
    type?: IntWithAggregatesFilter<"QuestionGroup"> | number
    authorId?: StringWithAggregatesFilter<"QuestionGroup"> | string
    createdAt?: DateTimeWithAggregatesFilter<"QuestionGroup"> | Date | string
    isModerated?: BoolWithAggregatesFilter<"QuestionGroup"> | boolean
    moderatedAt?: DateTimeNullableWithAggregatesFilter<"QuestionGroup"> | Date | string | null
    pinned?: BoolWithAggregatesFilter<"QuestionGroup"> | boolean
    enabled?: BoolWithAggregatesFilter<"QuestionGroup"> | boolean
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    groupId?: StringFilter<"Question"> | string
    locale?: StringFilter<"Question"> | string
    question?: StringFilter<"Question"> | string
    group?: XOR<QuestionGroupScalarRelationFilter, QuestionGroupWhereInput>
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    question?: SortOrder
    group?: QuestionGroupOrderByWithRelationInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    groupId_locale?: QuestionGroupIdLocaleCompoundUniqueInput
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    groupId?: StringFilter<"Question"> | string
    locale?: StringFilter<"Question"> | string
    question?: StringFilter<"Question"> | string
    group?: XOR<QuestionGroupScalarRelationFilter, QuestionGroupWhereInput>
  }, "id" | "groupId_locale">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    question?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    groupId?: StringWithAggregatesFilter<"Question"> | string
    locale?: StringWithAggregatesFilter<"Question"> | string
    question?: StringWithAggregatesFilter<"Question"> | string
  }

  export type QuestionOptionWhereInput = {
    AND?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    OR?: QuestionOptionWhereInput[]
    NOT?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    id?: StringFilter<"QuestionOption"> | string
    groupId?: StringFilter<"QuestionOption"> | string
    locale?: StringFilter<"QuestionOption"> | string
    label?: StringFilter<"QuestionOption"> | string
    order?: IntFilter<"QuestionOption"> | number
    answers?: UserAnswerListRelationFilter
    group?: XOR<QuestionGroupScalarRelationFilter, QuestionGroupWhereInput>
  }

  export type QuestionOptionOrderByWithRelationInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
    order?: SortOrder
    answers?: UserAnswerOrderByRelationAggregateInput
    group?: QuestionGroupOrderByWithRelationInput
  }

  export type QuestionOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    groupId_locale_order?: QuestionOptionGroupIdLocaleOrderCompoundUniqueInput
    AND?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    OR?: QuestionOptionWhereInput[]
    NOT?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    groupId?: StringFilter<"QuestionOption"> | string
    locale?: StringFilter<"QuestionOption"> | string
    label?: StringFilter<"QuestionOption"> | string
    order?: IntFilter<"QuestionOption"> | number
    answers?: UserAnswerListRelationFilter
    group?: XOR<QuestionGroupScalarRelationFilter, QuestionGroupWhereInput>
  }, "id" | "groupId_locale_order">

  export type QuestionOptionOrderByWithAggregationInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
    order?: SortOrder
    _count?: QuestionOptionCountOrderByAggregateInput
    _avg?: QuestionOptionAvgOrderByAggregateInput
    _max?: QuestionOptionMaxOrderByAggregateInput
    _min?: QuestionOptionMinOrderByAggregateInput
    _sum?: QuestionOptionSumOrderByAggregateInput
  }

  export type QuestionOptionScalarWhereWithAggregatesInput = {
    AND?: QuestionOptionScalarWhereWithAggregatesInput | QuestionOptionScalarWhereWithAggregatesInput[]
    OR?: QuestionOptionScalarWhereWithAggregatesInput[]
    NOT?: QuestionOptionScalarWhereWithAggregatesInput | QuestionOptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuestionOption"> | string
    groupId?: StringWithAggregatesFilter<"QuestionOption"> | string
    locale?: StringWithAggregatesFilter<"QuestionOption"> | string
    label?: StringWithAggregatesFilter<"QuestionOption"> | string
    order?: IntWithAggregatesFilter<"QuestionOption"> | number
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    translations?: CategoryTranslationListRelationFilter
    groupLinks?: QuestionGroupCategoryListRelationFilter
    userPreferences?: UserQuestionPreferenceListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    translations?: CategoryTranslationOrderByRelationAggregateInput
    groupLinks?: QuestionGroupCategoryOrderByRelationAggregateInput
    userPreferences?: UserQuestionPreferenceOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    translations?: CategoryTranslationListRelationFilter
    groupLinks?: QuestionGroupCategoryListRelationFilter
    userPreferences?: UserQuestionPreferenceListRelationFilter
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
  }

  export type CategoryTranslationWhereInput = {
    AND?: CategoryTranslationWhereInput | CategoryTranslationWhereInput[]
    OR?: CategoryTranslationWhereInput[]
    NOT?: CategoryTranslationWhereInput | CategoryTranslationWhereInput[]
    categoryId?: IntFilter<"CategoryTranslation"> | number
    locale?: StringFilter<"CategoryTranslation"> | string
    label?: StringFilter<"CategoryTranslation"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type CategoryTranslationOrderByWithRelationInput = {
    categoryId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
    category?: CategoryOrderByWithRelationInput
  }

  export type CategoryTranslationWhereUniqueInput = Prisma.AtLeast<{
    categoryId_locale?: CategoryTranslationCategoryIdLocaleCompoundUniqueInput
    AND?: CategoryTranslationWhereInput | CategoryTranslationWhereInput[]
    OR?: CategoryTranslationWhereInput[]
    NOT?: CategoryTranslationWhereInput | CategoryTranslationWhereInput[]
    categoryId?: IntFilter<"CategoryTranslation"> | number
    locale?: StringFilter<"CategoryTranslation"> | string
    label?: StringFilter<"CategoryTranslation"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "categoryId_locale">

  export type CategoryTranslationOrderByWithAggregationInput = {
    categoryId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
    _count?: CategoryTranslationCountOrderByAggregateInput
    _avg?: CategoryTranslationAvgOrderByAggregateInput
    _max?: CategoryTranslationMaxOrderByAggregateInput
    _min?: CategoryTranslationMinOrderByAggregateInput
    _sum?: CategoryTranslationSumOrderByAggregateInput
  }

  export type CategoryTranslationScalarWhereWithAggregatesInput = {
    AND?: CategoryTranslationScalarWhereWithAggregatesInput | CategoryTranslationScalarWhereWithAggregatesInput[]
    OR?: CategoryTranslationScalarWhereWithAggregatesInput[]
    NOT?: CategoryTranslationScalarWhereWithAggregatesInput | CategoryTranslationScalarWhereWithAggregatesInput[]
    categoryId?: IntWithAggregatesFilter<"CategoryTranslation"> | number
    locale?: StringWithAggregatesFilter<"CategoryTranslation"> | string
    label?: StringWithAggregatesFilter<"CategoryTranslation"> | string
  }

  export type QuestionGroupCategoryWhereInput = {
    AND?: QuestionGroupCategoryWhereInput | QuestionGroupCategoryWhereInput[]
    OR?: QuestionGroupCategoryWhereInput[]
    NOT?: QuestionGroupCategoryWhereInput | QuestionGroupCategoryWhereInput[]
    questionGroupId?: StringFilter<"QuestionGroupCategory"> | string
    categoryId?: IntFilter<"QuestionGroupCategory"> | number
    questionGroup?: XOR<QuestionGroupScalarRelationFilter, QuestionGroupWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type QuestionGroupCategoryOrderByWithRelationInput = {
    questionGroupId?: SortOrder
    categoryId?: SortOrder
    questionGroup?: QuestionGroupOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type QuestionGroupCategoryWhereUniqueInput = Prisma.AtLeast<{
    questionGroupId_categoryId?: QuestionGroupCategoryQuestionGroupIdCategoryIdCompoundUniqueInput
    AND?: QuestionGroupCategoryWhereInput | QuestionGroupCategoryWhereInput[]
    OR?: QuestionGroupCategoryWhereInput[]
    NOT?: QuestionGroupCategoryWhereInput | QuestionGroupCategoryWhereInput[]
    questionGroupId?: StringFilter<"QuestionGroupCategory"> | string
    categoryId?: IntFilter<"QuestionGroupCategory"> | number
    questionGroup?: XOR<QuestionGroupScalarRelationFilter, QuestionGroupWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "questionGroupId_categoryId">

  export type QuestionGroupCategoryOrderByWithAggregationInput = {
    questionGroupId?: SortOrder
    categoryId?: SortOrder
    _count?: QuestionGroupCategoryCountOrderByAggregateInput
    _avg?: QuestionGroupCategoryAvgOrderByAggregateInput
    _max?: QuestionGroupCategoryMaxOrderByAggregateInput
    _min?: QuestionGroupCategoryMinOrderByAggregateInput
    _sum?: QuestionGroupCategorySumOrderByAggregateInput
  }

  export type QuestionGroupCategoryScalarWhereWithAggregatesInput = {
    AND?: QuestionGroupCategoryScalarWhereWithAggregatesInput | QuestionGroupCategoryScalarWhereWithAggregatesInput[]
    OR?: QuestionGroupCategoryScalarWhereWithAggregatesInput[]
    NOT?: QuestionGroupCategoryScalarWhereWithAggregatesInput | QuestionGroupCategoryScalarWhereWithAggregatesInput[]
    questionGroupId?: StringWithAggregatesFilter<"QuestionGroupCategory"> | string
    categoryId?: IntWithAggregatesFilter<"QuestionGroupCategory"> | number
  }

  export type UserQuestionPreferenceWhereInput = {
    AND?: UserQuestionPreferenceWhereInput | UserQuestionPreferenceWhereInput[]
    OR?: UserQuestionPreferenceWhereInput[]
    NOT?: UserQuestionPreferenceWhereInput | UserQuestionPreferenceWhereInput[]
    userId?: StringFilter<"UserQuestionPreference"> | string
    categoryId?: IntFilter<"UserQuestionPreference"> | number
    enabled?: BoolFilter<"UserQuestionPreference"> | boolean
    updatedAt?: DateTimeFilter<"UserQuestionPreference"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type UserQuestionPreferenceOrderByWithRelationInput = {
    userId?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type UserQuestionPreferenceWhereUniqueInput = Prisma.AtLeast<{
    userId_categoryId?: UserQuestionPreferenceUserIdCategoryIdCompoundUniqueInput
    AND?: UserQuestionPreferenceWhereInput | UserQuestionPreferenceWhereInput[]
    OR?: UserQuestionPreferenceWhereInput[]
    NOT?: UserQuestionPreferenceWhereInput | UserQuestionPreferenceWhereInput[]
    userId?: StringFilter<"UserQuestionPreference"> | string
    categoryId?: IntFilter<"UserQuestionPreference"> | number
    enabled?: BoolFilter<"UserQuestionPreference"> | boolean
    updatedAt?: DateTimeFilter<"UserQuestionPreference"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "userId_categoryId">

  export type UserQuestionPreferenceOrderByWithAggregationInput = {
    userId?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    updatedAt?: SortOrder
    _count?: UserQuestionPreferenceCountOrderByAggregateInput
    _avg?: UserQuestionPreferenceAvgOrderByAggregateInput
    _max?: UserQuestionPreferenceMaxOrderByAggregateInput
    _min?: UserQuestionPreferenceMinOrderByAggregateInput
    _sum?: UserQuestionPreferenceSumOrderByAggregateInput
  }

  export type UserQuestionPreferenceScalarWhereWithAggregatesInput = {
    AND?: UserQuestionPreferenceScalarWhereWithAggregatesInput | UserQuestionPreferenceScalarWhereWithAggregatesInput[]
    OR?: UserQuestionPreferenceScalarWhereWithAggregatesInput[]
    NOT?: UserQuestionPreferenceScalarWhereWithAggregatesInput | UserQuestionPreferenceScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserQuestionPreference"> | string
    categoryId?: IntWithAggregatesFilter<"UserQuestionPreference"> | number
    enabled?: BoolWithAggregatesFilter<"UserQuestionPreference"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"UserQuestionPreference"> | Date | string
  }

  export type UserAnswerWhereInput = {
    AND?: UserAnswerWhereInput | UserAnswerWhereInput[]
    OR?: UserAnswerWhereInput[]
    NOT?: UserAnswerWhereInput | UserAnswerWhereInput[]
    id?: StringFilter<"UserAnswer"> | string
    userId?: StringFilter<"UserAnswer"> | string
    questionGroupId?: StringFilter<"UserAnswer"> | string
    questionOptionId?: StringFilter<"UserAnswer"> | string
    conversationId?: StringNullableFilter<"UserAnswer"> | string | null
    answeredAt?: DateTimeFilter<"UserAnswer"> | Date | string
    updatedAt?: DateTimeFilter<"UserAnswer"> | Date | string
    note?: StringNullableFilter<"UserAnswer"> | string | null
    isFlagged?: BoolFilter<"UserAnswer"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    questionGroup?: XOR<QuestionGroupScalarRelationFilter, QuestionGroupWhereInput>
    questionOption?: XOR<QuestionOptionScalarRelationFilter, QuestionOptionWhereInput>
    conversation?: XOR<ConversationNullableScalarRelationFilter, ConversationWhereInput> | null
  }

  export type UserAnswerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    questionGroupId?: SortOrder
    questionOptionId?: SortOrder
    conversationId?: SortOrderInput | SortOrder
    answeredAt?: SortOrder
    updatedAt?: SortOrder
    note?: SortOrderInput | SortOrder
    isFlagged?: SortOrder
    user?: UserOrderByWithRelationInput
    questionGroup?: QuestionGroupOrderByWithRelationInput
    questionOption?: QuestionOptionOrderByWithRelationInput
    conversation?: ConversationOrderByWithRelationInput
  }

  export type UserAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserAnswerWhereInput | UserAnswerWhereInput[]
    OR?: UserAnswerWhereInput[]
    NOT?: UserAnswerWhereInput | UserAnswerWhereInput[]
    userId?: StringFilter<"UserAnswer"> | string
    questionGroupId?: StringFilter<"UserAnswer"> | string
    questionOptionId?: StringFilter<"UserAnswer"> | string
    conversationId?: StringNullableFilter<"UserAnswer"> | string | null
    answeredAt?: DateTimeFilter<"UserAnswer"> | Date | string
    updatedAt?: DateTimeFilter<"UserAnswer"> | Date | string
    note?: StringNullableFilter<"UserAnswer"> | string | null
    isFlagged?: BoolFilter<"UserAnswer"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    questionGroup?: XOR<QuestionGroupScalarRelationFilter, QuestionGroupWhereInput>
    questionOption?: XOR<QuestionOptionScalarRelationFilter, QuestionOptionWhereInput>
    conversation?: XOR<ConversationNullableScalarRelationFilter, ConversationWhereInput> | null
  }, "id">

  export type UserAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    questionGroupId?: SortOrder
    questionOptionId?: SortOrder
    conversationId?: SortOrderInput | SortOrder
    answeredAt?: SortOrder
    updatedAt?: SortOrder
    note?: SortOrderInput | SortOrder
    isFlagged?: SortOrder
    _count?: UserAnswerCountOrderByAggregateInput
    _max?: UserAnswerMaxOrderByAggregateInput
    _min?: UserAnswerMinOrderByAggregateInput
  }

  export type UserAnswerScalarWhereWithAggregatesInput = {
    AND?: UserAnswerScalarWhereWithAggregatesInput | UserAnswerScalarWhereWithAggregatesInput[]
    OR?: UserAnswerScalarWhereWithAggregatesInput[]
    NOT?: UserAnswerScalarWhereWithAggregatesInput | UserAnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAnswer"> | string
    userId?: StringWithAggregatesFilter<"UserAnswer"> | string
    questionGroupId?: StringWithAggregatesFilter<"UserAnswer"> | string
    questionOptionId?: StringWithAggregatesFilter<"UserAnswer"> | string
    conversationId?: StringNullableWithAggregatesFilter<"UserAnswer"> | string | null
    answeredAt?: DateTimeWithAggregatesFilter<"UserAnswer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserAnswer"> | Date | string
    note?: StringNullableWithAggregatesFilter<"UserAnswer"> | string | null
    isFlagged?: BoolWithAggregatesFilter<"UserAnswer"> | boolean
  }

  export type AuthCreateInput = {
    id?: string
    email: string
    password: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAuthInput
  }

  export type AuthUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type AuthUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuthNestedInput
  }

  export type AuthUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AuthCreateManyInput = {
    id?: string
    email: string
    password: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type AuthUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantCreateNestedManyWithoutUserInput
    contacts?: UserContactCreateNestedManyWithoutUserInput
    contactOf?: UserContactCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceCreateNestedManyWithoutUserInput
    answers?: UserAnswerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthUncheckedCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupUncheckedCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantUncheckedCreateNestedManyWithoutUserInput
    contacts?: UserContactUncheckedCreateNestedManyWithoutUserInput
    contactOf?: UserContactUncheckedCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutUserInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUpdateManyWithoutUserNestedInput
    contacts?: UserContactUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUncheckedUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUncheckedUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput
    contacts?: UserContactUncheckedUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUncheckedUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserContactCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutContactsInput
    contact: UserCreateNestedOneWithoutContactOfInput
  }

  export type UserContactUncheckedCreateInput = {
    userId: string
    contactId: string
    createdAt?: Date | string
  }

  export type UserContactUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutContactsNestedInput
    contact?: UserUpdateOneRequiredWithoutContactOfNestedInput
  }

  export type UserContactUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    contactId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserContactCreateManyInput = {
    userId: string
    contactId: string
    createdAt?: Date | string
  }

  export type UserContactUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserContactUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    contactId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
    participants?: ConversationParticipantCreateNestedManyWithoutConversationInput
    UserAnswer?: UserAnswerCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    participants?: ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput
    UserAnswer?: UserAnswerUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
    participants?: ConversationParticipantUpdateManyWithoutConversationNestedInput
    UserAnswer?: UserAnswerUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    participants?: ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput
    UserAnswer?: UserAnswerUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationParticipantCreateInput = {
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutParticipantsInput
    user: UserCreateNestedOneWithoutConversationsInput
  }

  export type ConversationParticipantUncheckedCreateInput = {
    conversationId: string
    userId: string
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationParticipantUpdateInput = {
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type ConversationParticipantUncheckedUpdateInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationParticipantCreateManyInput = {
    conversationId: string
    userId: string
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationParticipantUpdateManyMutationInput = {
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationParticipantUncheckedUpdateManyInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    editedAt?: Date | string | null
    isRead?: boolean
    isDeleted?: boolean
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    senderId: string
    content: string
    createdAt?: Date | string
    editedAt?: Date | string | null
    isRead?: boolean
    isDeleted?: boolean
    conversationId: string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateManyInput = {
    id?: string
    senderId: string
    content: string
    createdAt?: Date | string
    editedAt?: Date | string | null
    isRead?: boolean
    isDeleted?: boolean
    conversationId: string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionGroupCreateInput = {
    id?: string
    type: number
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    author: UserCreateNestedOneWithoutQuestionGroupsInput
    questions?: QuestionCreateNestedManyWithoutGroupInput
    options?: QuestionOptionCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryCreateNestedManyWithoutQuestionGroupInput
    answers?: UserAnswerCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupUncheckedCreateInput = {
    id?: string
    type: number
    authorId: string
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    questions?: QuestionUncheckedCreateNestedManyWithoutGroupInput
    options?: QuestionOptionUncheckedCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryUncheckedCreateNestedManyWithoutQuestionGroupInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutQuestionGroupsNestedInput
    questions?: QuestionUpdateManyWithoutGroupNestedInput
    options?: QuestionOptionUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUpdateManyWithoutQuestionGroupNestedInput
    answers?: UserAnswerUpdateManyWithoutQuestionGroupNestedInput
  }

  export type QuestionGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    questions?: QuestionUncheckedUpdateManyWithoutGroupNestedInput
    options?: QuestionOptionUncheckedUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUncheckedUpdateManyWithoutQuestionGroupNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutQuestionGroupNestedInput
  }

  export type QuestionGroupCreateManyInput = {
    id?: string
    type: number
    authorId: string
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
  }

  export type QuestionGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QuestionGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QuestionCreateInput = {
    id?: string
    locale: string
    question: string
    group: QuestionGroupCreateNestedOneWithoutQuestionsInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    groupId: string
    locale: string
    question: string
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    group?: QuestionGroupUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionCreateManyInput = {
    id?: string
    groupId: string
    locale: string
    question: string
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionOptionCreateInput = {
    id?: string
    locale: string
    label: string
    order: number
    answers?: UserAnswerCreateNestedManyWithoutQuestionOptionInput
    group: QuestionGroupCreateNestedOneWithoutOptionsInput
  }

  export type QuestionOptionUncheckedCreateInput = {
    id?: string
    groupId: string
    locale: string
    label: string
    order: number
    answers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionOptionInput
  }

  export type QuestionOptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    answers?: UserAnswerUpdateManyWithoutQuestionOptionNestedInput
    group?: QuestionGroupUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type QuestionOptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    answers?: UserAnswerUncheckedUpdateManyWithoutQuestionOptionNestedInput
  }

  export type QuestionOptionCreateManyInput = {
    id?: string
    groupId: string
    locale: string
    label: string
    order: number
  }

  export type QuestionOptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type QuestionOptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryCreateInput = {
    id: number
    translations?: CategoryTranslationCreateNestedManyWithoutCategoryInput
    groupLinks?: QuestionGroupCategoryCreateNestedManyWithoutCategoryInput
    userPreferences?: UserQuestionPreferenceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id: number
    translations?: CategoryTranslationUncheckedCreateNestedManyWithoutCategoryInput
    groupLinks?: QuestionGroupCategoryUncheckedCreateNestedManyWithoutCategoryInput
    userPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    translations?: CategoryTranslationUpdateManyWithoutCategoryNestedInput
    groupLinks?: QuestionGroupCategoryUpdateManyWithoutCategoryNestedInput
    userPreferences?: UserQuestionPreferenceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    translations?: CategoryTranslationUncheckedUpdateManyWithoutCategoryNestedInput
    groupLinks?: QuestionGroupCategoryUncheckedUpdateManyWithoutCategoryNestedInput
    userPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id: number
  }

  export type CategoryUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryTranslationCreateInput = {
    locale: string
    label: string
    category: CategoryCreateNestedOneWithoutTranslationsInput
  }

  export type CategoryTranslationUncheckedCreateInput = {
    categoryId: number
    locale: string
    label: string
  }

  export type CategoryTranslationUpdateInput = {
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type CategoryTranslationUncheckedUpdateInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryTranslationCreateManyInput = {
    categoryId: number
    locale: string
    label: string
  }

  export type CategoryTranslationUpdateManyMutationInput = {
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryTranslationUncheckedUpdateManyInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionGroupCategoryCreateInput = {
    questionGroup: QuestionGroupCreateNestedOneWithoutCategoriesInput
    category: CategoryCreateNestedOneWithoutGroupLinksInput
  }

  export type QuestionGroupCategoryUncheckedCreateInput = {
    questionGroupId: string
    categoryId: number
  }

  export type QuestionGroupCategoryUpdateInput = {
    questionGroup?: QuestionGroupUpdateOneRequiredWithoutCategoriesNestedInput
    category?: CategoryUpdateOneRequiredWithoutGroupLinksNestedInput
  }

  export type QuestionGroupCategoryUncheckedUpdateInput = {
    questionGroupId?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type QuestionGroupCategoryCreateManyInput = {
    questionGroupId: string
    categoryId: number
  }

  export type QuestionGroupCategoryUpdateManyMutationInput = {

  }

  export type QuestionGroupCategoryUncheckedUpdateManyInput = {
    questionGroupId?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type UserQuestionPreferenceCreateInput = {
    enabled?: boolean
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutQuestionPreferencesInput
    category: CategoryCreateNestedOneWithoutUserPreferencesInput
  }

  export type UserQuestionPreferenceUncheckedCreateInput = {
    userId: string
    categoryId: number
    enabled?: boolean
    updatedAt?: Date | string
  }

  export type UserQuestionPreferenceUpdateInput = {
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutQuestionPreferencesNestedInput
    category?: CategoryUpdateOneRequiredWithoutUserPreferencesNestedInput
  }

  export type UserQuestionPreferenceUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionPreferenceCreateManyInput = {
    userId: string
    categoryId: number
    enabled?: boolean
    updatedAt?: Date | string
  }

  export type UserQuestionPreferenceUpdateManyMutationInput = {
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionPreferenceUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerCreateInput = {
    id?: string
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
    user: UserCreateNestedOneWithoutAnswersInput
    questionGroup: QuestionGroupCreateNestedOneWithoutAnswersInput
    questionOption: QuestionOptionCreateNestedOneWithoutAnswersInput
    conversation?: ConversationCreateNestedOneWithoutUserAnswerInput
  }

  export type UserAnswerUncheckedCreateInput = {
    id?: string
    userId: string
    questionGroupId: string
    questionOptionId: string
    conversationId?: string | null
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type UserAnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAnswersNestedInput
    questionGroup?: QuestionGroupUpdateOneRequiredWithoutAnswersNestedInput
    questionOption?: QuestionOptionUpdateOneRequiredWithoutAnswersNestedInput
    conversation?: ConversationUpdateOneWithoutUserAnswerNestedInput
  }

  export type UserAnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionGroupId?: StringFieldUpdateOperationsInput | string
    questionOptionId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAnswerCreateManyInput = {
    id?: string
    userId: string
    questionGroupId: string
    questionOptionId: string
    conversationId?: string | null
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type UserAnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionGroupId?: StringFieldUpdateOperationsInput | string
    questionOptionId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AuthMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AuthMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AuthNullableScalarRelationFilter = {
    is?: AuthWhereInput | null
    isNot?: AuthWhereInput | null
  }

  export type QuestionGroupListRelationFilter = {
    every?: QuestionGroupWhereInput
    some?: QuestionGroupWhereInput
    none?: QuestionGroupWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type ConversationParticipantListRelationFilter = {
    every?: ConversationParticipantWhereInput
    some?: ConversationParticipantWhereInput
    none?: ConversationParticipantWhereInput
  }

  export type UserContactListRelationFilter = {
    every?: UserContactWhereInput
    some?: UserContactWhereInput
    none?: UserContactWhereInput
  }

  export type UserQuestionPreferenceListRelationFilter = {
    every?: UserQuestionPreferenceWhereInput
    some?: UserQuestionPreferenceWhereInput
    none?: UserQuestionPreferenceWhereInput
  }

  export type UserAnswerListRelationFilter = {
    every?: UserAnswerWhereInput
    some?: UserAnswerWhereInput
    none?: UserAnswerWhereInput
  }

  export type QuestionGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserQuestionPreferenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userNumber?: SortOrder
    username?: SortOrder
    isOnline?: SortOrder
    isAvailableForChat?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    userNumber?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userNumber?: SortOrder
    username?: SortOrder
    isOnline?: SortOrder
    isAvailableForChat?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userNumber?: SortOrder
    username?: SortOrder
    isOnline?: SortOrder
    isAvailableForChat?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    userNumber?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserContactUserIdContactIdCompoundUniqueInput = {
    userId: string
    contactId: string
  }

  export type UserContactCountOrderByAggregateInput = {
    userId?: SortOrder
    contactId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserContactMaxOrderByAggregateInput = {
    userId?: SortOrder
    contactId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserContactMinOrderByAggregateInput = {
    userId?: SortOrder
    contactId?: SortOrder
    createdAt?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type ConversationParticipantConversationIdUserIdCompoundUniqueInput = {
    conversationId: string
    userId: string
  }

  export type ConversationParticipantCountOrderByAggregateInput = {
    conversationId?: SortOrder
    userId?: SortOrder
    isIcebreakerReady?: SortOrder
    hasGivenAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationParticipantMaxOrderByAggregateInput = {
    conversationId?: SortOrder
    userId?: SortOrder
    isIcebreakerReady?: SortOrder
    hasGivenAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationParticipantMinOrderByAggregateInput = {
    conversationId?: SortOrder
    userId?: SortOrder
    isIcebreakerReady?: SortOrder
    hasGivenAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrder
    isRead?: SortOrder
    isDeleted?: SortOrder
    conversationId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrder
    isRead?: SortOrder
    isDeleted?: SortOrder
    conversationId?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrder
    isRead?: SortOrder
    isDeleted?: SortOrder
    conversationId?: SortOrder
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

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type QuestionOptionListRelationFilter = {
    every?: QuestionOptionWhereInput
    some?: QuestionOptionWhereInput
    none?: QuestionOptionWhereInput
  }

  export type QuestionGroupCategoryListRelationFilter = {
    every?: QuestionGroupCategoryWhereInput
    some?: QuestionGroupCategoryWhereInput
    none?: QuestionGroupCategoryWhereInput
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionOptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionGroupCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionGroupCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isModerated?: SortOrder
    moderatedAt?: SortOrder
    pinned?: SortOrder
    enabled?: SortOrder
  }

  export type QuestionGroupAvgOrderByAggregateInput = {
    type?: SortOrder
  }

  export type QuestionGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isModerated?: SortOrder
    moderatedAt?: SortOrder
    pinned?: SortOrder
    enabled?: SortOrder
  }

  export type QuestionGroupMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    isModerated?: SortOrder
    moderatedAt?: SortOrder
    pinned?: SortOrder
    enabled?: SortOrder
  }

  export type QuestionGroupSumOrderByAggregateInput = {
    type?: SortOrder
  }

  export type QuestionGroupScalarRelationFilter = {
    is?: QuestionGroupWhereInput
    isNot?: QuestionGroupWhereInput
  }

  export type QuestionGroupIdLocaleCompoundUniqueInput = {
    groupId: string
    locale: string
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    question?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    question?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    question?: SortOrder
  }

  export type QuestionOptionGroupIdLocaleOrderCompoundUniqueInput = {
    groupId: string
    locale: string
    order: number
  }

  export type QuestionOptionCountOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
    order?: SortOrder
  }

  export type QuestionOptionAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type QuestionOptionMaxOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
    order?: SortOrder
  }

  export type QuestionOptionMinOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
    order?: SortOrder
  }

  export type QuestionOptionSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type CategoryTranslationListRelationFilter = {
    every?: CategoryTranslationWhereInput
    some?: CategoryTranslationWhereInput
    none?: CategoryTranslationWhereInput
  }

  export type CategoryTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type CategoryTranslationCategoryIdLocaleCompoundUniqueInput = {
    categoryId: number
    locale: string
  }

  export type CategoryTranslationCountOrderByAggregateInput = {
    categoryId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
  }

  export type CategoryTranslationAvgOrderByAggregateInput = {
    categoryId?: SortOrder
  }

  export type CategoryTranslationMaxOrderByAggregateInput = {
    categoryId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
  }

  export type CategoryTranslationMinOrderByAggregateInput = {
    categoryId?: SortOrder
    locale?: SortOrder
    label?: SortOrder
  }

  export type CategoryTranslationSumOrderByAggregateInput = {
    categoryId?: SortOrder
  }

  export type QuestionGroupCategoryQuestionGroupIdCategoryIdCompoundUniqueInput = {
    questionGroupId: string
    categoryId: number
  }

  export type QuestionGroupCategoryCountOrderByAggregateInput = {
    questionGroupId?: SortOrder
    categoryId?: SortOrder
  }

  export type QuestionGroupCategoryAvgOrderByAggregateInput = {
    categoryId?: SortOrder
  }

  export type QuestionGroupCategoryMaxOrderByAggregateInput = {
    questionGroupId?: SortOrder
    categoryId?: SortOrder
  }

  export type QuestionGroupCategoryMinOrderByAggregateInput = {
    questionGroupId?: SortOrder
    categoryId?: SortOrder
  }

  export type QuestionGroupCategorySumOrderByAggregateInput = {
    categoryId?: SortOrder
  }

  export type UserQuestionPreferenceUserIdCategoryIdCompoundUniqueInput = {
    userId: string
    categoryId: number
  }

  export type UserQuestionPreferenceCountOrderByAggregateInput = {
    userId?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserQuestionPreferenceAvgOrderByAggregateInput = {
    categoryId?: SortOrder
  }

  export type UserQuestionPreferenceMaxOrderByAggregateInput = {
    userId?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserQuestionPreferenceMinOrderByAggregateInput = {
    userId?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserQuestionPreferenceSumOrderByAggregateInput = {
    categoryId?: SortOrder
  }

  export type QuestionOptionScalarRelationFilter = {
    is?: QuestionOptionWhereInput
    isNot?: QuestionOptionWhereInput
  }

  export type ConversationNullableScalarRelationFilter = {
    is?: ConversationWhereInput | null
    isNot?: ConversationWhereInput | null
  }

  export type UserAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    questionGroupId?: SortOrder
    questionOptionId?: SortOrder
    conversationId?: SortOrder
    answeredAt?: SortOrder
    updatedAt?: SortOrder
    note?: SortOrder
    isFlagged?: SortOrder
  }

  export type UserAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    questionGroupId?: SortOrder
    questionOptionId?: SortOrder
    conversationId?: SortOrder
    answeredAt?: SortOrder
    updatedAt?: SortOrder
    note?: SortOrder
    isFlagged?: SortOrder
  }

  export type UserAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    questionGroupId?: SortOrder
    questionOptionId?: SortOrder
    conversationId?: SortOrder
    answeredAt?: SortOrder
    updatedAt?: SortOrder
    note?: SortOrder
    isFlagged?: SortOrder
  }

  export type UserCreateNestedOneWithoutAuthInput = {
    create?: XOR<UserCreateWithoutAuthInput, UserUncheckedCreateWithoutAuthInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutAuthNestedInput = {
    create?: XOR<UserCreateWithoutAuthInput, UserUncheckedCreateWithoutAuthInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthInput
    upsert?: UserUpsertWithoutAuthInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthInput, UserUpdateWithoutAuthInput>, UserUncheckedUpdateWithoutAuthInput>
  }

  export type AuthCreateNestedOneWithoutUserInput = {
    create?: XOR<AuthCreateWithoutUserInput, AuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthCreateOrConnectWithoutUserInput
    connect?: AuthWhereUniqueInput
  }

  export type QuestionGroupCreateNestedManyWithoutAuthorInput = {
    create?: XOR<QuestionGroupCreateWithoutAuthorInput, QuestionGroupUncheckedCreateWithoutAuthorInput> | QuestionGroupCreateWithoutAuthorInput[] | QuestionGroupUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutAuthorInput | QuestionGroupCreateOrConnectWithoutAuthorInput[]
    createMany?: QuestionGroupCreateManyAuthorInputEnvelope
    connect?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ConversationParticipantCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationParticipantCreateWithoutUserInput, ConversationParticipantUncheckedCreateWithoutUserInput> | ConversationParticipantCreateWithoutUserInput[] | ConversationParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationParticipantCreateOrConnectWithoutUserInput | ConversationParticipantCreateOrConnectWithoutUserInput[]
    createMany?: ConversationParticipantCreateManyUserInputEnvelope
    connect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
  }

  export type UserContactCreateNestedManyWithoutUserInput = {
    create?: XOR<UserContactCreateWithoutUserInput, UserContactUncheckedCreateWithoutUserInput> | UserContactCreateWithoutUserInput[] | UserContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserContactCreateOrConnectWithoutUserInput | UserContactCreateOrConnectWithoutUserInput[]
    createMany?: UserContactCreateManyUserInputEnvelope
    connect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
  }

  export type UserContactCreateNestedManyWithoutContactInput = {
    create?: XOR<UserContactCreateWithoutContactInput, UserContactUncheckedCreateWithoutContactInput> | UserContactCreateWithoutContactInput[] | UserContactUncheckedCreateWithoutContactInput[]
    connectOrCreate?: UserContactCreateOrConnectWithoutContactInput | UserContactCreateOrConnectWithoutContactInput[]
    createMany?: UserContactCreateManyContactInputEnvelope
    connect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
  }

  export type UserQuestionPreferenceCreateNestedManyWithoutUserInput = {
    create?: XOR<UserQuestionPreferenceCreateWithoutUserInput, UserQuestionPreferenceUncheckedCreateWithoutUserInput> | UserQuestionPreferenceCreateWithoutUserInput[] | UserQuestionPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserQuestionPreferenceCreateOrConnectWithoutUserInput | UserQuestionPreferenceCreateOrConnectWithoutUserInput[]
    createMany?: UserQuestionPreferenceCreateManyUserInputEnvelope
    connect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
  }

  export type UserAnswerCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAnswerCreateWithoutUserInput, UserAnswerUncheckedCreateWithoutUserInput> | UserAnswerCreateWithoutUserInput[] | UserAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutUserInput | UserAnswerCreateOrConnectWithoutUserInput[]
    createMany?: UserAnswerCreateManyUserInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type AuthUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AuthCreateWithoutUserInput, AuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthCreateOrConnectWithoutUserInput
    connect?: AuthWhereUniqueInput
  }

  export type QuestionGroupUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<QuestionGroupCreateWithoutAuthorInput, QuestionGroupUncheckedCreateWithoutAuthorInput> | QuestionGroupCreateWithoutAuthorInput[] | QuestionGroupUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutAuthorInput | QuestionGroupCreateOrConnectWithoutAuthorInput[]
    createMany?: QuestionGroupCreateManyAuthorInputEnvelope
    connect?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ConversationParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationParticipantCreateWithoutUserInput, ConversationParticipantUncheckedCreateWithoutUserInput> | ConversationParticipantCreateWithoutUserInput[] | ConversationParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationParticipantCreateOrConnectWithoutUserInput | ConversationParticipantCreateOrConnectWithoutUserInput[]
    createMany?: ConversationParticipantCreateManyUserInputEnvelope
    connect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
  }

  export type UserContactUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserContactCreateWithoutUserInput, UserContactUncheckedCreateWithoutUserInput> | UserContactCreateWithoutUserInput[] | UserContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserContactCreateOrConnectWithoutUserInput | UserContactCreateOrConnectWithoutUserInput[]
    createMany?: UserContactCreateManyUserInputEnvelope
    connect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
  }

  export type UserContactUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<UserContactCreateWithoutContactInput, UserContactUncheckedCreateWithoutContactInput> | UserContactCreateWithoutContactInput[] | UserContactUncheckedCreateWithoutContactInput[]
    connectOrCreate?: UserContactCreateOrConnectWithoutContactInput | UserContactCreateOrConnectWithoutContactInput[]
    createMany?: UserContactCreateManyContactInputEnvelope
    connect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
  }

  export type UserQuestionPreferenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserQuestionPreferenceCreateWithoutUserInput, UserQuestionPreferenceUncheckedCreateWithoutUserInput> | UserQuestionPreferenceCreateWithoutUserInput[] | UserQuestionPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserQuestionPreferenceCreateOrConnectWithoutUserInput | UserQuestionPreferenceCreateOrConnectWithoutUserInput[]
    createMany?: UserQuestionPreferenceCreateManyUserInputEnvelope
    connect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
  }

  export type UserAnswerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAnswerCreateWithoutUserInput, UserAnswerUncheckedCreateWithoutUserInput> | UserAnswerCreateWithoutUserInput[] | UserAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutUserInput | UserAnswerCreateOrConnectWithoutUserInput[]
    createMany?: UserAnswerCreateManyUserInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AuthUpdateOneWithoutUserNestedInput = {
    create?: XOR<AuthCreateWithoutUserInput, AuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthCreateOrConnectWithoutUserInput
    upsert?: AuthUpsertWithoutUserInput
    disconnect?: AuthWhereInput | boolean
    delete?: AuthWhereInput | boolean
    connect?: AuthWhereUniqueInput
    update?: XOR<XOR<AuthUpdateToOneWithWhereWithoutUserInput, AuthUpdateWithoutUserInput>, AuthUncheckedUpdateWithoutUserInput>
  }

  export type QuestionGroupUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<QuestionGroupCreateWithoutAuthorInput, QuestionGroupUncheckedCreateWithoutAuthorInput> | QuestionGroupCreateWithoutAuthorInput[] | QuestionGroupUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutAuthorInput | QuestionGroupCreateOrConnectWithoutAuthorInput[]
    upsert?: QuestionGroupUpsertWithWhereUniqueWithoutAuthorInput | QuestionGroupUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: QuestionGroupCreateManyAuthorInputEnvelope
    set?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
    disconnect?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
    delete?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
    connect?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
    update?: QuestionGroupUpdateWithWhereUniqueWithoutAuthorInput | QuestionGroupUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: QuestionGroupUpdateManyWithWhereWithoutAuthorInput | QuestionGroupUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: QuestionGroupScalarWhereInput | QuestionGroupScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ConversationParticipantUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationParticipantCreateWithoutUserInput, ConversationParticipantUncheckedCreateWithoutUserInput> | ConversationParticipantCreateWithoutUserInput[] | ConversationParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationParticipantCreateOrConnectWithoutUserInput | ConversationParticipantCreateOrConnectWithoutUserInput[]
    upsert?: ConversationParticipantUpsertWithWhereUniqueWithoutUserInput | ConversationParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationParticipantCreateManyUserInputEnvelope
    set?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    disconnect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    delete?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    connect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    update?: ConversationParticipantUpdateWithWhereUniqueWithoutUserInput | ConversationParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationParticipantUpdateManyWithWhereWithoutUserInput | ConversationParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationParticipantScalarWhereInput | ConversationParticipantScalarWhereInput[]
  }

  export type UserContactUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserContactCreateWithoutUserInput, UserContactUncheckedCreateWithoutUserInput> | UserContactCreateWithoutUserInput[] | UserContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserContactCreateOrConnectWithoutUserInput | UserContactCreateOrConnectWithoutUserInput[]
    upsert?: UserContactUpsertWithWhereUniqueWithoutUserInput | UserContactUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserContactCreateManyUserInputEnvelope
    set?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    disconnect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    delete?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    connect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    update?: UserContactUpdateWithWhereUniqueWithoutUserInput | UserContactUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserContactUpdateManyWithWhereWithoutUserInput | UserContactUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserContactScalarWhereInput | UserContactScalarWhereInput[]
  }

  export type UserContactUpdateManyWithoutContactNestedInput = {
    create?: XOR<UserContactCreateWithoutContactInput, UserContactUncheckedCreateWithoutContactInput> | UserContactCreateWithoutContactInput[] | UserContactUncheckedCreateWithoutContactInput[]
    connectOrCreate?: UserContactCreateOrConnectWithoutContactInput | UserContactCreateOrConnectWithoutContactInput[]
    upsert?: UserContactUpsertWithWhereUniqueWithoutContactInput | UserContactUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: UserContactCreateManyContactInputEnvelope
    set?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    disconnect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    delete?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    connect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    update?: UserContactUpdateWithWhereUniqueWithoutContactInput | UserContactUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: UserContactUpdateManyWithWhereWithoutContactInput | UserContactUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: UserContactScalarWhereInput | UserContactScalarWhereInput[]
  }

  export type UserQuestionPreferenceUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserQuestionPreferenceCreateWithoutUserInput, UserQuestionPreferenceUncheckedCreateWithoutUserInput> | UserQuestionPreferenceCreateWithoutUserInput[] | UserQuestionPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserQuestionPreferenceCreateOrConnectWithoutUserInput | UserQuestionPreferenceCreateOrConnectWithoutUserInput[]
    upsert?: UserQuestionPreferenceUpsertWithWhereUniqueWithoutUserInput | UserQuestionPreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserQuestionPreferenceCreateManyUserInputEnvelope
    set?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    disconnect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    delete?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    connect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    update?: UserQuestionPreferenceUpdateWithWhereUniqueWithoutUserInput | UserQuestionPreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserQuestionPreferenceUpdateManyWithWhereWithoutUserInput | UserQuestionPreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserQuestionPreferenceScalarWhereInput | UserQuestionPreferenceScalarWhereInput[]
  }

  export type UserAnswerUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAnswerCreateWithoutUserInput, UserAnswerUncheckedCreateWithoutUserInput> | UserAnswerCreateWithoutUserInput[] | UserAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutUserInput | UserAnswerCreateOrConnectWithoutUserInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutUserInput | UserAnswerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAnswerCreateManyUserInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutUserInput | UserAnswerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutUserInput | UserAnswerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AuthUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AuthCreateWithoutUserInput, AuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: AuthCreateOrConnectWithoutUserInput
    upsert?: AuthUpsertWithoutUserInput
    disconnect?: AuthWhereInput | boolean
    delete?: AuthWhereInput | boolean
    connect?: AuthWhereUniqueInput
    update?: XOR<XOR<AuthUpdateToOneWithWhereWithoutUserInput, AuthUpdateWithoutUserInput>, AuthUncheckedUpdateWithoutUserInput>
  }

  export type QuestionGroupUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<QuestionGroupCreateWithoutAuthorInput, QuestionGroupUncheckedCreateWithoutAuthorInput> | QuestionGroupCreateWithoutAuthorInput[] | QuestionGroupUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutAuthorInput | QuestionGroupCreateOrConnectWithoutAuthorInput[]
    upsert?: QuestionGroupUpsertWithWhereUniqueWithoutAuthorInput | QuestionGroupUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: QuestionGroupCreateManyAuthorInputEnvelope
    set?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
    disconnect?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
    delete?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
    connect?: QuestionGroupWhereUniqueInput | QuestionGroupWhereUniqueInput[]
    update?: QuestionGroupUpdateWithWhereUniqueWithoutAuthorInput | QuestionGroupUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: QuestionGroupUpdateManyWithWhereWithoutAuthorInput | QuestionGroupUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: QuestionGroupScalarWhereInput | QuestionGroupScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationParticipantCreateWithoutUserInput, ConversationParticipantUncheckedCreateWithoutUserInput> | ConversationParticipantCreateWithoutUserInput[] | ConversationParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationParticipantCreateOrConnectWithoutUserInput | ConversationParticipantCreateOrConnectWithoutUserInput[]
    upsert?: ConversationParticipantUpsertWithWhereUniqueWithoutUserInput | ConversationParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationParticipantCreateManyUserInputEnvelope
    set?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    disconnect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    delete?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    connect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    update?: ConversationParticipantUpdateWithWhereUniqueWithoutUserInput | ConversationParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationParticipantUpdateManyWithWhereWithoutUserInput | ConversationParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationParticipantScalarWhereInput | ConversationParticipantScalarWhereInput[]
  }

  export type UserContactUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserContactCreateWithoutUserInput, UserContactUncheckedCreateWithoutUserInput> | UserContactCreateWithoutUserInput[] | UserContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserContactCreateOrConnectWithoutUserInput | UserContactCreateOrConnectWithoutUserInput[]
    upsert?: UserContactUpsertWithWhereUniqueWithoutUserInput | UserContactUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserContactCreateManyUserInputEnvelope
    set?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    disconnect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    delete?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    connect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    update?: UserContactUpdateWithWhereUniqueWithoutUserInput | UserContactUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserContactUpdateManyWithWhereWithoutUserInput | UserContactUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserContactScalarWhereInput | UserContactScalarWhereInput[]
  }

  export type UserContactUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<UserContactCreateWithoutContactInput, UserContactUncheckedCreateWithoutContactInput> | UserContactCreateWithoutContactInput[] | UserContactUncheckedCreateWithoutContactInput[]
    connectOrCreate?: UserContactCreateOrConnectWithoutContactInput | UserContactCreateOrConnectWithoutContactInput[]
    upsert?: UserContactUpsertWithWhereUniqueWithoutContactInput | UserContactUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: UserContactCreateManyContactInputEnvelope
    set?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    disconnect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    delete?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    connect?: UserContactWhereUniqueInput | UserContactWhereUniqueInput[]
    update?: UserContactUpdateWithWhereUniqueWithoutContactInput | UserContactUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: UserContactUpdateManyWithWhereWithoutContactInput | UserContactUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: UserContactScalarWhereInput | UserContactScalarWhereInput[]
  }

  export type UserQuestionPreferenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserQuestionPreferenceCreateWithoutUserInput, UserQuestionPreferenceUncheckedCreateWithoutUserInput> | UserQuestionPreferenceCreateWithoutUserInput[] | UserQuestionPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserQuestionPreferenceCreateOrConnectWithoutUserInput | UserQuestionPreferenceCreateOrConnectWithoutUserInput[]
    upsert?: UserQuestionPreferenceUpsertWithWhereUniqueWithoutUserInput | UserQuestionPreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserQuestionPreferenceCreateManyUserInputEnvelope
    set?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    disconnect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    delete?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    connect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    update?: UserQuestionPreferenceUpdateWithWhereUniqueWithoutUserInput | UserQuestionPreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserQuestionPreferenceUpdateManyWithWhereWithoutUserInput | UserQuestionPreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserQuestionPreferenceScalarWhereInput | UserQuestionPreferenceScalarWhereInput[]
  }

  export type UserAnswerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAnswerCreateWithoutUserInput, UserAnswerUncheckedCreateWithoutUserInput> | UserAnswerCreateWithoutUserInput[] | UserAnswerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutUserInput | UserAnswerCreateOrConnectWithoutUserInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutUserInput | UserAnswerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAnswerCreateManyUserInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutUserInput | UserAnswerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutUserInput | UserAnswerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutContactsInput = {
    create?: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContactsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutContactOfInput = {
    create?: XOR<UserCreateWithoutContactOfInput, UserUncheckedCreateWithoutContactOfInput>
    connectOrCreate?: UserCreateOrConnectWithoutContactOfInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContactsInput
    upsert?: UserUpsertWithoutContactsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutContactsInput, UserUpdateWithoutContactsInput>, UserUncheckedUpdateWithoutContactsInput>
  }

  export type UserUpdateOneRequiredWithoutContactOfNestedInput = {
    create?: XOR<UserCreateWithoutContactOfInput, UserUncheckedCreateWithoutContactOfInput>
    connectOrCreate?: UserCreateOrConnectWithoutContactOfInput
    upsert?: UserUpsertWithoutContactOfInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutContactOfInput, UserUpdateWithoutContactOfInput>, UserUncheckedUpdateWithoutContactOfInput>
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ConversationParticipantCreateNestedManyWithoutConversationInput = {
    create?: XOR<ConversationParticipantCreateWithoutConversationInput, ConversationParticipantUncheckedCreateWithoutConversationInput> | ConversationParticipantCreateWithoutConversationInput[] | ConversationParticipantUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: ConversationParticipantCreateOrConnectWithoutConversationInput | ConversationParticipantCreateOrConnectWithoutConversationInput[]
    createMany?: ConversationParticipantCreateManyConversationInputEnvelope
    connect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
  }

  export type UserAnswerCreateNestedManyWithoutConversationInput = {
    create?: XOR<UserAnswerCreateWithoutConversationInput, UserAnswerUncheckedCreateWithoutConversationInput> | UserAnswerCreateWithoutConversationInput[] | UserAnswerUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutConversationInput | UserAnswerCreateOrConnectWithoutConversationInput[]
    createMany?: UserAnswerCreateManyConversationInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<ConversationParticipantCreateWithoutConversationInput, ConversationParticipantUncheckedCreateWithoutConversationInput> | ConversationParticipantCreateWithoutConversationInput[] | ConversationParticipantUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: ConversationParticipantCreateOrConnectWithoutConversationInput | ConversationParticipantCreateOrConnectWithoutConversationInput[]
    createMany?: ConversationParticipantCreateManyConversationInputEnvelope
    connect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
  }

  export type UserAnswerUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<UserAnswerCreateWithoutConversationInput, UserAnswerUncheckedCreateWithoutConversationInput> | UserAnswerCreateWithoutConversationInput[] | UserAnswerUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutConversationInput | UserAnswerCreateOrConnectWithoutConversationInput[]
    createMany?: UserAnswerCreateManyConversationInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ConversationParticipantUpdateManyWithoutConversationNestedInput = {
    create?: XOR<ConversationParticipantCreateWithoutConversationInput, ConversationParticipantUncheckedCreateWithoutConversationInput> | ConversationParticipantCreateWithoutConversationInput[] | ConversationParticipantUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: ConversationParticipantCreateOrConnectWithoutConversationInput | ConversationParticipantCreateOrConnectWithoutConversationInput[]
    upsert?: ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput | ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: ConversationParticipantCreateManyConversationInputEnvelope
    set?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    disconnect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    delete?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    connect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    update?: ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput | ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: ConversationParticipantUpdateManyWithWhereWithoutConversationInput | ConversationParticipantUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: ConversationParticipantScalarWhereInput | ConversationParticipantScalarWhereInput[]
  }

  export type UserAnswerUpdateManyWithoutConversationNestedInput = {
    create?: XOR<UserAnswerCreateWithoutConversationInput, UserAnswerUncheckedCreateWithoutConversationInput> | UserAnswerCreateWithoutConversationInput[] | UserAnswerUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutConversationInput | UserAnswerCreateOrConnectWithoutConversationInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutConversationInput | UserAnswerUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: UserAnswerCreateManyConversationInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutConversationInput | UserAnswerUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutConversationInput | UserAnswerUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<ConversationParticipantCreateWithoutConversationInput, ConversationParticipantUncheckedCreateWithoutConversationInput> | ConversationParticipantCreateWithoutConversationInput[] | ConversationParticipantUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: ConversationParticipantCreateOrConnectWithoutConversationInput | ConversationParticipantCreateOrConnectWithoutConversationInput[]
    upsert?: ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput | ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: ConversationParticipantCreateManyConversationInputEnvelope
    set?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    disconnect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    delete?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    connect?: ConversationParticipantWhereUniqueInput | ConversationParticipantWhereUniqueInput[]
    update?: ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput | ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: ConversationParticipantUpdateManyWithWhereWithoutConversationInput | ConversationParticipantUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: ConversationParticipantScalarWhereInput | ConversationParticipantScalarWhereInput[]
  }

  export type UserAnswerUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<UserAnswerCreateWithoutConversationInput, UserAnswerUncheckedCreateWithoutConversationInput> | UserAnswerCreateWithoutConversationInput[] | UserAnswerUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutConversationInput | UserAnswerCreateOrConnectWithoutConversationInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutConversationInput | UserAnswerUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: UserAnswerCreateManyConversationInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutConversationInput | UserAnswerUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutConversationInput | UserAnswerUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type ConversationCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<ConversationCreateWithoutParticipantsInput, ConversationUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutParticipantsInput
    connect?: ConversationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type ConversationUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<ConversationCreateWithoutParticipantsInput, ConversationUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutParticipantsInput
    upsert?: ConversationUpsertWithoutParticipantsInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutParticipantsInput, ConversationUpdateWithoutParticipantsInput>, ConversationUncheckedUpdateWithoutParticipantsInput>
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    upsert?: UserUpsertWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentMessagesInput, UserUpdateWithoutSentMessagesInput>, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserCreateNestedOneWithoutQuestionGroupsInput = {
    create?: XOR<UserCreateWithoutQuestionGroupsInput, UserUncheckedCreateWithoutQuestionGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestionGroupsInput
    connect?: UserWhereUniqueInput
  }

  export type QuestionCreateNestedManyWithoutGroupInput = {
    create?: XOR<QuestionCreateWithoutGroupInput, QuestionUncheckedCreateWithoutGroupInput> | QuestionCreateWithoutGroupInput[] | QuestionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutGroupInput | QuestionCreateOrConnectWithoutGroupInput[]
    createMany?: QuestionCreateManyGroupInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type QuestionOptionCreateNestedManyWithoutGroupInput = {
    create?: XOR<QuestionOptionCreateWithoutGroupInput, QuestionOptionUncheckedCreateWithoutGroupInput> | QuestionOptionCreateWithoutGroupInput[] | QuestionOptionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutGroupInput | QuestionOptionCreateOrConnectWithoutGroupInput[]
    createMany?: QuestionOptionCreateManyGroupInputEnvelope
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
  }

  export type QuestionGroupCategoryCreateNestedManyWithoutQuestionGroupInput = {
    create?: XOR<QuestionGroupCategoryCreateWithoutQuestionGroupInput, QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput> | QuestionGroupCategoryCreateWithoutQuestionGroupInput[] | QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput[]
    connectOrCreate?: QuestionGroupCategoryCreateOrConnectWithoutQuestionGroupInput | QuestionGroupCategoryCreateOrConnectWithoutQuestionGroupInput[]
    createMany?: QuestionGroupCategoryCreateManyQuestionGroupInputEnvelope
    connect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
  }

  export type UserAnswerCreateNestedManyWithoutQuestionGroupInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionGroupInput, UserAnswerUncheckedCreateWithoutQuestionGroupInput> | UserAnswerCreateWithoutQuestionGroupInput[] | UserAnswerUncheckedCreateWithoutQuestionGroupInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionGroupInput | UserAnswerCreateOrConnectWithoutQuestionGroupInput[]
    createMany?: UserAnswerCreateManyQuestionGroupInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<QuestionCreateWithoutGroupInput, QuestionUncheckedCreateWithoutGroupInput> | QuestionCreateWithoutGroupInput[] | QuestionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutGroupInput | QuestionCreateOrConnectWithoutGroupInput[]
    createMany?: QuestionCreateManyGroupInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type QuestionOptionUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<QuestionOptionCreateWithoutGroupInput, QuestionOptionUncheckedCreateWithoutGroupInput> | QuestionOptionCreateWithoutGroupInput[] | QuestionOptionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutGroupInput | QuestionOptionCreateOrConnectWithoutGroupInput[]
    createMany?: QuestionOptionCreateManyGroupInputEnvelope
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
  }

  export type QuestionGroupCategoryUncheckedCreateNestedManyWithoutQuestionGroupInput = {
    create?: XOR<QuestionGroupCategoryCreateWithoutQuestionGroupInput, QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput> | QuestionGroupCategoryCreateWithoutQuestionGroupInput[] | QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput[]
    connectOrCreate?: QuestionGroupCategoryCreateOrConnectWithoutQuestionGroupInput | QuestionGroupCategoryCreateOrConnectWithoutQuestionGroupInput[]
    createMany?: QuestionGroupCategoryCreateManyQuestionGroupInputEnvelope
    connect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
  }

  export type UserAnswerUncheckedCreateNestedManyWithoutQuestionGroupInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionGroupInput, UserAnswerUncheckedCreateWithoutQuestionGroupInput> | UserAnswerCreateWithoutQuestionGroupInput[] | UserAnswerUncheckedCreateWithoutQuestionGroupInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionGroupInput | UserAnswerCreateOrConnectWithoutQuestionGroupInput[]
    createMany?: UserAnswerCreateManyQuestionGroupInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutQuestionGroupsNestedInput = {
    create?: XOR<UserCreateWithoutQuestionGroupsInput, UserUncheckedCreateWithoutQuestionGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestionGroupsInput
    upsert?: UserUpsertWithoutQuestionGroupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuestionGroupsInput, UserUpdateWithoutQuestionGroupsInput>, UserUncheckedUpdateWithoutQuestionGroupsInput>
  }

  export type QuestionUpdateManyWithoutGroupNestedInput = {
    create?: XOR<QuestionCreateWithoutGroupInput, QuestionUncheckedCreateWithoutGroupInput> | QuestionCreateWithoutGroupInput[] | QuestionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutGroupInput | QuestionCreateOrConnectWithoutGroupInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutGroupInput | QuestionUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: QuestionCreateManyGroupInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutGroupInput | QuestionUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutGroupInput | QuestionUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type QuestionOptionUpdateManyWithoutGroupNestedInput = {
    create?: XOR<QuestionOptionCreateWithoutGroupInput, QuestionOptionUncheckedCreateWithoutGroupInput> | QuestionOptionCreateWithoutGroupInput[] | QuestionOptionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutGroupInput | QuestionOptionCreateOrConnectWithoutGroupInput[]
    upsert?: QuestionOptionUpsertWithWhereUniqueWithoutGroupInput | QuestionOptionUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: QuestionOptionCreateManyGroupInputEnvelope
    set?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    disconnect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    delete?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    update?: QuestionOptionUpdateWithWhereUniqueWithoutGroupInput | QuestionOptionUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: QuestionOptionUpdateManyWithWhereWithoutGroupInput | QuestionOptionUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
  }

  export type QuestionGroupCategoryUpdateManyWithoutQuestionGroupNestedInput = {
    create?: XOR<QuestionGroupCategoryCreateWithoutQuestionGroupInput, QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput> | QuestionGroupCategoryCreateWithoutQuestionGroupInput[] | QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput[]
    connectOrCreate?: QuestionGroupCategoryCreateOrConnectWithoutQuestionGroupInput | QuestionGroupCategoryCreateOrConnectWithoutQuestionGroupInput[]
    upsert?: QuestionGroupCategoryUpsertWithWhereUniqueWithoutQuestionGroupInput | QuestionGroupCategoryUpsertWithWhereUniqueWithoutQuestionGroupInput[]
    createMany?: QuestionGroupCategoryCreateManyQuestionGroupInputEnvelope
    set?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    disconnect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    delete?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    connect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    update?: QuestionGroupCategoryUpdateWithWhereUniqueWithoutQuestionGroupInput | QuestionGroupCategoryUpdateWithWhereUniqueWithoutQuestionGroupInput[]
    updateMany?: QuestionGroupCategoryUpdateManyWithWhereWithoutQuestionGroupInput | QuestionGroupCategoryUpdateManyWithWhereWithoutQuestionGroupInput[]
    deleteMany?: QuestionGroupCategoryScalarWhereInput | QuestionGroupCategoryScalarWhereInput[]
  }

  export type UserAnswerUpdateManyWithoutQuestionGroupNestedInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionGroupInput, UserAnswerUncheckedCreateWithoutQuestionGroupInput> | UserAnswerCreateWithoutQuestionGroupInput[] | UserAnswerUncheckedCreateWithoutQuestionGroupInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionGroupInput | UserAnswerCreateOrConnectWithoutQuestionGroupInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutQuestionGroupInput | UserAnswerUpsertWithWhereUniqueWithoutQuestionGroupInput[]
    createMany?: UserAnswerCreateManyQuestionGroupInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutQuestionGroupInput | UserAnswerUpdateWithWhereUniqueWithoutQuestionGroupInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutQuestionGroupInput | UserAnswerUpdateManyWithWhereWithoutQuestionGroupInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<QuestionCreateWithoutGroupInput, QuestionUncheckedCreateWithoutGroupInput> | QuestionCreateWithoutGroupInput[] | QuestionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutGroupInput | QuestionCreateOrConnectWithoutGroupInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutGroupInput | QuestionUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: QuestionCreateManyGroupInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutGroupInput | QuestionUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutGroupInput | QuestionUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type QuestionOptionUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<QuestionOptionCreateWithoutGroupInput, QuestionOptionUncheckedCreateWithoutGroupInput> | QuestionOptionCreateWithoutGroupInput[] | QuestionOptionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutGroupInput | QuestionOptionCreateOrConnectWithoutGroupInput[]
    upsert?: QuestionOptionUpsertWithWhereUniqueWithoutGroupInput | QuestionOptionUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: QuestionOptionCreateManyGroupInputEnvelope
    set?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    disconnect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    delete?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    update?: QuestionOptionUpdateWithWhereUniqueWithoutGroupInput | QuestionOptionUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: QuestionOptionUpdateManyWithWhereWithoutGroupInput | QuestionOptionUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
  }

  export type QuestionGroupCategoryUncheckedUpdateManyWithoutQuestionGroupNestedInput = {
    create?: XOR<QuestionGroupCategoryCreateWithoutQuestionGroupInput, QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput> | QuestionGroupCategoryCreateWithoutQuestionGroupInput[] | QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput[]
    connectOrCreate?: QuestionGroupCategoryCreateOrConnectWithoutQuestionGroupInput | QuestionGroupCategoryCreateOrConnectWithoutQuestionGroupInput[]
    upsert?: QuestionGroupCategoryUpsertWithWhereUniqueWithoutQuestionGroupInput | QuestionGroupCategoryUpsertWithWhereUniqueWithoutQuestionGroupInput[]
    createMany?: QuestionGroupCategoryCreateManyQuestionGroupInputEnvelope
    set?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    disconnect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    delete?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    connect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    update?: QuestionGroupCategoryUpdateWithWhereUniqueWithoutQuestionGroupInput | QuestionGroupCategoryUpdateWithWhereUniqueWithoutQuestionGroupInput[]
    updateMany?: QuestionGroupCategoryUpdateManyWithWhereWithoutQuestionGroupInput | QuestionGroupCategoryUpdateManyWithWhereWithoutQuestionGroupInput[]
    deleteMany?: QuestionGroupCategoryScalarWhereInput | QuestionGroupCategoryScalarWhereInput[]
  }

  export type UserAnswerUncheckedUpdateManyWithoutQuestionGroupNestedInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionGroupInput, UserAnswerUncheckedCreateWithoutQuestionGroupInput> | UserAnswerCreateWithoutQuestionGroupInput[] | UserAnswerUncheckedCreateWithoutQuestionGroupInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionGroupInput | UserAnswerCreateOrConnectWithoutQuestionGroupInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutQuestionGroupInput | UserAnswerUpsertWithWhereUniqueWithoutQuestionGroupInput[]
    createMany?: UserAnswerCreateManyQuestionGroupInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutQuestionGroupInput | UserAnswerUpdateWithWhereUniqueWithoutQuestionGroupInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutQuestionGroupInput | UserAnswerUpdateManyWithWhereWithoutQuestionGroupInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type QuestionGroupCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<QuestionGroupCreateWithoutQuestionsInput, QuestionGroupUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutQuestionsInput
    connect?: QuestionGroupWhereUniqueInput
  }

  export type QuestionGroupUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<QuestionGroupCreateWithoutQuestionsInput, QuestionGroupUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutQuestionsInput
    upsert?: QuestionGroupUpsertWithoutQuestionsInput
    connect?: QuestionGroupWhereUniqueInput
    update?: XOR<XOR<QuestionGroupUpdateToOneWithWhereWithoutQuestionsInput, QuestionGroupUpdateWithoutQuestionsInput>, QuestionGroupUncheckedUpdateWithoutQuestionsInput>
  }

  export type UserAnswerCreateNestedManyWithoutQuestionOptionInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionOptionInput, UserAnswerUncheckedCreateWithoutQuestionOptionInput> | UserAnswerCreateWithoutQuestionOptionInput[] | UserAnswerUncheckedCreateWithoutQuestionOptionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionOptionInput | UserAnswerCreateOrConnectWithoutQuestionOptionInput[]
    createMany?: UserAnswerCreateManyQuestionOptionInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type QuestionGroupCreateNestedOneWithoutOptionsInput = {
    create?: XOR<QuestionGroupCreateWithoutOptionsInput, QuestionGroupUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutOptionsInput
    connect?: QuestionGroupWhereUniqueInput
  }

  export type UserAnswerUncheckedCreateNestedManyWithoutQuestionOptionInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionOptionInput, UserAnswerUncheckedCreateWithoutQuestionOptionInput> | UserAnswerCreateWithoutQuestionOptionInput[] | UserAnswerUncheckedCreateWithoutQuestionOptionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionOptionInput | UserAnswerCreateOrConnectWithoutQuestionOptionInput[]
    createMany?: UserAnswerCreateManyQuestionOptionInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type UserAnswerUpdateManyWithoutQuestionOptionNestedInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionOptionInput, UserAnswerUncheckedCreateWithoutQuestionOptionInput> | UserAnswerCreateWithoutQuestionOptionInput[] | UserAnswerUncheckedCreateWithoutQuestionOptionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionOptionInput | UserAnswerCreateOrConnectWithoutQuestionOptionInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutQuestionOptionInput | UserAnswerUpsertWithWhereUniqueWithoutQuestionOptionInput[]
    createMany?: UserAnswerCreateManyQuestionOptionInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutQuestionOptionInput | UserAnswerUpdateWithWhereUniqueWithoutQuestionOptionInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutQuestionOptionInput | UserAnswerUpdateManyWithWhereWithoutQuestionOptionInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type QuestionGroupUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<QuestionGroupCreateWithoutOptionsInput, QuestionGroupUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutOptionsInput
    upsert?: QuestionGroupUpsertWithoutOptionsInput
    connect?: QuestionGroupWhereUniqueInput
    update?: XOR<XOR<QuestionGroupUpdateToOneWithWhereWithoutOptionsInput, QuestionGroupUpdateWithoutOptionsInput>, QuestionGroupUncheckedUpdateWithoutOptionsInput>
  }

  export type UserAnswerUncheckedUpdateManyWithoutQuestionOptionNestedInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionOptionInput, UserAnswerUncheckedCreateWithoutQuestionOptionInput> | UserAnswerCreateWithoutQuestionOptionInput[] | UserAnswerUncheckedCreateWithoutQuestionOptionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionOptionInput | UserAnswerCreateOrConnectWithoutQuestionOptionInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutQuestionOptionInput | UserAnswerUpsertWithWhereUniqueWithoutQuestionOptionInput[]
    createMany?: UserAnswerCreateManyQuestionOptionInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutQuestionOptionInput | UserAnswerUpdateWithWhereUniqueWithoutQuestionOptionInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutQuestionOptionInput | UserAnswerUpdateManyWithWhereWithoutQuestionOptionInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type CategoryTranslationCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput> | CategoryTranslationCreateWithoutCategoryInput[] | CategoryTranslationUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryTranslationCreateOrConnectWithoutCategoryInput | CategoryTranslationCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryTranslationCreateManyCategoryInputEnvelope
    connect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
  }

  export type QuestionGroupCategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<QuestionGroupCategoryCreateWithoutCategoryInput, QuestionGroupCategoryUncheckedCreateWithoutCategoryInput> | QuestionGroupCategoryCreateWithoutCategoryInput[] | QuestionGroupCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: QuestionGroupCategoryCreateOrConnectWithoutCategoryInput | QuestionGroupCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: QuestionGroupCategoryCreateManyCategoryInputEnvelope
    connect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
  }

  export type UserQuestionPreferenceCreateNestedManyWithoutCategoryInput = {
    create?: XOR<UserQuestionPreferenceCreateWithoutCategoryInput, UserQuestionPreferenceUncheckedCreateWithoutCategoryInput> | UserQuestionPreferenceCreateWithoutCategoryInput[] | UserQuestionPreferenceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserQuestionPreferenceCreateOrConnectWithoutCategoryInput | UserQuestionPreferenceCreateOrConnectWithoutCategoryInput[]
    createMany?: UserQuestionPreferenceCreateManyCategoryInputEnvelope
    connect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
  }

  export type CategoryTranslationUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput> | CategoryTranslationCreateWithoutCategoryInput[] | CategoryTranslationUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryTranslationCreateOrConnectWithoutCategoryInput | CategoryTranslationCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryTranslationCreateManyCategoryInputEnvelope
    connect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
  }

  export type QuestionGroupCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<QuestionGroupCategoryCreateWithoutCategoryInput, QuestionGroupCategoryUncheckedCreateWithoutCategoryInput> | QuestionGroupCategoryCreateWithoutCategoryInput[] | QuestionGroupCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: QuestionGroupCategoryCreateOrConnectWithoutCategoryInput | QuestionGroupCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: QuestionGroupCategoryCreateManyCategoryInputEnvelope
    connect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
  }

  export type UserQuestionPreferenceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<UserQuestionPreferenceCreateWithoutCategoryInput, UserQuestionPreferenceUncheckedCreateWithoutCategoryInput> | UserQuestionPreferenceCreateWithoutCategoryInput[] | UserQuestionPreferenceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserQuestionPreferenceCreateOrConnectWithoutCategoryInput | UserQuestionPreferenceCreateOrConnectWithoutCategoryInput[]
    createMany?: UserQuestionPreferenceCreateManyCategoryInputEnvelope
    connect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
  }

  export type CategoryTranslationUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput> | CategoryTranslationCreateWithoutCategoryInput[] | CategoryTranslationUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryTranslationCreateOrConnectWithoutCategoryInput | CategoryTranslationCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput | CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryTranslationCreateManyCategoryInputEnvelope
    set?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    disconnect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    delete?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    connect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    update?: CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput | CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryTranslationUpdateManyWithWhereWithoutCategoryInput | CategoryTranslationUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryTranslationScalarWhereInput | CategoryTranslationScalarWhereInput[]
  }

  export type QuestionGroupCategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<QuestionGroupCategoryCreateWithoutCategoryInput, QuestionGroupCategoryUncheckedCreateWithoutCategoryInput> | QuestionGroupCategoryCreateWithoutCategoryInput[] | QuestionGroupCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: QuestionGroupCategoryCreateOrConnectWithoutCategoryInput | QuestionGroupCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: QuestionGroupCategoryUpsertWithWhereUniqueWithoutCategoryInput | QuestionGroupCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: QuestionGroupCategoryCreateManyCategoryInputEnvelope
    set?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    disconnect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    delete?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    connect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    update?: QuestionGroupCategoryUpdateWithWhereUniqueWithoutCategoryInput | QuestionGroupCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: QuestionGroupCategoryUpdateManyWithWhereWithoutCategoryInput | QuestionGroupCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: QuestionGroupCategoryScalarWhereInput | QuestionGroupCategoryScalarWhereInput[]
  }

  export type UserQuestionPreferenceUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<UserQuestionPreferenceCreateWithoutCategoryInput, UserQuestionPreferenceUncheckedCreateWithoutCategoryInput> | UserQuestionPreferenceCreateWithoutCategoryInput[] | UserQuestionPreferenceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserQuestionPreferenceCreateOrConnectWithoutCategoryInput | UserQuestionPreferenceCreateOrConnectWithoutCategoryInput[]
    upsert?: UserQuestionPreferenceUpsertWithWhereUniqueWithoutCategoryInput | UserQuestionPreferenceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: UserQuestionPreferenceCreateManyCategoryInputEnvelope
    set?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    disconnect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    delete?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    connect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    update?: UserQuestionPreferenceUpdateWithWhereUniqueWithoutCategoryInput | UserQuestionPreferenceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: UserQuestionPreferenceUpdateManyWithWhereWithoutCategoryInput | UserQuestionPreferenceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: UserQuestionPreferenceScalarWhereInput | UserQuestionPreferenceScalarWhereInput[]
  }

  export type CategoryTranslationUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput> | CategoryTranslationCreateWithoutCategoryInput[] | CategoryTranslationUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryTranslationCreateOrConnectWithoutCategoryInput | CategoryTranslationCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput | CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryTranslationCreateManyCategoryInputEnvelope
    set?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    disconnect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    delete?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    connect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    update?: CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput | CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryTranslationUpdateManyWithWhereWithoutCategoryInput | CategoryTranslationUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryTranslationScalarWhereInput | CategoryTranslationScalarWhereInput[]
  }

  export type QuestionGroupCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<QuestionGroupCategoryCreateWithoutCategoryInput, QuestionGroupCategoryUncheckedCreateWithoutCategoryInput> | QuestionGroupCategoryCreateWithoutCategoryInput[] | QuestionGroupCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: QuestionGroupCategoryCreateOrConnectWithoutCategoryInput | QuestionGroupCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: QuestionGroupCategoryUpsertWithWhereUniqueWithoutCategoryInput | QuestionGroupCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: QuestionGroupCategoryCreateManyCategoryInputEnvelope
    set?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    disconnect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    delete?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    connect?: QuestionGroupCategoryWhereUniqueInput | QuestionGroupCategoryWhereUniqueInput[]
    update?: QuestionGroupCategoryUpdateWithWhereUniqueWithoutCategoryInput | QuestionGroupCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: QuestionGroupCategoryUpdateManyWithWhereWithoutCategoryInput | QuestionGroupCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: QuestionGroupCategoryScalarWhereInput | QuestionGroupCategoryScalarWhereInput[]
  }

  export type UserQuestionPreferenceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<UserQuestionPreferenceCreateWithoutCategoryInput, UserQuestionPreferenceUncheckedCreateWithoutCategoryInput> | UserQuestionPreferenceCreateWithoutCategoryInput[] | UserQuestionPreferenceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserQuestionPreferenceCreateOrConnectWithoutCategoryInput | UserQuestionPreferenceCreateOrConnectWithoutCategoryInput[]
    upsert?: UserQuestionPreferenceUpsertWithWhereUniqueWithoutCategoryInput | UserQuestionPreferenceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: UserQuestionPreferenceCreateManyCategoryInputEnvelope
    set?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    disconnect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    delete?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    connect?: UserQuestionPreferenceWhereUniqueInput | UserQuestionPreferenceWhereUniqueInput[]
    update?: UserQuestionPreferenceUpdateWithWhereUniqueWithoutCategoryInput | UserQuestionPreferenceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: UserQuestionPreferenceUpdateManyWithWhereWithoutCategoryInput | UserQuestionPreferenceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: UserQuestionPreferenceScalarWhereInput | UserQuestionPreferenceScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<CategoryCreateWithoutTranslationsInput, CategoryUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTranslationsInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<CategoryCreateWithoutTranslationsInput, CategoryUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTranslationsInput
    upsert?: CategoryUpsertWithoutTranslationsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutTranslationsInput, CategoryUpdateWithoutTranslationsInput>, CategoryUncheckedUpdateWithoutTranslationsInput>
  }

  export type QuestionGroupCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<QuestionGroupCreateWithoutCategoriesInput, QuestionGroupUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutCategoriesInput
    connect?: QuestionGroupWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutGroupLinksInput = {
    create?: XOR<CategoryCreateWithoutGroupLinksInput, CategoryUncheckedCreateWithoutGroupLinksInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutGroupLinksInput
    connect?: CategoryWhereUniqueInput
  }

  export type QuestionGroupUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<QuestionGroupCreateWithoutCategoriesInput, QuestionGroupUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutCategoriesInput
    upsert?: QuestionGroupUpsertWithoutCategoriesInput
    connect?: QuestionGroupWhereUniqueInput
    update?: XOR<XOR<QuestionGroupUpdateToOneWithWhereWithoutCategoriesInput, QuestionGroupUpdateWithoutCategoriesInput>, QuestionGroupUncheckedUpdateWithoutCategoriesInput>
  }

  export type CategoryUpdateOneRequiredWithoutGroupLinksNestedInput = {
    create?: XOR<CategoryCreateWithoutGroupLinksInput, CategoryUncheckedCreateWithoutGroupLinksInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutGroupLinksInput
    upsert?: CategoryUpsertWithoutGroupLinksInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutGroupLinksInput, CategoryUpdateWithoutGroupLinksInput>, CategoryUncheckedUpdateWithoutGroupLinksInput>
  }

  export type UserCreateNestedOneWithoutQuestionPreferencesInput = {
    create?: XOR<UserCreateWithoutQuestionPreferencesInput, UserUncheckedCreateWithoutQuestionPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestionPreferencesInput
    connect?: UserWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutUserPreferencesInput = {
    create?: XOR<CategoryCreateWithoutUserPreferencesInput, CategoryUncheckedCreateWithoutUserPreferencesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutUserPreferencesInput
    connect?: CategoryWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutQuestionPreferencesNestedInput = {
    create?: XOR<UserCreateWithoutQuestionPreferencesInput, UserUncheckedCreateWithoutQuestionPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestionPreferencesInput
    upsert?: UserUpsertWithoutQuestionPreferencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuestionPreferencesInput, UserUpdateWithoutQuestionPreferencesInput>, UserUncheckedUpdateWithoutQuestionPreferencesInput>
  }

  export type CategoryUpdateOneRequiredWithoutUserPreferencesNestedInput = {
    create?: XOR<CategoryCreateWithoutUserPreferencesInput, CategoryUncheckedCreateWithoutUserPreferencesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutUserPreferencesInput
    upsert?: CategoryUpsertWithoutUserPreferencesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutUserPreferencesInput, CategoryUpdateWithoutUserPreferencesInput>, CategoryUncheckedUpdateWithoutUserPreferencesInput>
  }

  export type UserCreateNestedOneWithoutAnswersInput = {
    create?: XOR<UserCreateWithoutAnswersInput, UserUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnswersInput
    connect?: UserWhereUniqueInput
  }

  export type QuestionGroupCreateNestedOneWithoutAnswersInput = {
    create?: XOR<QuestionGroupCreateWithoutAnswersInput, QuestionGroupUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutAnswersInput
    connect?: QuestionGroupWhereUniqueInput
  }

  export type QuestionOptionCreateNestedOneWithoutAnswersInput = {
    create?: XOR<QuestionOptionCreateWithoutAnswersInput, QuestionOptionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutAnswersInput
    connect?: QuestionOptionWhereUniqueInput
  }

  export type ConversationCreateNestedOneWithoutUserAnswerInput = {
    create?: XOR<ConversationCreateWithoutUserAnswerInput, ConversationUncheckedCreateWithoutUserAnswerInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutUserAnswerInput
    connect?: ConversationWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<UserCreateWithoutAnswersInput, UserUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnswersInput
    upsert?: UserUpsertWithoutAnswersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnswersInput, UserUpdateWithoutAnswersInput>, UserUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionGroupUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<QuestionGroupCreateWithoutAnswersInput, QuestionGroupUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionGroupCreateOrConnectWithoutAnswersInput
    upsert?: QuestionGroupUpsertWithoutAnswersInput
    connect?: QuestionGroupWhereUniqueInput
    update?: XOR<XOR<QuestionGroupUpdateToOneWithWhereWithoutAnswersInput, QuestionGroupUpdateWithoutAnswersInput>, QuestionGroupUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionOptionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<QuestionOptionCreateWithoutAnswersInput, QuestionOptionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutAnswersInput
    upsert?: QuestionOptionUpsertWithoutAnswersInput
    connect?: QuestionOptionWhereUniqueInput
    update?: XOR<XOR<QuestionOptionUpdateToOneWithWhereWithoutAnswersInput, QuestionOptionUpdateWithoutAnswersInput>, QuestionOptionUncheckedUpdateWithoutAnswersInput>
  }

  export type ConversationUpdateOneWithoutUserAnswerNestedInput = {
    create?: XOR<ConversationCreateWithoutUserAnswerInput, ConversationUncheckedCreateWithoutUserAnswerInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutUserAnswerInput
    upsert?: ConversationUpsertWithoutUserAnswerInput
    disconnect?: ConversationWhereInput | boolean
    delete?: ConversationWhereInput | boolean
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutUserAnswerInput, ConversationUpdateWithoutUserAnswerInput>, ConversationUncheckedUpdateWithoutUserAnswerInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UserCreateWithoutAuthInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    questionGroups?: QuestionGroupCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantCreateNestedManyWithoutUserInput
    contacts?: UserContactCreateNestedManyWithoutUserInput
    contactOf?: UserContactCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceCreateNestedManyWithoutUserInput
    answers?: UserAnswerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    questionGroups?: QuestionGroupUncheckedCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantUncheckedCreateNestedManyWithoutUserInput
    contacts?: UserContactUncheckedCreateNestedManyWithoutUserInput
    contactOf?: UserContactUncheckedCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutUserInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthInput, UserUncheckedCreateWithoutAuthInput>
  }

  export type UserUpsertWithoutAuthInput = {
    update: XOR<UserUpdateWithoutAuthInput, UserUncheckedUpdateWithoutAuthInput>
    create: XOR<UserCreateWithoutAuthInput, UserUncheckedCreateWithoutAuthInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthInput, UserUncheckedUpdateWithoutAuthInput>
  }

  export type UserUpdateWithoutAuthInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    questionGroups?: QuestionGroupUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUpdateManyWithoutUserNestedInput
    contacts?: UserContactUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    questionGroups?: QuestionGroupUncheckedUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput
    contacts?: UserContactUncheckedUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUncheckedUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AuthCreateWithoutUserInput = {
    id?: string
    email: string
    password: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthUncheckedCreateWithoutUserInput = {
    id?: string
    email: string
    password: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthCreateOrConnectWithoutUserInput = {
    where: AuthWhereUniqueInput
    create: XOR<AuthCreateWithoutUserInput, AuthUncheckedCreateWithoutUserInput>
  }

  export type QuestionGroupCreateWithoutAuthorInput = {
    id?: string
    type: number
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    questions?: QuestionCreateNestedManyWithoutGroupInput
    options?: QuestionOptionCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryCreateNestedManyWithoutQuestionGroupInput
    answers?: UserAnswerCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupUncheckedCreateWithoutAuthorInput = {
    id?: string
    type: number
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    questions?: QuestionUncheckedCreateNestedManyWithoutGroupInput
    options?: QuestionOptionUncheckedCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryUncheckedCreateNestedManyWithoutQuestionGroupInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupCreateOrConnectWithoutAuthorInput = {
    where: QuestionGroupWhereUniqueInput
    create: XOR<QuestionGroupCreateWithoutAuthorInput, QuestionGroupUncheckedCreateWithoutAuthorInput>
  }

  export type QuestionGroupCreateManyAuthorInputEnvelope = {
    data: QuestionGroupCreateManyAuthorInput | QuestionGroupCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutSenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    editedAt?: Date | string | null
    isRead?: boolean
    isDeleted?: boolean
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    editedAt?: Date | string | null
    isRead?: boolean
    isDeleted?: boolean
    conversationId: string
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type ConversationParticipantCreateWithoutUserInput = {
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutParticipantsInput
  }

  export type ConversationParticipantUncheckedCreateWithoutUserInput = {
    conversationId: string
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationParticipantCreateOrConnectWithoutUserInput = {
    where: ConversationParticipantWhereUniqueInput
    create: XOR<ConversationParticipantCreateWithoutUserInput, ConversationParticipantUncheckedCreateWithoutUserInput>
  }

  export type ConversationParticipantCreateManyUserInputEnvelope = {
    data: ConversationParticipantCreateManyUserInput | ConversationParticipantCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserContactCreateWithoutUserInput = {
    createdAt?: Date | string
    contact: UserCreateNestedOneWithoutContactOfInput
  }

  export type UserContactUncheckedCreateWithoutUserInput = {
    contactId: string
    createdAt?: Date | string
  }

  export type UserContactCreateOrConnectWithoutUserInput = {
    where: UserContactWhereUniqueInput
    create: XOR<UserContactCreateWithoutUserInput, UserContactUncheckedCreateWithoutUserInput>
  }

  export type UserContactCreateManyUserInputEnvelope = {
    data: UserContactCreateManyUserInput | UserContactCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserContactCreateWithoutContactInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutContactsInput
  }

  export type UserContactUncheckedCreateWithoutContactInput = {
    userId: string
    createdAt?: Date | string
  }

  export type UserContactCreateOrConnectWithoutContactInput = {
    where: UserContactWhereUniqueInput
    create: XOR<UserContactCreateWithoutContactInput, UserContactUncheckedCreateWithoutContactInput>
  }

  export type UserContactCreateManyContactInputEnvelope = {
    data: UserContactCreateManyContactInput | UserContactCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type UserQuestionPreferenceCreateWithoutUserInput = {
    enabled?: boolean
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutUserPreferencesInput
  }

  export type UserQuestionPreferenceUncheckedCreateWithoutUserInput = {
    categoryId: number
    enabled?: boolean
    updatedAt?: Date | string
  }

  export type UserQuestionPreferenceCreateOrConnectWithoutUserInput = {
    where: UserQuestionPreferenceWhereUniqueInput
    create: XOR<UserQuestionPreferenceCreateWithoutUserInput, UserQuestionPreferenceUncheckedCreateWithoutUserInput>
  }

  export type UserQuestionPreferenceCreateManyUserInputEnvelope = {
    data: UserQuestionPreferenceCreateManyUserInput | UserQuestionPreferenceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserAnswerCreateWithoutUserInput = {
    id?: string
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
    questionGroup: QuestionGroupCreateNestedOneWithoutAnswersInput
    questionOption: QuestionOptionCreateNestedOneWithoutAnswersInput
    conversation?: ConversationCreateNestedOneWithoutUserAnswerInput
  }

  export type UserAnswerUncheckedCreateWithoutUserInput = {
    id?: string
    questionGroupId: string
    questionOptionId: string
    conversationId?: string | null
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type UserAnswerCreateOrConnectWithoutUserInput = {
    where: UserAnswerWhereUniqueInput
    create: XOR<UserAnswerCreateWithoutUserInput, UserAnswerUncheckedCreateWithoutUserInput>
  }

  export type UserAnswerCreateManyUserInputEnvelope = {
    data: UserAnswerCreateManyUserInput | UserAnswerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthUpsertWithoutUserInput = {
    update: XOR<AuthUpdateWithoutUserInput, AuthUncheckedUpdateWithoutUserInput>
    create: XOR<AuthCreateWithoutUserInput, AuthUncheckedCreateWithoutUserInput>
    where?: AuthWhereInput
  }

  export type AuthUpdateToOneWithWhereWithoutUserInput = {
    where?: AuthWhereInput
    data: XOR<AuthUpdateWithoutUserInput, AuthUncheckedUpdateWithoutUserInput>
  }

  export type AuthUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionGroupUpsertWithWhereUniqueWithoutAuthorInput = {
    where: QuestionGroupWhereUniqueInput
    update: XOR<QuestionGroupUpdateWithoutAuthorInput, QuestionGroupUncheckedUpdateWithoutAuthorInput>
    create: XOR<QuestionGroupCreateWithoutAuthorInput, QuestionGroupUncheckedCreateWithoutAuthorInput>
  }

  export type QuestionGroupUpdateWithWhereUniqueWithoutAuthorInput = {
    where: QuestionGroupWhereUniqueInput
    data: XOR<QuestionGroupUpdateWithoutAuthorInput, QuestionGroupUncheckedUpdateWithoutAuthorInput>
  }

  export type QuestionGroupUpdateManyWithWhereWithoutAuthorInput = {
    where: QuestionGroupScalarWhereInput
    data: XOR<QuestionGroupUpdateManyMutationInput, QuestionGroupUncheckedUpdateManyWithoutAuthorInput>
  }

  export type QuestionGroupScalarWhereInput = {
    AND?: QuestionGroupScalarWhereInput | QuestionGroupScalarWhereInput[]
    OR?: QuestionGroupScalarWhereInput[]
    NOT?: QuestionGroupScalarWhereInput | QuestionGroupScalarWhereInput[]
    id?: StringFilter<"QuestionGroup"> | string
    type?: IntFilter<"QuestionGroup"> | number
    authorId?: StringFilter<"QuestionGroup"> | string
    createdAt?: DateTimeFilter<"QuestionGroup"> | Date | string
    isModerated?: BoolFilter<"QuestionGroup"> | boolean
    moderatedAt?: DateTimeNullableFilter<"QuestionGroup"> | Date | string | null
    pinned?: BoolFilter<"QuestionGroup"> | boolean
    enabled?: BoolFilter<"QuestionGroup"> | boolean
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    isRead?: BoolFilter<"Message"> | boolean
    isDeleted?: BoolFilter<"Message"> | boolean
    conversationId?: StringFilter<"Message"> | string
  }

  export type ConversationParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationParticipantWhereUniqueInput
    update: XOR<ConversationParticipantUpdateWithoutUserInput, ConversationParticipantUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationParticipantCreateWithoutUserInput, ConversationParticipantUncheckedCreateWithoutUserInput>
  }

  export type ConversationParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationParticipantWhereUniqueInput
    data: XOR<ConversationParticipantUpdateWithoutUserInput, ConversationParticipantUncheckedUpdateWithoutUserInput>
  }

  export type ConversationParticipantUpdateManyWithWhereWithoutUserInput = {
    where: ConversationParticipantScalarWhereInput
    data: XOR<ConversationParticipantUpdateManyMutationInput, ConversationParticipantUncheckedUpdateManyWithoutUserInput>
  }

  export type ConversationParticipantScalarWhereInput = {
    AND?: ConversationParticipantScalarWhereInput | ConversationParticipantScalarWhereInput[]
    OR?: ConversationParticipantScalarWhereInput[]
    NOT?: ConversationParticipantScalarWhereInput | ConversationParticipantScalarWhereInput[]
    conversationId?: StringFilter<"ConversationParticipant"> | string
    userId?: StringFilter<"ConversationParticipant"> | string
    isIcebreakerReady?: BoolFilter<"ConversationParticipant"> | boolean
    hasGivenAnswer?: BoolFilter<"ConversationParticipant"> | boolean
    createdAt?: DateTimeFilter<"ConversationParticipant"> | Date | string
    updatedAt?: DateTimeFilter<"ConversationParticipant"> | Date | string
  }

  export type UserContactUpsertWithWhereUniqueWithoutUserInput = {
    where: UserContactWhereUniqueInput
    update: XOR<UserContactUpdateWithoutUserInput, UserContactUncheckedUpdateWithoutUserInput>
    create: XOR<UserContactCreateWithoutUserInput, UserContactUncheckedCreateWithoutUserInput>
  }

  export type UserContactUpdateWithWhereUniqueWithoutUserInput = {
    where: UserContactWhereUniqueInput
    data: XOR<UserContactUpdateWithoutUserInput, UserContactUncheckedUpdateWithoutUserInput>
  }

  export type UserContactUpdateManyWithWhereWithoutUserInput = {
    where: UserContactScalarWhereInput
    data: XOR<UserContactUpdateManyMutationInput, UserContactUncheckedUpdateManyWithoutUserInput>
  }

  export type UserContactScalarWhereInput = {
    AND?: UserContactScalarWhereInput | UserContactScalarWhereInput[]
    OR?: UserContactScalarWhereInput[]
    NOT?: UserContactScalarWhereInput | UserContactScalarWhereInput[]
    userId?: StringFilter<"UserContact"> | string
    contactId?: StringFilter<"UserContact"> | string
    createdAt?: DateTimeFilter<"UserContact"> | Date | string
  }

  export type UserContactUpsertWithWhereUniqueWithoutContactInput = {
    where: UserContactWhereUniqueInput
    update: XOR<UserContactUpdateWithoutContactInput, UserContactUncheckedUpdateWithoutContactInput>
    create: XOR<UserContactCreateWithoutContactInput, UserContactUncheckedCreateWithoutContactInput>
  }

  export type UserContactUpdateWithWhereUniqueWithoutContactInput = {
    where: UserContactWhereUniqueInput
    data: XOR<UserContactUpdateWithoutContactInput, UserContactUncheckedUpdateWithoutContactInput>
  }

  export type UserContactUpdateManyWithWhereWithoutContactInput = {
    where: UserContactScalarWhereInput
    data: XOR<UserContactUpdateManyMutationInput, UserContactUncheckedUpdateManyWithoutContactInput>
  }

  export type UserQuestionPreferenceUpsertWithWhereUniqueWithoutUserInput = {
    where: UserQuestionPreferenceWhereUniqueInput
    update: XOR<UserQuestionPreferenceUpdateWithoutUserInput, UserQuestionPreferenceUncheckedUpdateWithoutUserInput>
    create: XOR<UserQuestionPreferenceCreateWithoutUserInput, UserQuestionPreferenceUncheckedCreateWithoutUserInput>
  }

  export type UserQuestionPreferenceUpdateWithWhereUniqueWithoutUserInput = {
    where: UserQuestionPreferenceWhereUniqueInput
    data: XOR<UserQuestionPreferenceUpdateWithoutUserInput, UserQuestionPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type UserQuestionPreferenceUpdateManyWithWhereWithoutUserInput = {
    where: UserQuestionPreferenceScalarWhereInput
    data: XOR<UserQuestionPreferenceUpdateManyMutationInput, UserQuestionPreferenceUncheckedUpdateManyWithoutUserInput>
  }

  export type UserQuestionPreferenceScalarWhereInput = {
    AND?: UserQuestionPreferenceScalarWhereInput | UserQuestionPreferenceScalarWhereInput[]
    OR?: UserQuestionPreferenceScalarWhereInput[]
    NOT?: UserQuestionPreferenceScalarWhereInput | UserQuestionPreferenceScalarWhereInput[]
    userId?: StringFilter<"UserQuestionPreference"> | string
    categoryId?: IntFilter<"UserQuestionPreference"> | number
    enabled?: BoolFilter<"UserQuestionPreference"> | boolean
    updatedAt?: DateTimeFilter<"UserQuestionPreference"> | Date | string
  }

  export type UserAnswerUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAnswerWhereUniqueInput
    update: XOR<UserAnswerUpdateWithoutUserInput, UserAnswerUncheckedUpdateWithoutUserInput>
    create: XOR<UserAnswerCreateWithoutUserInput, UserAnswerUncheckedCreateWithoutUserInput>
  }

  export type UserAnswerUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAnswerWhereUniqueInput
    data: XOR<UserAnswerUpdateWithoutUserInput, UserAnswerUncheckedUpdateWithoutUserInput>
  }

  export type UserAnswerUpdateManyWithWhereWithoutUserInput = {
    where: UserAnswerScalarWhereInput
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAnswerScalarWhereInput = {
    AND?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
    OR?: UserAnswerScalarWhereInput[]
    NOT?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
    id?: StringFilter<"UserAnswer"> | string
    userId?: StringFilter<"UserAnswer"> | string
    questionGroupId?: StringFilter<"UserAnswer"> | string
    questionOptionId?: StringFilter<"UserAnswer"> | string
    conversationId?: StringNullableFilter<"UserAnswer"> | string | null
    answeredAt?: DateTimeFilter<"UserAnswer"> | Date | string
    updatedAt?: DateTimeFilter<"UserAnswer"> | Date | string
    note?: StringNullableFilter<"UserAnswer"> | string | null
    isFlagged?: BoolFilter<"UserAnswer"> | boolean
  }

  export type UserCreateWithoutContactsInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantCreateNestedManyWithoutUserInput
    contactOf?: UserContactCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceCreateNestedManyWithoutUserInput
    answers?: UserAnswerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutContactsInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthUncheckedCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupUncheckedCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantUncheckedCreateNestedManyWithoutUserInput
    contactOf?: UserContactUncheckedCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutUserInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutContactsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
  }

  export type UserCreateWithoutContactOfInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantCreateNestedManyWithoutUserInput
    contacts?: UserContactCreateNestedManyWithoutUserInput
    questionPreferences?: UserQuestionPreferenceCreateNestedManyWithoutUserInput
    answers?: UserAnswerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutContactOfInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthUncheckedCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupUncheckedCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantUncheckedCreateNestedManyWithoutUserInput
    contacts?: UserContactUncheckedCreateNestedManyWithoutUserInput
    questionPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutUserInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutContactOfInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContactOfInput, UserUncheckedCreateWithoutContactOfInput>
  }

  export type UserUpsertWithoutContactsInput = {
    update: XOR<UserUpdateWithoutContactsInput, UserUncheckedUpdateWithoutContactsInput>
    create: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutContactsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutContactsInput, UserUncheckedUpdateWithoutContactsInput>
  }

  export type UserUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUncheckedUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUncheckedUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUncheckedUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutContactOfInput = {
    update: XOR<UserUpdateWithoutContactOfInput, UserUncheckedUpdateWithoutContactOfInput>
    create: XOR<UserCreateWithoutContactOfInput, UserUncheckedCreateWithoutContactOfInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutContactOfInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutContactOfInput, UserUncheckedUpdateWithoutContactOfInput>
  }

  export type UserUpdateWithoutContactOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUpdateManyWithoutUserNestedInput
    contacts?: UserContactUpdateManyWithoutUserNestedInput
    questionPreferences?: UserQuestionPreferenceUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutContactOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUncheckedUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUncheckedUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput
    contacts?: UserContactUncheckedUpdateManyWithoutUserNestedInput
    questionPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    content: string
    createdAt?: Date | string
    editedAt?: Date | string | null
    isRead?: boolean
    isDeleted?: boolean
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    senderId: string
    content: string
    createdAt?: Date | string
    editedAt?: Date | string | null
    isRead?: boolean
    isDeleted?: boolean
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type ConversationParticipantCreateWithoutConversationInput = {
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
  }

  export type ConversationParticipantUncheckedCreateWithoutConversationInput = {
    userId: string
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationParticipantCreateOrConnectWithoutConversationInput = {
    where: ConversationParticipantWhereUniqueInput
    create: XOR<ConversationParticipantCreateWithoutConversationInput, ConversationParticipantUncheckedCreateWithoutConversationInput>
  }

  export type ConversationParticipantCreateManyConversationInputEnvelope = {
    data: ConversationParticipantCreateManyConversationInput | ConversationParticipantCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UserAnswerCreateWithoutConversationInput = {
    id?: string
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
    user: UserCreateNestedOneWithoutAnswersInput
    questionGroup: QuestionGroupCreateNestedOneWithoutAnswersInput
    questionOption: QuestionOptionCreateNestedOneWithoutAnswersInput
  }

  export type UserAnswerUncheckedCreateWithoutConversationInput = {
    id?: string
    userId: string
    questionGroupId: string
    questionOptionId: string
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type UserAnswerCreateOrConnectWithoutConversationInput = {
    where: UserAnswerWhereUniqueInput
    create: XOR<UserAnswerCreateWithoutConversationInput, UserAnswerUncheckedCreateWithoutConversationInput>
  }

  export type UserAnswerCreateManyConversationInputEnvelope = {
    data: UserAnswerCreateManyConversationInput | UserAnswerCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput = {
    where: ConversationParticipantWhereUniqueInput
    update: XOR<ConversationParticipantUpdateWithoutConversationInput, ConversationParticipantUncheckedUpdateWithoutConversationInput>
    create: XOR<ConversationParticipantCreateWithoutConversationInput, ConversationParticipantUncheckedCreateWithoutConversationInput>
  }

  export type ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput = {
    where: ConversationParticipantWhereUniqueInput
    data: XOR<ConversationParticipantUpdateWithoutConversationInput, ConversationParticipantUncheckedUpdateWithoutConversationInput>
  }

  export type ConversationParticipantUpdateManyWithWhereWithoutConversationInput = {
    where: ConversationParticipantScalarWhereInput
    data: XOR<ConversationParticipantUpdateManyMutationInput, ConversationParticipantUncheckedUpdateManyWithoutConversationInput>
  }

  export type UserAnswerUpsertWithWhereUniqueWithoutConversationInput = {
    where: UserAnswerWhereUniqueInput
    update: XOR<UserAnswerUpdateWithoutConversationInput, UserAnswerUncheckedUpdateWithoutConversationInput>
    create: XOR<UserAnswerCreateWithoutConversationInput, UserAnswerUncheckedCreateWithoutConversationInput>
  }

  export type UserAnswerUpdateWithWhereUniqueWithoutConversationInput = {
    where: UserAnswerWhereUniqueInput
    data: XOR<UserAnswerUpdateWithoutConversationInput, UserAnswerUncheckedUpdateWithoutConversationInput>
  }

  export type UserAnswerUpdateManyWithWhereWithoutConversationInput = {
    where: UserAnswerScalarWhereInput
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyWithoutConversationInput>
  }

  export type ConversationCreateWithoutParticipantsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
    UserAnswer?: UserAnswerCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutParticipantsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    UserAnswer?: UserAnswerUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutParticipantsInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutParticipantsInput, ConversationUncheckedCreateWithoutParticipantsInput>
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    contacts?: UserContactCreateNestedManyWithoutUserInput
    contactOf?: UserContactCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceCreateNestedManyWithoutUserInput
    answers?: UserAnswerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthUncheckedCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupUncheckedCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    contacts?: UserContactUncheckedCreateNestedManyWithoutUserInput
    contactOf?: UserContactUncheckedCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutUserInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type ConversationUpsertWithoutParticipantsInput = {
    update: XOR<ConversationUpdateWithoutParticipantsInput, ConversationUncheckedUpdateWithoutParticipantsInput>
    create: XOR<ConversationCreateWithoutParticipantsInput, ConversationUncheckedCreateWithoutParticipantsInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutParticipantsInput, ConversationUncheckedUpdateWithoutParticipantsInput>
  }

  export type ConversationUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
    UserAnswer?: UserAnswerUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    UserAnswer?: UserAnswerUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    contacts?: UserContactUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUncheckedUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUncheckedUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    contacts?: UserContactUncheckedUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUncheckedUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: ConversationParticipantCreateNestedManyWithoutConversationInput
    UserAnswer?: UserAnswerCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput
    UserAnswer?: UserAnswerUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutSentMessagesInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupCreateNestedManyWithoutAuthorInput
    conversations?: ConversationParticipantCreateNestedManyWithoutUserInput
    contacts?: UserContactCreateNestedManyWithoutUserInput
    contactOf?: UserContactCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceCreateNestedManyWithoutUserInput
    answers?: UserAnswerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthUncheckedCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupUncheckedCreateNestedManyWithoutAuthorInput
    conversations?: ConversationParticipantUncheckedCreateNestedManyWithoutUserInput
    contacts?: UserContactUncheckedCreateNestedManyWithoutUserInput
    contactOf?: UserContactUncheckedCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutUserInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ConversationParticipantUpdateManyWithoutConversationNestedInput
    UserAnswer?: UserAnswerUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput
    UserAnswer?: UserAnswerUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUpdateManyWithoutAuthorNestedInput
    conversations?: ConversationParticipantUpdateManyWithoutUserNestedInput
    contacts?: UserContactUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUncheckedUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUncheckedUpdateManyWithoutAuthorNestedInput
    conversations?: ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput
    contacts?: UserContactUncheckedUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUncheckedUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutQuestionGroupsInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantCreateNestedManyWithoutUserInput
    contacts?: UserContactCreateNestedManyWithoutUserInput
    contactOf?: UserContactCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceCreateNestedManyWithoutUserInput
    answers?: UserAnswerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQuestionGroupsInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantUncheckedCreateNestedManyWithoutUserInput
    contacts?: UserContactUncheckedCreateNestedManyWithoutUserInput
    contactOf?: UserContactUncheckedCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutUserInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQuestionGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuestionGroupsInput, UserUncheckedCreateWithoutQuestionGroupsInput>
  }

  export type QuestionCreateWithoutGroupInput = {
    id?: string
    locale: string
    question: string
  }

  export type QuestionUncheckedCreateWithoutGroupInput = {
    id?: string
    locale: string
    question: string
  }

  export type QuestionCreateOrConnectWithoutGroupInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutGroupInput, QuestionUncheckedCreateWithoutGroupInput>
  }

  export type QuestionCreateManyGroupInputEnvelope = {
    data: QuestionCreateManyGroupInput | QuestionCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type QuestionOptionCreateWithoutGroupInput = {
    id?: string
    locale: string
    label: string
    order: number
    answers?: UserAnswerCreateNestedManyWithoutQuestionOptionInput
  }

  export type QuestionOptionUncheckedCreateWithoutGroupInput = {
    id?: string
    locale: string
    label: string
    order: number
    answers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionOptionInput
  }

  export type QuestionOptionCreateOrConnectWithoutGroupInput = {
    where: QuestionOptionWhereUniqueInput
    create: XOR<QuestionOptionCreateWithoutGroupInput, QuestionOptionUncheckedCreateWithoutGroupInput>
  }

  export type QuestionOptionCreateManyGroupInputEnvelope = {
    data: QuestionOptionCreateManyGroupInput | QuestionOptionCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type QuestionGroupCategoryCreateWithoutQuestionGroupInput = {
    category: CategoryCreateNestedOneWithoutGroupLinksInput
  }

  export type QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput = {
    categoryId: number
  }

  export type QuestionGroupCategoryCreateOrConnectWithoutQuestionGroupInput = {
    where: QuestionGroupCategoryWhereUniqueInput
    create: XOR<QuestionGroupCategoryCreateWithoutQuestionGroupInput, QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput>
  }

  export type QuestionGroupCategoryCreateManyQuestionGroupInputEnvelope = {
    data: QuestionGroupCategoryCreateManyQuestionGroupInput | QuestionGroupCategoryCreateManyQuestionGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserAnswerCreateWithoutQuestionGroupInput = {
    id?: string
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
    user: UserCreateNestedOneWithoutAnswersInput
    questionOption: QuestionOptionCreateNestedOneWithoutAnswersInput
    conversation?: ConversationCreateNestedOneWithoutUserAnswerInput
  }

  export type UserAnswerUncheckedCreateWithoutQuestionGroupInput = {
    id?: string
    userId: string
    questionOptionId: string
    conversationId?: string | null
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type UserAnswerCreateOrConnectWithoutQuestionGroupInput = {
    where: UserAnswerWhereUniqueInput
    create: XOR<UserAnswerCreateWithoutQuestionGroupInput, UserAnswerUncheckedCreateWithoutQuestionGroupInput>
  }

  export type UserAnswerCreateManyQuestionGroupInputEnvelope = {
    data: UserAnswerCreateManyQuestionGroupInput | UserAnswerCreateManyQuestionGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutQuestionGroupsInput = {
    update: XOR<UserUpdateWithoutQuestionGroupsInput, UserUncheckedUpdateWithoutQuestionGroupsInput>
    create: XOR<UserCreateWithoutQuestionGroupsInput, UserUncheckedCreateWithoutQuestionGroupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuestionGroupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuestionGroupsInput, UserUncheckedUpdateWithoutQuestionGroupsInput>
  }

  export type UserUpdateWithoutQuestionGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUpdateManyWithoutUserNestedInput
    contacts?: UserContactUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQuestionGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput
    contacts?: UserContactUncheckedUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUncheckedUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutUserNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type QuestionUpsertWithWhereUniqueWithoutGroupInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutGroupInput, QuestionUncheckedUpdateWithoutGroupInput>
    create: XOR<QuestionCreateWithoutGroupInput, QuestionUncheckedCreateWithoutGroupInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutGroupInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutGroupInput, QuestionUncheckedUpdateWithoutGroupInput>
  }

  export type QuestionUpdateManyWithWhereWithoutGroupInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutGroupInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: StringFilter<"Question"> | string
    groupId?: StringFilter<"Question"> | string
    locale?: StringFilter<"Question"> | string
    question?: StringFilter<"Question"> | string
  }

  export type QuestionOptionUpsertWithWhereUniqueWithoutGroupInput = {
    where: QuestionOptionWhereUniqueInput
    update: XOR<QuestionOptionUpdateWithoutGroupInput, QuestionOptionUncheckedUpdateWithoutGroupInput>
    create: XOR<QuestionOptionCreateWithoutGroupInput, QuestionOptionUncheckedCreateWithoutGroupInput>
  }

  export type QuestionOptionUpdateWithWhereUniqueWithoutGroupInput = {
    where: QuestionOptionWhereUniqueInput
    data: XOR<QuestionOptionUpdateWithoutGroupInput, QuestionOptionUncheckedUpdateWithoutGroupInput>
  }

  export type QuestionOptionUpdateManyWithWhereWithoutGroupInput = {
    where: QuestionOptionScalarWhereInput
    data: XOR<QuestionOptionUpdateManyMutationInput, QuestionOptionUncheckedUpdateManyWithoutGroupInput>
  }

  export type QuestionOptionScalarWhereInput = {
    AND?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
    OR?: QuestionOptionScalarWhereInput[]
    NOT?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
    id?: StringFilter<"QuestionOption"> | string
    groupId?: StringFilter<"QuestionOption"> | string
    locale?: StringFilter<"QuestionOption"> | string
    label?: StringFilter<"QuestionOption"> | string
    order?: IntFilter<"QuestionOption"> | number
  }

  export type QuestionGroupCategoryUpsertWithWhereUniqueWithoutQuestionGroupInput = {
    where: QuestionGroupCategoryWhereUniqueInput
    update: XOR<QuestionGroupCategoryUpdateWithoutQuestionGroupInput, QuestionGroupCategoryUncheckedUpdateWithoutQuestionGroupInput>
    create: XOR<QuestionGroupCategoryCreateWithoutQuestionGroupInput, QuestionGroupCategoryUncheckedCreateWithoutQuestionGroupInput>
  }

  export type QuestionGroupCategoryUpdateWithWhereUniqueWithoutQuestionGroupInput = {
    where: QuestionGroupCategoryWhereUniqueInput
    data: XOR<QuestionGroupCategoryUpdateWithoutQuestionGroupInput, QuestionGroupCategoryUncheckedUpdateWithoutQuestionGroupInput>
  }

  export type QuestionGroupCategoryUpdateManyWithWhereWithoutQuestionGroupInput = {
    where: QuestionGroupCategoryScalarWhereInput
    data: XOR<QuestionGroupCategoryUpdateManyMutationInput, QuestionGroupCategoryUncheckedUpdateManyWithoutQuestionGroupInput>
  }

  export type QuestionGroupCategoryScalarWhereInput = {
    AND?: QuestionGroupCategoryScalarWhereInput | QuestionGroupCategoryScalarWhereInput[]
    OR?: QuestionGroupCategoryScalarWhereInput[]
    NOT?: QuestionGroupCategoryScalarWhereInput | QuestionGroupCategoryScalarWhereInput[]
    questionGroupId?: StringFilter<"QuestionGroupCategory"> | string
    categoryId?: IntFilter<"QuestionGroupCategory"> | number
  }

  export type UserAnswerUpsertWithWhereUniqueWithoutQuestionGroupInput = {
    where: UserAnswerWhereUniqueInput
    update: XOR<UserAnswerUpdateWithoutQuestionGroupInput, UserAnswerUncheckedUpdateWithoutQuestionGroupInput>
    create: XOR<UserAnswerCreateWithoutQuestionGroupInput, UserAnswerUncheckedCreateWithoutQuestionGroupInput>
  }

  export type UserAnswerUpdateWithWhereUniqueWithoutQuestionGroupInput = {
    where: UserAnswerWhereUniqueInput
    data: XOR<UserAnswerUpdateWithoutQuestionGroupInput, UserAnswerUncheckedUpdateWithoutQuestionGroupInput>
  }

  export type UserAnswerUpdateManyWithWhereWithoutQuestionGroupInput = {
    where: UserAnswerScalarWhereInput
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyWithoutQuestionGroupInput>
  }

  export type QuestionGroupCreateWithoutQuestionsInput = {
    id?: string
    type: number
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    author: UserCreateNestedOneWithoutQuestionGroupsInput
    options?: QuestionOptionCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryCreateNestedManyWithoutQuestionGroupInput
    answers?: UserAnswerCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupUncheckedCreateWithoutQuestionsInput = {
    id?: string
    type: number
    authorId: string
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    options?: QuestionOptionUncheckedCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryUncheckedCreateNestedManyWithoutQuestionGroupInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupCreateOrConnectWithoutQuestionsInput = {
    where: QuestionGroupWhereUniqueInput
    create: XOR<QuestionGroupCreateWithoutQuestionsInput, QuestionGroupUncheckedCreateWithoutQuestionsInput>
  }

  export type QuestionGroupUpsertWithoutQuestionsInput = {
    update: XOR<QuestionGroupUpdateWithoutQuestionsInput, QuestionGroupUncheckedUpdateWithoutQuestionsInput>
    create: XOR<QuestionGroupCreateWithoutQuestionsInput, QuestionGroupUncheckedCreateWithoutQuestionsInput>
    where?: QuestionGroupWhereInput
  }

  export type QuestionGroupUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: QuestionGroupWhereInput
    data: XOR<QuestionGroupUpdateWithoutQuestionsInput, QuestionGroupUncheckedUpdateWithoutQuestionsInput>
  }

  export type QuestionGroupUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutQuestionGroupsNestedInput
    options?: QuestionOptionUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUpdateManyWithoutQuestionGroupNestedInput
    answers?: UserAnswerUpdateManyWithoutQuestionGroupNestedInput
  }

  export type QuestionGroupUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    options?: QuestionOptionUncheckedUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUncheckedUpdateManyWithoutQuestionGroupNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutQuestionGroupNestedInput
  }

  export type UserAnswerCreateWithoutQuestionOptionInput = {
    id?: string
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
    user: UserCreateNestedOneWithoutAnswersInput
    questionGroup: QuestionGroupCreateNestedOneWithoutAnswersInput
    conversation?: ConversationCreateNestedOneWithoutUserAnswerInput
  }

  export type UserAnswerUncheckedCreateWithoutQuestionOptionInput = {
    id?: string
    userId: string
    questionGroupId: string
    conversationId?: string | null
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type UserAnswerCreateOrConnectWithoutQuestionOptionInput = {
    where: UserAnswerWhereUniqueInput
    create: XOR<UserAnswerCreateWithoutQuestionOptionInput, UserAnswerUncheckedCreateWithoutQuestionOptionInput>
  }

  export type UserAnswerCreateManyQuestionOptionInputEnvelope = {
    data: UserAnswerCreateManyQuestionOptionInput | UserAnswerCreateManyQuestionOptionInput[]
    skipDuplicates?: boolean
  }

  export type QuestionGroupCreateWithoutOptionsInput = {
    id?: string
    type: number
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    author: UserCreateNestedOneWithoutQuestionGroupsInput
    questions?: QuestionCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryCreateNestedManyWithoutQuestionGroupInput
    answers?: UserAnswerCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupUncheckedCreateWithoutOptionsInput = {
    id?: string
    type: number
    authorId: string
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    questions?: QuestionUncheckedCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryUncheckedCreateNestedManyWithoutQuestionGroupInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupCreateOrConnectWithoutOptionsInput = {
    where: QuestionGroupWhereUniqueInput
    create: XOR<QuestionGroupCreateWithoutOptionsInput, QuestionGroupUncheckedCreateWithoutOptionsInput>
  }

  export type UserAnswerUpsertWithWhereUniqueWithoutQuestionOptionInput = {
    where: UserAnswerWhereUniqueInput
    update: XOR<UserAnswerUpdateWithoutQuestionOptionInput, UserAnswerUncheckedUpdateWithoutQuestionOptionInput>
    create: XOR<UserAnswerCreateWithoutQuestionOptionInput, UserAnswerUncheckedCreateWithoutQuestionOptionInput>
  }

  export type UserAnswerUpdateWithWhereUniqueWithoutQuestionOptionInput = {
    where: UserAnswerWhereUniqueInput
    data: XOR<UserAnswerUpdateWithoutQuestionOptionInput, UserAnswerUncheckedUpdateWithoutQuestionOptionInput>
  }

  export type UserAnswerUpdateManyWithWhereWithoutQuestionOptionInput = {
    where: UserAnswerScalarWhereInput
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyWithoutQuestionOptionInput>
  }

  export type QuestionGroupUpsertWithoutOptionsInput = {
    update: XOR<QuestionGroupUpdateWithoutOptionsInput, QuestionGroupUncheckedUpdateWithoutOptionsInput>
    create: XOR<QuestionGroupCreateWithoutOptionsInput, QuestionGroupUncheckedCreateWithoutOptionsInput>
    where?: QuestionGroupWhereInput
  }

  export type QuestionGroupUpdateToOneWithWhereWithoutOptionsInput = {
    where?: QuestionGroupWhereInput
    data: XOR<QuestionGroupUpdateWithoutOptionsInput, QuestionGroupUncheckedUpdateWithoutOptionsInput>
  }

  export type QuestionGroupUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutQuestionGroupsNestedInput
    questions?: QuestionUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUpdateManyWithoutQuestionGroupNestedInput
    answers?: UserAnswerUpdateManyWithoutQuestionGroupNestedInput
  }

  export type QuestionGroupUncheckedUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    questions?: QuestionUncheckedUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUncheckedUpdateManyWithoutQuestionGroupNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutQuestionGroupNestedInput
  }

  export type CategoryTranslationCreateWithoutCategoryInput = {
    locale: string
    label: string
  }

  export type CategoryTranslationUncheckedCreateWithoutCategoryInput = {
    locale: string
    label: string
  }

  export type CategoryTranslationCreateOrConnectWithoutCategoryInput = {
    where: CategoryTranslationWhereUniqueInput
    create: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryTranslationCreateManyCategoryInputEnvelope = {
    data: CategoryTranslationCreateManyCategoryInput | CategoryTranslationCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type QuestionGroupCategoryCreateWithoutCategoryInput = {
    questionGroup: QuestionGroupCreateNestedOneWithoutCategoriesInput
  }

  export type QuestionGroupCategoryUncheckedCreateWithoutCategoryInput = {
    questionGroupId: string
  }

  export type QuestionGroupCategoryCreateOrConnectWithoutCategoryInput = {
    where: QuestionGroupCategoryWhereUniqueInput
    create: XOR<QuestionGroupCategoryCreateWithoutCategoryInput, QuestionGroupCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type QuestionGroupCategoryCreateManyCategoryInputEnvelope = {
    data: QuestionGroupCategoryCreateManyCategoryInput | QuestionGroupCategoryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserQuestionPreferenceCreateWithoutCategoryInput = {
    enabled?: boolean
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutQuestionPreferencesInput
  }

  export type UserQuestionPreferenceUncheckedCreateWithoutCategoryInput = {
    userId: string
    enabled?: boolean
    updatedAt?: Date | string
  }

  export type UserQuestionPreferenceCreateOrConnectWithoutCategoryInput = {
    where: UserQuestionPreferenceWhereUniqueInput
    create: XOR<UserQuestionPreferenceCreateWithoutCategoryInput, UserQuestionPreferenceUncheckedCreateWithoutCategoryInput>
  }

  export type UserQuestionPreferenceCreateManyCategoryInputEnvelope = {
    data: UserQuestionPreferenceCreateManyCategoryInput | UserQuestionPreferenceCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CategoryTranslationWhereUniqueInput
    update: XOR<CategoryTranslationUpdateWithoutCategoryInput, CategoryTranslationUncheckedUpdateWithoutCategoryInput>
    create: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CategoryTranslationWhereUniqueInput
    data: XOR<CategoryTranslationUpdateWithoutCategoryInput, CategoryTranslationUncheckedUpdateWithoutCategoryInput>
  }

  export type CategoryTranslationUpdateManyWithWhereWithoutCategoryInput = {
    where: CategoryTranslationScalarWhereInput
    data: XOR<CategoryTranslationUpdateManyMutationInput, CategoryTranslationUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoryTranslationScalarWhereInput = {
    AND?: CategoryTranslationScalarWhereInput | CategoryTranslationScalarWhereInput[]
    OR?: CategoryTranslationScalarWhereInput[]
    NOT?: CategoryTranslationScalarWhereInput | CategoryTranslationScalarWhereInput[]
    categoryId?: IntFilter<"CategoryTranslation"> | number
    locale?: StringFilter<"CategoryTranslation"> | string
    label?: StringFilter<"CategoryTranslation"> | string
  }

  export type QuestionGroupCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: QuestionGroupCategoryWhereUniqueInput
    update: XOR<QuestionGroupCategoryUpdateWithoutCategoryInput, QuestionGroupCategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<QuestionGroupCategoryCreateWithoutCategoryInput, QuestionGroupCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type QuestionGroupCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: QuestionGroupCategoryWhereUniqueInput
    data: XOR<QuestionGroupCategoryUpdateWithoutCategoryInput, QuestionGroupCategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type QuestionGroupCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: QuestionGroupCategoryScalarWhereInput
    data: XOR<QuestionGroupCategoryUpdateManyMutationInput, QuestionGroupCategoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserQuestionPreferenceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: UserQuestionPreferenceWhereUniqueInput
    update: XOR<UserQuestionPreferenceUpdateWithoutCategoryInput, UserQuestionPreferenceUncheckedUpdateWithoutCategoryInput>
    create: XOR<UserQuestionPreferenceCreateWithoutCategoryInput, UserQuestionPreferenceUncheckedCreateWithoutCategoryInput>
  }

  export type UserQuestionPreferenceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: UserQuestionPreferenceWhereUniqueInput
    data: XOR<UserQuestionPreferenceUpdateWithoutCategoryInput, UserQuestionPreferenceUncheckedUpdateWithoutCategoryInput>
  }

  export type UserQuestionPreferenceUpdateManyWithWhereWithoutCategoryInput = {
    where: UserQuestionPreferenceScalarWhereInput
    data: XOR<UserQuestionPreferenceUpdateManyMutationInput, UserQuestionPreferenceUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoryCreateWithoutTranslationsInput = {
    id: number
    groupLinks?: QuestionGroupCategoryCreateNestedManyWithoutCategoryInput
    userPreferences?: UserQuestionPreferenceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutTranslationsInput = {
    id: number
    groupLinks?: QuestionGroupCategoryUncheckedCreateNestedManyWithoutCategoryInput
    userPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutTranslationsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutTranslationsInput, CategoryUncheckedCreateWithoutTranslationsInput>
  }

  export type CategoryUpsertWithoutTranslationsInput = {
    update: XOR<CategoryUpdateWithoutTranslationsInput, CategoryUncheckedUpdateWithoutTranslationsInput>
    create: XOR<CategoryCreateWithoutTranslationsInput, CategoryUncheckedCreateWithoutTranslationsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutTranslationsInput, CategoryUncheckedUpdateWithoutTranslationsInput>
  }

  export type CategoryUpdateWithoutTranslationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    groupLinks?: QuestionGroupCategoryUpdateManyWithoutCategoryNestedInput
    userPreferences?: UserQuestionPreferenceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutTranslationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    groupLinks?: QuestionGroupCategoryUncheckedUpdateManyWithoutCategoryNestedInput
    userPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type QuestionGroupCreateWithoutCategoriesInput = {
    id?: string
    type: number
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    author: UserCreateNestedOneWithoutQuestionGroupsInput
    questions?: QuestionCreateNestedManyWithoutGroupInput
    options?: QuestionOptionCreateNestedManyWithoutGroupInput
    answers?: UserAnswerCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupUncheckedCreateWithoutCategoriesInput = {
    id?: string
    type: number
    authorId: string
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    questions?: QuestionUncheckedCreateNestedManyWithoutGroupInput
    options?: QuestionOptionUncheckedCreateNestedManyWithoutGroupInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupCreateOrConnectWithoutCategoriesInput = {
    where: QuestionGroupWhereUniqueInput
    create: XOR<QuestionGroupCreateWithoutCategoriesInput, QuestionGroupUncheckedCreateWithoutCategoriesInput>
  }

  export type CategoryCreateWithoutGroupLinksInput = {
    id: number
    translations?: CategoryTranslationCreateNestedManyWithoutCategoryInput
    userPreferences?: UserQuestionPreferenceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutGroupLinksInput = {
    id: number
    translations?: CategoryTranslationUncheckedCreateNestedManyWithoutCategoryInput
    userPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutGroupLinksInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutGroupLinksInput, CategoryUncheckedCreateWithoutGroupLinksInput>
  }

  export type QuestionGroupUpsertWithoutCategoriesInput = {
    update: XOR<QuestionGroupUpdateWithoutCategoriesInput, QuestionGroupUncheckedUpdateWithoutCategoriesInput>
    create: XOR<QuestionGroupCreateWithoutCategoriesInput, QuestionGroupUncheckedCreateWithoutCategoriesInput>
    where?: QuestionGroupWhereInput
  }

  export type QuestionGroupUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: QuestionGroupWhereInput
    data: XOR<QuestionGroupUpdateWithoutCategoriesInput, QuestionGroupUncheckedUpdateWithoutCategoriesInput>
  }

  export type QuestionGroupUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutQuestionGroupsNestedInput
    questions?: QuestionUpdateManyWithoutGroupNestedInput
    options?: QuestionOptionUpdateManyWithoutGroupNestedInput
    answers?: UserAnswerUpdateManyWithoutQuestionGroupNestedInput
  }

  export type QuestionGroupUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    questions?: QuestionUncheckedUpdateManyWithoutGroupNestedInput
    options?: QuestionOptionUncheckedUpdateManyWithoutGroupNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutQuestionGroupNestedInput
  }

  export type CategoryUpsertWithoutGroupLinksInput = {
    update: XOR<CategoryUpdateWithoutGroupLinksInput, CategoryUncheckedUpdateWithoutGroupLinksInput>
    create: XOR<CategoryCreateWithoutGroupLinksInput, CategoryUncheckedCreateWithoutGroupLinksInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutGroupLinksInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutGroupLinksInput, CategoryUncheckedUpdateWithoutGroupLinksInput>
  }

  export type CategoryUpdateWithoutGroupLinksInput = {
    id?: IntFieldUpdateOperationsInput | number
    translations?: CategoryTranslationUpdateManyWithoutCategoryNestedInput
    userPreferences?: UserQuestionPreferenceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutGroupLinksInput = {
    id?: IntFieldUpdateOperationsInput | number
    translations?: CategoryTranslationUncheckedUpdateManyWithoutCategoryNestedInput
    userPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type UserCreateWithoutQuestionPreferencesInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantCreateNestedManyWithoutUserInput
    contacts?: UserContactCreateNestedManyWithoutUserInput
    contactOf?: UserContactCreateNestedManyWithoutContactInput
    answers?: UserAnswerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQuestionPreferencesInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthUncheckedCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupUncheckedCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantUncheckedCreateNestedManyWithoutUserInput
    contacts?: UserContactUncheckedCreateNestedManyWithoutUserInput
    contactOf?: UserContactUncheckedCreateNestedManyWithoutContactInput
    answers?: UserAnswerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQuestionPreferencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuestionPreferencesInput, UserUncheckedCreateWithoutQuestionPreferencesInput>
  }

  export type CategoryCreateWithoutUserPreferencesInput = {
    id: number
    translations?: CategoryTranslationCreateNestedManyWithoutCategoryInput
    groupLinks?: QuestionGroupCategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutUserPreferencesInput = {
    id: number
    translations?: CategoryTranslationUncheckedCreateNestedManyWithoutCategoryInput
    groupLinks?: QuestionGroupCategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutUserPreferencesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutUserPreferencesInput, CategoryUncheckedCreateWithoutUserPreferencesInput>
  }

  export type UserUpsertWithoutQuestionPreferencesInput = {
    update: XOR<UserUpdateWithoutQuestionPreferencesInput, UserUncheckedUpdateWithoutQuestionPreferencesInput>
    create: XOR<UserCreateWithoutQuestionPreferencesInput, UserUncheckedCreateWithoutQuestionPreferencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuestionPreferencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuestionPreferencesInput, UserUncheckedUpdateWithoutQuestionPreferencesInput>
  }

  export type UserUpdateWithoutQuestionPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUpdateManyWithoutUserNestedInput
    contacts?: UserContactUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUpdateManyWithoutContactNestedInput
    answers?: UserAnswerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQuestionPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUncheckedUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUncheckedUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput
    contacts?: UserContactUncheckedUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUncheckedUpdateManyWithoutContactNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CategoryUpsertWithoutUserPreferencesInput = {
    update: XOR<CategoryUpdateWithoutUserPreferencesInput, CategoryUncheckedUpdateWithoutUserPreferencesInput>
    create: XOR<CategoryCreateWithoutUserPreferencesInput, CategoryUncheckedCreateWithoutUserPreferencesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutUserPreferencesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutUserPreferencesInput, CategoryUncheckedUpdateWithoutUserPreferencesInput>
  }

  export type CategoryUpdateWithoutUserPreferencesInput = {
    id?: IntFieldUpdateOperationsInput | number
    translations?: CategoryTranslationUpdateManyWithoutCategoryNestedInput
    groupLinks?: QuestionGroupCategoryUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutUserPreferencesInput = {
    id?: IntFieldUpdateOperationsInput | number
    translations?: CategoryTranslationUncheckedUpdateManyWithoutCategoryNestedInput
    groupLinks?: QuestionGroupCategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type UserCreateWithoutAnswersInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantCreateNestedManyWithoutUserInput
    contacts?: UserContactCreateNestedManyWithoutUserInput
    contactOf?: UserContactCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAnswersInput = {
    id?: string
    avatar?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userNumber?: number
    username: string
    isOnline?: boolean
    isAvailableForChat?: boolean
    auth?: AuthUncheckedCreateNestedOneWithoutUserInput
    questionGroups?: QuestionGroupUncheckedCreateNestedManyWithoutAuthorInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    conversations?: ConversationParticipantUncheckedCreateNestedManyWithoutUserInput
    contacts?: UserContactUncheckedCreateNestedManyWithoutUserInput
    contactOf?: UserContactUncheckedCreateNestedManyWithoutContactInput
    questionPreferences?: UserQuestionPreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAnswersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnswersInput, UserUncheckedCreateWithoutAnswersInput>
  }

  export type QuestionGroupCreateWithoutAnswersInput = {
    id?: string
    type: number
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    author: UserCreateNestedOneWithoutQuestionGroupsInput
    questions?: QuestionCreateNestedManyWithoutGroupInput
    options?: QuestionOptionCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupUncheckedCreateWithoutAnswersInput = {
    id?: string
    type: number
    authorId: string
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
    questions?: QuestionUncheckedCreateNestedManyWithoutGroupInput
    options?: QuestionOptionUncheckedCreateNestedManyWithoutGroupInput
    categories?: QuestionGroupCategoryUncheckedCreateNestedManyWithoutQuestionGroupInput
  }

  export type QuestionGroupCreateOrConnectWithoutAnswersInput = {
    where: QuestionGroupWhereUniqueInput
    create: XOR<QuestionGroupCreateWithoutAnswersInput, QuestionGroupUncheckedCreateWithoutAnswersInput>
  }

  export type QuestionOptionCreateWithoutAnswersInput = {
    id?: string
    locale: string
    label: string
    order: number
    group: QuestionGroupCreateNestedOneWithoutOptionsInput
  }

  export type QuestionOptionUncheckedCreateWithoutAnswersInput = {
    id?: string
    groupId: string
    locale: string
    label: string
    order: number
  }

  export type QuestionOptionCreateOrConnectWithoutAnswersInput = {
    where: QuestionOptionWhereUniqueInput
    create: XOR<QuestionOptionCreateWithoutAnswersInput, QuestionOptionUncheckedCreateWithoutAnswersInput>
  }

  export type ConversationCreateWithoutUserAnswerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
    participants?: ConversationParticipantCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUserAnswerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    participants?: ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUserAnswerInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUserAnswerInput, ConversationUncheckedCreateWithoutUserAnswerInput>
  }

  export type UserUpsertWithoutAnswersInput = {
    update: XOR<UserUpdateWithoutAnswersInput, UserUncheckedUpdateWithoutAnswersInput>
    create: XOR<UserCreateWithoutAnswersInput, UserUncheckedCreateWithoutAnswersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnswersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnswersInput, UserUncheckedUpdateWithoutAnswersInput>
  }

  export type UserUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUpdateManyWithoutUserNestedInput
    contacts?: UserContactUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNumber?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    isAvailableForChat?: BoolFieldUpdateOperationsInput | boolean
    auth?: AuthUncheckedUpdateOneWithoutUserNestedInput
    questionGroups?: QuestionGroupUncheckedUpdateManyWithoutAuthorNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    conversations?: ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput
    contacts?: UserContactUncheckedUpdateManyWithoutUserNestedInput
    contactOf?: UserContactUncheckedUpdateManyWithoutContactNestedInput
    questionPreferences?: UserQuestionPreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type QuestionGroupUpsertWithoutAnswersInput = {
    update: XOR<QuestionGroupUpdateWithoutAnswersInput, QuestionGroupUncheckedUpdateWithoutAnswersInput>
    create: XOR<QuestionGroupCreateWithoutAnswersInput, QuestionGroupUncheckedCreateWithoutAnswersInput>
    where?: QuestionGroupWhereInput
  }

  export type QuestionGroupUpdateToOneWithWhereWithoutAnswersInput = {
    where?: QuestionGroupWhereInput
    data: XOR<QuestionGroupUpdateWithoutAnswersInput, QuestionGroupUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionGroupUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutQuestionGroupsNestedInput
    questions?: QuestionUpdateManyWithoutGroupNestedInput
    options?: QuestionOptionUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUpdateManyWithoutQuestionGroupNestedInput
  }

  export type QuestionGroupUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    questions?: QuestionUncheckedUpdateManyWithoutGroupNestedInput
    options?: QuestionOptionUncheckedUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUncheckedUpdateManyWithoutQuestionGroupNestedInput
  }

  export type QuestionOptionUpsertWithoutAnswersInput = {
    update: XOR<QuestionOptionUpdateWithoutAnswersInput, QuestionOptionUncheckedUpdateWithoutAnswersInput>
    create: XOR<QuestionOptionCreateWithoutAnswersInput, QuestionOptionUncheckedCreateWithoutAnswersInput>
    where?: QuestionOptionWhereInput
  }

  export type QuestionOptionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: QuestionOptionWhereInput
    data: XOR<QuestionOptionUpdateWithoutAnswersInput, QuestionOptionUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionOptionUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    group?: QuestionGroupUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type QuestionOptionUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ConversationUpsertWithoutUserAnswerInput = {
    update: XOR<ConversationUpdateWithoutUserAnswerInput, ConversationUncheckedUpdateWithoutUserAnswerInput>
    create: XOR<ConversationCreateWithoutUserAnswerInput, ConversationUncheckedCreateWithoutUserAnswerInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutUserAnswerInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutUserAnswerInput, ConversationUncheckedUpdateWithoutUserAnswerInput>
  }

  export type ConversationUpdateWithoutUserAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
    participants?: ConversationParticipantUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUserAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    participants?: ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type QuestionGroupCreateManyAuthorInput = {
    id?: string
    type: number
    createdAt?: Date | string
    isModerated?: boolean
    moderatedAt?: Date | string | null
    pinned?: boolean
    enabled?: boolean
  }

  export type MessageCreateManySenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    editedAt?: Date | string | null
    isRead?: boolean
    isDeleted?: boolean
    conversationId: string
  }

  export type ConversationParticipantCreateManyUserInput = {
    conversationId: string
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserContactCreateManyUserInput = {
    contactId: string
    createdAt?: Date | string
  }

  export type UserContactCreateManyContactInput = {
    userId: string
    createdAt?: Date | string
  }

  export type UserQuestionPreferenceCreateManyUserInput = {
    categoryId: number
    enabled?: boolean
    updatedAt?: Date | string
  }

  export type UserAnswerCreateManyUserInput = {
    id?: string
    questionGroupId: string
    questionOptionId: string
    conversationId?: string | null
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type QuestionGroupUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    questions?: QuestionUpdateManyWithoutGroupNestedInput
    options?: QuestionOptionUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUpdateManyWithoutQuestionGroupNestedInput
    answers?: UserAnswerUpdateManyWithoutQuestionGroupNestedInput
  }

  export type QuestionGroupUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
    questions?: QuestionUncheckedUpdateManyWithoutGroupNestedInput
    options?: QuestionOptionUncheckedUpdateManyWithoutGroupNestedInput
    categories?: QuestionGroupCategoryUncheckedUpdateManyWithoutQuestionGroupNestedInput
    answers?: UserAnswerUncheckedUpdateManyWithoutQuestionGroupNestedInput
  }

  export type QuestionGroupUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isModerated?: BoolFieldUpdateOperationsInput | boolean
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pinned?: BoolFieldUpdateOperationsInput | boolean
    enabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    conversationId?: StringFieldUpdateOperationsInput | string
  }

  export type ConversationParticipantUpdateWithoutUserInput = {
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type ConversationParticipantUncheckedUpdateWithoutUserInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationParticipantUncheckedUpdateManyWithoutUserInput = {
    conversationId?: StringFieldUpdateOperationsInput | string
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserContactUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contact?: UserUpdateOneRequiredWithoutContactOfNestedInput
  }

  export type UserContactUncheckedUpdateWithoutUserInput = {
    contactId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserContactUncheckedUpdateManyWithoutUserInput = {
    contactId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserContactUpdateWithoutContactInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutContactsNestedInput
  }

  export type UserContactUncheckedUpdateWithoutContactInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserContactUncheckedUpdateManyWithoutContactInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionPreferenceUpdateWithoutUserInput = {
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutUserPreferencesNestedInput
  }

  export type UserQuestionPreferenceUncheckedUpdateWithoutUserInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionPreferenceUncheckedUpdateManyWithoutUserInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    questionGroup?: QuestionGroupUpdateOneRequiredWithoutAnswersNestedInput
    questionOption?: QuestionOptionUpdateOneRequiredWithoutAnswersNestedInput
    conversation?: ConversationUpdateOneWithoutUserAnswerNestedInput
  }

  export type UserAnswerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionGroupId?: StringFieldUpdateOperationsInput | string
    questionOptionId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAnswerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionGroupId?: StringFieldUpdateOperationsInput | string
    questionOptionId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    senderId: string
    content: string
    createdAt?: Date | string
    editedAt?: Date | string | null
    isRead?: boolean
    isDeleted?: boolean
  }

  export type ConversationParticipantCreateManyConversationInput = {
    userId: string
    isIcebreakerReady?: boolean
    hasGivenAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserAnswerCreateManyConversationInput = {
    id?: string
    userId: string
    questionGroupId: string
    questionOptionId: string
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ConversationParticipantUpdateWithoutConversationInput = {
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type ConversationParticipantUncheckedUpdateWithoutConversationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationParticipantUncheckedUpdateManyWithoutConversationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    isIcebreakerReady?: BoolFieldUpdateOperationsInput | boolean
    hasGivenAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAnswersNestedInput
    questionGroup?: QuestionGroupUpdateOneRequiredWithoutAnswersNestedInput
    questionOption?: QuestionOptionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type UserAnswerUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionGroupId?: StringFieldUpdateOperationsInput | string
    questionOptionId?: StringFieldUpdateOperationsInput | string
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAnswerUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionGroupId?: StringFieldUpdateOperationsInput | string
    questionOptionId?: StringFieldUpdateOperationsInput | string
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QuestionCreateManyGroupInput = {
    id?: string
    locale: string
    question: string
  }

  export type QuestionOptionCreateManyGroupInput = {
    id?: string
    locale: string
    label: string
    order: number
  }

  export type QuestionGroupCategoryCreateManyQuestionGroupInput = {
    categoryId: number
  }

  export type UserAnswerCreateManyQuestionGroupInput = {
    id?: string
    userId: string
    questionOptionId: string
    conversationId?: string | null
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type QuestionUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionOptionUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    answers?: UserAnswerUpdateManyWithoutQuestionOptionNestedInput
  }

  export type QuestionOptionUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    answers?: UserAnswerUncheckedUpdateManyWithoutQuestionOptionNestedInput
  }

  export type QuestionOptionUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type QuestionGroupCategoryUpdateWithoutQuestionGroupInput = {
    category?: CategoryUpdateOneRequiredWithoutGroupLinksNestedInput
  }

  export type QuestionGroupCategoryUncheckedUpdateWithoutQuestionGroupInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type QuestionGroupCategoryUncheckedUpdateManyWithoutQuestionGroupInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type UserAnswerUpdateWithoutQuestionGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAnswersNestedInput
    questionOption?: QuestionOptionUpdateOneRequiredWithoutAnswersNestedInput
    conversation?: ConversationUpdateOneWithoutUserAnswerNestedInput
  }

  export type UserAnswerUncheckedUpdateWithoutQuestionGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionOptionId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAnswerUncheckedUpdateManyWithoutQuestionGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionOptionId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAnswerCreateManyQuestionOptionInput = {
    id?: string
    userId: string
    questionGroupId: string
    conversationId?: string | null
    answeredAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    isFlagged?: boolean
  }

  export type UserAnswerUpdateWithoutQuestionOptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAnswersNestedInput
    questionGroup?: QuestionGroupUpdateOneRequiredWithoutAnswersNestedInput
    conversation?: ConversationUpdateOneWithoutUserAnswerNestedInput
  }

  export type UserAnswerUncheckedUpdateWithoutQuestionOptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionGroupId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAnswerUncheckedUpdateManyWithoutQuestionOptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionGroupId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryTranslationCreateManyCategoryInput = {
    locale: string
    label: string
  }

  export type QuestionGroupCategoryCreateManyCategoryInput = {
    questionGroupId: string
  }

  export type UserQuestionPreferenceCreateManyCategoryInput = {
    userId: string
    enabled?: boolean
    updatedAt?: Date | string
  }

  export type CategoryTranslationUpdateWithoutCategoryInput = {
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryTranslationUncheckedUpdateWithoutCategoryInput = {
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryTranslationUncheckedUpdateManyWithoutCategoryInput = {
    locale?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionGroupCategoryUpdateWithoutCategoryInput = {
    questionGroup?: QuestionGroupUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type QuestionGroupCategoryUncheckedUpdateWithoutCategoryInput = {
    questionGroupId?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionGroupCategoryUncheckedUpdateManyWithoutCategoryInput = {
    questionGroupId?: StringFieldUpdateOperationsInput | string
  }

  export type UserQuestionPreferenceUpdateWithoutCategoryInput = {
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutQuestionPreferencesNestedInput
  }

  export type UserQuestionPreferenceUncheckedUpdateWithoutCategoryInput = {
    userId?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionPreferenceUncheckedUpdateManyWithoutCategoryInput = {
    userId?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
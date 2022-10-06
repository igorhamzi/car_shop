export enum ErrorTypes {
  ObjectNotFound = 'ObjectNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = {
  message: string;
  httpStatus: number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    httpStatus: 400,
  },
};

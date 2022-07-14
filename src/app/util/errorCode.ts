/**
 * Custom error codes to be send to UI to display proper a response
 */
export const ErrorCodes: { [key: string]: CustomError } = {
    UNAUTHORIZED: {
        CODE: "UNAUTHORIZED",
        MESSAGE: "User is not allowed to perform this operation",
    },
    USER_NOT_FOUND: {
        CODE: "USER_NOT_FOUND",
        MESSAGE: "User not found",
    },
    USER_WITH_ID_NOT_FOUND: {
        CODE: "USER_WITH_ID_NOT_FOUND",
        MESSAGE: "User with given id not found",
    },
    DEPARTMENT_NOT_FOUND: {
        CODE: "DEPARTMENT_NOT_FOUND",
        MESSAGE: "Department not found",
    },
    DEPARTMENT_WITH_ID_NOT_FOUND: {
        CODE: "DEPARTMENT_WITH_ID_NOT_FOUND",
        MESSAGE: "Department with given id not found",
    },
    ENTRY_WITH_ID_NOT_FOUND:{
        CODE: "ENTRY_WITH_ID_NOT_FOUND",
        MESSAGE: "Entry with given id not found",
    },
    ENTRY_NOT_FOUND:{
        CODE: "ENTRY_NOT_FOUND",
        MESSAGE: "Entry not found",
    },
    VALIDATION_ERROR: {
        CODE: "VALIDATION_ERROR",
        MESSAGE: "Validation failed error",
    }
};

/**
 * Interface to describe custom errors
 */
export interface CustomError {
    CODE: string;
    MESSAGE: string;
}

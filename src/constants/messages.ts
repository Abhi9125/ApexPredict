export const MESSAGES = {
    AUTH:{
        LOGIN_SUCCESS: 'User logged in successfully',
        LOGIN_FAILED: 'Authentication failed',
        LOGOUT_SUCCESS: 'User logged out successfully',
        LOGOUT_FAILED: 'Logout failed',
        REGISTER_SUCCESS: 'User registered successfully',
        REGISTER_FAILED: 'Registration failed',
        
    },

    MATCH :{
        FETCH_SUCCESS: 'Matches fetched successfully',
        CREATE_SUCCESS: 'Match created successfully',
        NOT_FOUND:"Match not found",
        UPDATE_SUCCESS: 'Match updated successfully',
    },

    PREDICTION:{
        SUBMIT_SUCCESS:"Prediction submitted successfully",
        ALREADY_EXISTS:"You have already predicted for this match",
        MATCH_NOT_ACCEPTING_PREDICTION:"Match is not accepting predictions",
    },
    
    COMMON:{
        SERVER_ERROR:"Something went wrong , please try again later",
        UNAUTHORIZED:"Unauthorized",
        FORBIDDEN:"Forbidden",
        NOT_FOUND:"Not Found",
        VALIDATION_ERROR:"Validation failed",
    }

} as const;